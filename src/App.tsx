import React, { useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Palette,
  BarChart3,
  Briefcase,
  Code2,
  Sparkles,
  Sprout,
  KeyRound,
  User,
  Lock,
  Gamepad2,
  Cpu,
  GraduationCap,
  School,
  BookOpen,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// --- DATA ---
const projects = [
  {
    id: 1,
    title: "Habit Garden",
    subtitle: "Gamification Thesis Project",
    description:
      "Turning daily routines into a virtual garden. This project investigates how high-fidelity game feel and interactive feedback loops impact user retention compared to minimalist functionalism. Users cultivate digital flora by completing real-world habits.",
    hasCredentials: true,
    credentials: {
      email: "testgamified@user.app",
      pass: "SecretPassword1",
    },
    tags: ["React", "TypeScript", "Node.js", "MongoDB"],
    link: "https://habitgarden.app",
    thesisLink:
      "https://docs.google.com/document/d/19Zl7DdB-pb1X3ahMa89BZTWVqtVbYxYa0Ot3-cpdWHQ/edit?usp=sharing",
    color:
      "from-green-500/20 to-emerald-500/5 border-green-500/30 text-green-300",
    cta: "Join the Experiment",
    icon: <Sprout size={64} className="text-emerald-100" />,
    images: [
      "/projects/garden1.png",
      "/projects/garden2.png",
      "/projects/garden3.png",
      "/projects/garden4.png",
      "/projects/garden5.png",
    ],
  },
  {
    id: 2,
    title: "Infrastructure Manager",
    subtitle: "Internal App for TSK Praha",
    description:
      "A comprehensive internal tool for municipal infrastructure management. I engineered responsive interfaces for the 'Zábory' (Public Space Usage) agenda, bridging technical data constraints with user-centric design requirements for city engineers.",
    hasImpact: true,
    impact:
      "Designed and implemented the user interface for the municipal system, transforming complex bureaucratic forms into user-friendly digital workflows.",
    tags: ["React", "Enterprise UX", "REST API", "Complex Forms"],
    link: "#",
    color: "from-blue-500/20 to-indigo-500/5 border-blue-500/30 text-blue-300",
    cta: "View Details",
    icon: <Briefcase size={64} className="text-blue-100" />,
    // images: [] // Pokud doplníš obrázky, odkomentuj
  },
  {
    id: 3,
    title: "Pills4U",
    subtitle: "IoT Smart Dispenser",
    description:
      "IoT medication dispenser system built on the Hardwario platform. Operating within a 7-member agile team (Scrum), I spearheaded the Frontend development and technical documentation, delivering a highly accessible interface tailored for elderly users.",
    hasImpact: true,
    impact:
      "Led the documentation efforts and UI implementation, ensuring seamless integration between the Hardwario Core module and the web dashboard.",
    tags: ["IoT", "React", "Hardwario", "Scrum", "Docs"],
    link: "#",
    color: "from-pink-500/20 to-rose-500/5 border-pink-500/30 text-pink-300",
    cta: "View Project",
    icon: <Cpu size={64} className="text-pink-100" />,
    images: [
      "/projects/pill4.png",
      "/projects/pill3.png",
      "/projects/pill1.png",
      "/projects/pill2.png",
    ],
  },
];

const skills = [
  {
    category: "Frontend",
    icon: <Code2 size={20} />,
    items: ["React", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    category: "Backend",
    icon: <Briefcase size={20} />,
    items: ["Node.js", "Express", "REST API", "MongoDB"],
  },
  {
    category: "Design",
    icon: <Palette size={20} />,
    items: ["Figma", "UI/UX Principles", "ProCreate", "Interactive Design"],
  },
];

const education = [
  {
    school: "Unicorn University",
    degree: "Software Development (Bc.)",
    year: "Expected early 2026",
    icon: <GraduationCap size={20} />,
  },
  {
    school: "Secondary School of Art",
    degree: "Painting & New Technologies",
    year: "Graduated 2017",
    icon: <School size={20} />,
  },
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// --- COMPONENTS ---

const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`max-w-4xl mx-auto px-6 py-16 ${className}`}>{children}</div>
);

// --- MAIN APP ---

function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [activeGallery, setActiveGallery] = useState<{
    images: string[];
    index: number;
  } | null>(null);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  const openGallery = (images: string[]) => {
    if (images && images.length > 0) {
      setActiveGallery({ images, index: 0 });
    }
  };

  const closeGallery = () => setActiveGallery(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeGallery) {
      setActiveGallery({
        ...activeGallery,
        index: (activeGallery.index + 1) % activeGallery.images.length,
      });
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeGallery) {
      setActiveGallery({
        ...activeGallery,
        index:
          (activeGallery.index - 1 + activeGallery.images.length) %
          activeGallery.images.length,
      });
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden w-full flex flex-col"
    >
      {/* Lightbox / Gallery Modal */}
      <AnimatePresence>
        {activeGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={closeGallery}
              className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-50"
            >
              <X size={32} />
            </button>

            <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
              {activeGallery.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-0 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-white transition-all z-50"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-white transition-all z-50"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}

              <motion.img
                key={activeGallery.index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={activeGallery.images[activeGallery.index]}
                alt="Gallery preview"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {activeGallery.images.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === activeGallery.index ? "bg-white" : "bg-slate-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Spotlight */}
      <div className="pointer-events-none fixed inset-0 z-0 transition duration-500 lg:absolute">
        <motion.div
          className="absolute inset-0 bg-slate-950"
          style={{
            background: useMotionTemplate`
               radial-gradient(
                 650px circle at ${mouseX}px ${mouseY}px,
                 rgba(50, 60, 200, 0.05),
                 transparent 80%
               )
             `,
          }}
        />
      </div>

      {/* --- HERO SECTION --- */}
      <header className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden z-10 w-full">
        {/* Animated Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ y: y1, x: -100 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{ y: y2, x: 100 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[130px] mix-blend-screen"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl px-4 flex flex-col items-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-7xl font-bold tracking-tight mb-4 py-2 bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-200 text-transparent bg-clip-text leading-tight"
          >
            Barbora Šimordová
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-slate-400 mb-8 font-light leading-relaxed max-w-xl"
          >
            Frontend Developer & UI Designer <br />
            <span className="text-indigo-400 font-medium text-base md:text-xl">
              Code. Design. Impact.
            </span>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto px-8 py-3 bg-indigo-600 rounded-full font-bold text-white tracking-wide transition-all duration-300 hover:bg-indigo-500 hover:scale-105 hover:shadow-[0_5px_20px_-5px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2 text-base group/btn"
            >
              View Work{" "}
              <Sparkles
                size={18}
                className="group-hover/btn:rotate-12 transition-transform"
              />
            </a>
            <a
              href="mailto:b.simordova@gmail.com"
              className="w-full sm:w-auto px-8 py-3 border border-slate-700 hover:border-slate-500 hover:bg-slate-800/80 rounded-full font-semibold tracking-wide transition-all duration-300 text-slate-300 text-base hover:text-white"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </header>

      {/* --- ABOUT --- */}
      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="space-y-16"
        >
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-slate-100 inline-flex items-center gap-3"
            >
              <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
              The "Why"
            </motion.h3>
            <motion.p
              variants={itemVariants}
              className="text-base text-slate-400 leading-relaxed"
            >
              I see code as a creative medium. Coming from an{" "}
              <strong>art background</strong>, I learned that detail is
              everything. Now, I apply that same precision to Frontend
              Development. My goal? To build interfaces that don't just work,
              but feel <i>alive</i> and intuitive.
            </motion.p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {skills.map((s) => (
              <motion.div
                key={s.category}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 backdrop-blur-sm flex flex-col items-center text-center shadow-lg group"
              >
                <div className="p-3 bg-slate-800/50 rounded-full mb-3 text-indigo-400 group-hover:text-indigo-300 transition-colors group-hover:bg-indigo-500/10">
                  {s.icon}
                </div>
                <h4 className="font-bold text-lg mb-3 text-slate-200">
                  {s.category}
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-[11px] font-medium text-slate-400 bg-slate-800/50 rounded border border-slate-700/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-900/20 border border-slate-800/50 hover:border-indigo-500/20 transition-colors"
              >
                <div className="p-3 bg-slate-800 rounded-full text-indigo-400">
                  {edu.icon}
                </div>
                <div>
                  <h4 className="text-slate-200 font-bold">{edu.school}</h4>
                  <p className="text-sm text-slate-400">{edu.degree}</p>
                  <p className="text-xs text-indigo-400/80 font-mono mt-1">
                    {edu.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* --- PROJECTS --- */}
      <div id="projects" className="relative py-16 w-full pb-32">
        <div className="absolute inset-0 bg-slate-900/30 -skew-y-2 z-0 origin-top-left scale-110" />

        <Section className="relative z-10">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-200 via-slate-200 to-indigo-200 bg-clip-text text-transparent"
          >
            Selected Work
          </motion.h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-16"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className={`group relative grid md:grid-cols-2 gap-0 md:gap-8 overflow-hidden rounded-3xl transition-all duration-500 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/30 shadow-xl hover:shadow-2xl hover:shadow-indigo-900/10 items-stretch`}
              >
                {/* Visual Side (Interactive Gallery Trigger) */}
                <div
                  onClick={() => openGallery(project.images || [])}
                  className={`relative min-h-[240px] md:h-full bg-gradient-to-br ${
                    project.color
                  } flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 overflow-hidden ${
                    project.images ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative z-10 drop-shadow-2xl p-8 group-hover:opacity-100 transition-opacity"
                  >
                    {project.icon}
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className="flex flex-col justify-center p-6 md:p-8 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-slate-100 mb-1 group-hover:text-indigo-300 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-indigo-400 font-bold text-sm tracking-wide uppercase opacity-80">
                        {project.subtitle}
                      </p>
                    </div>
                    {project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-800 rounded-full hover:bg-indigo-600 transition-all hover:scale-110 hover:shadow-lg text-slate-300 hover:text-white"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-6 text-sm md:text-base">
                    {project.description}
                  </p>

                  {/* Impact / Credentials Block */}
                  <div className="mb-6 space-y-3">
                    {project.hasCredentials && project.credentials && (
                      <div className="bg-slate-950/40 p-3 rounded-lg border border-emerald-900/30 hover:border-emerald-500/30 transition-colors">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">
                          <KeyRound size={12} /> Demo Access
                        </div>
                        <div className="flex flex-col gap-2 text-xs font-mono text-slate-300">
                          <div className="flex items-center gap-2 bg-slate-900 px-2 py-1.5 rounded border border-slate-800 overflow-hidden">
                            <User
                              size={12}
                              className="text-slate-500 shrink-0"
                            />
                            <span className="select-all cursor-text hover:text-white transition-colors truncate">
                              {project.credentials.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 bg-slate-900 px-2 py-1.5 rounded border border-slate-800 overflow-hidden">
                            <Lock
                              size={12}
                              className="text-slate-500 shrink-0"
                            />
                            <span className="select-all cursor-text hover:text-white transition-colors truncate">
                              {project.credentials.pass}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.hasImpact && project.impact && (
                      <div className="bg-slate-950/40 p-4 rounded-lg border border-indigo-900/30 hover:border-indigo-500/30 transition-colors">
                        <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
                          <BarChart3 size={12} /> Key Impact
                        </div>
                        <p className="text-xs md:text-sm text-slate-400 leading-relaxed italic">
                          "{project.impact}"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-800/50">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-400 border border-slate-700/50 hover:border-indigo-500/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {project.link !== "#" && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-all hover:gap-3 group/link"
                        >
                          {project.id === 1 ? (
                            <Gamepad2 size={16} />
                          ) : (
                            <ExternalLink size={16} />
                          )}
                          {project.cta}
                          <span className="group-hover/link:translate-x-1 transition-transform">
                            →
                          </span>
                        </a>
                      )}

                      {project.thesisLink && (
                        <a
                          href={project.thesisLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-all hover:gap-3 group/link"
                        >
                          <BookOpen size={16} />
                          Read Thesis Summary
                          <span className="group-hover/link:translate-x-1 transition-transform">
                            →
                          </span>
                        </a>
                      )}

                      {/* ZVÝRAZNĚNÉ TLAČÍTKO GALERIE */}
                      {project.images && project.images.length > 0 && (
                        <button
                          onClick={() => openGallery(project.images || [])}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-slate-200 text-sm font-bold border border-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-500 transition-all shadow-lg hover:shadow-indigo-500/20 group/btn"
                        >
                          <ImageIcon size={16} />
                          Gallery
                          <span className="group-hover/btn:translate-x-1 transition-transform">
                            →
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      </div>

      {/* --- FOOTER --- */}
      <footer className="relative z-50 bg-slate-950 py-12 border-t border-slate-800/50 text-center w-full mt-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

        <div className="flex justify-center gap-8 mb-6 relative z-10">
          {[
            {
              icon: <Github size={20} />,
              href: "https://github.com/belialsabertoothed",
            },
            {
              icon: <Linkedin size={20} />,
              href: "https://www.linkedin.com/in/barbora-simordova-6093802bb/",
            },
            { icon: <Mail size={20} />, href: "mailto:b.simordova@gmail.com" },
          ].map((social, i) => (
            <motion.a
              key={i}
              whileHover={{ y: -3, scale: 1.1, color: "#818cf8" }}
              href={social.href}
              target="_blank"
              rel="noopener"
              className="text-slate-400 transition-all"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
        <p className="text-slate-600 text-xs relative z-10">
          © {new Date().getFullYear()} Barbora Šimordová
        </p>
      </footer>
    </div>
  );
}

export default App;