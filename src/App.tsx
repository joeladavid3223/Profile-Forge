/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  Terminal as TerminalIcon, 
  Star, 
  Coffee, 
  Zap, 
  Command,
  Plus,
  ArrowUpRight,
  Smile,
  Heart,
  Code,
  Music,
  Move,
  X
} from 'lucide-react';

// --- Components ---

const DraggableNote = () => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 300, top: 0, bottom: 300 }}
      whileDrag={{ scale: 1.05, rotate: 2 }}
      className="fixed top-40 right-10 w-48 h-48 bg-yellow-100 p-4 rough-border-sm z-[60] cursor-grab active:cursor-grabbing shadow-xl rotate-[-3deg]"
    >
      <div className="flex justify-between items-center mb-2">
        <Move size={12} className="opacity-30" />
        <button onClick={() => setIsVisible(false)} className="hover:text-accent"><X size={14} /></button>
      </div>
      <p className="font-serif italic text-sm leading-tight">
        "Don't forget to check the terminal. It's not just for show."
      </p>
      <div className="absolute bottom-2 right-2 text-[10px] font-bold opacity-20">DRAG ME</div>
    </motion.div>
  );
};

const NowPlaying = () => {
  return (
    <div className="fixed bottom-8 right-8 bg-ink text-paper p-3 rough-border-sm flex items-center space-x-3 z-50 animate-bounce-slow">
      <div className="w-8 h-8 bg-accent flex items-center justify-center">
        <Music size={16} className="animate-pulse" />
      </div>
      <div className="text-[10px] font-bold uppercase tracking-widest">
        <div className="opacity-50">Now Listening</div>
        <div>Aphex Twin - #3</div>
      </div>
    </div>
  );
};

const Doodle = ({ className, d, size = 100 }: { className?: string, d: string, size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    className={`pointer-events-none ${className}`}
  >
    <path 
      d={d} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      className="doodle-path"
    />
  </svg>
);

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-16 border-r-2 border-ink hidden lg:flex flex-col items-center justify-between py-8 z-50 bg-paper">
      <div className="text-xl font-black rotate-[-90deg] tracking-tighter">HC.2026</div>
      <div className="flex flex-col space-y-8">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Github size={20} /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Linkedin size={20} /></a>
        <a href="mailto:hello@harish.dev" className="hover:text-accent transition-colors"><Mail size={20} /></a>
      </div>
      <div className="text-vertical text-[10px] font-bold uppercase tracking-widest opacity-30">Mangalore, India</div>
    </div>
  );
};

const MoodSelector = ({ currentMood, setMood }: { currentMood: string, setMood: (m: string) => void }) => {
  const moods = [
    { name: 'Vibrant', color: '#ff4e00' },
    { name: 'Forest', color: '#2d5a27' },
    { name: 'Ocean', color: '#0077b6' },
    { name: 'Cyber', color: '#bc00dd' },
  ];

  return (
    <div className="fixed top-8 right-8 flex space-x-2 z-50 bg-paper p-2 rough-border-sm">
      {moods.map((m) => (
        <button
          key={m.name}
          onClick={() => setMood(m.color)}
          className={`w-6 h-6 rough-border-sm transition-transform hover:scale-125 ${currentMood === m.color ? 'scale-110 border-2' : ''}`}
          style={{ backgroundColor: m.color }}
          title={m.name}
        />
      ))}
    </div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
      <motion.div 
        className="h-full bg-accent origin-left"
        style={{ scaleX: pathLength }}
      />
    </div>
  );
};

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(['Welcome to Harish\'s brain.', 'Type "help" for options.']);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    let response = '';

    if (cmd === 'help') response = 'Available: about, skills, projects, clear';
    else if (cmd === 'about') response = 'IT Grad @ SJEC. Self-taught. Problem solver.';
    else if (cmd === 'skills') response = 'Python, React, Tailwind, Photoshop, Excel.';
    else if (cmd === 'projects') response = 'Check the section below! Or type "github".';
    else if (cmd === 'clear') { setHistory([]); setInput(''); return; }
    else response = `Command not found: ${cmd}`;

    setHistory([...history, `> ${input}`, response]);
    setInput('');
  };

  return (
    <div className="rough-border bg-ink text-paper p-4 font-mono text-sm w-full max-w-md rotate-[-1deg]">
      <div className="flex items-center space-x-2 mb-4 border-b border-paper/20 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 opacity-50 text-[10px]">harish@workspace: ~</span>
      </div>
      <div className="h-48 overflow-y-auto mb-4 space-y-1 scrollbar-hide">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-accent' : ''}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleCommand} className="flex">
        <span className="mr-2 text-accent">$</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none flex-1"
          placeholder="..."
        />
      </form>
    </div>
  );
};

