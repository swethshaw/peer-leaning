import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  Trophy,
  Zap,
  BookOpen,
  LayoutGrid,
  ChevronRight,
  Target,
  Rocket,
  ShieldCheck,
  Code,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Layers,
  Activity,
  CheckCircle2,
  Lock,
  MousePointer2
} from "lucide-react";

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-slate-200 p-4 md:p-8 font-sans overflow-x-hidden selection:bg-blue-500/30 pb-20">
      <Navbar />
      <main>
        <HeroSection />
        <GlobalTrustScroll />
        <UnifiedEcosystem />
        <FeaturesGrid />
        <ProjectMarketplaceSection />
        <GamificationShowcase />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-[#020617]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
            <GraduationCap size={24} />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
            PeerLearning
          </span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 px-8 py-2 bg-slate-100/50 dark:bg-slate-800/40 rounded-full border border-slate-200/50 dark:border-slate-700/50">
          <NavLink label="Curriculum" />
          <NavLink label="Lobbies" />
          <NavLink label="Projects" />
          <NavLink label="Leaderboard" />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden md:block font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors px-4">
            Sign In
          </Link>
          <Link
            to="/register"
            className="group relative inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-blue-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-blue-700 shadow-lg shadow-blue-500/25"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 px-6 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-violet-600/10 dark:bg-violet-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 mb-8 text-xs font-black tracking-widest uppercase border border-blue-200 dark:border-blue-800 shadow-sm"
        >
          <Sparkles size={14} className="animate-pulse" />
          The Unified Workspace for Builders
        </motion.div>

        <motion.h1
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-slate-900 dark:text-white leading-[0.9]"
        >
          <motion.span variants={fadeInUp} className="block">Master Mastery.</motion.span>
          <motion.span variants={fadeInUp} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-500 to-indigo-400">
            Build Reality.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto font-medium leading-relaxed"
        >
          Bridge the gap between theory and execution. Join elite cohorts to tackle complex LMS tracks, compete in live lobbies, and ship industrial-grade projects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            to="/register"
            className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3"
          >
            Enter Arena <Rocket size={22} />
          </Link>
          <Link
            to="/explore"
            className="w-full sm:w-auto group bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-10 py-5 rounded-2xl font-black text-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm"
          >
            Browse Projects <Layers className="group-hover:rotate-12 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function GlobalTrustScroll() {
  return (
    <div className="py-10 bg-white/50 dark:bg-slate-900/50 border-y border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center md:justify-between gap-8 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
           <TrustItem icon={<Code size={20}/>} label="OpenSource Built" />
           <TrustItem icon={<ShieldCheck size={20}/>} label="Verified Mentors" />
           <TrustItem icon={<Activity size={20}/>} label="Live Training" />
           <TrustItem icon={<Trophy size={20}/>} label="XP Backed" />
        </div>
      </div>
    </div>
  );
}

function UnifiedEcosystem() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            A Single, <span className="text-blue-600">Powerful</span> Ecosystem
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Theory + Assessment + Collaboration</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <EcoCard 
            icon={<BookOpen className="text-blue-500" />}
            title="Intelligent LMS"
            desc="Structured curriculum tracks synced with your cohort. Every module is a step toward project readiness."
          />
          <EcoCard 
            icon={<Zap className="text-amber-500" fill="currentColor" />}
            title="Live Peer Arenas"
            desc="Timed assessment lobbies. Compete with 50+ peers simultaneously in real-time technical duels."
          />
          <EcoCard 
            icon={<Code className="text-violet-500" />}
            title="Project Marketplace"
            desc="Host your ideas, hire teammates, and build modular software with integrated review cycles."
          />
        </div>
      </div>
    </section>
  );
}

