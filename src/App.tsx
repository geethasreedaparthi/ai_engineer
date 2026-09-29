import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Code2,
  Play,
  Sun,
  Moon,
  Menu,
  X,
  Copy,
  Check,
  SlidersHorizontal,
  Plus,
  Trash2,
} from 'lucide-react';
import {
  DEFAULT_PROFILE,
  PortfolioProfile,
  SKILL_CATEGORIES,
  PROJECTS,
  ProjectItem,
  INITIAL_HACKATHON_ENTRIES,
  HackathonEntry,
  CURRENTLY_LEARNING,
  FUTURE_GOALS,
} from './data/portfolioData';
import { ProjectInteractiveModal } from './components/ProjectInteractiveModal';
import { PlaceholderCustomizerModal } from './components/PlaceholderCustomizerModal';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<PortfolioProfile>(DEFAULT_PROFILE);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);

  // Hero code workbench selector
  const [selectedHeroProjectIndex, setSelectedHeroProjectIndex] = useState<number>(0);

  // Skills filter state
  const [skillFilter, setSkillFilter] = useState<'all' | 'programming' | 'web' | 'ai' | 'other'>('all');

  // Project interactive modal state
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Hackathons & Ideathons list state (allows adding future achievement placeholders)
  const [hackathonEntries, setHackathonEntries] = useState<HackathonEntry[]>(INITIAL_HACKATHON_ENTRIES);
  const [isAddingEvent, setIsAddingEvent] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>('[Hackathon Name]');
  const [newEventCategory, setNewEventCategory] = useState<string>('Hackathon / Ideathon');
  const [newEventDate, setNewEventDate] = useState<string>('[Date]');
  const [newEventRole, setNewEventRole] = useState<string>('[Achievement / Role]');
  const [newEventSummary, setNewEventSummary] = useState<string>(
    'Participated in collaborative ideation and technical problem-solving with fellow students.'
  );

  // Contact copy feedback & quick message composer
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [senderName, setSenderName] = useState<string>('');
  const [senderSubject, setSenderSubject] = useState<string>('Hackathon Collaboration / Project Connect');
  const [senderMessage, setSenderMessage] = useState<string>('');
  const [messageStatus, setMessageStatus] = useState<string | null>(null);

  const handleCopyText = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddHackathonEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const created: HackathonEntry = {
      id: `entry-${Date.now()}`,
      eventTitlePlaceholder: newEventTitle.trim() || '[Event Name]',
      categoryLabel: newEventCategory.trim() || 'Hackathon / Ideathon',
      datePlaceholder: newEventDate.trim() || '[Date]',
      rolePlaceholder: newEventRole.trim() || '[Achievement / Role]',
      summary:
        newEventSummary.trim() ||
        'Participated in collaborative ideation and technical problem-solving.',
      takeaways: ['Problem Solving', 'Team Collaboration', 'Continuous Learning'],
    };
    setHackathonEntries((prev) => [...prev, created]);
    setIsAddingEvent(false);
  };

  const handleRemoveHackathonEntry = (id: string) => {
    setHackathonEntries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleComposeNote = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `To: ${profile.emailPlaceholder}\nFrom: ${
      senderName.trim() || 'Visitor'
    }\nSubject: ${senderSubject}\n\n${
      senderMessage.trim() ||
      'Hi! I came across your B.Tech student portfolio and would love to connect regarding Python and Generative AI projects.'
    }`;
    navigator.clipboard.writeText(formatted);
    setMessageStatus('Formatted note copied to clipboard — ready to paste into your email or LinkedIn message.');
    setTimeout(() => setMessageStatus(null), 4000);
  };

  const filteredSkillCategories =
    skillFilter === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === skillFilter);

  const heroProject = PROJECTS[selectedHeroProjectIndex] || PROJECTS[0];

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? 'bg-[#0B1120] text-[#F8FAFC]' : 'bg-[#F8FAFC] text-[#0F172A]'
      }`}
    >
      {/* STRICT 3-ZONE TOP NAVIGATION BAR */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
          isDark
            ? 'bg-[#0B1120]/90 border-slate-800/80'
            : 'bg-[#F8FAFC]/90 border-slate-200/90'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Title (Single text element wordmark) */}
          <a
            href="#home"
            className={`text-base sm:text-lg font-bold tracking-tight whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {profile.name}
          </a>

          {/* Zone 2: 6 Navigation Links (Clean text with subtle hover underlines) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium"
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`py-1 whitespace-nowrap shrink-0 border-b-2 border-transparent transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${
                  isDark
                    ? 'text-slate-300 hover:text-white hover:border-blue-400'
                    : 'text-slate-600 hover:text-slate-900 hover:border-blue-600'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className={`p-2 rounded-lg border transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                isDark
                  ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Contact Me
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className={`md:hidden p-2 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? 'border-slate-800 bg-slate-900 text-slate-200'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-t px-4 pt-3 pb-5 space-y-2 ${
              isDark ? 'bg-[#0B1120] border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark
                    ? 'text-slate-200 hover:bg-slate-900'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-[#2563EB] rounded-lg whitespace-nowrap"
              >
                Contact Me
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* 1. HERO SECTION */}
        <section
          id="home"
          className={`relative py-16 sm:py-20 lg:py-24 border-b ${
            isDark ? 'border-slate-800/80' : 'border-slate-200/80'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Student Identity & Positioning */}
              <div className="lg:col-span-7 space-y-6">
                {/* Clean unboxed metadata line */}
                <div
                  className={`flex flex-wrap items-center gap-2 text-xs font-mono ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  <span>B.Tech 1st Semester</span>
                  <span aria-hidden="true">·</span>
                  <span>Python &amp; Web Foundations</span>
                  <span aria-hidden="true">·</span>
                  <span>Generative AI Learner</span>
                </div>

                <div className="space-y-3">
                  <p
                    className={`text-sm font-medium tracking-tight ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    Hello, I am {profile.name}
                  </p>
                  <h1
                    className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-balance ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {profile.headline}
                  </h1>
                </div>

                <p
                  className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {profile.supportingText}
                </p>

                {/* Core portfolio goal statement */}
                <div
                  className={`pl-4 border-l-2 border-blue-600 py-1 text-sm leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {profile.positioningStatement}
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    View Projects
                  </a>
                  <a
                    href="#contact"
                    className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg border transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                      isDark
                        ? 'border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800'
                        : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    Contact Me
                  </a>
                </div>

                {/* Subtle links/icons for GitHub, LinkedIn, and Placeholder Customizer */}
                <div
                  className={`pt-4 flex flex-wrap items-center justify-between gap-4 border-t text-xs ${
                    isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 font-medium transition-colors whitespace-nowrap ${
                        isDark ? 'hover:text-white' : 'hover:text-slate-900'
                      }`}
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                      <span className="font-mono text-[11px] opacity-75">({profile.githubUrl})</span>
                    </a>

                    <span aria-hidden="true">·</span>

                    <a
                      href="#contact"
                      className={`inline-flex items-center gap-2 font-medium transition-colors whitespace-nowrap ${
                        isDark ? 'hover:text-white' : 'hover:text-slate-900'
                      }`}
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                      <span className="font-mono text-[11px] opacity-75">({profile.linkedinUrl})</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCustomizerOpen(true)}
                    className={`inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Edit Placeholders</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Authentic Student Python Workbench Preview */}
              <div className="lg:col-span-5">
                <div
                  className={`rounded-2xl border overflow-hidden ${
                    isDark
                      ? 'bg-[#0F172A] border-slate-800'
                      : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div
                    className={`px-5 py-3.5 border-b flex items-center justify-between gap-2 ${
                      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="text-xs font-mono font-medium truncate">
                      Foundational Python Projects
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      Semester 1 Practice
                    </div>
                  </div>

                  {/* Interactive File Selector Tabs */}
                  <div
                    className={`px-3 py-2 border-b flex items-center gap-1 overflow-x-auto ${
                      isDark ? 'bg-[#0B1120] border-slate-800' : 'bg-slate-100/80 border-slate-200'
                    }`}
                  >
                    {PROJECTS.map((proj, idx) => (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => setSelectedHeroProjectIndex(idx)}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          selectedHeroProjectIndex === idx
                            ? isDark
                              ? 'bg-blue-600 text-white font-medium'
                              : 'bg-white text-slate-900 font-medium shadow-2xs'
                            : isDark
                            ? 'text-slate-400 hover:text-slate-200'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {proj.fileName}
                      </button>
                    ))}
                  </div>

                  {/* Code Excerpt & Quick Action */}
                  <div className="p-5 space-y-4">
                    <div>
                      <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                        Project {heroProject.index} · {heroProject.technologies.join(' · ')}
                      </div>
                      <h2 className="text-base font-semibold">{heroProject.title}</h2>
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {heroProject.description}
                      </p>
                    </div>

                    <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 text-[11px] font-mono leading-relaxed overflow-x-auto max-h-48">
                      <code>
                        {heroProject.pythonCode
                          .split('\n')
                          .slice(0, 14)
                          .join('\n')}
                      </code>
                    </pre>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveModalProject(heroProject)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Run Interactive Logic</span>
                      </button>

                      <a
                        href={profile.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 text-xs font-medium transition-colors whitespace-nowrap ${
                          isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <span>View on GitHub</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT ME SECTION */}
        <section
          id="about"
          className={`py-16 sm:py-20 border-b ${
            isDark ? 'border-slate-800/80' : 'border-slate-200/80'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Section Heading Column */}
              <div className="lg:col-span-4 space-y-2">
                <div className="text-xs font-mono text-blue-600 dark:text-blue-400">
                  01. Profile &amp; Academic Stage
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">
                  About Me
                </h2>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  First-semester B.Tech student focused on building strong technical fundamentals step by step.
                </p>
              </div>

              {/* About Narrative & Key Areas */}
              <div className="lg:col-span-8 space-y-6">
                <div
                  className={`p-6 sm:p-8 rounded-2xl border space-y-4 ${
                    isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <p
                    className={`text-base leading-relaxed ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    I am currently pursuing my <strong>B.Tech</strong> and am in my{' '}
                    <strong>first semester</strong>. As an aspiring AI Engineer at the beginning of my
                    academic and technical journey, I am dedicated to building a solid foundation in
                    programming logic, software development, and modern web technologies.
                  </p>
                  <p
                    className={`text-base leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    Rather than rushing ahead without fundamentals, my current focus is on writing clean
                    <strong> Python</strong> programs, understanding core{' '}
                    <strong>Web Development</strong> (HTML, CSS, JavaScript), and exploring{' '}
                    <strong>Artificial Intelligence</strong> and <strong>Generative AI</strong> through
                    hands-on experimentation and prompt engineering.
                  </p>
                  <p
                    className={`text-base leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    Beyond coursework, I actively participate in <strong>hackathons</strong>,{' '}
                    <strong>ideathons</strong>, and technical events where I can collaborate with peers,
                    brainstorm practical solutions, and learn by building real projects.
                  </p>

                  {/* Core Interest Areas Grid (Clean unboxed structure) */}
                  <div
                    className={`pt-6 mt-6 border-t grid grid-cols-1 sm:grid-cols-2 gap-4 ${
                      isDark ? 'border-slate-800' : 'border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                        Core Technical Interests
                      </div>
                      <div className="text-sm font-medium leading-relaxed">
                        Artificial Intelligence · Generative AI · Python Development · Web Development
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-1">
                        Learning Approach
                      </div>
                      <div className="text-sm font-medium leading-relaxed">
                        Building Practical Projects · Learning Through Hackathons &amp; Ideathons
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. TECHNICAL SKILLS SECTION */}
        <section
          id="skills"
          className={`py-16 sm:py-20 border-b ${
            isDark ? 'border-slate-800/80' : 'border-slate-200/80'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="text-xs font-mono text-blue-600 dark:text-blue-400">
                  02. Technical Foundation
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">
                  Technical Skills
                </h2>
                <p className={`text-sm max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Organized by domain area — representing the tools and concepts I am actively practicing
                  as a first-semester B.Tech student.
                </p>
              </div>

              {/* Interactive Filter Controls */}
              <div
                className={`inline-flex flex-wrap items-center gap-1 p-1 rounded-lg border ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200/80'
                }`}
                role="group"
                aria-label="Filter skills by category"
              >
                {[
                  { id: 'all', label: 'All Areas' },
                  { id: 'programming', label: 'Programming' },
                  { id: 'web', label: 'Web Development' },
                  { id: 'ai', label: 'AI & Emerging Tech' },
                  { id: 'other', label: 'Other' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setSkillFilter(tab.id as 'all' | 'programming' | 'web' | 'ai' | 'other')
                    }
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      skillFilter === tab.id
                        ? isDark
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-900 shadow-2xs'
                        : isDark
                        ? 'text-slate-400 hover:text-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Category Cards (Single elevation depth, zero artificial percentages) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSkillCategories.map((category) => (
                <div
                  key={category.id}
                  className={`p-6 rounded-2xl border flex flex-col justify-between transition-colors ${
                    isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="border-b pb-3 border-slate-200 dark:border-slate-800">
                      <h3 className="text-lg font-semibold tracking-tight">{category.title}</h3>
                      <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {category.subtitle}
                      </p>
                    </div>

                    <div className="divide-y divide-slate-200/70 dark:divide-slate-800/70">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="py-3 first:pt-0 last:pb-0">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-sm font-semibold">{skill.name}</span>
                            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                              Foundational Practice
                            </span>
                          </div>
                          <p
                            className={`text-xs mt-1 leading-relaxed ${
                              isDark ? 'text-slate-300' : 'text-slate-600'
                            }`}
                          >
                            {skill.context}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PROJECTS SECTION (Visual Focus after Hero) */}
        <section
          id="projects"
          className={`py-16 sm:py-20 border-b ${
            isDark ? 'border-slate-800/80' : 'border-slate-200/80'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="text-xs font-mono text-blue-600 dark:text-blue-400">
                  03. Applied Programming Practice
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">
                  Projects
                </h2>
                <p className={`text-sm max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Foundational Python applications built to practice conditional logic, user input
                  handling, and structured problem solving.
                </p>
              </div>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                  isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>{profile.githubUrl}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 3-Column Project Showcase Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project) => (
                <article
                  key={project.id}
                  className={`rounded-2xl border p-6 flex flex-col justify-between transition-colors ${
                    isDark
                      ? 'bg-[#0F172A] border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                      <span>
                        Project {project.index} · {project.technologies.join(' · ')}
                      </span>
                      <span>{project.fileName}</span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-lg font-bold tracking-tight">{project.title}</h3>

                    {/* Project Description */}
                    <p
                      className={`text-sm leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* Technologies & Concepts Rendered as Clean Unboxed Text */}
                    <div
                      className={`pt-3 border-t text-xs space-y-1.5 ${
                        isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-100 text-slate-600'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          Technologies:{' '}
                        </span>
                        <span className="font-mono">{project.technologies.join(' · ')}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          Concepts:{' '}
                        </span>
                        <span>{project.keyConcepts.join(' · ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions: Interactive Demo Modal & GitHub Button */}
                  <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                        isDark
                          ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Try Logic &amp; Code</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5, 6, 7. JOURNEY SECTION: HACKATHONS & IDEATHONS + CURRENTLY LEARNING + FUTURE GOALS */}
        <section
          id="journey"
          className={`py-16 sm:py-20 border-b ${
            isDark ? 'border-slate-800/80' : 'border-slate-200/80'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {/* PART 5: HACKATHONS & IDEATHONS */}
            <div id="hackathons" className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-blue-600 dark:text-blue-400">
                    04. Collaborative Exploration
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">
                    Hackathons &amp; Ideathons
                  </h2>
                  <p className={`text-sm max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    I enjoy learning by building, collaborating, and exploring ideas through hackathons
                    and ideathons.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddingEvent((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isDark
                      ? 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAddingEvent ? 'Cancel New Slot' : 'Add Event Slot'}</span>
                </button>
              </div>

              {/* Optional Add Event Slot Form for Future Achievements */}
              {isAddingEvent && (
                <form
                  onSubmit={handleAddHackathonEntry}
                  className={`p-6 rounded-2xl border space-y-4 ${
                    isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="text-sm font-semibold">
                    Add Hackathon / Ideathon Timeline Slot
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Hackathon / Event Name
                      </label>
                      <input
                        type="text"
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-xs font-mono ${
                          isDark
                            ? 'bg-slate-950 border-slate-700 text-white'
                            : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Event Type</label>
                      <input
                        type="text"
                        value={newEventCategory}
                        onChange={(e) => setNewEventCategory(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-xs ${
                          isDark
                            ? 'bg-slate-950 border-slate-700 text-white'
                            : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Date Placeholder</label>
                      <input
                        type="text"
                        value={newEventDate}
                        onChange={(e) => setNewEventDate(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-xs font-mono ${
                          isDark
                            ? 'bg-slate-950 border-slate-700 text-white'
                            : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Achievement / Role Placeholder
                      </label>
                      <input
                        type="text"
                        value={newEventRole}
                        onChange={(e) => setNewEventRole(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border text-xs font-mono ${
                          isDark
                            ? 'bg-slate-950 border-slate-700 text-white'
                            : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Participation Summary</label>
                    <input
                      type="text"
                      value={newEventSummary}
                      onChange={(e) => setNewEventSummary(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-xs ${
                        isDark
                          ? 'bg-slate-950 border-slate-700 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Save Event Slot
                    </button>
                  </div>
                </form>
              )}

              {/* Event Cards Layout with Authentic Placeholders */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hackathonEntries.map((entry, idx) => (
                  <div
                    key={entry.id}
                    className={`p-6 rounded-2xl border flex flex-col justify-between ${
                      isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                        <span>
                          0{idx + 1} · {entry.datePlaceholder}
                        </span>
                        {hackathonEntries.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveHackathonEntry(entry.id)}
                            aria-label="Remove event slot"
                            className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div>
                        <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                          {entry.categoryLabel}
                        </div>
                        <h3 className="text-lg font-bold tracking-tight mt-0.5 font-mono">
                          {entry.eventTitlePlaceholder}
                        </h3>
                      </div>

                      <div className="text-xs font-mono text-slate-600 dark:text-slate-300">
                        Role / Status: {entry.rolePlaceholder}
                      </div>

                      <p
                        className={`text-sm leading-relaxed ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {entry.summary}
                      </p>
                    </div>

                    <div
                      className={`pt-4 mt-4 border-t text-xs font-mono ${
                        isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                      }`}
                    >
                      {entry.takeaways.join(' · ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PART 6: CURRENT LEARNING JOURNEY */}
            <div id="learning" className="space-y-8">
              <div className="space-y-2">
                <div className="text-xs font-mono text-blue-600 dark:text-blue-400">
                  05. Ongoing Academic &amp; Self-Guided Study
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">
                  Currently Learning
                </h2>
                <p className={`text-sm max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  An active, ongoing learning roadmap across programming, web technologies, and
                  foundational AI concepts — focused on steady comprehension rather than rushed claims of
                  mastery.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CURRENTLY_LEARNING.map((item) => (
                  <div
                    key={item.topic}
                    className={`p-6 rounded-2xl border flex flex-col justify-between ${
                      isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                        <span>Track {item.index}</span>
                        <span className="text-teal-600 dark:text-teal-400">{item.stage}</span>
                      </div>

                      <h3 className="text-base font-bold tracking-tight">{item.topic}</h3>

                      <p
                        className={`text-xs leading-relaxed ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {item.currentFocus}
                      </p>
                    </div>

                    {/* Subtle qualitative milestone progression (no fake numerical percentages) */}
                    <div
                      className={`pt-4 mt-4 border-t ${
                        isDark ? 'border-slate-800' : 'border-slate-100'
                      }`}
                    >
                      <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-1.5">
                        Current Focus Areas:
                      </div>
                      <div className="text-xs text-slate-700 dark:text-slate-300">
                        {item.milestones.join(' · ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PART 7: FUTURE GOALS */}
            <div id="goals" className="space-y-8">
              <div className="space-y-2">
                <div className="text-xs font-mono text-blue-600 dark:text-blue-400">
                  06. Forward Direction
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">
                  Future Goals
                </h2>
                <p className={`text-sm max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Practical milestones I am working toward over upcoming semesters as I grow toward
                  becoming an AI Engineer.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FUTURE_GOALS.map((goal) => (
                  <div
                    key={goal.index}
                    className={`p-6 rounded-2xl border space-y-2.5 ${
                      isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                      <span>Goal {goal.index}</span>
                      <span>{goal.horizon}</span>
                    </div>
                    <h3 className="text-base font-semibold tracking-tight">{goal.title}</h3>
                    <p
                      className={`text-xs leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {goal.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. CONTACT SECTION */}
        <section id="contact" className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Contact Details & Placeholders */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <div className="text-xs font-mono text-blue-600 dark:text-blue-400">
                    07. Get in Touch
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">
                    Let&apos;s Connect
                  </h2>
                  <p
                    className={`text-base leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    I&apos;m always interested in learning, building, collaborating, and connecting with
                    people interested in technology and AI.
                  </p>
                </div>

                {/* Direct Contact Placeholder Cards */}
                <div className="space-y-3">
                  {/* LinkedIn */}
                  <div
                    className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                      isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-slate-500 dark:text-slate-400">LinkedIn</div>
                        <div className="text-sm font-mono font-medium truncate">
                          {profile.linkedinUrl}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyText('linkedin', profile.linkedinUrl)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isDark
                          ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                          : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {copiedField === 'linkedin' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-teal-500" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* GitHub */}
                  <div
                    className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                      isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <Github className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-slate-500 dark:text-slate-400">GitHub</div>
                        <div className="text-sm font-mono font-medium truncate">
                          {profile.githubPlaceholderDisplay} · {profile.githubUrl}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyText('github', profile.githubUrl)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isDark
                          ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                          : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {copiedField === 'github' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-teal-500" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Email */}
                  <div
                    className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                      isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-slate-500 dark:text-slate-400">Email</div>
                        <div className="text-sm font-mono font-medium truncate">
                          {profile.emailPlaceholder}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyText('email', profile.emailPlaceholder)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isDark
                          ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                          : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {copiedField === 'email' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-teal-500" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Connection Note Composer */}
              <div className="lg:col-span-6">
                <form
                  onSubmit={handleComposeNote}
                  className={`p-6 sm:p-8 rounded-2xl border space-y-4 ${
                    isDark ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">
                      Draft a Quick Connection Note
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Prepare a message for hackathon collaboration, study groups, or project feedback.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-sender-name"
                      className={`block text-xs font-medium mb-1.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-sender-name"
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Enter your name"
                      className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark
                          ? 'bg-slate-950 border-slate-700 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className={`block text-xs font-medium mb-1.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Topic
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={senderSubject}
                      onChange={(e) => setSenderSubject(e.target.value)}
                      className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark
                          ? 'bg-slate-950 border-slate-700 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className={`block text-xs font-medium mb-1.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={senderMessage}
                      onChange={(e) => setSenderMessage(e.target.value)}
                      placeholder="Hi! Let's connect about Python projects, web development, or upcoming hackathons..."
                      className={`w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark
                          ? 'bg-slate-950 border-slate-700 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  {messageStatus && (
                    <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-700/50 text-xs text-teal-600 dark:text-teal-300">
                      {messageStatus}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Copy Formatted Message
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsCustomizerOpen(true)}
                      className={`text-xs font-medium underline underline-offset-4 cursor-pointer whitespace-nowrap ${
                        isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Customize Placeholders
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 9. MINIMAL FOOTER */}
      <footer
        className={`border-t py-10 ${
          isDark ? 'bg-[#090E1A] border-slate-800/80' : 'bg-white border-slate-200/90'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="text-sm font-bold tracking-tight">
              {profile.name} — Aspiring AI Engineer
            </div>
            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              B.Tech Student | Python | Web Development | Generative AI
            </div>
            <div className={`text-xs pt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              © 2026 {profile.name}. All rights reserved.
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`p-2.5 rounded-lg border transition-colors ${
                isDark
                  ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              aria-label="LinkedIn"
              className={`p-2.5 rounded-lg border transition-colors ${
                isDark
                  ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Python Project Modal */}
      <ProjectInteractiveModal
        project={activeModalProject}
        githubUrl={profile.githubUrl}
        isDark={isDark}
        onClose={() => setActiveModalProject(null)}
      />

      {/* Personalize Placeholders Modal */}
      <PlaceholderCustomizerModal
        isOpen={isCustomizerOpen}
        profile={profile}
        isDark={isDark}
        onSave={(updated) => setProfile(updated)}
        onReset={() => setProfile(DEFAULT_PROFILE)}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </div>
  );
}