const Sticker = ({ children, className, rotate = 0 }: { children: React.ReactNode, className?: string, rotate?: number }) => (
  <motion.div 
    whileHover={{ scale: 1.1, rotate: rotate + 5 }}
    className={`absolute p-3 bg-white rough-border-sm text-xs font-bold z-20 cursor-pointer ${className}`}
    style={{ rotate }}
  >
    {children}
  </motion.div>
);

const Hero = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-8 lg:pl-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 relative">
          <Doodle 
            className="absolute -top-10 -left-10 text-accent opacity-20"
            d="M10,50 Q25,25 50,50 T90,50"
            size={120}
          />
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-accent font-bold uppercase tracking-tighter text-lg mb-4 block">/ Entry-level Dev</span>
            <h1 className="text-7xl md:text-9xl font-black leading-[0.85] mb-8">
              HARISH <br />
              <span className="italic text-paper stroke-ink" style={{ WebkitTextStroke: '2px #1a1a1a' }}>COSTA</span>
            </h1>
            <p className="text-2xl md:text-3xl font-medium max-w-xl leading-tight mb-12">
              I build <span className="hand-drawn-underline">functional things</span> for the web. Mostly self-taught, entirely curious, and slightly obsessed with clean logic.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-ink text-paper font-black text-xl rough-border flex items-center group"
            >
              HIRE ME <Plus className="ml-2 group-hover:rotate-90 transition-transform" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-paper text-ink font-black text-xl rough-border flex items-center"
            >
              RESUME <ArrowRight className="ml-2" />
            </motion.button>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-center relative">
          <Terminal />
          <Sticker rotate={-12} className="top-[-20px] right-[20px] bg-yellow-200">
            <Smile size={16} className="inline mr-1" /> HELLO WORLD
          </Sticker>
          <Sticker rotate={8} className="bottom-[-30px] left-[10px] bg-blue-200">
            <Zap size={16} className="inline mr-1" /> FAST LEARNER
          </Sticker>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-20 right-[-100px] text-[20vw] font-black opacity-[0.03] pointer-events-none select-none">
        CREATIVE
      </div>
    </section>
  );
};

