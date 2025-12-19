'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, FileText, 
  Code2, Database, Terminal, 
  Volume2, VolumeX, Sparkles, Heart 
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- DATA FROM RESUME ---
const resumeData = {
  name: "Neh Patel",
  role: "Computer Science Undergraduate & Software Engineer",
  summary: "Seeking Software Engineering Internships. Expert in systems programming, full-stack development, and AI integration.",
  socials: {
    email: "mailto:nehpatel30062004@gmail.com",
    github: "https://github.com/PatelNeh2004",
    // UPDATED LINKEDIN URL
    linkedin: "https://www.linkedin.com/in/nehpatel2004/",
  },
  skills: [
    "Next.js", "React", "Node.js", "PostgreSQL", 
    "C / C++", "Java", "Python", "Docker", "Git"
  ],
  projects: [
    {
      title: "Study Buddy",
      tagline: "AI-Powered Learning Platform",
      award: "🏆 Winner: Best AI Hack 2025",
      tech: ["Next.js", "Gemini API", "Supabase", "Prisma"],
      description: "Architected a full-stack app transforming notes into interactive flashcards. Reduced study prep time by 60-70%.",
      color: "bg-pink-100 border-pink-200 text-pink-800"
    },
    {
      title: "Unix Shell & Cache Sim",
      tagline: "Systems Programming",
      award: null,
      tech: ["C", "Linux", "POSIX", "Makefile"],
      description: "Designed a POSIX-compliant shell with job control and a configurable CPU cache simulator with O(1) access time.",
      color: "bg-sky-100 border-sky-200 text-sky-800"
    },
    {
      title: "Semantic Search Engine",
      tagline: "Graph Analysis System",
      award: null,
      tech: ["Java", "Graph Algorithms", "Machine Learning"],
      description: "Built a recommendation engine processing 200+ docs with O(n) efficiency and Dijkstra’s shortest-path algorithm.",
      color: "bg-violet-100 border-violet-200 text-violet-800"
    }
  ]
};

// --- ANIMATION VARIANTS ---
const floatingVariant = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const popVariant = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.5 } }
};

// --- COMPONENTS ---

