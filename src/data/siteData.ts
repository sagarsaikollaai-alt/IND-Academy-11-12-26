import indAcademyLogoImg from '../assets/images/image_587046e6.png';
import brightlumeLogoImg from '../assets/images/brightlume-logo_57c794bf.png';
import heroStudentImg from '../assets/images/hero_student_professional_1794311619339.jpg';
import digitalMarketingImg from '../assets/images/course_digital_marketing_1794311618280.jpg';
import codingImg from '../assets/images/course_coding_dev_1794311620521.jpg';
import aiImg from '../assets/images/course_ai_workflows_1794311621866.jpg';
import classroomImg from '../assets/images/classroom_offline_learning_1794311625091.jpg';

export type PageId =
  | 'home'
  | 'catalogue'
  | 'course-digital-marketing'
  | 'course-coding'
  | 'course-ai'
  | 'course-video-editing'
  | 'learning-experience'
  | 'about'
  | 'enrollment'
  | 'contact';

export interface CurriculumModule {
  moduleNumber: string;
  title: string;
  subtitle: string;
  summary: string;
  topics: string[];
  deliverable: string;
}

export interface RealWorldProject {
  number: string;
  title: string;
  scenario: string;
  toolsUsed: string[];
  outcome: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CourseData {
  id: string;
  slug: PageId;
  code: string;
  title: string;
  shortTitle: string;
  category: 'marketing' | 'coding' | 'ai' | 'video';
  heroHeading: string;
  heroItalicAccent: string;
  shortDescription: string;
  heroDescription: string;
  mode: string;
  durationPlaceholder: string;
  level: string;
  batchSchedule: string[];
  image: string;
  imageAlt: string;
  imageCaption: string;
  overview: string[];
  keyTopics: string[];
  whatYouWillLearnThree: {
    number: string;
    title: string;
    detail: string;
  }[];
  whereItCanLead: string[];
  skillsCovered: {
    title: string;
    description: string;
  }[];
  modules: CurriculumModule[];
  softwareAndTools: {
    name: string;
    category: string;
    usage: string;
  }[];
  realWorldProjects: RealWorldProject[];
  learningOutcomes: string[];
  careerOpportunities: {
    role: string;
    focusArea: string;
  }[];
  faqs: FAQItem[];
}

export const BRAND_ASSETS = {
  indAcademyLogo: indAcademyLogoImg,
  brightlumeLogo: brightlumeLogoImg,
  heroStudentImage: heroStudentImg,
  digitalMarketingImage: digitalMarketingImg,
  codingImage: codingImg,
  aiImage: aiImg,
  videoEditingImage:
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=85',
  classroomImage: classroomImg,
};

/**
 * Hero Video Configuration — Replace mp4Url / webmUrl with your own 10-15s studio loop
 */
export const HERO_VIDEO_CONFIG = {
  mp4Url:
    'https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-her-laptop-in-a-modern-office-41760-large.mp4',
  webmUrl:
    'https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-her-laptop-in-a-modern-office-41760-large.mp4',
  posterUrl: heroStudentImg,
  caption: 'Placeholder Studio Loop — Replace in src/data/siteData.ts',
};

/**
 * Course Overview Video Configuration
 * Supports white-label Bunny Stream hosting (direct MP4/HLS pull zone or Bunny Stream Library/Video ID)
 * for 100% branding control, with YouTube IFrame API fallback.
 */
export interface CourseOverviewVideoConfig {
  youtubeVideoId: string;
  posterUrl: string;
  /**
   * Optional direct white-label video stream URL (e.g. Bunny Stream MP4 pull-zone URL:
   * https://vz-xxxxxxxx-xxx.b-cdn.net/<videoId>/play_720p.mp4)
   */
  directVideoUrl?: string;
  /**
   * Optional Bunny Stream embed configuration for white-label hosting
   */
  bunnyStream?: {
    libraryId: string;
    videoId: string;
    cdnHostname?: string;
    resolution?: '480p' | '720p' | '1080p';
  };
}

export const COURSE_OVERVIEW_VIDEO_CONFIG: CourseOverviewVideoConfig = {
  youtubeVideoId: 'Uf9xAlFJ5bM',
  posterUrl: 'https://i.ytimg.com/vi/Uf9xAlFJ5bM/maxresdefault.jpg',
  // Set directVideoUrl or bunnyStream below when migrating to Bunny Stream white-label hosting:
  directVideoUrl: undefined,
  bunnyStream: undefined,
};


export const PAGE_METADATA: Record<
  PageId,
  { seoTitle: string; seoDescription: string }
> = {
  home: {
    seoTitle:
      "IND Academy — Learn Today. Build Tomorrow's Career. | An EdTech Initiative by Brightlume Digital Media Private Limited",
    seoDescription:
      'Learn Digital Marketing, Coding, Artificial Intelligence, and Video Editing through practical education, real-world projects and expert guidance at IND Academy.',
  },
  catalogue: {
    seoTitle: 'Find Your Path — Programs at IND Academy',
    seoDescription:
      'Explore programs in Digital Marketing, Coding, Artificial Intelligence, and Video Editing designed to help you build practical, industry-relevant skills.',
  },
  'course-digital-marketing': {
    seoTitle:
      'Digital Marketing Program — SEO, Meta Ads, Google Ads & Analytics | IND Academy',
    seoDescription:
      'Master Digital Marketing Fundamentals, SEO, Social Media Marketing, Content Strategy, Meta Ads, Google Ads, Google Analytics, and Campaign Management.',
  },
  'course-coding': {
    seoTitle:
      'Coding Program — HTML, CSS, JavaScript, Python & React | IND Academy',
    seoDescription:
      'Master Programming Fundamentals, HTML, CSS, JavaScript, Python, React, Frontend Development, Backend Fundamentals, and Database Concepts.',
  },
  'course-ai': {
    seoTitle:
      'Artificial Intelligence Program — Prompt Engineering, AI Tools & Workflows | IND Academy',
    seoDescription:
      'Master AI Fundamentals, Prompt Engineering, ChatGPT, Gemini, Claude, AI Automation, AI Workflows, and Practical AI Applications.',
  },
  'course-video-editing': {
    seoTitle:
      'Video Editing & Motion Graphics Program — Premiere Pro, After Effects & Photoshop | IND Academy',
    seoDescription:
      'Master professional video editing, visual storytelling, motion graphics, and creative design using Adobe Premiere Pro, After Effects, and Photoshop.',
  },
  'learning-experience': {
    seoTitle:
      'Learning Experience — Online & Offline Classroom Training | IND Academy',
    seoDescription:
      'Discover how IND Academy combines live interactive classes, hands-on practice labs, and dedicated mentor support across Online and Offline learning modes.',
  },
  about: {
    seoTitle:
      'About IND Academy — An EdTech Initiative by Brightlume Digital Media Private Limited',
    seoDescription:
      'Learn about the story, mission, philosophy, and student commitment behind IND Academy and our parent organization Brightlume Digital Media Private Limited.',
  },
  enrollment: {
    seoTitle: "Let's Begin Your Learning Journey — Admissions | IND Academy",
    seoDescription:
      'Submit your program enquiry or enrollment application for Digital Marketing, Coding, Artificial Intelligence, or Video Editing at IND Academy.',
  },
  contact: {
    seoTitle: 'Contact IND Academy — Ameerpet, Hyderabad & Online Support',
    seoDescription:
      'Connect with IND Academy for program enquiries, syllabus walkthroughs, and campus visits in Ameerpet, Hyderabad.',
  },
};

export const WHY_IND_COLUMNS = [
  {
    number: '01',
    title: 'Practical Training',
    description:
      'Every topic moves directly from core principles into live execution. Students work inside real platforms, code editors, AI workflows, and editing timelines during every session.',
  },
  {
    number: '02',
    title: 'Industry Exposure',
    description:
      'As an EdTech initiative by Brightlume Digital Media Private Limited, our curriculum reflects current workflows, technical standards, and modern creative and digital practices.',
  },
  {
    number: '03',
    title: 'Real-World Projects',
    description:
      'Rather than relying on passive memorization, learners complete structured projects across Digital Marketing, Coding, AI, and Video Editing that demonstrate practical competence.',
  },
  {
    number: '04',
    title: 'Mentor Support',
    description:
      'Practicing mentors review your work step by step—providing direct feedback on campaigns, code architecture, automated AI workflows, and post-production timelines.',
  },
];

export const TOOLS_MARQUEE_LIST = [
  'Google Ads',
  'Meta Ads',
  'Google Analytics',
  'HTML and CSS',
  'JavaScript',
  'Python',
  'React',
  'ChatGPT',
  'Gemini',
  'Claude',
  'Adobe Premiere Pro',
  'Adobe After Effects',
  'Adobe Photoshop',
];

export interface PracticeLabItem {
  id: string;
  number: string;
  title: string;
  programTag: string;
  oneLine: string;
  image: string;
  topics: string[];
}

export const PRACTICE_LABS_DATA: PracticeLabItem[] = [
  {
    id: 'campaign-seo-lab',
    number: 'Lab 01',
    title: 'Performance & SEO Lab',
    programTag: 'Digital Marketing',
    oneLine:
      'Structure, launch, and optimize search and social campaigns while auditing technical SEO and GA4 attribution.',
    image: BRAND_ASSETS.digitalMarketingImage,
    topics: ['Meta Ads', 'Google Ads', 'SEO', 'Google Analytics'],
  },
  {
    id: 'web-build-lab',
    number: 'Lab 02',
    title: 'Full-Stack & React Lab',
    programTag: 'Coding',
    oneLine:
      'Architect responsive frontend interfaces, Python backend logic, and database-driven web applications from scratch.',
    image: BRAND_ASSETS.codingImage,
    topics: ['HTML & CSS', 'JavaScript', 'React', 'Python'],
  },
  {
    id: 'ai-workflow-lab',
    number: 'Lab 03',
    title: 'Applied AI & Automation Lab',
    programTag: 'Artificial Intelligence',
    oneLine:
      'Design repeatable prompt systems and connect foundation models to automated multi-step business pipelines.',
    image: BRAND_ASSETS.aiImage,
    topics: ['Prompt Engineering', 'ChatGPT', 'Gemini', 'Claude', 'AI Workflows'],
  },
  {
    id: 'post-production-lab',
    number: 'Lab 04',
    title: 'Video Editing & Motion Lab',
    programTag: 'Video Editing',
    oneLine:
      'Cut multi-cam narratives, animate dynamic motion graphics, and design high-converting visual assets.',
    image: BRAND_ASSETS.videoEditingImage,
    topics: ['Adobe Premiere Pro', 'Adobe After Effects', 'Adobe Photoshop'],
  },
];

export interface StudentStoryPlaceholder {
  id: string;
  name: string;
  program: string;
  quote: string;
  beforeRole: string;
  nowRole: string;
  videoThumbnail: string;
  isPlaceholder: boolean;
}

export const STUDENT_STORIES_PLACEHOLDERS: StudentStoryPlaceholder[] = [
  {
    id: 'story-1',
    name: 'Learner Profile 01 (Editable Placeholder)',
    program: 'Digital Marketing Program',
    quote:
      '"Placeholder student reflection: Working through live search and social campaign structures helped me understand how performance marketing operates in practice."',
    beforeRole: 'Before: Fresh Graduate / Exploring Digital Careers (Placeholder)',
    nowRole: 'Now: Digital Marketing & Campaign Executive (Placeholder)',
    videoThumbnail: BRAND_ASSETS.digitalMarketingImage,
    isPlaceholder: true,
  },
  {
    id: 'story-2',
    name: 'Learner Profile 02 (Editable Placeholder)',
    program: 'Coding Program',
    quote:
      '"Placeholder student reflection: Building responsive React interfaces and backend APIs step by step gave me a portfolio of working applications."',
    beforeRole: 'Before: Non-CS Background Learner (Placeholder)',
    nowRole: 'Now: Frontend & Full-Stack Developer (Placeholder)',
    videoThumbnail: BRAND_ASSETS.codingImage,
    isPlaceholder: true,
  },
  {
    id: 'story-3',
    name: 'Learner Profile 03 (Editable Placeholder)',
    program: 'Artificial Intelligence Program',
    quote:
      '"Placeholder student reflection: Learning structured prompt engineering and multi-step AI automation transformed how I approach daily analytical workflows."',
    beforeRole: 'Before: Operations & Content Professional (Placeholder)',
    nowRole: 'Now: AI Workflow & Automation Specialist (Placeholder)',
    videoThumbnail: BRAND_ASSETS.aiImage,
    isPlaceholder: true,
  },
];

export interface MentorPlaceholder {
  id: string;
  name: string;
  role: string;
  discipline: string;
  image: string;
}

export const MENTORS_MARQUEE_ROW_1: MentorPlaceholder[] = [
  {
    id: 'm-1',
    name: 'Faculty Mentor 01',
    role: 'Performance Marketing & SEO Lead',
    discipline: 'Digital Marketing',
    image: BRAND_ASSETS.heroStudentImage,
  },
  {
    id: 'm-2',
    name: 'Faculty Mentor 02',
    role: 'Senior Frontend & React Architect',
    discipline: 'Coding',
    image: BRAND_ASSETS.codingImage,
  },
  {
    id: 'm-3',
    name: 'Faculty Mentor 03',
    role: 'Applied AI & Workflow Strategist',
    discipline: 'Artificial Intelligence',
    image: BRAND_ASSETS.aiImage,
  },
  {
    id: 'm-4',
    name: 'Faculty Mentor 04',
    role: 'Senior Post-Production & Motion Director',
    discipline: 'Video Editing',
    image: BRAND_ASSETS.videoEditingImage,
  },
];

export const MENTORS_MARQUEE_ROW_2: MentorPlaceholder[] = [
  {
    id: 'm-5',
    name: 'Faculty Mentor 05',
    role: 'Python & Backend Systems Instructor',
    discipline: 'Coding',
    image: BRAND_ASSETS.classroomImage,
  },
  {
    id: 'm-6',
    name: 'Faculty Mentor 06',
    role: 'Prompt Engineering & LLM Systems Lead',
    discipline: 'Artificial Intelligence',
    image: BRAND_ASSETS.aiImage,
  },
  {
    id: 'm-7',
    name: 'Faculty Mentor 07',
    role: 'Premiere Pro & After Effects Specialist',
    discipline: 'Video Editing',
    image: BRAND_ASSETS.videoEditingImage,
  },
  {
    id: 'm-8',
    name: 'Faculty Mentor 08',
    role: 'Media Analytics & Paid Search Specialist',
    discipline: 'Digital Marketing',
    image: BRAND_ASSETS.digitalMarketingImage,
  },
];

export interface MasterclassEpisode {
  id: string;
  episode: string;
  title: string;
  discipline: string;
  speakerPlaceholder: string;
  schedulePlaceholder: string;
  image: string;
}

export const MASTERCLASSES_PLACEHOLDERS: MasterclassEpisode[] = [
  {
    id: 'mc-01',
    episode: 'Episode 01 · Free Masterclass',
    title: 'Structuring Full-Funnel Campaigns with Google Ads, Meta Ads & Analytics',
    discipline: 'Digital Marketing',
    speakerPlaceholder: 'Led by Digital Marketing Faculty',
    schedulePlaceholder: 'Upcoming Live Session · Online & Ameerpet Studio',
    image: BRAND_ASSETS.digitalMarketingImage,
  },
  {
    id: 'mc-02',
    episode: 'Episode 02 · Free Masterclass',
    title: 'From HTML & JavaScript Foundations to Interactive React Applications',
    discipline: 'Coding',
    speakerPlaceholder: 'Led by Software Engineering Faculty',
    schedulePlaceholder: 'Upcoming Live Session · Online & Ameerpet Studio',
    image: BRAND_ASSETS.codingImage,
  },
  {
    id: 'mc-03',
    episode: 'Episode 03 · Free Masterclass',
    title: 'Practical Prompt Engineering & Multi-Step Workflows with ChatGPT, Gemini & Claude',
    discipline: 'Artificial Intelligence',
    speakerPlaceholder: 'Led by Applied AI Faculty',
    schedulePlaceholder: 'Upcoming Live Session · Online & Ameerpet Studio',
    image: BRAND_ASSETS.aiImage,
  },
  {
    id: 'mc-04',
    episode: 'Episode 04 · Free Masterclass',
    title: 'Cinematic Editing, Motion Graphics & Visual Design with Premiere Pro, After Effects & Photoshop',
    discipline: 'Video Editing',
    speakerPlaceholder: 'Led by Creative Post-Production Faculty',
    schedulePlaceholder: 'Upcoming Live Session · Online & Ameerpet Studio',
    image: BRAND_ASSETS.videoEditingImage,
  },
];

export interface StickyWorkflowStep {
  step: string;
  title: string;
  description: string;
  deliverableNote: string;
  image: string;
  imageCaption: string;
}

export const HOW_IND_WORKS_STICKY_STEPS: StickyWorkflowStep[] = [
  {
    step: '01',
    title: 'Discover your interest',
    description:
      'Meet with an academic advisor or attend a demo session to explore how Digital Marketing, Coding, and Artificial Intelligence align with your background and career goals.',
    deliverableNote: 'Personal Learning Direction & Syllabus Walkthrough',
    image: BRAND_ASSETS.heroStudentImage,
    imageCaption: 'Step 01 — Exploring disciplines with academic guidance',
  },
  {
    step: '02',
    title: 'Choose your program',
    description:
      'Select your core discipline and preferred study format—either live interactive Online classes or in-person Offline classroom sessions at our Ameerpet, Hyderabad center.',
    deliverableNote: 'Cohort Onboarding & Studio Environment Setup',
    image: BRAND_ASSETS.classroomImage,
    imageCaption: 'Step 02 — Choosing Online or Offline Hyderabad learning',
  },
  {
    step: '03',
    title: 'Learn through practice',
    description:
      'Master foundational and advanced concepts through guided practice labs, working directly with industry tools like Google Ads, React, Python, ChatGPT, Gemini, and Claude.',
    deliverableNote: 'Weekly Guided Lab Assignments',
    image: BRAND_ASSETS.digitalMarketingImage,
    imageCaption: 'Step 03 — Hands-on execution inside practice labs',
  },
  {
    step: '04',
    title: 'Build real projects',
    description:
      'Apply every module to structured, real-world briefs—building complete marketing campaigns, responsive web applications, and automated AI workflows.',
    deliverableNote: 'Verified Multi-Module Capstone Projects',
    image: BRAND_ASSETS.codingImage,
    imageCaption: 'Step 04 — Building production-grade project deliverables',
  },
  {
    step: '05',
    title: 'Develop your portfolio',
    description:
      'Refine your completed work with 1:1 mentor feedback, document your case studies, and prepare for technical and strategic interviews with confidence.',
    deliverableNote: 'Graduating Portfolio & Career Readiness Review',
    image: BRAND_ASSETS.aiImage,
    imageCaption: 'Step 05 — Graduating with a documented project portfolio',
  },
];

export interface ResultMetricPlaceholder {
  id: string;
  number: string;
  label: string;
  note: string;
}

export const INITIAL_RESULTS_PLACEHOLDERS: ResultMetricPlaceholder[] = [
  {
    id: 'res-1',
    number: '04',
    label: 'Core Industry Programs',
    note: 'Digital Marketing, Coding, Artificial Intelligence & Video Editing',
  },
  {
    id: 'res-2',
    number: '04',
    label: 'Dedicated Practice Labs',
    note: 'Hands-on execution across campaigns, code, AI & post-production',
  },
  {
    id: 'res-3',
    number: '13+',
    label: 'Core Industry Tools Covered',
    note: 'Google Ads, React, Python, Gemini, Premiere Pro, After Effects & Photoshop',
  },
  {
    id: 'res-4',
    number: '1:1',
    label: 'Mentor Portfolio Reviews',
    note: 'Online & Offline Hyderabad studio guidance',
  },
];

export interface JournalArticle {
  id: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
}

export const JOURNAL_ARTICLES_DATA: JournalArticle[] = [
  {
    id: 'journal-1',
    category: 'Digital Marketing',
    readTime: '4 Min Read',
    title: 'Why Search Intent and Analytics Remain the Foundation of Modern Digital Campaigns',
    excerpt:
      'Before launching paid media on Meta Ads or Google Ads, understanding how users search, evaluate, and convert inside Google Analytics sets strong campaigns apart.',
    content: [
      'Modern digital marketing is often mistaken for simply running social media posts or boosting ads. In practice, sustainable growth begins with understanding search intent, content strategy, and clean analytics tracking.',
      'At IND Academy, students learn to connect Search Engine Optimization (SEO), Meta Ads, and Google Ads into a unified measurement framework inside Google Analytics.',
    ],
    image: BRAND_ASSETS.digitalMarketingImage,
  },
  {
    id: 'journal-2',
    category: 'Coding',
    readTime: '5 Min Read',
    title: 'Learning Software Development by Building: From HTML & JavaScript to React and Python',
    excerpt:
      'Why writing, debugging, and shipping complete frontend and backend components builds deeper fluency than passively watching syntax tutorials.',
    content: [
      'Programming fluency comes from understanding how data flows from a database through Python backend logic to an interactive React user interface.',
      'By structuring learning around HTML, CSS, JavaScript, Python, React, and Database Concepts, learners build confidence across the full web stack.',
    ],
    image: BRAND_ASSETS.codingImage,
  },
  {
    id: 'journal-3',
    category: 'Artificial Intelligence',
    readTime: '4 Min Read',
    title: 'Beyond Basic Prompts: Designing Reliable Workflows with ChatGPT, Gemini, and Claude',
    excerpt:
      'How structured prompt engineering and multi-step AI automation turn foundation models into dependable productivity systems.',
    content: [
      'Working effectively with Artificial Intelligence requires more than casual one-line questions. Professional AI workflows rely on clear context framing, structured output schemas, and rigorous verification.',
      'Our Artificial Intelligence program trains learners across ChatGPT, Google Gemini, and Claude to build practical AI applications and automated workflows.',
    ],
    image: BRAND_ASSETS.aiImage,
  },
];

export const LEARNING_EXPERIENCE_PILLARS = [
  {
    index: '01',
    title: 'Live Interactive Classes',
    description:
      'Engage directly with practicing mentors in real time—asking questions, dissecting live campaigns, and writing code together.',
  },
  {
    index: '02',
    title: 'Hands-on Projects',
    description:
      'Translate every module into tangible work. Build real search campaigns, full-stack web applications, and automated AI workflows.',
  },
  {
    index: '03',
    title: 'Case Study Learning',
    description:
      'Examine real business problems and technical architectures to understand how professionals make decisions under real constraints.',
  },
  {
    index: '04',
    title: 'Industry Mentorship',
    description:
      'Learn from practitioners backed by Brightlume Digital Media who bring current industry standards into every session.',
  },
  {
    index: '05',
    title: 'Practical Assignments',
    description:
      'Complete structured weekly studio briefs that reinforce tool fluency and analytical thinking step by step.',
  },
  {
    index: '06',
    title: 'Career Preparation',
    description:
      'Graduate with a documented portfolio of projects, refined case studies, and structured preparation for technical and strategic interviews.',
  },
];

export const HOW_LEARNING_WORKS_STEPS = [
  {
    step: '01',
    title: 'Foundation',
    description:
      'Build crystal-clear conceptual understanding of core principles, frameworks, and industry terminology.',
  },
  {
    step: '02',
    title: 'Guided Practice',
    description:
      'Work alongside mentors inside industry tools—writing code, structuring ad sets, and engineering prompts.',
  },
  {
    step: '03',
    title: 'Real Projects',
    description:
      'Execute end-to-end capstone projects modeled on authentic industry briefs and technical specifications.',
  },
  {
    step: '04',
    title: 'Mentor Feedback',
    description:
      'Receive detailed line-by-line critiques on your campaigns, codebases, and AI workflows to elevate your craft.',
  },
  {
    step: '05',
    title: 'Career Readiness',
    description:
      'Assemble your verified project portfolio and prepare for real-world professional opportunities.',
  },
];

export const WHY_IND_ACADEMY_PILLARS = [
  {
    title: 'Industry-Focused Curriculum',
    description:
      'Every syllabus is crafted around the skills, platforms, and workflows actively demanded by modern digital and technology teams.',
  },
  {
    title: 'Practical Project-Based Learning',
    description:
      'We prioritize doing over memorizing. Students graduate with real work they have built, tested, and refined themselves.',
  },
  {
    title: 'Experienced Mentors',
    description:
      'Learn directly from practitioners who work with modern marketing systems, software stacks, and AI tools every day.',
  },
  {
    title: 'Modern Tools & Workflows',
    description:
      'Train hands-on with Meta Ads, Google Ads, GA4, React, Python, ChatGPT, Gemini, Claude, and modern automation pipelines.',
  },
  {
    title: 'Small Batch Attention',
    description:
      'Focused cohorts ensure every learner receives individualized mentor guidance and constructive project reviews.',
  },
  {
    title: 'Career-Oriented Training',
    description:
      'From portfolio documentation to interview preparation, our programs are structured to support your next professional chapter.',
  },
];

export const COURSES_DATA: CourseData[] = [
  // COURSE 01 — DIGITAL MARKETING
  {
    id: 'digital-marketing',
    slug: 'course-digital-marketing',
    code: '01',
    title: 'Digital Marketing',
    shortTitle: 'Digital Marketing',
    category: 'marketing',
    heroHeading: 'Master the Craft of Modern',
    heroItalicAccent: 'Digital Growth.',
    shortDescription:
      'Build deep practical fluency across Search Engine Optimization, Social Media Marketing, Content Strategy, Meta Ads, Google Ads, Google Analytics, and end-to-end Campaign Management.',
    heroDescription:
      'An intensive, practice-driven program designed to turn learners into confident digital marketers capable of planning, executing, and measuring full-funnel campaigns.',
    mode: 'Online & Offline Hyderabad',
    durationPlaceholder: 'Cohort Duration — Editable Placeholder',
    level: 'Foundations to Advanced Execution',
    batchSchedule: ['Weekday Batches', 'Weekend Batches'],
    image: BRAND_ASSETS.digitalMarketingImage,
    imageAlt: 'Digital Marketing strategy and campaign analytics workspace',
    imageCaption: 'Module Lab — Campaign Strategy & Analytics',
    overview: [
      'The Digital Marketing program at IND Academy is structured around how modern growth teams plan, launch, and optimize digital campaigns. Rather than studying isolated theory, you will work directly with search engines, ad managers, and analytics dashboards.',
      'From foundational brand positioning and Content Strategy to technical Search Engine Optimization (SEO) and paid acquisition across Meta Ads and Google Ads, every module culminates in a practical project reviewed by experienced mentors.',
    ],
    keyTopics: [
      'Digital Marketing Fundamentals',
      'Search Engine Optimization (SEO)',
      'Social Media Marketing',
      'Content Strategy',
      'Meta Ads',
      'Google Ads',
      'Google Analytics',
      'Campaign Management',
      'Practical Projects',
    ],
    whatYouWillLearnThree: [
      {
        number: '01',
        title: 'Search & Organic Growth Architecture',
        detail:
          'Master Digital Marketing Fundamentals, technical & on-page Search Engine Optimization (SEO), Content Strategy, and Social Media Marketing.',
      },
      {
        number: '02',
        title: 'Paid Media Execution (Meta Ads & Google Ads)',
        detail:
          'Structure, launch, and optimize full-funnel paid campaigns across Meta Ads and Google Ads with disciplined budget and audience architecture.',
      },
      {
        number: '03',
        title: 'Analytics, Attribution & Campaign Management',
        detail:
          'Track conversion funnels in Google Analytics and complete end-to-end Campaign Management through practical portfolio projects.',
      },
    ],
    whereItCanLead: [
      'Digital Marketing Strategist',
      'Performance Marketing Specialist (Meta & Google Ads)',
      'SEO & Organic Growth Specialist',
      'Social Media & Content Marketing Lead',
      'Marketing Analytics & Campaign Coordinator',
    ],
    skillsCovered: [
      {
        title: 'Digital Marketing Fundamentals & Content Strategy',
        description:
          'Understand audience research, funnel architecture, brand messaging, and multi-channel content planning.',
      },
      {
        title: 'Search Engine Optimization (SEO)',
        description:
          'Execute technical site audits, keyword intent mapping, on-page optimization, and authority-building strategies.',
      },
      {
        title: 'Meta Ads & Google Ads Execution',
        description:
          'Structure high-converting paid search, display, and paid social campaigns with disciplined bidding and creative testing.',
      },
      {
        title: 'Google Analytics & Campaign Management',
        description:
          'Set up conversion tracking, attribution reporting, and end-to-end campaign budget optimization.',
      },
    ],
    modules: [
      {
        moduleNumber: '01',
        title: 'Digital Marketing Fundamentals & Content Strategy',
        subtitle: 'Market Research, Funnel Design & Editorial Systems',
        summary:
          'Establish a strong strategic foundation by mapping customer journeys, defining value propositions, and building a cohesive content strategy.',
        topics: [
          'Digital Marketing Fundamentals and modern multi-channel growth ecosystems',
          'Audience persona research, market positioning, and funnel mapping',
          'Content Strategy frameworks for organic discovery and brand authority',
        ],
        deliverable: 'Complete Brand Funnel & Multi-Channel Content Blueprint',
      },
      {
        moduleNumber: '02',
        title: 'Search Engine Optimization (SEO)',
        subtitle: 'Technical Audits, On-Page Architecture & Search Intent',
        summary:
          'Learn how search engines crawl, index, and rank web properties—and how to engineer sustainable organic traffic.',
        topics: [
          'Keyword research, search intent classification, and topic clustering',
          'On-page SEO architecture, metadata, internal linking, and content optimization',
          'Technical SEO fundamentals, site speed, indexing, and search console diagnostics',
        ],
        deliverable: 'Full Technical & On-Page SEO Audit Report',
      },
      {
        moduleNumber: '03',
        title: 'Social Media Marketing & Meta Ads',
        subtitle: 'Organic Community Systems & Paid Social Acquisition',
        summary:
          'Combine organic social storytelling with precision-targeted paid acquisition inside Meta Ads Manager.',
        topics: [
          'Social Media Marketing across Instagram, LinkedIn, and emerging video formats',
          'Meta Ads campaign structure, custom audiences, lookalikes, and pixel tracking',
          'Ad creative testing, copywriting frameworks, and retargeting sequences',
        ],
        deliverable: 'Live-Structured Meta Ads Full-Funnel Campaign Architecture',
      },
      {
        moduleNumber: '04',
        title: 'Google Ads & Paid Search Architecture',
        subtitle: 'High-Intent Search, Display & Video Campaigns',
        summary:
          'Capture high-intent demand through structured Google Search, Display, and YouTube advertising campaigns.',
        topics: [
          'Google Ads account hierarchy, match types, negative keywords, and bidding strategies',
          'Writing high-relevance search ad copy and optimizing Quality Score',
          'Landing page alignment and conversion rate optimization fundamentals',
        ],
        deliverable: 'Google Search & Display Campaign Blueprint',
      },
      {
        moduleNumber: '05',
        title: 'Google Analytics, Campaign Management & Practical Projects',
        subtitle: 'Measurement, Attribution & Capstone Execution',
        summary:
          'Unify every channel through rigorous measurement in Google Analytics and complete your end-to-end practical capstone project.',
        topics: [
          'Google Analytics (GA4) event tracking, custom conversions, and funnel exploration',
          'End-to-end Campaign Management, pacing, reporting, and ROI analysis',
          'Capstone Practical Project presentation and mentor portfolio review',
        ],
        deliverable: 'Integrated Multi-Channel Campaign & GA4 Measurement Dossier',
      },
    ],
    softwareAndTools: [
      {
        name: 'Google Ads',
        category: 'Paid Search & Display',
        usage: 'Search intent capture, keyword bidding, and campaign execution',
      },
      {
        name: 'Meta Ads Manager',
        category: 'Paid Social Advertising',
        usage: 'Audience segmentation, creative testing, and conversion campaigns',
      },
      {
        name: 'Google Analytics',
        category: 'Web & Funnel Analytics',
        usage: 'Traffic attribution, event tracking, and conversion reporting',
      },
      {
        name: 'SEO & Keyword Research Tools',
        category: 'Organic Search Intelligence',
        usage: 'Search volume analysis, technical site audits, and rank tracking',
      },
      {
        name: 'Social Media & Content Platforms',
        category: 'Publishing & Scheduling',
        usage: 'Content calendar management and cross-channel social analytics',
      },
      {
        name: 'Campaign Management Dashboards',
        category: 'Reporting & Attribution',
        usage: 'Performance synthesis and client-ready campaign reporting',
      },
    ],
    realWorldProjects: [
      {
        number: 'Project 01',
        title: 'Technical SEO & Content Growth Architecture',
        scenario:
          'Conduct a comprehensive SEO and content audit for a growing digital brand, identifying technical bottlenecks and mapping a 90-day keyword-driven editorial calendar.',
        toolsUsed: ['SEO Audit Tools', 'Google Analytics', 'Content Strategy Frameworks'],
        outcome:
          'Documented SEO Audit & Search-First Content Strategy Deck.',
      },
      {
        number: 'Project 02',
        title: 'Full-Funnel Meta Ads & Google Ads Acquisition Plan',
        scenario:
          'Design a complete paid acquisition system combining high-intent Google Search campaigns with multi-stage Meta Ads retargeting.',
        toolsUsed: ['Google Ads', 'Meta Ads', 'Campaign Management Sheets'],
        outcome:
          'Complete Ad Account Structure, Creative Briefs & Budget Allocation Model.',
      },
      {
        number: 'Project 03',
        title: 'End-to-End Campaign Management & Analytics Capstone',
        scenario:
          'Build an integrated digital marketing campaign with conversion tracking in Google Analytics, performance KPIs, and optimization playbooks.',
        toolsUsed: ['Google Analytics', 'Meta Ads', 'Google Ads'],
        outcome:
          'Executive Campaign Portfolio Case Study reviewed by mentors.',
      },
    ],
    learningOutcomes: [
      'Plan and execute multi-channel digital marketing strategies from scratch.',
      'Perform technical and on-page Search Engine Optimization (SEO) audits.',
      'Build, manage, and optimize paid campaigns across Meta Ads and Google Ads.',
      'Measure user behavior, attribution, and campaign ROI using Google Analytics.',
      'Graduate with a documented portfolio of practical digital marketing projects.',
    ],
    careerOpportunities: [
      {
        role: 'Digital Marketing Strategist',
        focusArea: 'End-to-end campaign planning & multi-channel growth',
      },
      {
        role: 'Performance Marketing Specialist',
        focusArea: 'Meta Ads, Google Ads & paid acquisition optimization',
      },
      {
        role: 'SEO & Content Marketing Specialist',
        focusArea: 'Organic search visibility, technical SEO & content strategy',
      },
      {
        role: 'Social Media & Brand Manager',
        focusArea: 'Social media marketing, community growth & creative campaigns',
      },
      {
        role: 'Marketing Analytics Coordinator',
        focusArea: 'Google Analytics reporting, funnel tracking & campaign insights',
      },
    ],
    faqs: [
      {
        question: 'Do I need prior marketing experience to join the Digital Marketing program?',
        answer:
          'No prior experience is required. The curriculum begins with Digital Marketing Fundamentals and progressively builds toward advanced SEO, Meta Ads, Google Ads, and Google Analytics execution.',
      },
      {
        question: 'Can I attend this program either Online or Offline?',
        answer:
          'Yes. IND Academy offers the Digital Marketing program in both live interactive Online sessions and in-person Offline classroom sessions at our Ameerpet, Hyderabad center.',
      },
      {
        question: 'Will I work on practical projects during the course?',
        answer:
          'Yes. Every module includes hands-on assignments, and you will complete structured practical projects covering SEO, Content Strategy, Meta Ads, Google Ads, and Campaign Management.',
      },
      {
        question: 'How do I learn about batch timings and enrollment?',
        answer:
          'You can click "Request a callback" or "Enquire Now" to schedule a conversation with an academic counsellor who will walk you through upcoming weekday and weekend batch options.',
      },
    ],
  },

  // COURSE 02 — CODING
  {
    id: 'coding',
    slug: 'course-coding',
    code: '02',
    title: 'Coding',
    shortTitle: 'Coding',
    category: 'coding',
    heroHeading: 'Architect Clean Code &',
    heroItalicAccent: 'Modern Web Systems.',
    shortDescription:
      'Master Programming Fundamentals, HTML, CSS, JavaScript, Python, React, Frontend Development, Backend Fundamentals, and Database Concepts through hands-on software projects.',
    heroDescription:
      'A rigorous, project-driven software development program that takes you from core programming logic to building responsive React applications and Python-backed services.',
    mode: 'Online & Offline Hyderabad',
    durationPlaceholder: 'Cohort Duration — Editable Placeholder',
    level: 'Foundations to Full-Stack Architecture',
    batchSchedule: ['Weekday Batches', 'Weekend Batches'],
    image: BRAND_ASSETS.codingImage,
    imageAlt: 'Software engineering and full-stack coding workstation',
    imageCaption: 'Module Lab — Full-Stack Web & Python Engineering',
    overview: [
      'The Coding program at IND Academy is built on a simple premise: you learn software engineering by writing, debugging, and shipping real code. We start with rock-solid Programming Fundamentals so you understand how computers think before moving into modern web and backend stacks.',
      'Across five structured modules, you will master HTML, CSS, and JavaScript for responsive web interfaces, build component-driven applications with React, and engineer server-side logic with Python, Backend Fundamentals, and Database Concepts.',
    ],
    keyTopics: [
      'Programming Fundamentals',
      'HTML',
      'CSS',
      'JavaScript',
      'Python',
      'React',
      'Frontend Development',
      'Backend Fundamentals',
      'Database Concepts',
      'Practical Projects',
    ],
    whatYouWillLearnThree: [
      {
        number: '01',
        title: 'Programming Logic & Web Standards (HTML, CSS, JS)',
        detail:
          'Build a strong foundation in Programming Fundamentals, semantic HTML, modern responsive CSS, and core JavaScript.',
      },
      {
        number: '02',
        title: 'Modern Frontend Engineering with React',
        detail:
          'Architect modular, state-driven user interfaces using React hooks, routing, and API integration.',
      },
      {
        number: '03',
        title: 'Python, Backend Fundamentals & Databases',
        detail:
          'Write clean Python code, understand Backend Fundamentals, model relational Database Concepts, and ship full-stack practical projects.',
      },
    ],
    whereItCanLead: [
      'Frontend Web Developer (React & JavaScript)',
      'Python Developer',
      'Full-Stack Web Developer',
      'Software Engineering Associate',
      'Web Application Engineer',
    ],
    skillsCovered: [
      {
        title: 'Programming Fundamentals & Problem Solving',
        description:
          'Develop algorithmic thinking, control flow mastery, data structures, and clean code habits.',
      },
      {
        title: 'HTML, CSS & Modern JavaScript',
        description:
          'Build accessible, responsive layouts and interactive browser experiences using ES6+ JavaScript.',
      },
      {
        title: 'React & Frontend Development',
        description:
          'Architect reusable component hierarchies, state management, hooks, and API-connected single-page applications.',
      },
      {
        title: 'Python, Backend Fundamentals & Database Concepts',
        description:
          'Write structured Python programs, design RESTful backend endpoints, and model relational databases.',
      },
    ],
    modules: [
      {
        moduleNumber: '01',
        title: 'Programming Fundamentals & Web Foundations (HTML & CSS)',
        subtitle: 'Computational Thinking, Semantic Markup & Responsive Layout',
        summary:
          'Master core programming logic alongside semantic HTML5 and modern CSS layout engines (Flexbox and Grid).',
        topics: [
          'Programming Fundamentals: variables, data types, conditionals, loops, and functions',
          'Semantic HTML architecture, accessibility standards, and document structure',
          'Modern CSS styling, responsive design systems, Flexbox, and CSS Grid layouts',
        ],
        deliverable: 'Responsive Multi-Page Architectural Web Interface',
      },
      {
        moduleNumber: '02',
        title: 'JavaScript & Interactive Frontend Development',
        subtitle: 'ES6+ Language Mechanics, DOM Manipulation & Async APIs',
        summary:
          'Bring web interfaces to life with deep fluency in modern JavaScript, asynchronous programming, and browser APIs.',
        topics: [
          'Core JavaScript: closures, arrays, objects, destructuring, and ES6+ modules',
          'DOM manipulation, event handling, and dynamic state updates',
          'Asynchronous JavaScript: Promises, async/await, Fetch API, and JSON data handling',
        ],
        deliverable: 'Interactive Data-Driven JavaScript Web Application',
      },
      {
        moduleNumber: '03',
        title: 'React & Modern Component Architecture',
        subtitle: 'Component Design, Hooks, Routing & State Management',
        summary:
          'Transition to industry-standard Frontend Development using React to build fast, modular, maintainable user interfaces.',
        topics: [
          'React fundamentals: JSX, reusable components, props, and unidirectional data flow',
          'State management and lifecycle orchestration with useState, useEffect, and custom hooks',
          'Client-side routing, form validation, and integrating external REST APIs in React',
        ],
        deliverable: 'Production-Ready React Single-Page Application (SPA)',
      },
      {
        moduleNumber: '04',
        title: 'Python Programming & Backend Fundamentals',
        subtitle: 'Pythonic Code, Data Structures & Server-Side Architecture',
        summary:
          'Learn Python from the ground up and understand how backend servers process requests, business logic, and authentication.',
        topics: [
          'Python syntax, data structures (lists, dictionaries, sets), functions, and object-oriented programming',
          'Backend Fundamentals: HTTP protocol, request/response lifecycle, and REST API design',
          'Building server-side endpoints, middleware concepts, and error handling',
        ],
        deliverable: 'Python-Powered Backend Service & REST API',
      },
      {
        moduleNumber: '05',
        title: 'Database Concepts & Full-Stack Practical Projects',
        subtitle: 'Data Modeling, Persistence & Capstone Engineering',
        summary:
          'Connect your frontend and backend skills with relational Database Concepts and ship a complete full-stack capstone application.',
        topics: [
          'Database Concepts: schemas, tables, primary/foreign keys, and querying data',
          'Connecting backend services to persistent databases for CRUD operations',
          'End-to-end Practical Project architecture, code review, and portfolio documentation',
        ],
        deliverable: 'Full-Stack Capstone Application & GitHub Portfolio',
      },
    ],
    softwareAndTools: [
      {
        name: 'HTML5 & CSS3',
        category: 'Web Standards',
        usage: 'Semantic markup and responsive layout architecture',
      },
      {
        name: 'JavaScript (ES6+)',
        category: 'Core Language',
        usage: 'Interactive frontend logic and asynchronous API integration',
      },
      {
        name: 'React',
        category: 'Frontend Library',
        usage: 'Component-based UI engineering and state management',
      },
      {
        name: 'Python',
        category: 'General-Purpose & Backend Language',
        usage: 'Scripting, data structures, and backend server logic',
      },
      {
        name: 'Relational Databases',
        category: 'Database Concepts',
        usage: 'Schema design, SQL fundamentals, and persistent data storage',
      },
      {
        name: 'Git & Modern Code Editors',
        category: 'Developer Workflow',
        usage: 'Version control, debugging, and clean repository management',
      },
    ],
    realWorldProjects: [
      {
        number: 'Project 01',
        title: 'Responsive Editorial & E-Commerce Frontend System',
        scenario:
          'Design and code a pixel-accurate, mobile-responsive web platform using semantic HTML, modern CSS Grid/Flexbox, and vanilla JavaScript.',
        toolsUsed: ['HTML', 'CSS', 'JavaScript'],
        outcome:
          'Deployed Responsive Web Interface with clean, accessible markup.',
      },
      {
        number: 'Project 02',
        title: 'Interactive React Dashboard & Application',
        scenario:
          'Build a multi-view React application featuring dynamic filtering, state management, form validation, and live API integration.',
        toolsUsed: ['React', 'JavaScript', 'Frontend Development'],
        outcome:
          'Modular React Codebase reviewed for component clarity and performance.',
      },
      {
        number: 'Project 03',
        title: 'Full-Stack Python & Database Capstone Project',
        scenario:
          'Architect an end-to-end application combining a React frontend with Python backend endpoints and structured database persistence.',
        toolsUsed: ['Python', 'React', 'Backend Fundamentals', 'Database Concepts'],
        outcome:
          'Complete Full-Stack Portfolio Project with technical documentation.',
      },
    ],
    learningOutcomes: [
      'Write clean, well-structured code grounded in strong Programming Fundamentals.',
      'Build responsive, accessible web interfaces using HTML, CSS, and JavaScript.',
      'Develop modern, component-driven frontend applications using React.',
      'Program in Python and understand core Backend Fundamentals and Database Concepts.',
      'Graduate with a GitHub portfolio of working practical projects.',
    ],
    careerOpportunities: [
      {
        role: 'Frontend Web Developer',
        focusArea: 'React, JavaScript, HTML & CSS user interface engineering',
      },
      {
        role: 'Full-Stack Developer',
        focusArea: 'End-to-end frontend and backend web application development',
      },
      {
        role: 'Python Developer',
        focusArea: 'Python scripting, backend services & data workflows',
      },
      {
        role: 'Software Engineering Associate',
        focusArea: 'Application development, debugging & database integration',
      },
      {
        role: 'Web Application Engineer',
        focusArea: 'Modern SPA architecture and API integration',
      },
    ],
    faqs: [
      {
        question: 'Is this Coding program suitable for complete beginners?',
        answer:
          'Yes. We begin with Programming Fundamentals—teaching you core logic and problem-solving from first principles before advancing into HTML, CSS, JavaScript, Python, and React.',
      },
      {
        question: 'Do I learn both Frontend and Backend concepts?',
        answer:
          'Yes. You will cover Frontend Development with HTML, CSS, JavaScript, and React, as well as Python, Backend Fundamentals, and Database Concepts.',
      },
      {
        question: 'Can I attend classes offline at the Ameerpet campus or online?',
        answer:
          'Both options are available. You can join our live online cohort or attend in-person classroom sessions at our Ameerpet, Hyderabad studio.',
      },
      {
        question: 'What kind of projects will I build?',
        answer:
          'You will build practical coding projects ranging from responsive websites and interactive React applications to Python and database-backed systems.',
      },
    ],
  },

  // COURSE 03 — ARTIFICIAL INTELLIGENCE
  {
    id: 'artificial-intelligence',
    slug: 'course-ai',
    code: '03',
    title: 'Artificial Intelligence',
    shortTitle: 'Artificial Intelligence',
    category: 'ai',
    heroHeading: 'Harness Intelligent Systems &',
    heroItalicAccent: 'AI Workflows.',
    shortDescription:
      'Master AI Fundamentals, Prompt Engineering, AI Productivity Tools, ChatGPT, Gemini, Claude, AI Automation, and Practical AI Applications through real-world projects.',
    heroDescription:
      'A forward-looking, practical program designed to help students and professionals master modern AI platforms, structured prompt engineering, and automated workflows.',
    mode: 'Online & Offline Hyderabad',
    durationPlaceholder: 'Cohort Duration — Editable Placeholder',
    level: 'Foundations to Applied AI Automation',
    batchSchedule: ['Weekday Batches', 'Weekend Batches'],
    image: BRAND_ASSETS.aiImage,
    imageAlt: 'Artificial Intelligence prompt engineering and workflow architecture studio',
    imageCaption: 'Module Lab — Applied AI Systems & Workflow Design',
    overview: [
      'Artificial Intelligence is transforming how modern teams research, write, code, analyze data, and automate operations. The Artificial Intelligence program at IND Academy moves beyond surface-level novelty to teach structured, repeatable mastery of modern AI systems.',
      'You will build a solid grasp of AI Fundamentals, master advanced Prompt Engineering across ChatGPT, Gemini, and Claude, and design end-to-end AI Workflows and AI Automation systems that solve genuine real-world problems.',
    ],
    keyTopics: [
      'AI Fundamentals',
      'Prompt Engineering',
      'AI Productivity Tools',
      'ChatGPT',
      'Gemini',
      'Claude',
      'AI Automation',
      'AI Workflows',
      'Practical AI Applications',
      'Real-World Projects',
    ],
    whatYouWillLearnThree: [
      {
        number: '01',
        title: 'AI Fundamentals & Multi-Model Fluency (ChatGPT, Gemini, Claude)',
        detail:
          'Understand how Large Language Models reason and evaluate the distinct strengths of ChatGPT, Google Gemini, and Anthropic Claude.',
      },
      {
        number: '02',
        title: 'Structured Prompt Engineering & AI Productivity Tools',
        detail:
          'Design deterministic, repeatable prompt architectures and integrate AI Productivity Tools into research, content, and analytical work.',
      },
      {
        number: '03',
        title: 'AI Automation, Workflows & Practical Applications',
        detail:
          'Chain foundation models with everyday business apps to build automated AI Workflows and complete real-world projects.',
      },
    ],
    whereItCanLead: [
      'AI Workflow & Automation Specialist',
      'Prompt Engineer & Applied AI Analyst',
      'AI-Enabled Marketing & Operations Lead',
      'Applied AI Solutions Consultant',
      'Digital Productivity & Process Analyst',
    ],
    skillsCovered: [
      {
        title: 'AI Fundamentals & Model Capabilities',
        description:
          'Understand how Large Language Models and multimodal AI systems process context, tokens, and instructions.',
      },
      {
        title: 'Advanced Prompt Engineering (ChatGPT, Gemini, Claude)',
        description:
          'Apply system prompting, few-shot examples, chain-of-thought reasoning, and structured output schemas.',
      },
      {
        title: 'AI Productivity Tools & Research Synthesis',
        description:
          'Accelerate document analysis, content production, data synthesis, and rapid prototyping.',
      },
      {
        title: 'AI Automation & Multi-Step AI Workflows',
        description:
          'Connect AI models to spreadsheets, documents, and APIs to automate repetitive analytical and operational tasks.',
      },
    ],
    modules: [
      {
        moduleNumber: '01',
        title: 'AI Fundamentals & The Modern Foundation Model Landscape',
        subtitle: 'Understanding LLMs, Multimodal AI & Responsible Deployment',
        summary:
          'Demystify how generative AI works under the hood and compare the strengths of leading foundation models.',
        topics: [
          'AI Fundamentals: generative AI, Large Language Models (LLMs), context windows, and tokens',
          'Comparative architecture and capabilities of ChatGPT, Google Gemini, and Anthropic Claude',
          'Evaluating model accuracy, mitigating hallucinations, and responsible AI practices',
        ],
        deliverable: 'Multi-Model Evaluation & Capability Benchmark Matrix',
      },
      {
        moduleNumber: '02',
        title: 'Advanced Prompt Engineering',
        subtitle: 'System Instructions, Reasoning Frameworks & Structured Outputs',
        summary:
          'Move from casual prompting to engineering reliable, repeatable prompt architectures for complex tasks.',
        topics: [
          'Zero-shot, few-shot, role-based, and constraint-driven Prompt Engineering',
          'Chain-of-thought reasoning, step-by-step decomposition, and self-critique loops',
          'Generating structured outputs (JSON, tables, markdown schemas) for downstream workflows',
        ],
        deliverable: 'Production Prompt Library for Business, Code & Research',
      },
      {
        moduleNumber: '03',
        title: 'Mastering ChatGPT, Gemini, Claude & AI Productivity Tools',
        subtitle: 'Deep Research, Data Analysis & Creative Acceleration',
        summary:
          'Harness the specialized workspaces of ChatGPT, Gemini, and Claude alongside modern AI Productivity Tools.',
        topics: [
          'Advanced workflows in ChatGPT, Google Gemini, and Claude for document and data analysis',
          'Integrating AI Productivity Tools for research synthesis, presentation design, and documentation',
          'Iterative human-in-the-loop editing and quality control standards',
        ],
        deliverable: 'AI-Accelerated Research & Executive Strategy Dossier',
      },
      {
        moduleNumber: '04',
        title: 'AI Workflows & Intelligent AI Automation',
        subtitle: 'Connecting AI Models to Multi-Step Business Processes',
        summary:
          'Design automated pipelines where AI models classify, transform, summarize, and route information automatically.',
        topics: [
          'Mapping manual bottlenecks and designing multi-step AI Workflows',
          'AI Automation fundamentals: triggers, actions, data formatting, and webhook orchestration',
          'Building automated pipelines for lead qualification, content ops, and report generation',
        ],
        deliverable: 'Automated Multi-Step AI Workflow Pipeline',
      },
      {
        moduleNumber: '05',
        title: 'Practical AI Applications & Real-World Capstone',
        subtitle: 'Custom Knowledge Systems & Domain Solutions',
        summary:
          'Architect, test, and present a complete AI-powered workflow or application solving a real industry problem.',
        topics: [
          'Structuring custom AI assistants grounded on organizational knowledge bases',
          'End-to-end solution architecture, testing, and quality assurance',
          'Capstone project demonstration and case study documentation',
        ],
        deliverable: 'Deployed Capstone AI Workflow & Case Study Dossier',
      },
    ],
    softwareAndTools: [
      {
        name: 'ChatGPT',
        category: 'Foundation AI Platform',
        usage: 'Advanced reasoning, custom instructions, structured prompting, and analysis',
      },
      {
        name: 'Google Gemini',
        category: 'Multimodal AI Ecosystem',
        usage: 'Long-context document synthesis, multimodal analysis, and research workflows',
      },
      {
        name: 'Claude',
        category: 'Analytical & Editorial AI',
        usage: 'Nuanced writing, complex instruction following, and artifact generation',
      },
      {
        name: 'AI Productivity Tools',
        category: 'Knowledge & Media Acceleration',
        usage: 'Research synthesis, spreadsheet intelligence, and rapid prototyping',
      },
      {
        name: 'AI Workflow & Automation Platforms',
        category: 'Process Orchestration',
        usage: 'Connecting forms, spreadsheets, emails, and APIs to LLM steps',
      },
      {
        name: 'Prompt Schema & Evaluation Frameworks',
        category: 'Quality Governance',
        usage: 'Designing deterministic JSON/table prompts and verifying accuracy',
      },
    ],
    realWorldProjects: [
      {
        number: 'Project 01',
        title: 'Multi-Model Prompt Architecture & Knowledge Playbook',
        scenario:
          'Engineer a standardized prompt library across ChatGPT, Gemini, and Claude that converts raw research transcripts and data into executive deliverables.',
        toolsUsed: ['ChatGPT', 'Gemini', 'Claude'],
        outcome:
          'Verified Prompt Playbook with reproducible output schemas.',
      },
      {
        number: 'Project 02',
        title: 'Automated Lead Intelligence & Operations Workflow',
        scenario:
          'Build an automated multi-step AI workflow that ingests incoming inquiries, classifies intent, researches context, and prepares structured briefing notes.',
        toolsUsed: ['AI Automation Tools', 'AI Workflows', 'Spreadsheets'],
        outcome:
          'Working end-to-end automation pipeline eliminating manual data entry.',
      },
      {
        number: 'Project 03',
        title: 'Practical AI Domain Solution Capstone',
        scenario:
          'Identify a real bottleneck in marketing, education, customer support, or operations and build a custom AI application or workflow to solve it.',
        toolsUsed: ['ChatGPT', 'Gemini', 'Claude', 'AI Workflows'],
        outcome:
          'Live Capstone Demonstration & Portfolio Case Study.',
      },
    ],
    learningOutcomes: [
      'Understand core AI fundamentals and leverage ChatGPT, Gemini, and Claude with precision.',
      'Engineer deterministic, repeatable prompt systems for complex analytical and creative work.',
      'Use AI productivity tools to accelerate research, data synthesis, and rapid prototyping.',
      'Design and deploy automated multi-step AI workflows connected to everyday business tools.',
      'Graduate with a portfolio of practical AI applications solving real-world problems.',
    ],
    careerOpportunities: [
      {
        role: 'AI Workflow & Automation Specialist',
        focusArea: 'Designing and orchestrating automated AI business pipelines',
      },
      {
        role: 'Prompt Engineer & AI Solutions Analyst',
        focusArea: 'Developing reliable prompt architectures and custom AI assistants',
      },
      {
        role: 'AI-Enabled Marketing & Operations Lead',
        focusArea: 'Integrating AI workflows across content, research, and growth teams',
      },
      {
        role: 'Applied AI Consultant',
        focusArea: 'Auditing organizational bottlenecks and deploying practical AI tools',
      },
      {
        role: 'Product & Productivity Analyst',
        focusArea: 'Rapid prototyping, knowledge synthesis, and process automation',
      },
    ],
    faqs: [
      {
        question: 'Do I need a programming background to join the Artificial Intelligence program?',
        answer:
          'No prior coding experience is required. The curriculum focuses on applied AI—mastering AI Fundamentals, Prompt Engineering, ChatGPT, Gemini, Claude, and practical AI Workflows.',
      },
      {
        question: 'Which AI models and tools will I work with?',
        answer:
          'You will work extensively with ChatGPT, Google Gemini, and Anthropic Claude, alongside modern AI productivity and workflow automation platforms.',
      },
      {
        question: 'Is this program available both Online and Offline?',
        answer:
          'Yes. You can attend physical classroom sessions at our Ameerpet, Hyderabad center or join live interactive online classes.',
      },
      {
        question: 'How can I enquire about upcoming cohorts?',
        answer:
          'Click "Request a callback" or "Enquire Now" to connect with our team for syllabus walkthroughs and batch schedules.',
      },
    ],
  },
  {
    id: 'video-editing',
    slug: 'course-video-editing',
    code: '04',
    title: 'Video Editing',
    shortTitle: 'Video Editing',
    category: 'video',
    heroHeading: 'Master Professional',
    heroItalicAccent: 'Video Editing & Motion.',
    shortDescription:
      'Learn end-to-end video post-production, motion graphics, and visual design using Adobe Premiere Pro, Adobe After Effects, and Adobe Photoshop.',
    heroDescription:
      'From narrative timeline assembly and color grading in Adobe Premiere Pro to kinetic typography and visual effects in Adobe After Effects, plus thumbnail and graphic compositing in Adobe Photoshop—build a showreel ready for modern media teams.',
    mode: 'Online & Offline',
    durationPlaceholder: 'Flexible Cohort Schedule',
    level: 'Beginner to Advanced',
    batchSchedule: [
      'Weekday Studio Cohort (Online & Offline Hyderabad)',
      'Weekend Practical Batch',
      'Evening Creator & Post-Production Track',
    ],
    image: BRAND_ASSETS.videoEditingImage,
    imageAlt: 'IND Academy Video Editing & Motion Graphics Studio',
    imageCaption:
      'Timeline assembly, motion graphics & visual compositing with Premiere Pro, After Effects & Photoshop',
    overview: [
      'The Video Editing program at IND Academy trains you in the complete creative post-production pipeline used by digital media houses, commercial studios, and high-growth creator teams.',
      'You will master non-linear editing in Adobe Premiere Pro, dynamic motion graphics and compositing in Adobe After Effects, and high-impact visual design and retouching in Adobe Photoshop.',
    ],
    keyTopics: [
      'Adobe Premiere Pro',
      'Adobe After Effects',
      'Adobe Photoshop',
      'Timeline Editing & Pacing',
      'Motion Graphics & Kinetic Typography',
      'Color Grading & Audio Mixing',
      'Thumbnail & Visual Asset Design',
      'Commercial & Social Media Reels',
    ],
    whatYouWillLearnThree: [
      {
        number: '01',
        title: 'Adobe Premiere Pro & Narrative Editing',
        detail:
          'Master multi-cam cutting, pacing, transitions, Lumetri color grading, and clean audio mixing for long-form and short-form video.',
      },
      {
        number: '02',
        title: 'Adobe After Effects & Motion Graphics',
        detail:
          'Animate keyframe-driven motion graphics, lower thirds, kinetic typography, green-screen keying, and visual effects.',
      },
      {
        number: '03',
        title: 'Adobe Photoshop & Visual Compositing',
        detail:
          'Design custom storyboards, layered graphics, matte assets, and high-converting thumbnails that integrate seamlessly into your video timelines.',
      },
    ],
    whereItCanLead: [
      'Video Editor',
      'Motion Graphics Artist',
      'Post-Production Specialist',
      'Multimedia & Visual Designer',
      'Social Video & Commercial Producer',
    ],
    skillsCovered: [
      {
        title: 'Adobe Premiere Pro Mastery',
        description:
          'Non-linear timeline workflows, proxy setup, rhythm and pacing, multi-cam editing, audio sweetening, and Lumetri color correction.',
      },
      {
        title: 'Adobe After Effects & Motion Design',
        description:
          '2D/2.5D animation, graph editor easing, kinetic typography, logo reveals, motion tracking, and rotoscoping.',
      },
      {
        title: 'Adobe Photoshop for Video & Media',
        description:
          'Layer masking, color manipulation, typography composition, poster/thumbnail creation, and preparing layered PSD assets for animation.',
      },
      {
        title: 'Showreel & Multi-Format Delivery',
        description:
          'Exporting broadcast-ready commercials, YouTube documentaries, and high-retention vertical reels with proper codecs.',
      },
    ],
    modules: [
      {
        moduleNumber: '01',
        title: 'Visual Design & Asset Preparation in Adobe Photoshop',
        subtitle: 'Composition, Masking, Retouching & Thumbnail Architecture',
        summary:
          'Build a strong visual foundation in Adobe Photoshop by designing storyboards, layered graphic assets, and high-impact thumbnails.',
        topics: [
          'Photoshop workspace, non-destructive layers, smart objects, and precision masking',
          'Typography hierarchy, color harmony, and lighting adjustments for visual storytelling',
          'Preparing multi-layered PSD files for seamless import into Premiere Pro and After Effects',
        ],
        deliverable: 'Complete Brand Graphic Pack & High-CTR Thumbnail Series',
      },
      {
        moduleNumber: '02',
        title: 'Non-Linear Video Editing in Adobe Premiere Pro',
        subtitle: 'Timeline Mastery, Story Pacing & Multi-Cam Workflows',
        summary:
          'Master the core craft of video editing in Adobe Premiere Pro—from ingesting raw footage to assembling compelling narratives.',
        topics: [
          'Project organization, proxy workflows, three-point editing, and J/L cuts',
          'Pacing, rhythm, b-roll integration, and dynamic transitions for commercial and digital video',
          'Multi-camera synchronization and interview/podcast editing workflows',
        ],
        deliverable: 'Multi-Cam Documentary & Brand Story Edit',
      },
      {
        moduleNumber: '03',
        title: 'Color Grading & Sound Design in Premiere Pro',
        subtitle: 'Lumetri Color Scopes, Look Development & Audio Mixing',
        summary:
          'Elevate production value with cinematic color grading and balanced, studio-grade audio mixing.',
        topics: [
          'Reading waveform and vectorscope monitors for accurate exposure and white balance',
          'Creative look development, secondary color correction, and skin-tone preservation',
          'Dialogue cleanup, EQ, compression, sound effects layering, and music ducking',
        ],
        deliverable: 'Color-Graded & Audio-Mastered Commercial Spot',
      },
      {
        moduleNumber: '04',
        title: 'Motion Graphics & Visual Effects in Adobe After Effects',
        subtitle: 'Keyframes, Graph Editor, Kinetic Type & Compositing',
        summary:
          'Bring static designs to life using Adobe After Effects to create smooth animations, titles, and visual effects.',
        topics: [
          'Compositions, shape layers, pre-comps, and mastering the Speed/Value Graph Editor',
          'Kinetic typography, animated lower thirds, and custom brand logo stingers',
          'Green-screen chroma keying, motion tracking, masking, and Dynamic Link with Premiere Pro',
        ],
        deliverable: 'Animated Motion Graphics Package & VFX Sequence',
      },
      {
        moduleNumber: '05',
        title: 'Commercial Showreel & Multi-Platform Capstone',
        subtitle: 'Portfolio Packaging, Client Brief Execution & Delivery Specs',
        summary:
          'Combine Premiere Pro, After Effects, and Photoshop to produce a complete showreel ready for industry pitches and placements.',
        topics: [
          'Executing end-to-end video briefs across horizontal (16:9) and vertical (9:16) formats',
          'Media Encoder export settings, bitrate optimization, and delivery standards',
          'Curating and presenting a professional Video Editing & Motion Graphics Showreel',
        ],
        deliverable: 'Graduating Video Editing & Motion Design Showreel',
      },
    ],
    softwareAndTools: [
      {
        name: 'Adobe Premiere Pro',
        category: 'Non-Linear Video Editing',
        usage: 'Timeline cutting, multi-cam assembly, Lumetri color grading, and audio mixing',
      },
      {
        name: 'Adobe After Effects',
        category: 'Motion Graphics & VFX',
        usage: '2D/2.5D animation, kinetic typography, visual effects, and motion tracking',
      },
      {
        name: 'Adobe Photoshop',
        category: 'Visual Design & Compositing',
        usage: 'Graphic asset preparation, layer masking, retouching, and thumbnail design',
      },
    ],
    realWorldProjects: [
      {
        number: 'Project 01',
        title: 'High-Retention Brand Commercial & Social Reel Suite',
        scenario:
          'Cut a 60-second flagship brand film and three 30-second vertical social reels in Adobe Premiere Pro with custom sound design and color grading.',
        toolsUsed: ['Adobe Premiere Pro', 'Adobe Photoshop'],
        outcome:
          'Broadcast-ready 16:9 and 9:16 video deliverables with custom thumbnails.',
      },
      {
        number: 'Project 02',
        title: 'Animated Explainer & Broadcast Motion Graphics Pack',
        scenario:
          'Design layered visual assets in Adobe Photoshop and animate a complete title sequence, lower-thirds system, and product explainer in Adobe After Effects.',
        toolsUsed: ['Adobe After Effects', 'Adobe Photoshop'],
        outcome:
          'Reusable motion graphics templates and animated brand sequence.',
      },
      {
        number: 'Project 03',
        title: 'Complete Post-Production Showreel Capstone',
        scenario:
          'Integrate Premiere Pro editing, After Effects motion compositing, and Photoshop visual direction into a cohesive 90-second professional showreel.',
        toolsUsed: [
          'Adobe Premiere Pro',
          'Adobe After Effects',
          'Adobe Photoshop',
        ],
        outcome:
          'Industry-Reviewed Showreel & Post-Production Case Study.',
      },
    ],
    learningOutcomes: [
      'Edit professional long-form and short-form videos with precision in Adobe Premiere Pro.',
      'Create smooth motion graphics, kinetic typography, and visual effects in Adobe After Effects.',
      'Design high-converting thumbnails, posters, and layered graphic assets in Adobe Photoshop.',
      'Perform accurate color correction, cinematic grading, and studio-quality audio mixing.',
      'Graduate with a polished Video Editing and Motion Graphics showreel.',
    ],
    careerOpportunities: [
      {
        role: 'Video Editor',
        focusArea: 'Narrative assembly, commercial cutting, and digital video production',
      },
      {
        role: 'Motion Graphics Designer',
        focusArea: 'Animated titles, explainers, and visual effects in After Effects',
      },
      {
        role: 'Post-Production Specialist',
        focusArea: 'End-to-end editing, color grading, and multi-format media delivery',
      },
      {
        role: 'Visual & Thumbnail Designer',
        focusArea: 'High-impact digital graphics, compositing, and creative assets in Photoshop',
      },
    ],
    faqs: [
      {
        question: 'Which software tools are taught in the Video Editing program?',
        answer:
          'You will receive hands-on training in Adobe Premiere Pro for video editing, Adobe After Effects for motion graphics and visual effects, and Adobe Photoshop for graphic design and asset preparation.',
      },
      {
        question: 'Do I need prior editing experience to join?',
        answer:
          'No prior experience is required. We start from workspace fundamentals in Photoshop, Premiere Pro, and After Effects and progress step by step to advanced commercial workflows.',
      },
      {
        question: 'Is this program available both Online and Offline?',
        answer:
          'Yes. You can attend in-person studio sessions at our Ameerpet, Hyderabad campus or join live interactive online classes.',
      },
      {
        question: 'Will I build a portfolio or showreel during the course?',
        answer:
          'Yes. Every module includes practical editing and motion projects, culminating in a complete professional showreel reviewed by mentors.',
      },
    ],
  },
];

export interface ContactConfig {
  phonePrimary: string;
  phoneSecondary: string;
  emailAdmissions: string;
  emailGeneral: string;
  officeTitle: string;
  officeAddressLine1: string;
  officeAddressLine2: string;
  officeHours: string;
  mapEmbedQuery: string;
  socialLinks: {
    instagram: string;
    linkedin: string;
    youtube: string;
    x: string;
  };
}

export const DEFAULT_CONTACT_CONFIG: ContactConfig = {
  phonePrimary: '072860 42944',
  phoneSecondary: '+91 72860 42944',
  emailAdmissions: 'Admissions@brightlume.agency',
  emailGeneral: 'Contact@GreatBrightlume.agency',
  officeTitle:
    'IND Academy — An EdTech Initiative by Brightlume Digital Media Private Limited',
  officeAddressLine1:
    'Lal Bungalow, H. No. 7-1-28/12/1, 1st Floor, above Naturals',
  officeAddressLine2: 'Ameerpet, Hyderabad, Telangana 500016',
  officeHours: 'Monday – Saturday · 9:30 AM to 7:30 PM IST',
  mapEmbedQuery: 'Lal+Bungalow,Ameerpet,Hyderabad,Telangana+500016',
  socialLinks: {
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
    x: 'https://x.com',
  },
};
