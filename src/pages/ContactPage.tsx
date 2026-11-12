import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Globe,
} from 'lucide-react';
import { ContactConfig, PageId } from '../data/siteData';
import {
  ParallaxBackdropText,
  ScrollRevealBlock,
  EditorialRevealTitle,
} from '../components/MotionPrimitives';

interface ContactPageProps {
  contactConfig: ContactConfig;
  onUpdateContactConfig?: (next: ContactConfig) => void;
  onNavigate: (page: PageId, courseId?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  contactConfig,
  onNavigate,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Program Syllabus & Batch Inquiry');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError('Please fill in your name, email, and message.');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    contactConfig.mapEmbedQuery
  )}&output=embed`;

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#171717]">
      {/* Hero */}
      <section className="relative pt-10 pb-12 md:pt-32 md:pb-24 bg-[#F8F6F0] border-b border-[#E7E2D8] overflow-hidden">
        <ParallaxBackdropText
          text="CONTACT"
          direction="left"
          className="absolute top-12 right-0"
        />
        <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <span className="w-6 md:w-8 h-[1px] bg-[#A98747]" />
              <span className="small-gold-label text-[#A98747]">
                Campus &amp; Admissions Desk · Hyderabad
              </span>
            </div>
            <EditorialRevealTitle
              as="h1"
              className="hero-h1-clamp text-[#171717] mb-4 md:mb-6"
              segments={[
                { text: "We'd" },
                { text: 'Love', goldOnLight: true },
                { text: 'to' },
                { text: 'Hear', goldOnLight: true },
                { text: 'From You.' },
              ]}
            />
            <p className="text-[15.5px] md:text-[17px] text-[#57554F] font-normal leading-[1.6] md:leading-[1.65]">
              Visit our Ameerpet campus for an in-person studio tour, speak with
              an academic advisor, or send us a direct message below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards + Message Form */}
      <section className="py-12 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-5 md:space-y-6">
              <ScrollRevealBlock className="bg-[#FFFFFF] border border-[#E7E2D8] rounded-2xl p-6 md:p-8 space-y-5 md:space-y-6">
                <span className="small-gold-label text-[#A98747] block">
                  Direct Channels
                </span>
                <h2 className="font-display-serif text-2xl md:text-3xl font-medium text-[#171717]">
                  IND Academy Campus &amp; Counseling
                </h2>

                <div className="space-y-4 md:space-y-5 pt-1 md:pt-2">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] flex items-center justify-center text-[#A98747] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#8B8983] mb-1">
                        Admissions &amp; Counseling Phone
                      </p>
                      <a
                        href={`tel:${contactConfig.phonePrimary.replace(/\s+/g, '')}`}
                        className="text-base font-semibold text-[#171717] hover:text-[#A98747] transition-colors"
                      >
                        {contactConfig.phonePrimary}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] flex items-center justify-center text-[#A98747] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#8B8983] mb-1">
                        Email Addresses
                      </p>
                      <p className="text-sm font-semibold text-[#171717]">
                        <a
                          href={`mailto:${contactConfig.emailAdmissions}`}
                          className="hover:text-[#A98747] transition-colors"
                        >
                          {contactConfig.emailAdmissions}
                        </a>
                      </p>
                      <p className="text-sm text-[#57554F] mt-0.5">
                        <a
                          href={`mailto:${contactConfig.emailGeneral}`}
                          className="hover:text-[#A98747] transition-colors"
                        >
                          {contactConfig.emailGeneral}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] flex items-center justify-center text-[#A98747] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#8B8983] mb-1">
                        Campus Address
                      </p>
                      <p className="text-sm text-[#171717] leading-relaxed">
                        {contactConfig.officeAddressLine1},{' '}
                        {contactConfig.officeAddressLine2}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] flex items-center justify-center text-[#A98747] shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#8B8983] mb-1">
                        Visiting Hours
                      </p>
                      <p className="text-sm text-[#57554F]">
                        {contactConfig.officeHours}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-5 md:pt-6 border-t border-[#E7E2D8]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#8B8983] mb-3 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#A98747]" />
                    <span>Official Social Profiles</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        label: 'Instagram',
                        value: contactConfig.socialLinks.instagram,
                      },
                      {
                        label: 'LinkedIn',
                        value: contactConfig.socialLinks.linkedin,
                      },
                      {
                        label: 'YouTube',
                        value: contactConfig.socialLinks.youtube,
                      },
                    ].map((soc) => (
                      <a
                        key={soc.label}
                        href={soc.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] hover:border-[#C6A15B] text-xs font-medium text-[#57554F] transition-colors"
                      >
                        {soc.label}
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollRevealBlock>

              {/* Map Embed */}
              <div className="bg-[#FFFFFF] border border-[#E7E2D8] rounded-2xl overflow-hidden">
                <div className="px-5 md:px-6 py-3.5 md:py-4 border-b border-[#E7E2D8] flex items-center justify-between">
                  <span className="small-gold-label text-[#A98747]">
                    Campus Location Map · Ameerpet, Hyderabad
                  </span>
                </div>
                <div className="aspect-[16/10] w-full bg-[#EFECE4]">
                  <iframe
                    title="IND Academy Ameerpet Campus Map"
                    src={mapSrc}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <ScrollRevealBlock className="bg-[#FFFFFF] border border-[#C6A15B] rounded-2xl p-6 md:p-12">
                  <div className="w-12 h-12 rounded-xl bg-[#171717] text-[#C6A15B] flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="small-gold-label text-[#A98747] block mb-2">
                    Message Received
                  </span>
                  <h3 className="font-display-serif text-3xl font-medium text-[#171717] mb-3">
                    Thank You for Reaching Out, {name}.
                  </h3>
                  <p className="text-[15.5px] md:text-[17px] text-[#57554F] font-normal leading-[1.6] md:leading-[1.65] mb-8">
                    Our team has received your inquiry regarding{' '}
                    <span className="font-semibold text-[#171717]">
                      {subject}
                    </span>{' '}
                    and will respond to{' '}
                    <span className="font-semibold text-[#171717]">{email}</span>.
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setPhone('');
                        setMessage('');
                      }}
                      className="min-h-[46px] px-6 py-3.5 rounded-lg bg-[#171717] text-[#F8F6F0] text-xs font-semibold uppercase tracking-[0.14em] hover:bg-[#C6A15B] hover:text-[#171717] transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <button
                      onClick={() => onNavigate('catalogue')}
                      className="min-h-[46px] px-6 py-3.5 rounded-lg border border-[#E7E2D8] hover:border-[#171717] text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] transition-colors cursor-pointer"
                    >
                      Browse Programs
                    </button>
                  </div>
                </ScrollRevealBlock>
              ) : (
                <form
                  onSubmit={handleContactSubmit}
                  noValidate
                  className="bg-[#FFFFFF] border border-[#E7E2D8] rounded-2xl p-6 md:p-12 space-y-5 md:space-y-6"
                >
                  <div className="border-b border-[#E7E2D8] pb-5 md:pb-6">
                    <span className="small-gold-label text-[#A98747] block mb-2">
                      Direct Inquiry Form
                    </span>
                    <h2 className="font-display-serif text-2xl md:text-3xl font-medium text-[#171717]">
                      Send a Message to IND Academy
                    </h2>
                  </div>

                  {formError && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#171717] mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        className="w-full min-h-[48px] px-4 py-3.5 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] focus:border-[#C6A15B] focus:bg-[#FFFFFF] focus:outline-none text-sm"
                      />
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
                        className="w-full min-h-[48px] px-4 py-3.5 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] focus:border-[#C6A15B] focus:bg-[#FFFFFF] focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#171717] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full min-h-[48px] px-4 py-3.5 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] focus:border-[#C6A15B] focus:bg-[#FFFFFF] focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#171717] mb-2">
                        Inquiry Topic
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full min-h-[48px] px-4 py-3.5 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] focus:border-[#C6A15B] focus:bg-[#FFFFFF] focus:outline-none text-sm"
                      >
                        <option value="Program Syllabus & Batch Inquiry">
                          Program Syllabus &amp; Batch Inquiry
                        </option>
                        <option value="Campus Visit & Demo Session">
                          Campus Visit &amp; Demo Session
                        </option>
                        <option value="Corporate / Institutional Training">
                          Corporate / Institutional Training
                        </option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#171717] mb-2">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can our academic advisors help you?"
                      className="w-full px-4 py-3.5 rounded-lg bg-[#F8F6F0] border border-[#E7E2D8] focus:border-[#C6A15B] focus:bg-[#FFFFFF] focus:outline-none text-sm resize-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto min-h-[48px] px-8 py-4 rounded-lg bg-[#171717] text-[#F8F6F0] font-semibold text-xs uppercase tracking-[0.14em] hover:bg-[#C6A15B] hover:text-[#171717] transition-colors inline-flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