const DigitalGarden = () => {
  const notes = [
    { title: "Python", content: "My first love. Automation, scripts, and logic.", color: "bg-green-100" },
    { title: "React", content: "Building interfaces that feel alive.", color: "bg-blue-100" },
    { title: "Design", content: "Photoshop & Canva. I like things looking sharp.", color: "bg-pink-100" },
    { title: "Focus", content: "I thrive in deep work. No distractions.", color: "bg-purple-100" },
  ];

  return (
    <section className="py-32 px-8 lg:pl-32 bg-ink text-paper relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20">
          <h2 className="text-6xl md:text-8xl font-black italic mb-8 md:mb-0">
            BRAIN <br /> DUMP
          </h2>
          <div className="max-w-md text-paper/60 font-mono text-sm">
            // This is where I keep my thoughts and tools. 
            A digital garden of things I\'ve learned and things I\'m still figuring out.
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <Doodle 
            className="absolute -bottom-20 -right-10 text-accent opacity-10 rotate-45"
            d="M10,10 C40,40 10,60 90,90"
            size={150}
          />
          {notes.map((note, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
              className={`${note.color} text-ink p-8 rough-border min-h-[250px] flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{note.title}</h3>
                <p className="font-medium leading-tight">{note.content}</p>
              </div>
              <div className="flex justify-between items-center opacity-30">
                <Star size={16} />
                <span className="text-[10px] font-bold">0{i+1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Work = () => {
  const projects = [
    { 
      title: "FILE SORTER", 
      desc: "Python script that cleans your mess.", 
      tag: "AUTOMATION",
      img: "https://picsum.photos/seed/code/800/600"
    },
    { 
      title: "COMMERCE UI", 
      desc: "A homestay platform for locals.", 
      tag: "FRONTEND",
      img: "https://picsum.photos/seed/house/800/600"
    },
    { 
      title: "DATA TRACKER", 
      desc: "Inventory system for small shops.", 
      tag: "LOGIC",
      img: "https://picsum.photos/seed/data/800/600"
    },
  ];

  return (
    <section className="py-32 px-8 lg:pl-32 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-4">SELECTED</h2>
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter italic text-accent ml-12 md:ml-32">WORKS</h2>
        </div>

        <div className="space-y-32">
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center relative`}
            >
              <div className="absolute -top-10 -left-4 text-8xl font-black opacity-[0.05] pointer-events-none">
                0{i + 1}
              </div>
              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-accent translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform" />
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full aspect-video object-cover rough-border grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 space-y-6">
                <span className="font-mono text-accent font-bold text-sm">[{p.tag}]</span>
                <h3 className="text-5xl font-black">{p.title}</h3>
                <p className="text-xl font-medium text-ink/70">{p.desc}</p>
                <div className="flex space-x-4 pt-4">
                  <a href="#" className="font-black text-sm uppercase tracking-widest flex items-center hover:text-accent transition-colors">
                    GitHub <ArrowUpRight size={16} className="ml-1" />
                  </a>
                  <a href="#" className="font-black text-sm uppercase tracking-widest flex items-center hover:text-accent transition-colors">
                    Demo <ArrowUpRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutExpansion = () => (
  <section className="py-20 px-8 lg:pl-32 bg-paper border-t-2 border-ink">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-black mb-6 italic">BEYOND THE <span className="text-accent">CODE</span></h2>
      <p className="text-xl font-medium leading-relaxed">
        I grew up in Mangalore, surrounded by the smell of the ocean and old hardware. 
        When I'm not coding, I'm probably trying to fix a broken mechanical keyboard or 
        hunting for the perfect cup of filter coffee. I believe the best tools are the ones 
        that feel like they were made by a human, for a human.
      </p>
    </div>
  </section>
);

const Currently = () => (
  <section className="py-20 px-8 lg:pl-32 bg-ink text-paper">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-5xl font-black mb-10 uppercase tracking-tighter">Currently</h2>
      <ul className="space-y-6 font-mono text-lg max-w-2xl">
        <li className="flex items-start gap-4">
          <span className="text-accent font-bold mt-1">/</span>
          <span>Learning: Advanced TypeScript patterns (the ones that actually make sense).</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-accent font-bold mt-1">/</span>
          <span>Building: A minimalist habit tracker that doesn't nag me.</span>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-accent font-bold mt-1">/</span>
          <span>Improving: My touch typing speed (currently stuck at 70wpm).</span>
        </li>
      </ul>
    </div>
  </section>
);

const NewProjects = () => (
  <section className="py-32 px-8 lg:pl-32 bg-paper">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-6xl font-black mb-20 italic">SIDE <span className="text-accent">QUESTS</span></h2>
      <div className="grid md:grid-cols-2 gap-12">
        {[
          { 
            name: "Habitual", 
            desc: "A habit tracker for people who hate habit trackers. No streaks, just progress.",
            challenge: "Managing complex state transitions without making the UI feel like a spreadsheet."
          },
          { 
            name: "Key-Tune", 
            desc: "A web app that plays mechanical switch sounds as you type. Purely for the vibes.",
            challenge: "Reducing audio latency to sub-10ms for that satisfying 'thocky' feedback."
          }
        ].map((p, i) => (
          <div key={i} className="rough-border p-8 bg-white hover:rotate-1 transition-transform">
            <h3 className="text-3xl font-black mb-4">{p.name}</h3>
            <p className="font-medium mb-6 opacity-80">{p.desc}</p>
            <div className="pt-4 border-t border-ink/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-accent block mb-2">The Challenge</span>
              <p className="text-sm italic font-serif">{p.challenge}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section className="py-20 px-8 lg:pl-32 bg-paper border-t-2 border-ink">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-black mb-12 uppercase tracking-tighter">Toolkit</h2>
      <div className="flex flex-wrap gap-3">
        {["Python", "React", "Tailwind", "Photoshop", "Excel", "SQL", "Git", "Framer Motion", "TypeScript"].map((skill) => (
          <span key={skill} className="px-6 py-3 bg-ink text-paper font-bold text-sm rough-border-sm hover:bg-accent transition-colors cursor-default">
            {skill}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const Learning = () => (
  <section className="py-20 px-8 lg:pl-32 bg-ink text-paper">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-5xl font-black mb-10 uppercase tracking-tighter">What I'm Learning</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["Rust", "UI Motion Design", "System Design", "Cloud Architecture"].map((topic) => (
          <div key={topic} className="p-6 border border-paper/20 rough-border-sm hover:border-accent transition-colors group">
            <div className="text-accent mb-2 group-hover:scale-110 transition-transform">
              <Zap size={20} />
            </div>
            <span className="font-bold uppercase tracking-widest text-xs">{topic}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-32 px-8 lg:pl-32 bg-accent text-paper relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-7xl md:text-9xl font-black leading-none mb-8">SAY <br /> HI.</h2>
            <p className="text-2xl font-bold mb-12 max-w-md">
              I'm currently looking for new opportunities. If you have a project or just want to chat, drop a line.
            </p>
            <div className="space-y-4 font-mono text-xl font-bold">
              <a href="mailto:hello@harish.dev" className="block hover:underline">hello@harish.dev</a>
              <a href="#" className="block hover:underline">@harishcosta</a>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <div className="rough-border bg-paper text-ink p-8 rotate-[2deg]">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest mb-2">Your Name</label>
                      <input required type="text" className="w-full bg-transparent border-b-2 border-ink py-2 outline-none font-bold" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest mb-2">Message</label>
                      <textarea required rows={4} className="w-full bg-transparent border-b-2 border-ink py-2 outline-none font-bold resize-none" />
                    </div>
                    <button className="w-full py-4 bg-ink text-paper font-black uppercase tracking-widest hover:bg-ink/90 transition-colors">
                      Send Message
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="text-5xl">🎉</div>
                    <h3 className="text-2xl font-black uppercase">Transmission Received!</h3>
                    <p className="font-medium opacity-60">I'll get back to you faster than a Python script.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hand drawn arrow decoration */}
      <div className="absolute top-20 right-20 opacity-20 hidden lg:block">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 180C50 150 150 150 180 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M160 20H180V40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 px-8 lg:pl-32 bg-paper border-t-2 border-ink">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center space-x-2 font-black text-xl">
        <Heart size={20} className="text-accent fill-accent" />
        <span>HARISH COSTA 2026</span>
      </div>
      <div className="flex space-x-8 font-mono text-xs font-bold uppercase tracking-widest opacity-50">
        <span>Built with React</span>
        <span>No Templates</span>
        <span>Handcrafted</span>
      </div>
      <div className="flex space-x-6">
        <Github size={20} />
        <Linkedin size={20} />
        <Mail size={20} />
      </div>
    </div>
  </footer>
);

export default function App() {
  const [accentColor, setAccentColor] = useState('#ff4e00');

  useEffect(() => {
    document.documentElement.style.setProperty('--color-accent', accentColor);
  }, [accentColor]);

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-accent/30 selection:text-paper">
      <div className="bg-noise fixed inset-0 pointer-events-none z-[100]" />
      <ScrollProgress />
      <Sidebar />
      <MoodSelector currentMood={accentColor} setMood={setAccentColor} />
      <DraggableNote />
      <NowPlaying />
      <main>
        <Hero />
        <DigitalGarden />
        <Work />
        <AboutExpansion />
        <Currently />
        <NewProjects />
        <Skills />
        <Learning />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}



