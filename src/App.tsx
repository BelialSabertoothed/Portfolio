import React from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Palette, Briefcase, Code2, Sparkles, Sprout, Gamepad2 } from 'lucide-react';

// --- DATA ---
const projects = [
  {
    id: 1,
    title: "Habit Garden",
    subtitle: "Thesis Project: Gamification vs. Minimalism",
    description: "Does gamification actually help us stick to our habits? I investigates this in my thesis project. A full-stack application where habits turn into virtual plants, helping users build consistency through care and growth. Currently seeking users for a comparative study.",
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
    description: "Frontend for a municipal system handling infrastructure usage. Designed complex forms and bridged the gap between user requirements and technical execution. Rated 'High' for independence.",
    tags: ["React", "Enterprise UX", "REST API", "Complex Forms"],
    link: "#",
    isFeatured: false,
    color: "from-blue-500/20 to-indigo-500/5 border-blue-500/30 text-blue-300",
    cta: "View Details"
  }
];

const skills = [
  { category: "Frontend", icon: <Code2 size={18} />, items: ["React", "TypeScript", "Tailwind", "Framer Motion"] },
  { category: "Backend", icon: <Briefcase size={18} />, items: ["Node.js", "Express", "REST API", "MongoDB"] },
  // Odstraněno "Juicy UI", nahrazeno za Interactive Design
  { category: "Design", icon: <Palette size={18} />, items: ["Figma", "UI/UX Principles", "ProCreate", "Interactive Design"] }
];

// --- COMPONENTS ---

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`max-w-4xl mx-auto px-6 py-24 ${className}`}
  >
    {children}
  </motion.div>
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

  // Parallax scroll logic
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="group relative min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden w-full"
    >
      {/* Global Spotlight (Background Glow following mouse) */}
      <div className="pointer-events-none fixed inset-0 z-0 transition duration-300 lg:absolute">
        <motion.div 
           className="absolute inset-0 bg-slate-950"
           style={{
             background: useMotionTemplate`
               radial-gradient(
                 600px circle at ${mouseX}px ${mouseY}px,
                 rgba(29, 78, 216, 0.05),
                 transparent 80%
               )
             `
           }}
        />
      </div>

      {/* --- HERO SECTION --- */}
      <header className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden z-10 w-full">
        
        {/* Animated Background Blobs */}
        <motion.div style={{ y: y1, x: -100 }} className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] opacity-50" />
        <motion.div style={{ y: y2, x: 100 }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] opacity-50" />

        <div className="relative z-10 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 text-transparent bg-clip-text pb-2">
              Barbora Šimordová
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-400 mb-10 font-light"
          >
            Frontend Developer & UI Designer <br/>
            <span className="text-indigo-400 font-medium">Bridging the gap between Code & Art.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="#projects" className="w-full sm:w-auto px-8 py-3 bg-indigo-600 rounded-full font-medium text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2">
              View Work <Sparkles size={16} />
            </a>
            <a href="mailto:b.simordova@gmail.com" className="w-full sm:w-auto px-8 py-3 border border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 rounded-full font-medium transition-all text-slate-300">
              Contact Me
            </a>
          </motion.div>
        </div>
      </header>

      {/* --- ABOUT --- */}
      <Section>
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
              <span className="w-12 h-1 bg-indigo-500 rounded-full inline-block"></span>
              The "Why"
            </h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              I started my journey at the <strong>Secondary School of Art</strong>, where I learned that detail is everything. 
              Later, at <strong>Unicorn University</strong>, I discovered that code is the ultimate medium for interactivity.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              My goal is to build applications that are responsive, accessible, and meaningful—interfaces that feel alive, especially for research-driven projects like Habit Garden.
            </p>
          </div>
          
          <div className="flex-1 grid gap-4 w-full">
            {skills.map((s, i) => (
              <motion.div 
                key={s.category}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-colors backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-4 text-indigo-400">
                  {s.icon}
                  <h4 className="font-semibold">{s.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <span key={item} className="px-2 py-1 text-xs font-medium text-slate-300 bg-slate-800/50 rounded border border-slate-700/50">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* --- PROJECTS --- */}
      <div id="projects" className="relative py-32 w-full">
        <div className="absolute inset-0 bg-slate-900/20 -skew-y-3 z-0 origin-top-left scale-110" />
        
        <Section className="relative z-10">
          <h3 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-indigo-200 to-slate-200 bg-clip-text text-transparent">
            Selected Work
          </h3>
          <div className="space-y-20">
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative grid md:grid-cols-2 gap-8 p-1 rounded-3xl transition-all duration-500 hover:bg-slate-800/30`}
              >
                {/* Visual Side */}
                <div className={`relative h-64 md:h-auto rounded-2xl overflow-hidden bg-gradient-to-br ${project.color} flex items-center justify-center border border-white/5`}>
                   <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                   
                   <motion.div 
                     whileHover={{ scale: 1.1, rotate: 5 }}
                     transition={{ type: "spring", stiffness: 300 }}
                   >
                     {project.id === 1 ? <Sprout size={64} className="text-emerald-200/80" /> : <Briefcase size={64} className="text-blue-200/50" />}
                   </motion.div>

                   {project.isFeatured && (
                      <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md">
                        THESIS PROJECT
                      </div>
                   )}
                </div>

                {/* Content Side */}
                <div className="flex flex-col justify-center p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-3xl font-bold text-slate-100 mb-1 group-hover:text-indigo-300 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-indigo-400 font-medium">{project.subtitle}</p>
                    </div>
                    {project.link !== "#" && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-indigo-600 transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                  
                  <p className="text-slate-400 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.id === 1 && (
                     <div className="mt-auto">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                           <Gamepad2 size={16} /> {project.cta} <span>→</span>
                        </a>
                     </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-slate-800/50 text-center relative overflow-hidden w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
        
        <div className="flex justify-center gap-8 mb-8">
          {[
            { icon: <Github />, href: "https://github.com/barborasim" },
            { icon: <Linkedin />, href: "https://linkedin.com/in/barborasim" },
            { icon: <Mail />, href: "mailto:b.simordova@gmail.com" }
          ].map((social, i) => (
            <motion.a 
              key={i}
              whileHover={{ y: -5, color: "#818cf8" }}
              href={social.href} 
              target="_blank" 
              rel="noopener"
              className="text-slate-400 transition-colors"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
        <p className="text-slate-600 text-sm">
          Built with React, Tailwind & Framer Motion.
        </p>
        <p className="text-emerald-500/70 text-xs mt-4 font-mono">
          OPEN TO WORK • EU / UK
        </p>
      </footer>
    </div>
  );
}

export default App;