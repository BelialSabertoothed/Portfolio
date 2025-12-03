import React from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Palette, BarChart3, Briefcase, Code2, Sparkles, Sprout, KeyRound, User, Lock, Gamepad2 } from 'lucide-react';
// --- DATA ---
const projects = [
  {
    id: 1,
    title: "Habit Garden",
    subtitle: "Thesis Project: Gamification Research",
    // Upravený text: více akademický a profesionální
    description: "Turning daily routines into a virtual garden. This thesis project investigates the impact of gamification on user retention, contrasting 'juicy' game design mechanics with minimalist functionalism.",
    hasCredentials: true,
    credentials: {
      email: "testgamified@user.app",
      pass: "SecretPassword1"
    },
    tags: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
    link: "https://habitgarden.app",
    isFeatured: true,
    color: "from-green-500/20 to-emerald-500/5 border-green-500/30 text-green-300", 
    cta: "Join the Experiment"
  },
  {
    id: 2,
    title: "Public Space Management",
    subtitle: "Enterprise App for TSK Praha",
    // Upravený text: důraz na dopad a složitost
    description: "Digitizing Prague's infrastructure management. A complex React frontend for TSK Praha that transforms technical municipal data into an intuitive workflow for city planners and engineers.",
    // Přidána sekce "Impact" pro vyvážení výšky karty s prvním projektem
    hasImpact: true,
    impact: "Designed complex forms handling 50+ data points and bridged the gap between technical constraints and user needs.",
    tags: ["React", "Enterprise UX", "REST API", "Complex Forms"],
    link: "#",
    isFeatured: false,
    color: "from-blue-500/20 to-indigo-500/5 border-blue-500/30 text-blue-300",
    cta: "View Details"
  }
];

const skills = [
  { category: "Frontend", icon: <Code2 size={20} />, items: ["React", "TypeScript", "Tailwind", "Framer Motion"] },
  { category: "Backend", icon: <Briefcase size={20} />, items: ["Node.js", "Express", "REST API", "MongoDB"] },
  { category: "Design", icon: <Palette size={20} />, items: ["Figma", "UI/UX Principles", "ProCreate", "Interactive Design"] }
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 20 }
  }
};

// --- COMPONENTS ---

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`max-w-4xl mx-auto px-6 py-16 ${className}`}>
    {children}
  </div>
);

// --- MAIN APP ---

