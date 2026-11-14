import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Subtitles,
  Gauge,
  RotateCcw,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { BRAND_ASSETS, CourseOverviewVideoConfig } from '../data/siteData';

// Minimal TypeScript declarations for the official YouTube IFrame Player API
declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement | string,
        options: {
          videoId: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: {
              data: number;
              target: YTPlayerInstance;
            }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState?: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getCurrentTime: () => number;
  getDuration: () => number;
  getVideoLoadedFraction: () => number;
  setPlaybackRate: (suggestedRate: number) => void;
  getPlaybackRate: () => number;
  getAvailablePlaybackRates: () => number[];
  loadModule?: (moduleName: string) => void;
  unloadModule?: (moduleName: string) => void;
  setOption?: (moduleName: string, option: string, value: unknown) => void;
  destroy: () => void;
}

export interface IndAcademyVideoPlayerProps {
  youtubeVideoId: string;
  /**
   * Optional white-label direct video URL (e.g. Bunny Stream MP4 pull-zone / Cloud CDN).
   * When provided, uses native white-label video rendering with 0% third-party embeds.
   */
  directVideoUrl?: string;
  /**
   * Optional Bunny Stream white-label hosting configuration.
   * Supports either direct MP4 pull-zone playback (via cdnHostname) or Bunny Stream white-label player.
   */
  bunnyStream?: CourseOverviewVideoConfig['bunnyStream'];
  posterUrl?: string;
  /**
   * When false (default), displays the custom IND Academy thumbnail preview first and
   * initializes playback with autoplay=1 ONLY after the user clicks the play button.
   */
  autoPlay?: boolean;
  onExploreCourses: () => void;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const totalSecs = Math.floor(seconds);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

let ytApiPromise: Promise<void> | null = null;
function loadYouTubeIframeAPI(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise<void>((resolve) => {
    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );
    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevCallback) prevCallback();
      resolve();
    };

    if (!existingScript) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      document.head.appendChild(tag);
    }
  });

  return ytApiPromise;
}

const PLAYBACK_RATES = [0.75, 1, 1.25, 1.5, 2];