function ProjectMarketplaceSection() {
  return (
    <section className="py-24 px-6 mx-4 md:mx-10 my-20 bg-slate-900 dark:bg-slate-950 rounded-[3.5rem] relative overflow-hidden shadow-3xl">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-blue-400 mb-6 text-xs font-black tracking-widest uppercase border border-white/10">
            <Rocket size={14} /> The Production Engine
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.95] mb-8">
            Don't just code. <br/>
            <span className="text-blue-500 italic font-serif">Ship together.</span>
          </h2>
          <div className="space-y-6">
            <FeatureCheck label="Divide projects into specific, hireable roles" />
            <FeatureCheck label="Shortlist peers based on verified cohort reputation" />
            <FeatureCheck label="Integrated submission gateways with PR feedback" />
          </div>
        </div>

        <div className="relative group">
          <motion.div 
            whileHover={{ rotateY: -5, rotateX: 5 }}
            className="bg-[#0B0F19] border border-slate-800 rounded-3xl p-8 shadow-2xl transition-all"
          >
             <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-6">
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full bg-red-500" />
                   <div className="w-3 h-3 rounded-full bg-amber-500" />
                   <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Workspace_v2.0</span>
             </div>
             <div className="space-y-4">
                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center justify-between group-hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Code size={20}/></div>
                    <div>
                      <p className="text-white font-bold text-sm">Auth API Service</p>
                      <p className="text-xs text-slate-500 font-medium">3 Applicants Pending Review</p>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white text-[10px] font-black uppercase px-4 py-2 rounded-lg">Shortlist</button>
                </div>
                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500"><Activity size={20}/></div>
                    <div>
                      <p className="text-white font-bold text-sm">Realtime Socket Hub</p>
                      <p className="text-xs text-emerald-500 font-medium tracking-wide font-black uppercase text-[10px]">Active Node Assigned</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-[10px] font-black">JD</div>
                </div>
             </div>
          </motion.div>
          {/* Floating UI element */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -bottom-6 -left-10 bg-white text-slate-900 p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-100"
          >
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Target size={20}/></div>
            <div>
               <p className="text-xs font-black uppercase tracking-tighter leading-none">Task Approved</p>
               <p className="text-[10px] text-slate-500 font-bold">120 XP earned by peer</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GamificationShowcase() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
            The Leaderboard is your Resume.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xl font-medium leading-relaxed">
            Every lobby you win and every project module you complete earns you XP. Build a verifiable proof-of-work that actually means something.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 w-full">
           <StatDisplay icon={<Target className="text-emerald-500"/>} value="99.2%" label="Accuracy" />
           <StatDisplay icon={<Users className="text-blue-500"/>} value="240+" label="Collaborators" />
           <StatDisplay icon={<Activity className="text-orange-500"/>} value="365d" label="Hard Streak" />
           <StatDisplay icon={<Trophy className="text-amber-500"/>} value="#4" label="Global Rank" />
        </div>
      </div>
    </section>
  );
}

// Helper Components
function NavLink({ label }: { label: string }) {
  return (
    <span className="text-sm font-bold text-slate-500 hover:text-blue-600 cursor-pointer transition-colors">
      {label}
    </span>
  );
}

function TrustItem({ icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-sm uppercase tracking-tighter">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function EcoCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function FeatureCheck({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
        <CheckCircle2 size={14} className="text-blue-400" />
      </div>
      <span className="text-slate-300 font-bold text-lg tracking-tight">{label}</span>
    </div>
  );
}

function StatDisplay({ icon, value, label }: { icon: any, value: string, label: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl text-center shadow-sm">
      <div className="flex justify-center mb-4">{icon}</div>
      <div className="text-4xl font-black text-slate-900 dark:text-white mb-1 tracking-tighter">{value}</div>
      <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{label}</div>
    </div>
  );
}

function FeaturesGrid() {
  return (
    <section className="py-24 px-6 bg-slate-100 dark:bg-[#0B0F19]/50">
       <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureTile icon={<Code />} label="Git-Sync Progress" />
          <FeatureTile icon={<Users />} label="Cohort Matching" />
          <FeatureTile icon={<Activity />} label="Real-time Analytics" />
          <FeatureTile icon={<ShieldCheck />} label="Verified Credentials" />
       </div>
    </section>
  );
}

function FeatureTile({ icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-center gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
       <div className="text-blue-500">{icon}</div>
       <span className="font-black text-xs uppercase tracking-widest text-slate-700 dark:text-slate-300">{label}</span>
    </div>
  );
}

function CTASection() {
  return (
    <section className="py-40 text-center px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">
          Ready to enter <br className="hidden md:block" /> the <span className="text-blue-600">Arena</span>?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xl font-medium mb-12 max-w-xl mx-auto leading-relaxed">
          The most ambitious students in the world are waiting for you. Stop watching tutorials, start shipping.
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-3 bg-blue-600 text-white px-12 py-6 rounded-2xl font-black text-2xl hover:-translate-y-1 transition-all shadow-2xl shadow-blue-500/40 active:scale-95"
        >
          Begin Your Journey <Rocket size={24} />
        </Link>
      </div>
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#020617] py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xs">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <GraduationCap size={16} />
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
              PeerLearning
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">
            Building the next generation of engineers through competition and cohort-based collaboration.
          </p>
          <div className="flex gap-4">
             <SocialIcon icon={<Code size={20}/>} />
             <SocialIcon icon={<Activity size={20}/>} />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
          <FooterColumn title="Platform" links={["Curriculum", "Arenas", "Marketplace"]} />
          <FooterColumn title="Community" links={["Lobbies", "Leaderboard", "Discord"]} />
          <FooterColumn title="Legal" links={["Privacy", "Terms"]} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} PeerLearning Labs. Built for the Arena.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string, links: string[] }) {
  return (
    <div className="flex flex-col gap-4">
       <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-2">{title}</p>
       {links.map(l => (
         <span key={l} className="text-sm font-bold text-slate-500 hover:text-blue-600 cursor-pointer transition-colors">{l}</span>
       ))}
    </div>
  );
}

function SocialIcon({ icon }: { icon: any }) {
  return (
    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all cursor-pointer border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
      {icon}
    </div>
  );
}