function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="group relative min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden w-full flex flex-col"
    >
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
             `
           }}
        />
      </div>

      {/* --- HERO SECTION --- */}
      <header className="min-h-[85vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden z-10 w-full">
        
        {/* Animated Blobs - Added breathing animation */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1], 
            opacity: [0.3, 0.4, 0.3],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ y: y1, x: -100 }} 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
             scale: [1, 1.2, 1], 
             opacity: [0.2, 0.3, 0.2],
             rotate: [0, -15, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ y: y2, x: 100 }} 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px]" 
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl px-4 flex flex-col items-center"
        >
          {/* Oprava useknutého háčku: přidáno py-4 a leading-normal */}
          <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-bold tracking-tight mb-2 py-4 bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-200 text-transparent bg-clip-text leading-normal">
            Barbora Šimordová
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-2xl text-slate-400 mb-8 font-light leading-relaxed max-w-xl"
          >
            Frontend Developer & UI Designer <br/>
            <span className="text-indigo-400 font-medium text-base md:text-xl">Bridging the gap between Code & Art.</span>
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            <a href="#projects" className="w-full sm:w-auto px-8 py-3 bg-indigo-600 rounded-full font-bold text-white tracking-wide transition-all duration-300 hover:bg-indigo-500 hover:scale-105 hover:shadow-[0_5px_20px_-5px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2 text-base group/btn">
              View Work <Sparkles size={18} className="group-hover/btn:rotate-12 transition-transform"/>
            </a>
            <a href="mailto:b.simordova@gmail.com" className="w-full sm:w-auto px-8 py-3 border border-slate-700 hover:border-slate-500 hover:bg-slate-800/80 rounded-full font-semibold tracking-wide transition-all duration-300 text-slate-300 text-base hover:text-white">
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
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="space-y-12"
        >
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <motion.h3 variants={itemVariants} className="text-2xl font-bold text-slate-100 inline-flex items-center gap-3">
              <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
              The "Why"
            </motion.h3>
            <motion.p variants={itemVariants} className="text-base text-slate-400 leading-relaxed">
              I started my journey at the <strong>Secondary School of Art</strong>, learning that detail is everything. 
              At <strong>Unicorn University</strong>, I discovered code as the ultimate medium for interactivity.
              My goal is to build interfaces that don't just function, but feel alive.
            </motion.p>
          </div>
          
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
                <h4 className="font-bold text-lg mb-3 text-slate-200">{s.category}</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {s.items.map((item) => (
                    <span key={item} className="px-2.5 py-1 text-[11px] font-medium text-slate-400 bg-slate-800/50 rounded border border-slate-700/50">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* --- PROJECTS --- */}
      <div id="projects" className="relative py-16 w-full flex-1">
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
            className="space-y-12"
          >
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                // h-full a flex-col pro rovnoměrné roztažení
                className={`group relative grid md:grid-cols-2 gap-6 p-2 rounded-3xl transition-all duration-500 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/30 shadow-xl hover:shadow-2xl hover:shadow-indigo-900/10 items-stretch`}
              >
                {/* Visual Side */}
                <div className={`relative h-full min-h-[240px] rounded-2xl overflow-hidden bg-gradient-to-br ${project.color} flex flex-col items-center justify-centerQl border border-white/5`}>
                   <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                   
                   <motion.div 
                     whileHover={{ scale: 1.1, rotate: 5 }}
                     transition={{ type: "spring", stiffness: 300 }}
                     className="relative z-10 drop-shadow-xl"
                   >
                     {project.id === 1 ? <Sprout size={64} className="text-emerald-100" /> : <Briefcase size={64} className="text-blue-100" />}
                   </motion.div>
                </div>

                {/* Content Side */}
                <div className="flex flex-col justify-center p-5 h-full">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-2xl font-bold text-slate-100 mb-1 group-hover:text-indigo-300 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-indigo-400 font-bold text-sm tracking-wide">{project.subtitle}</p>
                    </div>
                    {project.link !== "#" && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-indigo-600 transition-all hover:scale-110 hover:shadow-lg">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                  
                  <p className="text-slate-300 leading-relaxed mb-6 text-sm">
                    {project.description}
                  </p>

                  {/* Credentials / Impact Block - Helps balance height */}
                  <div className="mb-6">
                    {project.hasCredentials && project.credentials && (
                      <div className="bg-slate-950/40 p-3 rounded-lg border border-emerald-900/30 hover:border-emerald-500/30 transition-colors">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">
                          <KeyRound size={12} /> Test Account
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 text-xs font-mono text-slate-300">
                          <div className="flex items-center gap-2 bg-slate-900 px-2 py-1 rounded">
                              <User size={12} className="text-slate-500"/> 
                              <span className="select-all cursor-text">{project.credentials.email}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-slate-900 px-2 py-1 rounded">
                              <Lock size={12} className="text-slate-500"/> 
                              <span className="select-all cursor-text">{project.credentials.pass}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Placeholder for visual balance if impact is present */}
                    {project.hasImpact && project.impact && (
                      <div className="bg-slate-950/40 p-3 rounded-lg border border-indigo-900/30 hover:border-indigo-500/30 transition-colors">
                         <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
                            <BarChart3 size={12} /> Key Impact
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{project.impact}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.id === 1 && (
                       <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-all hover:gap-3">
                          <Gamepad2 size={16} /> {project.cta} <span>→</span>
                       </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>
      </div>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-slate-800/50 text-center relative overflow-hidden w-full mt-auto">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        
        <div className="flex justify-center gap-8 mb-6">
          {[
            { icon: <Github size={20} />, href: "https://github.com/barborasim" },
            { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/barborasim" },
            { icon: <Mail size={20} />, href: "mailto:b.simordova@gmail.com" }
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
        <p className="text-slate-600 text-xs">
          © {new Date().getFullYear()} Barbora Šimordová
        </p>
      </footer>
    </div>
  );
}

export default App;