export const IndAcademyVideoPlayer: React.FC<IndAcademyVideoPlayerProps> = ({
  youtubeVideoId,
  directVideoUrl,
  bunnyStream,
  posterUrl,
  autoPlay = false,
  onExploreCourses,
}) => {
  const playerWrapperRef = useRef<HTMLDivElement | null>(null);
  const ytMountRef = useRef<HTMLDivElement | null>(null);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
  const htmlVideoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const hideControlsTimeoutRef = useRef<number | null>(null);

  // Resolve direct white-label MP4 stream URL if configured via directVideoUrl or Bunny Stream CDN pull zone
  const resolvedDirectVideoUrl =
    directVideoUrl ||
    (bunnyStream?.cdnHostname && bunnyStream?.videoId
      ? `https://${bunnyStream.cdnHostname}/${bunnyStream.videoId}/play_${
          bunnyStream.resolution || '720p'
        }.mp4`
      : undefined);

  // Resolve Bunny Stream embed URL if libraryId + videoId are provided without direct MP4
  const resolvedBunnyEmbedUrl =
    !resolvedDirectVideoUrl && bunnyStream?.libraryId && bunnyStream?.videoId
      ? `https://iframe.mediadelivery.net/embed/${bunnyStream.libraryId}/${bunnyStream.videoId}?autoplay=true&loop=false&muted=false&preload=true&responsive=true`
      : undefined;

  // Track whether the user has clicked play (ensuring autoplay=1 is used ONLY after user clicks play)
  const [hasRequestedPlay, setHasRequestedPlay] = useState<boolean>(autoPlay);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(autoPlay);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [bufferedFraction, setBufferedFraction] = useState<number>(0);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);

  const [volume, setVolume] = useState<number>(90);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);
  const [captionsEnabled, setCaptionsEnabled] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [controlsVisible, setControlsVisible] = useState<boolean>(true);

  const defaultPoster =
    posterUrl ||
    (bunnyStream?.cdnHostname && bunnyStream?.videoId
      ? `https://${bunnyStream.cdnHostname}/${bunnyStream.videoId}/thumbnail.jpg`
      : `https://i.ytimg.com/vi/${youtubeVideoId}/maxresdefault.jpg`);
  const [resolvedPoster, setResolvedPoster] = useState<string>(defaultPoster);

  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;
  const isEndedRef = useRef(isEnded);
  isEndedRef.current = isEnded;
  const isScrubbingRef = useRef(isScrubbing);
  isScrubbingRef.current = isScrubbing;
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);

  const clearHideTimer = useCallback(() => {
    if (hideControlsTimeoutRef.current !== null) {
      window.clearTimeout(hideControlsTimeoutRef.current);
      hideControlsTimeoutRef.current = null;
    }
  }, []);

  // Auto-hide custom controls after 2.4s during active playback (leaving only top-left IND Academy badge)
  const startHideTimer = useCallback(() => {
    clearHideTimer();
    hideControlsTimeoutRef.current = window.setTimeout(() => {
      if (
        isPlayingRef.current &&
        !isEndedRef.current &&
        !isScrubbingRef.current
      ) {
        setControlsVisible(false);
        setShowSpeedMenu(false);
      }
    }, 2400);
  }, [clearHideTimer]);

  const handlePlayerMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const prev = lastMousePosRef.current;
      if (
        prev &&
        Math.abs(e.clientX - prev.x) <= 2 &&
        Math.abs(e.clientY - prev.y) <= 2
      ) {
        return;
      }
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };

      setControlsVisible(true);
      if (isPlayingRef.current && !isEndedRef.current) {
        startHideTimer();
      }
    },
    [startHideTimer]
  );

  const handlePlayerTouchStart = useCallback(() => {
    setControlsVisible(true);
    if (isPlayingRef.current && !isEndedRef.current) {
      startHideTimer();
    }
  }, [startHideTimer]);

  const handlePlayerMouseLeave = useCallback(() => {
    if (isPlayingRef.current && !isEndedRef.current && !isScrubbingRef.current) {
      clearHideTimer();
      hideControlsTimeoutRef.current = window.setTimeout(() => {
        if (
          isPlayingRef.current &&
          !isEndedRef.current &&
          !isScrubbingRef.current
        ) {
          setControlsVisible(false);
          setShowSpeedMenu(false);
        }
      }, 800);
    }
  }, [clearHideTimer]);

  useEffect(() => {
    if (!isPlaying || isEnded) {
      setControlsVisible(true);
      clearHideTimer();
    } else {
      startHideTimer();
    }
    return () => {
      clearHideTimer();
    };
  }, [isPlaying, isEnded, startHideTimer, clearHideTimer]);

  // Preload the YouTube IFrame API script in the background so playback starts immediately when user clicks play
  useEffect(() => {
    if (!resolvedDirectVideoUrl && !resolvedBunnyEmbedUrl) {
      loadYouTubeIframeAPI();
    }
  }, [resolvedDirectVideoUrl, resolvedBunnyEmbedUrl]);

  // Initialize YouTube IFrame Player API ONLY after user has clicked play (or when autoPlay is explicitly enabled)
  useEffect(() => {
    if (resolvedDirectVideoUrl) {
      setIsReady(true);
      if (hasRequestedPlay && htmlVideoRef.current) {
        htmlVideoRef.current.play().catch(() => setHasError(true));
      }
      return;
    }

    if (resolvedBunnyEmbedUrl) {
      setIsReady(true);
      if (hasRequestedPlay) {
        setHasStarted(true);
        setIsPlaying(true);
        setIsBuffering(false);
      }
      return;
    }

    // Do not mount or initialize YouTube IFrame before the user clicks play
    if (!hasRequestedPlay) {
      return;
    }

    let isMounted = true;
    let instance: YTPlayerInstance | null = null;

    loadYouTubeIframeAPI().then(() => {
      if (!isMounted || !ytMountRef.current || !window.YT) return;

      // Official supported YouTube IFrame Player API parameters:
      // controls=0, playsinline=1, rel=0, iv_load_policy=3, and autoplay=1 after user clicks play
      instance = new window.YT.Player(ytMountRef.current, {
        videoId: youtubeVideoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          playsinline: 1,
          rel: 0,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          cc_load_policy: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (e) => {
            if (!isMounted) return;
            ytPlayerRef.current = e.target;
            setIsReady(true);
            const dur = e.target.getDuration?.() || 0;
            if (dur > 0) setDuration(dur);
            e.target.setVolume?.(90);
            setIsBuffering(true);
            e.target.playVideo?.();
          },
          onStateChange: (e) => {
            if (!isMounted) return;
            const YTState = window.YT?.PlayerState;
            if (!YTState) return;

            if (e.data === YTState.PLAYING) {
              setHasStarted(true);
              setIsPlaying(true);
              setIsBuffering(false);
              setIsEnded(false);
              const dur = e.target.getDuration?.() || 0;
              if (dur > 0) setDuration(dur);
            } else if (e.data === YTState.PAUSED) {
              setIsPlaying(false);
              setIsBuffering(false);
            } else if (e.data === YTState.BUFFERING) {
              setIsBuffering(true);
            } else if (e.data === YTState.ENDED) {
              setIsPlaying(false);
              setIsBuffering(false);
              setIsEnded(true);
            }
          },
          onError: () => {
            if (!isMounted) return;
            setHasError(true);
            setIsBuffering(false);
          },
        },
      });
    });

    return () => {
      isMounted = false;
      if (instance && typeof instance.destroy === 'function') {
        try {
          instance.destroy();
        } catch {
          // Ignore cleanup errors
        }
      }
      ytPlayerRef.current = null;
    };
  }, [
    youtubeVideoId,
    resolvedDirectVideoUrl,
    resolvedBunnyEmbedUrl,
    hasRequestedPlay,
  ]);

  // Synchronize custom timeline with actual playback
  useEffect(() => {
    if (resolvedDirectVideoUrl || resolvedBunnyEmbedUrl) return;
    if (!isReady) return;

    const interval = window.setInterval(() => {
      const player = ytPlayerRef.current;
      if (!player || isScrubbing) return;

      try {
        const curr = player.getCurrentTime?.() || 0;
        const dur = player.getDuration?.() || 0;
        const loaded = player.getVideoLoadedFraction?.() || 0;

        if (dur > 0) {
          setDuration(dur);
          // Intercept right before end-screen recommendations appear
          if (isPlaying && dur - curr <= 0.35 && dur > 3) {
            player.pauseVideo();
            setIsPlaying(false);
            setIsEnded(true);
            setCurrentTime(dur);
            return;
          }
        }
        setCurrentTime(curr);
        setBufferedFraction(loaded);
      } catch {
        // Ignore transient polling errors
      }
    }, 200);

    return () => window.clearInterval(interval);
  }, [isReady, isPlaying, isScrubbing, resolvedDirectVideoUrl, resolvedBunnyEmbedUrl]);

  // Listen to Fullscreen changes
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Play / Pause Handler
  const togglePlayPause = useCallback(() => {
    setShowSpeedMenu(false);

    // First click on the custom thumbnail play button: trigger playback initialization
    if (!hasRequestedPlay) {
      setHasRequestedPlay(true);
      setIsBuffering(true);
      return;
    }

    if (resolvedDirectVideoUrl && htmlVideoRef.current) {
      const vid = htmlVideoRef.current;
      if (isEnded) {
        vid.currentTime = 0;
        setIsEnded(false);
      }
      if (vid.paused) {
        setHasStarted(true);
        vid.play().catch(() => setHasError(true));
      } else {
        vid.pause();
      }
      return;
    }

    const player = ytPlayerRef.current;
    if (!player) return;

    if (isEnded) {
      player.seekTo(0, true);
      setIsEnded(false);
      setCurrentTime(0);
      player.playVideo();
      return;
    }

    if (isPlaying) {
      player.pauseVideo();
    } else {
      setHasStarted(true);
      setIsBuffering(true);
      player.playVideo();
    }
  }, [hasRequestedPlay, resolvedDirectVideoUrl, isEnded, isPlaying]);

  // Seek Handler
  const seekToTime = useCallback(
    (targetTime: number) => {
      const clamped = Math.max(0, Math.min(duration || 0, targetTime));
      setCurrentTime(clamped);
      if (isEnded && clamped < duration - 0.5) {
        setIsEnded(false);
      }

      if (resolvedDirectVideoUrl && htmlVideoRef.current) {
        htmlVideoRef.current.currentTime = clamped;
        return;
      }

      const player = ytPlayerRef.current;
      if (player) {
        player.seekTo(clamped, true);
      }
    },
    [duration, isEnded, resolvedDirectVideoUrl]
  );

  // Pointer scrubbing on custom timeline
  const handleTimelinePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!progressBarRef.current || duration <= 0) return;
    setIsScrubbing(true);

    const updateFromClientX = (clientX: number) => {
      if (!progressBarRef.current) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const ratio = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / Math.max(rect.width, 1))
      );
      seekToTime(ratio * duration);
    };

    updateFromClientX(e.clientX);

    const onPointerMove = (moveEvt: PointerEvent) => {
      updateFromClientX(moveEvt.clientX);
    };
    const onPointerUp = () => {
      setIsScrubbing(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Volume & Mute Handlers
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (resolvedDirectVideoUrl && htmlVideoRef.current) {
      const nextMute = !isMuted;
      htmlVideoRef.current.muted = nextMute;
      setIsMuted(nextMute);
      return;
    }

    const player = ytPlayerRef.current;
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
      if (volume === 0) {
        player.setVolume(70);
        setVolume(70);
      }
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const nextVol = Number(e.target.value);
    setVolume(nextVol);

    if (resolvedDirectVideoUrl && htmlVideoRef.current) {
      htmlVideoRef.current.volume = nextVol / 100;
      htmlVideoRef.current.muted = nextVol === 0;
      setIsMuted(nextVol === 0);
      return;
    }

    const player = ytPlayerRef.current;
    if (!player) return;
    player.setVolume(nextVol);
    if (nextVol === 0) {
      player.mute();
      setIsMuted(true);
    } else if (isMuted) {
      player.unMute();
      setIsMuted(false);
    }
  };

  // Playback Speed Handler
  const handleSelectSpeed = (rate: number) => {
    setPlaybackRate(rate);
    setShowSpeedMenu(false);

    if (resolvedDirectVideoUrl && htmlVideoRef.current) {
      htmlVideoRef.current.playbackRate = rate;
      return;
    }

    const player = ytPlayerRef.current;
    if (player && typeof player.setPlaybackRate === 'function') {
      player.setPlaybackRate(rate);
    }
  };

  // Subtitles / CC Toggle Handler
  const toggleCaptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextCC = !captionsEnabled;
    setCaptionsEnabled(nextCC);

    if (resolvedDirectVideoUrl && htmlVideoRef.current) {
      const tracks = htmlVideoRef.current.textTracks;
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = nextCC ? 'showing' : 'hidden';
      }
      return;
    }

    const player = ytPlayerRef.current;
    if (!player) return;
    try {
      if (nextCC) {
        player.loadModule?.('captions');
        player.setOption?.('captions', 'track', { languageCode: 'en' });
      } else {
        player.unloadModule?.('captions');
        player.setOption?.('captions', 'track', {});
      }
    } catch {
      // Captions module optional depending on video track availability
    }
  };

  // Fullscreen Handler (with standard Fullscreen API + mobile webkit fallback)
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const wrapper = playerWrapperRef.current as
      | (HTMLDivElement & {
          webkitRequestFullscreen?: () => Promise<void>;
        })
      | null;
    const videoEl = htmlVideoRef.current as
      | (HTMLVideoElement & {
          webkitEnterFullscreen?: () => void;
        })
      | null;

    if (!wrapper) return;

    if (!document.fullscreenElement) {
      if (wrapper.requestFullscreen) {
        wrapper.requestFullscreen().catch(() => {
          videoEl?.webkitEnterFullscreen?.();
        });
      } else if (wrapper.webkitRequestFullscreen) {
        wrapper.webkitRequestFullscreen();
      } else {
        videoEl?.webkitEnterFullscreen?.();
      }
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // Keyboard Accessibility Controls
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.key.toLowerCase() === 'k') {
      e.preventDefault();
      togglePlayPause();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      seekToTime(currentTime + 5);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      seekToTime(currentTime - 5);
    } else if (e.key.toLowerCase() === 'm') {
      e.preventDefault();
      toggleMute(e as unknown as React.MouseEvent);
    } else if (e.key.toLowerCase() === 'f') {
      e.preventDefault();
      toggleFullscreen(e as unknown as React.MouseEvent);
    }
  };

  const playedPercentage =
    duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;
  const bufferedPercentage = Math.min(100, Math.max(0, bufferedFraction * 100));

  // Show the custom IND Academy thumbnail preview before playback begins or whenever paused
  const showCustomThumbnailPreview =
    !hasRequestedPlay || !hasStarted || (!isPlaying && !isEnded);

  return (
    <div
      ref={playerWrapperRef}
      tabIndex={0}
      role="region"
      aria-label="IND Academy Branded Video Player"
      onKeyDown={handleKeyDown}
      onMouseMove={handlePlayerMouseMove}
      onTouchStart={handlePlayerTouchStart}
      onMouseLeave={handlePlayerMouseLeave}
      onClick={togglePlayPause}
      className={`group/player relative w-full aspect-video rounded-2xl overflow-hidden bg-[#171717] border border-[#333333] hover:border-[#C6A15B]/70 select-none shadow-[0_24px_60px_-20px_rgba(0,0,0,0.65)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] transition-colors ${
        isPlaying && !controlsVisible ? 'cursor-none' : 'cursor-pointer'
      }`}
    >
      {/* 1. UNDERLYING VIDEO ENGINE:
             - Option A: Native White-Label Video / Bunny Stream MP4 Pull Zone (100% custom controls, 0% third-party UI)
             - Option B: Bunny Stream White-Label Embed Player
             - Option C: YouTube IFrame Player API (mounted ONLY after user clicks play, using supported parameters without CSS crop hacks) */}
      {resolvedDirectVideoUrl ? (
        <video
          ref={htmlVideoRef}
          src={resolvedDirectVideoUrl}
          poster={resolvedPoster}
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          onTimeUpdate={(e) => {
            if (!isScrubbing) setCurrentTime(e.currentTarget.currentTime);
          }}
          onProgress={(e) => {
            const vid = e.currentTarget;
            if (vid.buffered.length > 0 && vid.duration > 0) {
              setBufferedFraction(
                vid.buffered.end(vid.buffered.length - 1) / vid.duration
              );
            }
          }}
          onPlay={() => {
            setHasStarted(true);
            setIsPlaying(true);
            setIsBuffering(false);
            setIsEnded(false);
          }}
          onPause={() => setIsPlaying(false)}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => setIsBuffering(false)}
          onEnded={() => {
            setIsPlaying(false);
            setIsEnded(true);
          }}
          onError={() => setHasError(true)}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      ) : resolvedBunnyEmbedUrl ? (
        hasRequestedPlay ? (
          <iframe
            src={resolvedBunnyEmbedUrl}
            title="IND Academy Course Overview"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : null
      ) : hasRequestedPlay ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute left-0 -top-[100%] w-full h-[300%] pointer-events-none [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0">
            <div ref={ytMountRef} className="w-full h-full" />
          </div>
        </div>
      ) : null}

      {/* 2. CUSTOM THUMBNAIL PREVIEW BEFORE PLAYBACK & WHILE PAUSED:
             Clean cinematic video preview without any YouTube channel avatar, title, or watermark */}
      {showCustomThumbnailPreview && (
        <div className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300">
          <img
            src={resolvedPoster}
            alt="IND Academy Video Preview"
            onLoad={(e) => {
              const img = e.currentTarget;
              if (
                img.naturalWidth <= 120 &&
                !resolvedPoster.includes('hqdefault')
              ) {
                setResolvedPoster(
                  `https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg`
                );
              }
            }}
            onError={() => {
              if (!resolvedPoster.includes('hqdefault')) {
                setResolvedPoster(
                  `https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg`
                );
              }
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/25 to-[#171717]/45" />
        </div>
      )}

      {/* 3. TOP-LEFT IND ACADEMY BRANDING (Shown only on pre-play/paused thumbnail preview; hidden during active video playback so only the clean video plays) */}
      {!hasStarted && (
        <div className="absolute top-2.5 left-2.5 md:top-5 md:left-6 z-20 pointer-events-none flex items-center gap-2 md:gap-2.5 px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-lg md:rounded-xl bg-[#171717]/90 backdrop-blur-md border border-[#C6A15B]/45 transition-opacity duration-300">
          <img
            src={BRAND_ASSETS.indAcademyLogo}
            alt="IND Academy"
            className="h-3.5 md:h-5 w-auto object-contain"
          />
          <span className="text-[9px] md:text-[11px] font-semibold uppercase tracking-[0.14em] md:tracking-[0.18em] text-[#C6A15B]">
            IND ACADEMY
          </span>
        </div>
      )}

      {/* 4. CENTER CHAMPAGNE GOLD (#C6A15B) CIRCULAR PLAY / PAUSE BUTTON WITH BLACK (#171717) ICON */}
      {!isEnded && !resolvedBunnyEmbedUrl && (
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
            !isPlaying || controlsVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className={`w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] flex items-center justify-center shadow-[0_12px_36px_rgba(198,161,91,0.45)] transition-all duration-300 hover:scale-105 cursor-pointer ${
              isPlaying && !controlsVisible
                ? 'scale-90 opacity-0 pointer-events-none'
                : 'scale-100 opacity-100 pointer-events-auto'
            }`}
          >
            {isBuffering ? (
              <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin text-[#171717]" />
            ) : isPlaying ? (
              <Pause className="w-6 h-6 md:w-8 md:h-8 fill-current text-[#171717]" />
            ) : (
              <Play className="w-6 h-6 md:w-8 md:h-8 fill-current text-[#171717] ml-0.5 md:ml-1" />
            )}
          </button>
        </div>
      )}

      {/* 5. CUSTOM IND ACADEMY END SCREEN */}
      {isEnded && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 z-30 bg-[#171717]/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-4 md:p-10 cursor-default"
        >
          <img
            src={BRAND_ASSETS.indAcademyLogo}
            alt="IND Academy"
            className="h-6 md:h-9 w-auto object-contain mb-2 md:mb-4"
          />
          <span className="small-gold-label text-[#C6A15B] block mb-1 md:mb-2">
            IND ACADEMY
          </span>
          <h3 className="font-display-serif text-lg md:text-4xl text-[#FFFFFF] mb-3 md:mb-6 max-w-lg">
            Continue Your Learning Journey.
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-4">
            <button
              type="button"
              onClick={onExploreCourses}
              className="group/cta px-4 py-2.5 md:px-7 md:py-3.5 rounded-xl bg-[#C6A15B] hover:bg-[#A98747] text-[#171717] text-xs md:text-sm font-semibold transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Our Courses</span>
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={togglePlayPause}
              className="px-4 py-2.5 md:px-5 md:py-3.5 rounded-xl border border-[#333333] hover:border-[#C6A15B] text-[#FFFFFF] text-xs md:text-sm font-medium transition-colors inline-flex items-center gap-1.5 md:gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#C6A15B]" />
              <span>Replay</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. PLAYBACK ERROR FALLBACK */}
      {hasError && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 z-30 bg-[#171717]/95 flex flex-col items-center justify-center text-center p-6"
        >
          <p className="font-display-serif text-xl text-[#FFFFFF] mb-2">
            Unable to load video stream right now.
          </p>
          <button
            type="button"
            onClick={onExploreCourses}
            className="mt-3 px-6 py-3 rounded-xl bg-[#C6A15B] text-[#171717] text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Explore Our Courses
          </button>
        </div>
      )}

      {/* 7. BOTTOM CUSTOM IND ACADEMY CONTROL BAR (Play/Pause, Volume, Playback Timeline, Current Time & Duration, Captions, Fullscreen)
             Uses Gold (#C6A15B), Black (#171717), and White (#FFFFFF) */}
      {!isEnded && !resolvedBunnyEmbedUrl && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[#171717] via-[#171717]/90 to-transparent pt-5 pb-2.5 px-3 md:pt-8 md:pb-3.5 md:px-6 transition-all duration-300 cursor-default ${
            controlsVisible || !isPlaying
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          {/* Draggable Playback Timeline */}
          <div
            ref={progressBarRef}
            onPointerDown={handleTimelinePointerDown}
            role="slider"
            aria-label="Playback timeline"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(currentTime)}
            className="group/slider relative w-full h-5 md:h-4 flex items-center cursor-pointer mb-1.5 md:mb-2"
          >
            <div className="relative w-full h-1.5 group-hover/slider:h-2 rounded-full bg-[#FFFFFF]/20 overflow-hidden transition-all">
              {/* Buffered progress */}
              <div
                style={{ width: `${bufferedPercentage}%` }}
                className="absolute inset-y-0 left-0 bg-[#FFFFFF]/30 rounded-full"
              />
              {/* Gold (#C6A15B) played progress */}
              <div
                style={{ width: `${playedPercentage}%` }}
                className="absolute inset-y-0 left-0 bg-[#C6A15B] rounded-full"
              />
            </div>

            {/* Gold (#C6A15B) Seek Thumb with Black (#171717) border */}
            <div
              style={{ left: `calc(${playedPercentage}% - 7px)` }}
              className="w-3.5 h-3.5 rounded-full bg-[#C6A15B] border-2 border-[#171717] shadow-md transition-transform group-hover/slider:scale-125"
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-1.5 md:gap-4 text-[11px] md:text-sm text-[#FFFFFF]">
            {/* Left: Play/Pause, Volume Mute/Unmute + Slider, Current Time / Duration */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-4 min-w-0">
              <button
                type="button"
                onClick={togglePlayPause}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-[#171717] border border-[#C6A15B]/35 hover:border-[#C6A15B] text-[#C6A15B] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
                ) : (
                  <Play className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current ml-0.5" />
                )}
              </button>

              {/* Volume Button + Slider (available on mobile and desktop) */}
              <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-[#171717] border border-[#C6A15B]/35 hover:border-[#C6A15B] text-[#C6A15B] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Volume"
                  className="w-12 sm:w-16 md:w-20 h-1 rounded-lg appearance-none bg-[#FFFFFF]/25 accent-[#C6A15B] cursor-pointer"
                />
              </div>

              {/* Current Time and Duration */}
              <div className="text-[10px] sm:text-[11px] md:text-xs tabular-nums text-[#FFFFFF] tracking-tight whitespace-nowrap">
                <span className="text-[#C6A15B] font-semibold">
                  {formatTime(currentTime)}
                </span>
                <span className="mx-1 text-[#FFFFFF]/50">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right: Captions (CC), Playback Speed, Fullscreen */}
            <div className="flex items-center gap-1 md:gap-2.5 relative shrink-0">
              {/* Captions (CC) */}
              <button
                type="button"
                onClick={toggleCaptions}
                aria-label="Toggle Captions"
                aria-pressed={captionsEnabled}
                title="Captions (CC)"
                className={`px-2 md:px-2.5 h-7 md:h-8 rounded-lg border text-[10px] md:text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer ${
                  captionsEnabled
                    ? 'bg-[#C6A15B] text-[#171717] border-[#C6A15B]'
                    : 'bg-[#171717] text-[#FFFFFF] border-[#C6A15B]/35 hover:border-[#C6A15B]'
                }`}
              >
                <Subtitles className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#C6A15B]" />
                <span className="hidden sm:inline">CC</span>
              </button>

              {/* Playback Speed */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSpeedMenu((prev) => !prev)}
                  aria-label="Playback Speed"
                  title="Playback Speed"
                  className="px-2 md:px-2.5 h-7 md:h-8 rounded-lg bg-[#171717] border border-[#C6A15B]/35 hover:border-[#C6A15B] text-[#C6A15B] text-[10px] md:text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer tabular-nums"
                >
                  <Gauge className="hidden sm:inline w-3.5 h-3.5" />
                  <span>{playbackRate}x</span>
                </button>

                {showSpeedMenu && (
                  <div className="absolute bottom-9 right-0 z-30 w-28 rounded-xl bg-[#171717] border border-[#C6A15B]/40 p-1.5 shadow-xl">
                    <span className="block px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#FFFFFF]/60">
                      Speed
                    </span>
                    {PLAYBACK_RATES.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => handleSelectSpeed(r)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between cursor-pointer ${
                          playbackRate === r
                            ? 'bg-[#C6A15B] text-[#171717]'
                            : 'text-[#FFFFFF] hover:bg-[#FFFFFF]/10'
                        }`}
                      >
                        <span>{r === 1 ? '1x (Normal)' : `${r}x`}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={
                  isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'
                }
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-[#171717] border border-[#C6A15B]/35 hover:border-[#C6A15B] text-[#C6A15B] flex items-center justify-center transition-colors cursor-pointer"
              >
                {isFullscreen ? (
                  <Minimize className="w-3.5 h-3.5 md:w-4 md:h-4" />
                ) : (
                  <Maximize className="w-3.5 h-3.5 md:w-4 md:h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
