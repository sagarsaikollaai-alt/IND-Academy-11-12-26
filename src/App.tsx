/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  ContactConfig,
  COURSES_DATA,
  DEFAULT_CONTACT_CONFIG,
  PAGE_METADATA,
  PageId,
} from './data/siteData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/MotionPrimitives';
import { HomePage } from './pages/HomePage';
import { CourseCataloguePage } from './pages/CourseCataloguePage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LearningExperiencePage } from './pages/LearningExperiencePage';
import { AboutPage } from './pages/AboutPage';
import { EnrollmentPage } from './pages/EnrollmentPage';
import { ContactPage } from './pages/ContactPage';

const VALID_PAGES: PageId[] = [
  'home',
  'catalogue',
  'course-digital-marketing',
  'course-coding',
  'course-ai',
  'course-video-editing',
  'learning-experience',
  'about',
  'enrollment',
  'contact',
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    const hash = window.location.hash.replace('#', '') as PageId;
    if (VALID_PAGES.includes(hash)) {
      return hash;
    }
    return 'home';
  });

  const [preselectedCourseId, setPreselectedCourseId] = useState<
    string | undefined
  >(undefined);

  const [contactConfig, setContactConfig] = useState<ContactConfig>(
    DEFAULT_CONTACT_CONFIG
  );

  // Sync SEO Title, Meta Description, and Scroll position on page change
  useEffect(() => {
    const pageMeta = PAGE_METADATA[currentPage] || PAGE_METADATA.home;
    document.title = pageMeta.seoTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageMeta.seoDescription);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Listen to browser hash navigation
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (VALID_PAGES.includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (page: PageId, courseId?: string) => {
    if (courseId) {
      setPreselectedCourseId(courseId);
    }
    setCurrentPage(page);
    window.history.pushState(null, '', `#${page}`);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'catalogue':
        return <CourseCataloguePage onNavigate={handleNavigate} />;
      case 'course-digital-marketing':
        return (
          <CourseDetailPage
            course={COURSES_DATA[0]}
            onNavigate={handleNavigate}
          />
        );
      case 'course-coding':
        return (
          <CourseDetailPage
            course={COURSES_DATA[1]}
            onNavigate={handleNavigate}
          />
        );
      case 'course-ai':
        return (
          <CourseDetailPage
            course={COURSES_DATA[2]}
            onNavigate={handleNavigate}
          />
        );
      case 'course-video-editing':
        return (
          <CourseDetailPage
            course={COURSES_DATA[3]}
            onNavigate={handleNavigate}
          />
        );
      case 'learning-experience':
        return <LearningExperiencePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'enrollment':
        return (
          <EnrollmentPage
            preselectedCourseId={preselectedCourseId}
            contactConfig={contactConfig}
            onNavigate={handleNavigate}
          />
        );
      case 'contact':
        return (
          <ContactPage
            contactConfig={contactConfig}
            onUpdateContactConfig={setContactConfig}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F0] text-[#171717] font-normal selection:bg-[#C6A15B]/25 selection:text-[#171717]">
      {/* Top Viewport Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Single Clean Navigation Bar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Active Page Content */}
      <main className="flex-1">{renderPage()}</main>

      {/* Footer with Separate IND Academy and Brightlume Digital Media Logos */}
      <Footer
        currentPage={currentPage}
        onNavigate={handleNavigate}
        contactConfig={contactConfig}
      />
    </div>
  );
}
