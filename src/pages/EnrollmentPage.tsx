import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { COURSES_DATA, ContactConfig, PageId } from '../data/siteData';
import {
  HairlineDivider,
  ParallaxBackdropText,
  ScrollRevealBlock,
  EditorialRevealTitle,
} from '../components/MotionPrimitives';

export interface EnquirySubmission {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  courseId: string;
  learningMode: string;
  preferredBatch: string;
  message: string;
  submittedAt: string;
}

interface EnrollmentPageProps {
  preselectedCourseId?: string;
  onNavigate: (page: PageId, courseId?: string) => void;
  contactConfig: ContactConfig;
}

export const EnrollmentPage: React.FC<EnrollmentPageProps> = ({
  preselectedCourseId,
  onNavigate,
  contactConfig,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [courseId, setCourseId] = useState(
    preselectedCourseId || COURSES_DATA[0].id
  );
  const [learningMode, setLearningMode] = useState('Offline Classroom (Ameerpet)');
  const [preferredBatch, setPreferredBatch] = useState('Upcoming Weekday Cohort');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<EnquirySubmission | null>(
    null
  );

  const selectedCourse =
    COURSES_DATA.find((c) => c.id === courseId || c.slug === courseId) ||
    COURSES_DATA[0];

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      nextErrors.phone = 'Please enter a valid 10-digit phone number.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!courseId) {
      nextErrors.courseId = 'Please select a course track.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const submission: EnquirySubmission = {
      id: `IND-${Date.now().toString().slice(-6)}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      courseId: selectedCourse.id,
      learningMode,
      preferredBatch,
      message: message.trim(),
      submittedAt: new Date().toLocaleString(),
    };

    setSubmittedData(submission);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#171717]">
      {/* Header */}
      <section className="relative pt-10 pb-12 md:pt-32 md:pb-24 bg-[#F8F6F0] border-b border-[#E7E2D8] overflow-hidden">
        <ParallaxBackdropText
          text="ADMISSIONS"
          direction="left"
          className="absolute top-12 right-0"
        />
        <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="w-6 md:w-8 h-[1px] bg-[#A98747]" />
              <span className="small-gold-label text-[#A98747]">
                Admissions & Cohort Registration
              </span>
            </div>
            <EditorialRevealTitle
              as="h1"
              className="hero-h1-clamp text-[#171717] mb-4 md:mb-6"
              segments={[
                { text: "Let's" },
                { text: 'Begin', goldOnLight: true },
                { text: 'Your Learning' },
                { text: 'Journey.', goldOnLight: true },
              ]}
            />
            <p className="text-[15.5px] md:text-[17px] text-[#57554F] font-normal leading-[1.6] md:leading-[1.65]">
              Submit your application details below to schedule a 1-on-1 curriculum counseling session, request the detailed syllabus PDF, or reserve a free demo class seat.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Left Column: Form or Confirmation */}
            <div className="lg:col-span-7">
              {submittedData ? (
                <ScrollRevealBlock className="bg-[#FFFFFF] border border-[#C6A15B] rounded-2xl p-6 md:p-12 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#171717] text-[#C6A15B] flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="small-gold-label text-[#A98747] block mb-2">
                    Enquiry Reference · {submittedData.id}
                  </span>
                  <h2 className="font-display-serif text-3xl md:text-4xl font-medium text-[#171717] mb-4">
                    Thank You, {submittedData.fullName}.
                  </h2>
                  <p className="text-[15.5px] md:text-[17px] text-[#57554F] font-normal leading-[1.6] md:leading-[1.65] mb-8">
                    Your admission enquiry for{' '}
                    <span className="font-semibold text-[#171717]">
                      {selectedCourse.title}
                    </span>{' '}
                    has been recorded. Our academic admissions advisor will reach out to you on{' '}
                    <span className="font-semibold text-[#171717]">
                      {submittedData.phone}
                    </span>{' '}
                    to share the syllabus walkthrough and upcoming batch schedule.
                  </p>

                  <div className="p-5 md:p-6 rounded-xl bg-[#F8F6F0] border border-[#E7E2D8] grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm">
                    <div>
                      <p className="text-xs text-[#8B8983] uppercase tracking-wider mb-1">
                        Selected Track
                      </p>
                      <p className="font-semibold text-[#171717]">
                        {selectedCourse.code} · {selectedCourse.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#8B8983] uppercase tracking-wider mb-1">
                        Learning Mode
                      </p>
                      <p className="font-semibold text-[#171717]">
                        {submittedData.learningMode}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#8B8983] uppercase tracking-wider mb-1">
                        Preferred Batch
                      </p>
                      <p className="font-semibold text-[#171717]">
                        {submittedData.preferredBatch}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#8B8983] uppercase tracking-wider mb-1">
                        Email Address
                      </p>
                      <p className="font-semibold text-[#171717]">
                        {submittedData.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                    <button
                      onClick={() => onNavigate(selectedCourse.slug)}
                      className="min-h-[46px] px-6 py-3.5 rounded-lg bg-[#171717] text-[#F8F6F0] font-semibold text-xs uppercase tracking-[0.14em] hover:bg-[#C6A15B] hover:text-[#171717] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Review {selectedCourse.title} Syllabus</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSubmittedData(null)}
                      className="min-h-[46px] px-6 py-3.5 rounded-lg border border-[#E7E2D8] hover:border-[#171717] text-[#171717] font-semibold text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </ScrollRevealBlock>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-[#FFFFFF] border border-[#E7E2D8] rounded-2xl p-6 md:p-12 space-y-5 md:space-y-6"
                >
                  <div className="border-b border-[#E7E2D8] pb-5 md:pb-6">
                    <span className="small-gold-label text-[#A98747] block mb-2">
                      Step 01 · Candidate Details
                    </span>
                    <h2 className="font-display-serif text-2xl md:text-3xl font-medium text-[#171717]">
                      Course Application & Callback Form
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#171717] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full min-h-[48px] px-4 py-3.5 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] focus:border-[#C6A15B] focus:bg-[#FFFFFF] focus:outline-none text-sm text-[#171717] transition-colors"
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 text-xs text-red-600 font-medium">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#171717] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full min-h-[48px] px-4 py-3.5 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] focus:border-[#C6A15B] focus:bg-[#FFFFFF] focus:outline-none text-sm text-[#171717] transition-colors"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-red-600 font-medium">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#171717] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full min-h-[48px] px-4 py-3.5 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] focus:border-[#C6A15B] focus:bg-[#FFFFFF] focus:outline-none text-sm text-[#171717] transition-colors"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#171717] mb-2">
                        Select Course *
                      </label>
                      <select
                        value={selectedCourse.id}
                        onChange={(e) => setCourseId(e.target.value)}
                        className="w-full min-h-[48px] px-4 py-3.5 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] focus:border-[#C6A15B] focus:bg-[#FFFFFF] focus:outline-none text-sm text-[#171717] transition-colors"
                      >
                        {COURSES_DATA.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.code} — {course.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#171717] mb-2">
                        Learning Mode
                      </label>
                      <select
                        value={learningMode}
                        onChange={(e) => setLearningMode(e.target.value)}
                        className="w-full min-h-[48px] px-4 py-3.5 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] focus:border-[#C6A15B] focus:bg-[#FFFFFF] focus:outline-none text-sm text-[#171717] transition-colors"
                      >
                        <option value="Offline Classroom (Ameerpet)">
                          Offline Classroom (Ameerpet)
                        </option>
                        <option value="Live Online Cohort">
                          Live Online Cohort
                        </option>
                        <option value="Hybrid Mentorship">
                          Hybrid Mentorship
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#171717] mb-2">
                        Preferred Batch
                      </label>
                      <select
                        value={preferredBatch}
                        onChange={(e) => setPreferredBatch(e.target.value)}
                        className="w-full min-h-[48px] px-4 py-3.5 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] focus:border-[#C6A15B] focus:bg-[#FFFFFF] focus:outline-none text-sm text-[#171717] transition-colors"
                      >
                        <option value="Upcoming Weekday Cohort">
                          Upcoming Weekday Cohort
                        </option>
                        <option value="Weekend Intensive Batch">
                          Weekend Intensive Batch
                        </option>
                        <option value="Evening Practitioner Track">
                          Evening Practitioner Track
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#171717] mb-2">
                      Message / Current Background (Optional)
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your current background, learning goals, or specific syllabus questions..."
                      className="w-full px-4 py-3.5 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] focus:border-[#C6A15B] focus:bg-[#FFFFFF] focus:outline-none text-sm text-[#171717] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-[#8B8983]">
                      <ShieldCheck className="w-4 h-4 text-[#A98747] shrink-0" />
                      <span>
                        Direct academic counseling · No spam or automated sales calls
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto min-h-[48px] px-8 py-4 rounded-lg bg-[#171717] text-[#F8F6F0] font-semibold text-xs uppercase tracking-[0.14em] hover:bg-[#C6A15B] hover:text-[#171717] transition-colors inline-flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      <span>Submit Application Enquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Selected Program Summary & Direct Admissions Contact */}
            <div className="lg:col-span-5 space-y-5 md:space-y-6">
              <div className="bg-[#171717] text-[#F8F6F0] rounded-2xl p-6 md:p-10 border border-[#2C2C2C]">
                <span className="small-gold-label text-[#C6A15B] block mb-3">
                  Selected Track Preview · {selectedCourse.code}
                </span>
                <h3 className="font-display-serif text-2xl md:text-3xl font-medium text-[#F8F6F0] mb-3">
                  {selectedCourse.title}
                </h3>
                <p className="text-sm text-[#B8B5AD] font-normal leading-relaxed mb-6">
                  {selectedCourse.shortDescription}
                </p>

                <HairlineDivider dark className="mb-6" />

                <div className="space-y-3 mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#C6A15B]">
                    Core Syllabus Modules ({selectedCourse.modules.length})
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedCourse.modules.slice(0, 6).map((mod) => (
                      <div
                        key={mod.moduleNumber}
                        className="flex items-center gap-2.5 text-xs text-[#E7E2D8]"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                        <span>
                          {mod.moduleNumber}. {mod.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onNavigate(selectedCourse.slug)}
                  className="w-full min-h-[46px] py-3.5 px-5 rounded-lg border border-[#333333] hover:border-[#C6A15B] text-xs font-semibold uppercase tracking-[0.14em] text-[#F8F6F0] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Inspect Full {selectedCourse.title} Curriculum</span>
                  <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
                </button>
              </div>

              <div className="bg-[#FFFFFF] border border-[#E7E2D8] rounded-2xl p-6 md:p-8 space-y-5">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#A98747]" />
                  <span className="small-gold-label text-[#A98747]">
                    Direct Admissions Desk
                  </span>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#A98747] mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-[#8B8983] uppercase tracking-wider">
                        Phone / WhatsApp Counseling
                      </p>
                      <a
                        href={`tel:${contactConfig.phonePrimary.replace(/\s+/g, '')}`}
                        className="font-semibold text-[#171717] hover:text-[#A98747] transition-colors"
                      >
                        {contactConfig.phonePrimary}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#A98747] mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-[#8B8983] uppercase tracking-wider">
                        Admissions Email
                      </p>
                      <a
                        href={`mailto:${contactConfig.emailAdmissions}`}
                        className="font-semibold text-[#171717] hover:text-[#A98747] transition-colors"
                      >
                        {contactConfig.emailAdmissions}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#A98747] mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-[#8B8983] uppercase tracking-wider">
                        Campus Location
                      </p>
                      <p className="text-[#57554F] leading-relaxed">
                        {contactConfig.officeAddressLine1},{' '}
                        {contactConfig.officeAddressLine2}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