const BackgroundBlobs = () => (
  <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
    <motion.div 
      animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 10, repeat: Infinity }}
      className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60" 
    />
    <motion.div 
      animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
      transition={{ duration: 12, repeat: Infinity, delay: 1 }}
      className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60" 
    />
    <motion.div 
      animate={{ x: [0, 50, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60" 
    />
  </div>
);

const AudioController = ({ hasStarted }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Auto-play when user clicks "Enter" on welcome screen
  useEffect(() => {
    if (hasStarted && audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
      setIsPlaying(true);
    }
  }, [hasStarted]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={(el) => { audioRef.current = el; }} loop src="/sounds/bg-music.mp3" />
      <motion.button
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="bg-white/80 backdrop-blur-md p-4 rounded-full shadow-xl border-2 border-white text-rose-400 hover:text-rose-500 transition-colors"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </motion.button>
    </div>
  );
};

// --- MAIN PAGE ---
export default function Portfolio() {
  const [hasStarted, setHasStarted] = useState(false);

  // Start Experience Handler
  const handleStart = () => {
    setHasStarted(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#fbcfe8', '#c4b5fd', '#bae6fd', '#bbf7d0'] // Pastel confetti
    });
  };

  const playClickSound = () => {
    try {
      const audio = new Audio('/sounds/click.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch (e) {}
  };

  return (
    <>
      {/* Import Cute Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap');
        body { font-family: 'Quicksand', sans-serif; }
      `}</style>

      {/* WELCOME SCREEN (Forces Interaction for Audio) */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center justify-center text-center p-6"
          >
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8"
            >
              <span className="text-8xl">🌸</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-700 mb-4">Welcome to Neh's World</h1>
            <p className="text-slate-500 mb-8 text-lg">Turn up your volume for the full experience! 🎧</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-10 py-4 bg-white text-slate-700 font-bold rounded-full shadow-lg border-4 border-rose-200 text-xl hover:bg-rose-50 transition-colors"
            >
              Enter Portfolio ✨
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#fff5f7] text-slate-600 selection:bg-rose-200">
        <BackgroundBlobs />
        
        {/* Navigation */}
        <nav className="fixed top-0 w-full backdrop-blur-sm bg-white/40 z-40 border-b border-white/50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <motion.h1 
              whileHover={{ rotate: -5, scale: 1.1 }}
              className="text-2xl font-bold text-rose-400 cursor-default"
            >
              np<span className="text-purple-400">.</span>
            </motion.h1>
            <div className="flex gap-4">
              {[
                { icon: Github, link: resumeData.socials.github },
                { icon: Linkedin, link: resumeData.socials.linkedin },
                { icon: Mail, link: resumeData.socials.email }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={playClickSound}
                  className="p-2 rounded-full bg-white/50 hover:bg-white text-slate-400 hover:text-rose-400 shadow-sm transition-all"
                >
                  <item.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
          
          {/* HERO SECTION */}
          <section className="mb-32 text-center relative">
            <motion.div
              variants={popVariant}
              initial="hidden"
              animate={hasStarted ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-white/60 border border-white shadow-sm text-rose-400 font-bold"
            >
              <Sparkles size={16} /> Hello! I'm Neh
            </motion.div>
            
            <motion.h1
              variants={popVariant}
              initial="hidden"
              animate={hasStarted ? "visible" : "hidden"}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl font-bold mb-6 text-slate-800 tracking-tight"
            >
              Software
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-purple-300 to-blue-300">
                Engineer
              </span>
            </motion.h1>

            <motion.p 
              variants={popVariant}
              initial="hidden"
              animate={hasStarted ? "visible" : "hidden"}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed mb-10"
            >
              {resumeData.summary}
            </motion.p>

            <motion.div 
              variants={popVariant}
              initial="hidden"
              animate={hasStarted ? "visible" : "hidden"}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-4"
            >
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:nehpatel30062004@gmail.com"
                className="px-8 py-3 rounded-2xl bg-slate-800 text-white font-bold shadow-lg shadow-slate-200 hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
              >
                 <Heart size={18} fill="currentColor" /> Let's Chat
              </motion.a>
              <motion.a 
                 href="/resume.pdf"
                 target="_blank"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={playClickSound}
                 className="px-8 py-3 rounded-2xl bg-white text-slate-600 font-bold shadow-sm border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-2"
              >
                <FileText size={18} /> Resume
              </motion.a>
            </motion.div>
          </section>

          {/* SKILLS */}
          <section className="mb-32">
            <motion.div 
               variants={floatingVariant}
               animate="animate"
               className="flex flex-wrap justify-center gap-4"
            >
              {resumeData.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: i * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: Math.random() * 10 - 5 }}
                  className="px-5 py-3 rounded-2xl bg-white/70 border border-white shadow-sm text-slate-600 font-bold cursor-default hover:bg-rose-50 hover:text-rose-500 transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </section>

          {/* PROJECTS */}
          <section>
            <div className="flex items-center justify-center gap-2 mb-12 opacity-50">
               <div className="h-px w-10 bg-slate-300"></div>
               <span className="uppercase tracking-widest text-sm font-bold">Featured Works</span>
               <div className="h-px w-10 bg-slate-300"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {resumeData.projects.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`p-8 rounded-[2rem] ${project.color} bg-opacity-40 border-2 border-white/50 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-white text-slate-700 shadow-sm">
                      {i === 0 ? <Code2 size={24} /> : i === 1 ? <Terminal size={24} /> : <Database size={24} />}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-slate-800">{project.title}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-4">{project.tagline}</p>
                  
                  {project.award && (
                     <div className="mb-4 inline-block px-3 py-1 bg-yellow-300/30 text-yellow-700 rounded-lg text-sm font-bold">
                        {project.award}
                     </div>
                  )}

                  <p className="mb-6 opacity-80 leading-relaxed text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-lg bg-white/60 text-xs font-bold text-slate-600">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

        </main>

        <footer className="text-center py-10 text-slate-400 text-sm font-medium">
          <p>© 2025 Neh Patel <br/> Built with 💖 and Next.js</p>
        </footer>

        {/* Pass the start state to the audio controller */}
        <AudioController hasStarted={hasStarted} />
      </div>
    </>
  );
}