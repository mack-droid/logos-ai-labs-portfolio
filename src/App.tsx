import React, { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Terminal, 
  Brain, 
  ExternalLink, 
  Star, 
  Mail, 
  Linkedin, 
  Github, 
  Cpu, 
  BookOpen, 
  Radio, 
  Play, 
  Check, 
  Loader2, 
  Lock, 
  AlertTriangle, 
  ChevronRight,
  Sparkles,
  ArrowRight,
  Database,
  MapPin,
  FileCode,
  Layers,
  X,
  RefreshCw,
  Clock,
  Award,
  BookMarked,
  Activity,
  Briefcase,
  Sliders,
  Send
} from "lucide-react";
import { 
  Project, 
  ResearchCard, 
  SpeakingCard, 
  USERNAME_PLACEHOLDER, 
  FEATURED_PROJECTS, 
  STATIC_RESEARCH, 
  STATIC_SPEAKING,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_COPYRIGHT
} from "./types";

const SHOW_STATUS = true;

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "speaking", label: "Speaking" },
  { id: "lab", label: "OffSec Lab" },
  { id: "connect", label: "Connect" }
];

const JOB_HISTORY = [
  {
    company: "Deutsche Bank AG",
    role: "Senior Security Engineer / TISO",
    period: "Nov 2024 - Present",
    location: "Dublin, Ireland",
    badge: "Current / Lead Role",
    highlights: [
      "AI Platform Security & Governance: Defining and finalizing AI security controls, governance requirements, and secure architecture standards for an enterprise AI development platform.",
      "OSS Model Onboarding Framework: Engineered a controlled approval pipeline with automated policy checks, Hugging Face models mirrored via Artifactory, and security gates prior to model promotion.",
      "Enterprise GenAI Access Gateway: Developing a unified centralized governance layer routing Generative AI API/SDK queries to enforce logging, budget bounds, and compliance controls.",
      "AI Security Guardrails: Implemented and enhanced input/output sanitization filters using Presidio and pattern filters to block prompt injection and reduce sensitive data exposure.",
      "GenAI-Powered Secret Scanner: Authored an LLM-guided high-precision pipeline scanner, lowering False Positives by 85% to expedite developer remediation loops.",
      "IAM Compliance: Conducted Segregation of Duties (SoD) reviews and access attestations across 30+ core business apps, reducing cross-role violations by 45%."
    ]
  },
  {
    company: "KPMG Ireland",
    role: "Senior Security Consultant",
    period: "Nov 2022 - March 2023",
    location: "Dublin, Ireland",
    badge: "Consulting",
    highlights: [
      "EDR Security Assessments: Conducted defensive posturing audits by triggering simulated malware binaries, path privilege escalations, and analyzing endpoint responses.",
      "Penetration Testing: Conducted full-scope ethical hacking assessments against internal and external corporate networks, client APIs, and wireless networks.",
      "Phishing Campaigns: Designed and managed targeted threat simulation exercises to test and baseline employee security awareness scores.",
      "Risk Advisory: Analyzed posture gaps and provided strategic, developer-focused remediation roadmaps to financial and retail clients."
    ]
  },
  {
    company: "Mahindra Defence Systems Limited (SSG)",
    role: "Application Security Engineer",
    period: "May 2021 - Dec 2021",
    location: "India",
    badge: "Defense & Gov",
    highlights: [
      "Application Pentesting: Hardened critical software by evaluating vulnerabilities mapping to OWASP Top 10 and SANS Top 25.",
      "Threat Modeling: Executed STRIDE and DREAD analyses on critical services during core application design phases.",
      "CIS Audits: Handled comprehensive CIS Benchmark audits for MySQL, VMware infrastructure, Exchange, and Active Directory servers.",
      "AD Labs & POCs: Created simulated AD domain structures to train standard penetration testers, and drafted end-to-end vulnerability POCs."
    ]
  },
  {
    company: "NCR Corporation",
    role: "Security Engineer",
    period: "Feb 2020 - May 2021",
    location: "India",
    badge: "AppSec",
    highlights: [
      "VAPT: Assessed payment gateways and POS backing web applications based on OSSTMM and OWASP methodologies.",
      "Federation & SAML: Constructed SSO federation integrations using SAML 2.0 and Azure Active Directory (AAD).",
      "OIM Automation Code: Engineered custom onboarding code to programmatically register and securely credential over 2,000 active identities."
    ]
  },
  {
    company: "Google India (CW / Vaco Binary Semantics)",
    role: "Security Analyst",
    period: "Oct 2018 - Dec 2019",
    location: "India",
    badge: "Big Tech Contract",
    highlights: [
      "VAPT & Code Review: Audited Google's internal productivity tools using Burp Suite, Nessus, and source analyzer packages.",
      "GCP IAM Boundaries: Structured and enforced business role mappings and IAM permission sets inside the Google Cloud Platform.",
      "Secure Coding Training: Organized interactive developer training sessions demonstrating secure remediation mechanics."
    ]
  },
  {
    company: "Deloitte USI",
    role: "Security Analyst",
    period: "Jan 2017 - July 2018",
    location: "India",
    badge: "Big Four Security",
    highlights: [
      "Identity Management: Managed lifecycle provisioning, certifications, entitlement validation, and onboarding workflows.",
      "Web Pentesting: Performed application security assessments, static code analyses, and compiled remediation checklists."
    ]
  }
];

const TECHNICAL_SKILLS_CATEGORIES = [
  {
    title: "AI Security & LLM Guardrails",
    skills: ["Presidio Filters", "Prompt Injection Red Teaming", "Hugging Face Secure Mirrors", "AIVSS Mapping", "Vertex AI Gateway Design", "LangGraph Node Isolation"]
  },
  {
    title: "Identity & Access Management (IAM)",
    skills: ["SailPoint IIQ", "Oracle IDM", "AWS IAM Policies", "GCP IAM Role Hardening", "Active Directory Labs", "Segregation of Duties (SoD)", "SAML 2.0 / Azure AD"]
  },
  {
    title: "Application Security & Tooling",
    skills: ["Threat Modeling (STRIDE / DREAD)", "Burp Suite Pro", "OWASP Top 10", "SAST/DAST/SCA", "GitHub Actions DevSecOps", "Snyk", "SonarQube", "Nessus", "Veracode"]
  },
  {
    title: "Programming & Automation",
    skills: ["Python", "JavaScript / TypeScript", "PowerShell Security Scripts", "Java", "Secure API Integrations", "LLM-Powered Secret Scanners"]
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollPercent, setScrollPercent] = useState(0);
  
  const [repos, setRepos] = useState<Project[]>(FEATURED_PROJECTS);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [reposError, setReposError] = useState(false);

  const [email, setEmail] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const [sandboxOpen, setSandboxOpen] = useState(false);
  const [selectedAttack, setSelectedAttack] = useState<"confused-composer" | "model-poisoning" | "presidio-guard" | null>(null);
  const [attackRunning, setAttackRunning] = useState(false);
  const [attackLogs, setAttackLogs] = useState<string[]>([]);
  const [attackSuccess, setAttackSuccess] = useState(false);

  const [diagnosticText, setDiagnosticText] = useState("MONITOR STATUS: STANDBY");
  const [threatLevel, setThreatLevel] = useState("LOW");

  const [selectedJobIndex, setSelectedJobIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).tsParticles) {
      (window as any).tsParticles.load("hero-particles", {
        fpsLimit: 60,
        particles: {
          number: {
            value: isMobile ? 18 : 45,
            density: {
              enable: false
            }
          },
          color: {
            value: "#00ffaa"
          },
          links: {
            enable: true,
            color: "#00ffaa",
            distance: 140,
            opacity: 0.12,
            width: 1
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: true,
            straight: false,
            outModes: "bounce"
          },
          size: {
            value: { min: 1, max: 2.2 }
          },
          opacity: {
            value: { min: 0.2, max: 0.5 }
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            },
            onClick: {
              enable: true,
              mode: "push"
            }
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4
            },
            push: {
              quantity: 2
            }
          }
        },
        detectRetina: true
      }).then((container: any) => {
        const handleVisibilityChange = () => {
          if (document.hidden) {
            container.pause();
          } else {
            container.play();
          }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
          document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
      }).catch((err: any) => {
        console.warn("tsParticles load error:", err);
      });
    }
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercent(window.scrollY / totalHeight);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);

          switch (id) {
            case "home":
              setDiagnosticText("MONITOR STATUS: STANDBY");
              setThreatLevel("LOW");
              break;
            case "about":
              setDiagnosticText("COGNITIVE AUDIT: OWASP V2 ACTIVE");
              setThreatLevel("MEDIUM");
              break;
            case "experience":
              setDiagnosticText("VERIFYING SECURITY WORK ROLES");
              setThreatLevel("LOW");
              break;
            case "projects":
              setDiagnosticText("INTEGRITY CHECKS: VERIFIED");
              setThreatLevel("LOW");
              break;
            case "research":
              setDiagnosticText("THREAT MATRIX ACTIVE // OffSec");
              setThreatLevel("CRITICAL");
              break;
            case "speaking":
              setDiagnosticText("BROADCAST NODE: DUBLIN-PORT_8080");
              setThreatLevel("LOW");
              break;
            case "lab":
              setDiagnosticText("HONEYPOT CAPTURING PACKETS");
              setThreatLevel("ELEVATED");
              break;
            case "connect":
              setDiagnosticText("HANDSHAKE READY: EXCHANGE_SIG");
              setThreatLevel("SECURE");
              break;
            default:
              setDiagnosticText("SYSTEM CORE: SECURE");
              setThreatLevel("LOW");
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    SECTIONS.forEach((sect) => {
      const el = document.getElementById(sect.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchGithubRepos = async () => {
      try {
        setLoadingRepos(true);
        const res = await fetch(`https://api.github.com/users/${USERNAME_PLACEHOLDER}/repos?sort=updated&per_page=12`);
        if (!res.ok) {
          throw new Error("API throttled or user not found");
        }
        const data = await res.json();
        
        const parsedRepos = data.map((repo: any) => ({
          name: repo.name,
          description: repo.description || "No description provided.",
          language: repo.language || "TypeScript",
          stargazers_count: repo.stargazers_count,
          updated_at: new Date(repo.updated_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
          }),
          html_url: repo.html_url,
          is_featured: FEATURED_PROJECTS.some(p => p.name.toLowerCase() === repo.name.toLowerCase())
        }));

        parsedRepos.sort((a: Project, b: Project) => {
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          return b.stargazers_count - a.stargazers_count;
        });

        setRepos(parsedRepos);
        setReposError(false);
      } catch (err) {
        console.warn("GitHub fetch throttled. Loading cached portfolio schemas.", err);
        setReposError(true);
        setRepos(FEATURED_PROJECTS);
      } finally {
        setLoadingRepos(false);
      }
    };

    fetchGithubRepos();
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setFormLoading(true);
    
    setTimeout(() => {
      setFormLoading(false);
      setFormSuccess(true);
      setEmail("");
    }, 1200);
  };

  const executeOffensiveSimulation = (attackId: "confused-composer" | "model-poisoning" | "presidio-guard") => {
    setSelectedAttack(attackId);
    setAttackRunning(true);
    setAttackSuccess(false);
    setAttackLogs([]);

    const logSteps: { text: string; delay: number }[] = [];

    if (attackId === "confused-composer") {
      logSteps.push(
        { text: "[*] Initiating 'ConfusedComposer' dependency confusion hijacking routine...", delay: 200 },
        { text: "[*] Analyzing project composer.json configurations...", delay: 600 },
        { text: "[!] Found internal un-scoped package names on private registry.", delay: 1000 },
        { text: "[+] Attacker publishes identical package 'enterprise-sec-logger' with malicious version v9.9.9 on public Packagist...", delay: 1500 },
        { text: "[!] CI build triggered. Dependency solver checks public repositories...", delay: 2100 },
        { text: "[!] Resolution Priority Hijack! Resolver downloads malicious public v9.9.9...", delay: 2600 },
        { text: "[🛡️ SHIELD TRIGGERED] ConfusedComposer Static Dependency Policy Interceptor", delay: 3200 },
        { text: "[🛡️ MITIGATION] Blocked external namespace mapping for target 'enterprise-sec-logger'.", delay: 3700 },
        { text: "[🛡️ BLOCK] Terminated composer installation loop. Enforced repository scope limits.", delay: 4200 },
        { text: "[✓] DEPENDENCY INTEGRITY CONFIRMED // VULNERABILITY MITIGATED", delay: 4700 }
      );
    } else if (attackId === "model-poisoning") {
      logSteps.push(
        { text: "[*] Deploying 'HuggingFace Model Poisoning' supply chain simulation...", delay: 200 },
        { text: "[*] Target environment: Centralized enterprise Artifactory HuggingFace mirror", delay: 600 },
        { text: "[+] Rogue developer requests onboarding of unverified external LLM weights...", delay: 1000 },
        { text: "[!] Weights payload contains embedded pickle model-poisoning instruction stream", delay: 1500 },
        { text: "[!] GitHub Actions automated approval workflow initiated...", delay: 2000 },
        { text: "[🛡️ SHIELD TRIGGERED] Deutsche Bank Secure Model Onboarding Pipeline", delay: 2500 },
        { text: "[🛡️ MITIGATION] Static hash validation & pickle scanner anomaly triggered.", delay: 3000 },
        { text: "[🛡️ BLOCK] Model rejected. Alert triggered for non-compliant Hugging Face namespace.", delay: 3600 },
        { text: "[✓] SECURE MODEL ONBOARDING ISOLATION SECURED", delay: 4100 }
      );
    } else if (attackId === "presidio-guard") {
      logSteps.push(
        { text: "[*] Initializing Presidio PII & Prompt Injection Bypass testing...", delay: 200 },
        { text: "[*] Sending user prompt to Vertex AI endpoint through Gateway:", delay: 600 },
        { text: "    'My API Key is AIzaSyD9... Can you format my account details?'", delay: 1100 },
        { text: "[!] Prompt reaches intermediate proxy layer. Running PII inspection...", delay: 1700 },
        { text: "[🛡️ SHIELD TRIGGERED] Presidio Privacy Guardrail active", delay: 2200 },
        { text: "[🛡️ MITIGATION] Identified Google API Key sequence in transmission stream.", delay: 2700 },
        { text: "[🛡️ BLOCK] Sanitized sensitive PII block. Prompt redacted to [REDACTED_API_KEY] dynamically.", delay: 3300 },
        { text: "[✓] PII DRIFT CONTAINED // ENDPOINT METRIC STABLE", delay: 3800 }
      );
    }

    logSteps.forEach((step) => {
      setTimeout(() => {
        setAttackLogs((prev) => [...prev, step.text]);
        if (step.text.startsWith("[✓]")) {
          setAttackRunning(false);
          setAttackSuccess(true);
        }
      }, step.delay);
    });
  };

  const baseScale = Math.max(0.85, 1 - scrollPercent * 0.2);

  return (
    <div className="relative min-h-screen font-sans bg-[#0a0e14] text-[#e2e8f0] antialiased selection:bg-[#00ffaa]/30 selection:text-[#00ffaa]">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-[#00ffaa] z-50 transition-all duration-75"
        style={{ width: `${scrollPercent * 100}%` }}
      />

      {/* Grid overlay for low-opacity technical vibe */}
      <div className="fixed inset-0 pointer-events-none terminal-grid opacity-[0.05] z-0" />
      
      {/* SCANLINES retro layer */}
      <div className="fixed inset-0 pointer-events-none terminal-scanline opacity-[0.03] z-0" />

      {/* Background Particles Element */}
      <div id="hero-particles" className="absolute inset-0 pointer-events-none z-0 overflow-hidden" />

      {/* HEADER & NAVIGATION */}
      <header className="sticky top-0 bg-[#0a0e14]/90 backdrop-blur-md border-b border-[#1e293b]/50 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded border border-[#00ffaa]/40 flex items-center justify-center bg-[#0a0e14] group-hover:border-[#00ffaa] transition-colors duration-200">
              <span className="font-mono text-xs font-bold text-[#00ffaa] group-hover:scale-110 transition-transform">LA</span>
            </div>
            <span className="font-display font-bold tracking-tight text-white group-hover:text-[#00ffaa] transition-colors duration-200">
              {SITE_NAME}<span className="text-[#00ffaa] font-mono font-normal">.sec</span>
            </span>
          </a>

          {/* Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {SECTIONS.map((sect) => (
              <a
                key={sect.id}
                href={`#${sect.id}`}
                className={`px-2.5 py-1.5 rounded-sm font-mono text-[11px] transition-all duration-200 uppercase tracking-wider ${
                  activeSection === sect.id 
                    ? "text-[#00ffaa] bg-[#00ffaa]/5 border-b-2 border-[#00ffaa]/80" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                }`}
              >
                {sect.label}
              </a>
            ))}
          </nav>

          {/* Quick Connect CTA */}
          <div className="flex items-center space-x-3">
            {SHOW_STATUS && (
              <span className="hidden xl:inline-flex items-center font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                STATUS: ENQUIRE
              </span>
            )}
            <a 
              href="#connect"
              className="px-3.5 py-1.5 rounded border border-[#00ffaa]/30 hover:border-[#00ffaa] font-mono text-xs text-[#00ffaa] hover:bg-[#00ffaa]/5 transition-all duration-200"
            >
              $ handshake
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-4 pb-24">
        
        {/* HERO SECTION */}
        <section id="home" className="scroll-section min-h-[85vh] flex flex-col justify-center py-12">
          {SHOW_STATUS && (
            <div className="inline-flex self-start items-center space-x-2 font-mono text-xs text-slate-400 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#00ffaa] animate-ping" />
              <span>&gt; status: open to Enterprise Application Security / TISO / AI Security DevSecOps roles.</span>
            </div>
          )}

          <div className="max-w-4xl space-y-6">
            <div className="space-y-2 animate-fade-in">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#00ffaa]">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Dublin, Ireland</span>
                </div>
                <span className="text-slate-600">|</span>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>GMT+1</span>
                </div>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">First Class Honors (MSc Cybersecurity)</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-white leading-tight">
                Securing Enterprise <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-[#00ffaa] animate-pulse">
                  AI & Gateways
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl font-sans">
              Cybersecurity professional with **8 years of experience** specializing in ethical hacking, 
              penetration testing, and Identity Access Management (IAM). Currently engineering leading-edge **AI platform guardrails,
              OSS model governance, and secure Generative AI Vertex gateways** inside global banking.
            </p>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-3xl">
              {[
                { title: "AppSec & IAM", value: "8 Years" },
                { title: "AI Gateways", value: "Vertex & Apigee" },
                { title: "MSc Degree", value: "1:1 Honors" },
                { title: "Compliance", value: "SoD, OWASP, CIS" }
              ].map((stat, i) => (
                <div key={i} className="bg-[#0f1520] border border-slate-800/60 p-4 rounded-sm">
                  <span className="block font-mono text-[10px] text-slate-500 uppercase tracking-wider">{stat.title}</span>
                  <span className="font-display text-base md:text-lg font-bold text-white tracking-tight mt-1 block">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#research" 
                className="bg-[#00ffaa] hover:bg-[#00e095] text-[#0a0e14] px-5 py-3 rounded-sm font-mono text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all duration-200 shadow-md shadow-[#00ffaa]/15"
              >
                <span>Read Threat Blog</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#experience" 
                className="border border-slate-700 hover:border-[#00ffaa]/60 text-slate-300 hover:text-white px-5 py-3 rounded-sm font-mono text-xs sm:text-sm flex items-center space-x-2 transition-all duration-200 bg-slate-900/20"
              >
                <span>Audit Work History</span>
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT / BACKGROUND SECTION */}
        <section id="about" className="scroll-section py-24 border-t border-slate-800/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Header columns */}
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center space-x-2 font-mono text-xs text-[#00ffaa] bg-[#00ffaa]/5 px-2.5 py-1 rounded-sm">
                <Layers className="w-3.5 h-3.5" />
                <span>EXPERT ARCHITECT</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
                Core Profile & Capabilities
              </h2>
              <p className="text-slate-400 font-sans text-sm leading-relaxed">
                Proven track record in secure SDLC, model onboarding policies, DevSecOps automation, and threat defense.
              </p>

              {/* Verified Badges */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 bg-slate-950/60 p-2.5 border border-slate-800 rounded">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>AWS Certified Security Specialty</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 bg-slate-950/60 p-2.5 border border-slate-800 rounded">
                  <Award className="w-4 h-4 text-teal-400" />
                  <span>EC-Council CEH v11</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300 bg-slate-950/60 p-2.5 border border-slate-800 rounded">
                  <Award className="w-4 h-4 text-blue-400" />
                  <span>Nullcon Berlin 2022 CTF Runner-Up</span>
                </div>
              </div>
            </div>

            {/* Right Detailed content column */}
            <div className="lg:col-span-8 space-y-8 font-sans">
              <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-sm sm:text-base leading-relaxed">
                <p>
                  As an elite **Application Security and IAM veteran**, my career spans secure API design, enterprise governance, 
                  and defensive automation. I design and implement security patterns that sit between advanced research models 
                  (such as Hugging Face and Vertex AI SDKs) and rigid operational parameters.
                </p>
                <div className="border-l-2 border-[#00ffaa]/40 pl-4 py-1.5 bg-slate-900/20 my-6">
                  <p className="italic text-slate-300 text-sm">
                    "AI security is not about blocking access; it's about engineering intelligent intermediate containment tunnels. An un-monitored SDK query bypasses years of traditional firewall and endpoint hardening."
                  </p>
                </div>
                <p>
                  Beyond operational leadership, I actively contribute to **OWASP initiatives**, co-authoring standards 
                  and publishing technical findings regarding dependency chain threats and Model Context Protocol (MCP) vulnerability vectors.
                </p>
              </div>

              {/* Skill Matrix Grid */}
              <div className="space-y-4 pt-4">
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">SKILLS MATRIX</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {TECHNICAL_SKILLS_CATEGORIES.map((cat, i) => (
                    <div key={i} className="bg-[#0f1520] border border-slate-800/80 p-5 rounded">
                      <h4 className="text-[#00ffaa] font-mono text-xs font-bold mb-3 uppercase tracking-wider">{cat.title}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((skill, si) => (
                          <span key={si} className="bg-slate-950 text-slate-300 text-[10px] font-mono px-2 py-1 rounded border border-slate-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* INTERACTIVE EXPERIENCE TIMELINE SECTION */}
        <section id="experience" className="scroll-section py-24 border-t border-slate-800/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Header */}
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center space-x-2 font-mono text-xs text-[#00ffaa] bg-[#00ffaa]/5 px-2.5 py-1 rounded-sm">
                <Briefcase className="w-3.5 h-3.5" />
                <span>CHRONOLOGICAL VERIFICATION</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
                Professional Journey
              </h2>
              <p className="text-slate-400 font-sans text-sm leading-relaxed">
                Click across the company directory nodes to trace secure platform deployments, code assessments, and TISO compliance metrics.
              </p>

              {/* Quick Navigation Vertical Tab Buttons */}
              <div className="space-y-2 pt-4 hidden md:block">
                {JOB_HISTORY.map((job, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedJobIndex(idx)}
                    className={`w-full text-left p-3 rounded font-mono text-xs flex items-center justify-between border transition-all ${
                      selectedJobIndex === idx
                        ? "border-[#00ffaa] text-[#00ffaa] bg-[#00ffaa]/5 pl-4"
                        : "border-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-900/40"
                    }`}
                  >
                    <span>{job.company}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${selectedJobIndex === idx ? "translate-x-1" : "opacity-40"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Display Board (Detailed Terminal Sheet) */}
            <div className="lg:col-span-8">
              {/* Mobile selector slider */}
              <div className="flex md:hidden overflow-x-auto space-x-2 pb-4 mb-4 scrollbar-thin">
                {JOB_HISTORY.map((job, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedJobIndex(idx)}
                    className={`px-3 py-1.5 rounded-sm font-mono text-[10px] whitespace-nowrap border ${
                      selectedJobIndex === idx
                        ? "border-[#00ffaa] text-[#00ffaa] bg-[#00ffaa]/5"
                        : "border-slate-800 text-slate-400"
                    }`}
                  >
                    {job.company}
                  </button>
                ))}
              </div>

              {/* Interactive terminal card */}
              <div className="bg-[#0f1520] border-2 border-slate-800/80 rounded-sm p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ffaa]/5 rounded-full blur-2xl pointer-events-none" />
                
                {/* Header status bar */}
                <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-2">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase text-[#00ffaa] tracking-widest block font-bold">
                      {JOB_HISTORY[selectedJobIndex].badge}
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {JOB_HISTORY[selectedJobIndex].role}
                    </h3>
                    <div className="text-slate-400 font-mono text-xs font-semibold">
                      {JOB_HISTORY[selectedJobIndex].company} — <span className="text-slate-500 font-normal">{JOB_HISTORY[selectedJobIndex].location}</span>
                    </div>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 px-3.5 py-1 rounded font-mono text-xs text-slate-300">
                    {JOB_HISTORY[selectedJobIndex].period}
                  </div>
                </div>

                {/* Bullets mapping */}
                <div className="space-y-4">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono block">OPERATIONAL LOGS:</span>
                  <ul className="space-y-3 font-sans text-sm sm:text-base text-slate-300">
                    {JOB_HISTORY[selectedJobIndex].highlights.map((bullet, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="flex items-start space-x-2.5"
                      >
                        <span className="text-[#00ffaa] font-mono text-xs mt-1.5 select-none shrink-0">&gt;</span>
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Code-style visual telemetry signature at bottom */}
                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>SEC_VERIFY_PASS // DB:DUB_CONN</span>
                  <span>RECORD #{selectedJobIndex + 1}_OF_6</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="scroll-section py-24 border-t border-slate-800/40">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 font-mono text-xs text-[#00ffaa] bg-[#00ffaa]/5 px-2.5 py-1 rounded-sm mb-4">
                <FileCode className="w-3.5 h-3.5" />
                <span>INTEGRITY CHECK: ACTIVE</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
                Active Project Feed
              </h2>
              <p className="text-slate-400 font-sans text-sm mt-1 max-w-xl">
                Real-time active repository feed fetched from mack-droid GitHub API. Core security solutions pinned at the forefront.
              </p>
            </div>
            
            <div className="font-mono text-xs text-slate-500">
              User: <span className="text-slate-300">{USERNAME_PLACEHOLDER}</span>
            </div>
          </div>

          {loadingRepos ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <Loader2 className="w-8 h-8 text-[#00ffaa] animate-spin" />
              <span className="font-mono text-xs text-slate-500">Retrieving repository schemas from api.github.com...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((project, idx) => (
                <motion.div 
                  key={project.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: idx * 0.05 }}
                  className={`bg-[#0f1520] border rounded-sm p-6 flex flex-col justify-between hover:border-[#00ffaa]/40 transition-colors duration-200 group relative ${
                    project.is_featured ? 'border-[#00ffaa]/30' : 'border-slate-800/80'
                  }`}
                >
                  {project.is_featured && (
                    <span className="absolute top-3 right-3 flex items-center space-x-1 font-mono text-[9px] bg-[#00ffaa]/10 text-[#00ffaa] px-1.5 py-0.5 rounded border border-[#00ffaa]/30 uppercase tracking-widest">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>FEATURED</span>
                    </span>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1.5">
                        <span className="block font-mono text-[10px] text-slate-500">{project.language}</span>
                        <h3 className="font-display font-bold text-base text-white group-hover:text-[#00ffaa] transition-colors duration-200">
                          {project.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-400 text-xs font-sans leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-900/80 flex items-center justify-between text-slate-500 font-mono text-[11px] mt-6">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1 hover:text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{project.stargazers_count}</span>
                      </span>
                      <span className="text-[10px] text-slate-600">Updated: {project.updated_at}</span>
                    </div>
                    <a 
                      href={project.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#00ffaa] hover:underline flex items-center space-x-1 text-xs group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>$ view</span>
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {reposError && (
            <div className="mt-4 p-3 border border-amber-900/30 bg-amber-950/10 text-amber-500 font-mono text-xs rounded text-center">
              [!] GitHub REST API connection throttled. Robust offline fallback projects successfully loaded instead.
            </div>
          )}
        </section>

        {/* RESEARCH & WRITING (BLOG) */}
        <section id="research" className="scroll-section py-24 border-t border-slate-800/40">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center space-x-2 font-mono text-xs text-[#00ffaa] bg-[#00ffaa]/5 px-2.5 py-1 rounded-sm mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>OFFENSIVE THREAT INTEL</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
              Hashnode Threat Publications
            </h2>
            <p className="text-slate-400 font-sans text-sm mt-1">
              Documenting original security breakdowns, dependency chain vectors, and MCP isolation vulnerabilities on Skylabs.
            </p>
          </div>

          <div className="space-y-6">
            {STATIC_RESEARCH.map((art, idx) => (
              <motion.div 
                key={art.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[#0f1520] border border-slate-800 hover:border-[#00ffaa]/30 p-6 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg hover:shadow-cyan-950/10 transition-all duration-200"
              >
                <div className="space-y-3 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#00ffaa] bg-[#00ffaa]/10 border border-[#00ffaa]/20 px-2 py-0.5 rounded-sm">
                      {art.tag}
                    </span>
                    <span className="font-mono text-xs text-slate-500">{art.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white hover:text-[#00ffaa] transition-colors duration-200">
                    {art.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="flex items-center space-x-2 md:self-center shrink-0">
                  <a 
                    href={art.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-[#00ffaa] text-slate-300 hover:text-[#00ffaa] font-mono text-xs rounded transition-colors duration-200 flex items-center space-x-1.5"
                  >
                    <span>Read Article</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SPEAKING & PODCAST */}
        <section id="speaking" className="scroll-section py-24 border-t border-slate-800/40">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center space-x-2 font-mono text-xs text-[#00ffaa] bg-[#00ffaa]/5 px-2.5 py-1 rounded-sm mb-4">
              <Radio className="w-3.5 h-3.5" />
              <span>COMMUNITY BROADCAST</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
              Speaking & Media Records
            </h2>
            <p className="text-slate-400 font-sans text-sm mt-1">
              Active voice discussing LLM proxy guardrails, RAG prompt hijacks, and machine credentials lifecycle boundaries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {STATIC_SPEAKING.map((speak) => (
              <div 
                key={speak.id}
                className="bg-[#0f1520] border border-slate-800 p-6 rounded-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] text-slate-500 uppercase">{speak.event}</span>
                    <span className="font-mono text-xs text-slate-500">{speak.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    {speak.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
                    {speak.description}
                  </p>
                </div>

                {speak.embedUrl ? (
                  <div className="border border-slate-800 rounded bg-[#0a0e14] overflow-hidden p-2">
                    <iframe 
                      title={speak.title}
                      src={speak.embedUrl} 
                      width="100%" 
                      height="152" 
                      frameBorder="0" 
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                      loading="lazy"
                      className="rounded animate-pulse-slow"
                    />
                  </div>
                ) : (
                  speak.link && (
                    <div className="pt-4 border-t border-slate-900 flex justify-end">
                      <a 
                        href={speak.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00ffaa] hover:underline font-mono text-xs flex items-center space-x-1"
                      >
                        <span>$ view event details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </section>

        {/* LAB / TOOLS SECTION */}
        <section id="lab" className="scroll-section py-24 border-t border-slate-800/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-2 font-mono text-xs text-[#00ffaa] bg-[#00ffaa]/5 px-2.5 py-1 rounded-sm">
                <Database className="w-3.5 h-3.5" />
                <span>OFFENSIVE SIMULATOR</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white leading-tight">
                Secure Model Onboarding <br />
                & Scanner Sandbox
              </h2>
              <p className="text-slate-400 font-sans text-sm leading-relaxed">
                Evaluating threat containment solutions against Dependency Confusion targets, toxic Hugging Face pickle objects, and Google API Key exposures. 
              </p>

              <div className="space-y-2 text-xs font-mono text-slate-400">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#00ffaa]" />
                  <span>Interactive Dependency Resolver Testing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#00ffaa]" />
                  <span>Automatic PII Redaction Audit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-[#00ffaa]" />
                  <span>Pickle Weights Deserialization Blocks</span>
                </div>
              </div>
            </div>

            {/* Email capture box */}
            <div className="lg:col-span-7 bg-[#0f1520] border border-slate-800 p-6 sm:p-8 rounded-sm space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00ffaa]/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-[#00ffaa] uppercase tracking-wider block">REGISTRATION INTERFACE</span>
                <h3 className="font-display font-bold text-lg text-white">Access the OffSec Security Suite</h3>
                <p className="text-slate-400 text-xs font-sans">
                  Be notified when we deploy our sandbox testing harness containing 40+ mock multi-agent exploitation scenarios.
                </p>
              </div>

              {!formSuccess ? (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="email"
                      required
                      placeholder="operator@security-dept.io"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-900/60 border border-slate-800 text-white rounded-sm px-4 py-3 text-sm font-mono focus:border-[#00ffaa] focus:outline-none flex-grow"
                    />
                    <button 
                      type="submit"
                      disabled={formLoading}
                      className="bg-[#00ffaa]/10 hover:bg-[#00ffaa]/20 border border-[#00ffaa]/40 hover:border-[#00ffaa] text-[#00ffaa] font-mono text-xs px-6 py-3 rounded-sm font-bold transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {formLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>securing connection...</span>
                        </>
                      ) : (
                        <span>$ signup --waitlist</span>
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] font-mono text-slate-500">
                    [!] Notice: Privacy protected. Static secure sandbox environment. No credentials stored.
                  </p>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 border border-[#00ffaa]/30 bg-[#00ffaa]/5 rounded-sm space-y-3"
                >
                  <div className="flex items-center space-x-2 text-[#00ffaa]">
                    <Check className="w-5 h-5" />
                    <span className="font-mono text-sm font-bold">REGISTRATION SIGNED</span>
                  </div>
                  <p className="text-slate-300 text-xs font-sans">
                    Your key identifier has been logged into the developer queue. We will transmit access tokens to your console upon sandbox initialization.
                  </p>
                  <div className="bg-black/40 p-3 rounded font-mono text-[10px] text-slate-400 space-y-1">
                    <div>&gt; status_code: 202 ACCEPTED</div>
                    <div>&gt; pipeline_job: beta_waitlist_triage</div>
                    <div>&gt; connection_integrity: EXCELLENT</div>
                  </div>
                </motion.div>
              )}
            </div>

          </div>
        </section>

        {/* CONNECT / CONTACT */}
        <section id="connect" className="scroll-section py-24 border-t border-slate-800/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 font-mono text-xs text-[#00ffaa] bg-[#00ffaa]/5 px-2.5 py-1 rounded-sm">
                <Lock className="w-3.5 h-3.5" />
                <span>HANDSHAKE_INITIATED</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
                Initialize Secure Connection
              </h2>
              <p className="text-slate-400 font-sans text-sm leading-relaxed max-w-md">
                Looking to discuss AI gateway controls, Identity Access solutions, or arrange deep-dive application penetration testing reviews? Choose an operational channel:
              </p>
            </div>

            <div className="bg-[#0f1520] border border-slate-800 p-6 sm:p-8 rounded-sm space-y-6">
              <div className="space-y-4">
                <span className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest">TRANSMISSION DIRECTORY</span>
                
                <div className="space-y-3 font-mono text-xs">
                  <a 
                    href="https://linkedin.com/in/iammayank"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 border border-slate-900 hover:border-[#00ffaa]/40 bg-slate-950/40 text-slate-300 hover:text-white rounded transition-colors group"
                  >
                    <span className="flex items-center space-x-2">
                      <Linkedin className="w-4 h-4 text-[#00ffaa]" />
                      <span>$ connect --linkedin</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00ffaa] group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <a 
                    href="https://github.com/mack-droid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 border border-slate-900 hover:border-[#00ffaa]/40 bg-slate-950/40 text-slate-300 hover:text-white rounded transition-colors group"
                  >
                    <span className="flex items-center space-x-2">
                      <Github className="w-4 h-4 text-[#00ffaa]" />
                      <span>$ connect --github</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00ffaa] group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <a 
                    href="https://x.com/ping_mayank"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 border border-slate-900 hover:border-[#00ffaa]/40 bg-slate-950/40 text-slate-300 hover:text-white rounded transition-colors group"
                  >
                    <span className="flex items-center space-x-2">
                      <ExternalLink className="w-4 h-4 text-[#00ffaa]" />
                      <span>$ connect --twitter</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00ffaa] group-hover:translate-x-0.5 transition-all" />
                  </a>

                  <a 
                    href="mailto:mayanks.msharma@gmail.com"
                    className="flex items-center justify-between p-3.5 border border-slate-900 hover:border-[#00ffaa]/40 bg-slate-950/40 text-slate-300 hover:text-white rounded transition-colors group"
                  >
                    <span className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-[#00ffaa]" />
                      <span>$ mailto:mayanks.msharma@gmail.com</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00ffaa] group-hover:translate-x-0.5 transition-all" />
                  </a>
                </div>

                <p className="pt-4 border-t border-slate-800/60 text-[10px] text-slate-600 font-mono text-center tracking-wide">
                  {SITE_COPYRIGHT}
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* FLOATING RETRO CYBER-DECK TERMINAL WIDGET (THE INTERACTIVE SCROLL-HOOK) */}
      <div 
        className="fixed bottom-6 right-6 z-40"
        style={{ 
          transform: `scale(${baseScale})`,
          transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)" 
        }}
      >
        <motion.button
          onClick={() => setSandboxOpen(true)}
          whileHover={{ scale: 1.05 }}
          className="bg-black border border-[#00ffaa] shadow-lg shadow-[#00ffaa]/15 rounded p-4 text-left w-64 md:w-72 font-mono flex flex-col space-y-2 relative group focus:outline-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#00ffaa]/20 pb-1 text-[9px] text-[#00ffaa]/60 uppercase tracking-widest font-mono">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ffaa] animate-pulse" />
              <span>ACTIVE MONITOR</span>
            </span>
            <span>LAL-SEC v2.1</span>
          </div>

          {/* Diagnostic Stats */}
          <div className="space-y-1">
            <div className="text-[11px] text-white font-bold leading-tight line-clamp-1">
              &gt; {diagnosticText}
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>MATRIX STATUS</span>
              <span className="text-[#00ffaa] font-bold">READY</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>THREAT LEVEL</span>
              <span className={`font-bold uppercase ${
                threatLevel === "CRITICAL" ? "text-rose-500 animate-pulse" :
                threatLevel === "ELEVATED" ? "text-amber-500" :
                threatLevel === "MEDIUM" ? "text-yellow-400" :
                "text-[#00ffaa]"
              }`}>
                {threatLevel}
              </span>
            </div>
          </div>

          {/* Bottom Call to action visual link */}
          <div className="pt-2 border-t border-[#00ffaa]/10 text-[9px] text-center text-[#00ffaa] hover:underline group-hover:scale-[1.02] transition-transform duration-200">
            [ CLICK TO RUN EXPLOIT SIMULATOR ]
          </div>
        </motion.button>
      </div>

      {/* FULL EXPLOIT PLAYGROUND OVERLAY (THE "OPENS INTO SOMETHING GOOD" HOOK) */}
      <AnimatePresence>
        {sandboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a0e14]/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#0f1520] border-2 border-[#00ffaa]/80 rounded max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl shadow-[#00ffaa]/10 overflow-hidden"
            >
              
              {/* Terminal Title Bar */}
              <div className="bg-black border-b border-slate-800 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-[#00ffaa] animate-pulse shrink-0" />
                  <div>
                    <span className="font-mono text-xs font-bold text-white tracking-widest uppercase block">
                      OffSec Exploit & Mitigation Sandbox
                    </span>
                    <span className="font-mono text-[9px] text-slate-600 tracking-wide">
                      {SITE_COPYRIGHT}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setSandboxOpen(false);
                    setSelectedAttack(null);
                    setAttackLogs([]);
                    setAttackSuccess(false);
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Playground body split in two */}
              <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 font-mono">
                
                {/* Left controls panel */}
                <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">CHOOSE THREAT VECTOR</span>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      Select a realistic enterprise security risk mapping to Mayank's research to trigger an payload exploit and observe automatic mitigations.
                    </p>
                  </div>

                  {/* Scenarios lists */}
                  <div className="space-y-3">
                    {[
                      {
                        id: "confused-composer",
                        title: "ConfusedComposer",
                        desc: "Dependency confusion chain compromise routing to spoofed package registries."
                      },
                      {
                        id: "model-poisoning",
                        title: "Hugging Face Model Hijack",
                        desc: "Attempting to onboard toxic pickle deserialization model weights."
                      },
                      {
                        id: "presidio-guard",
                        title: "API Credentials Leak",
                        desc: "PII detection proxy intercepting exposed Google developer tokens."
                      }
                    ].map((att) => (
                      <button
                        key={att.id}
                        disabled={attackRunning}
                        onClick={() => executeOffensiveSimulation(att.id as any)}
                        className={`w-full text-left p-3 border rounded transition-all flex flex-col space-y-1.5 focus:outline-none disabled:opacity-40 ${
                          selectedAttack === att.id 
                            ? "border-[#00ffaa] bg-[#00ffaa]/5" 
                            : "border-slate-800 hover:border-slate-700 bg-black/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{att.title}</span>
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${selectedAttack === att.id ? "text-[#00ffaa] rotate-90" : "text-slate-500"}`} />
                        </div>
                        <span className="text-[10px] text-slate-400 font-sans leading-relaxed">{att.desc}</span>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 border border-slate-800/80 bg-black/50 rounded space-y-2 font-mono text-[10px] text-slate-500 leading-relaxed font-sans">
                    <span className="text-slate-300 font-bold block uppercase font-mono tracking-wider">HARNESS DEPLOYMENT</span>
                    Mitigations trace directly to the **AI Gateway controllers** and **Secure Model Governance pipelines** engineered and implemented by Mayank across enterprise platforms.
                  </div>
                </div>

                {/* Right real-time Terminal window outputs */}
                <div className="lg:col-span-7 bg-black p-6 flex flex-col justify-between min-h-[320px] lg:min-h-0">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2 text-[10px] text-slate-500">
                      <span>MONITOR OUTPUT LOGS</span>
                      <span>ENV_SESSION: LIVE_TEST_CONSOLE</span>
                    </div>

                    <div className="space-y-2.5 max-h-[42vh] overflow-y-auto text-xs leading-relaxed">
                      {attackLogs.length === 0 ? (
                        <div className="text-slate-500 italic h-full flex items-center justify-center py-20 font-sans">
                          &lt; Select an exploit scenario on the left panel and click to initialize pipeline routine &gt;
                        </div>
                      ) : (
                        attackLogs.map((log, i) => {
                          let colorClass = "text-slate-300";
                          if (log.startsWith("[!]")) colorClass = "text-rose-400 font-bold";
                          if (log.startsWith("[+]") || log.startsWith("[*]")) colorClass = "text-amber-400";
                          if (log.includes("SHIELD TRIGGERED")) colorClass = "text-cyan-400 font-extrabold animate-pulse";
                          if (log.startsWith("[🛡️")) colorClass = "text-cyan-400";
                          if (log.startsWith("[✓]")) colorClass = "text-[#00ffaa] font-bold bg-[#00ffaa]/5 p-1 rounded-sm";

                          return (
                            <div key={i} className={`${colorClass} whitespace-pre-wrap font-mono`}>
                              {log}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Terminal interactive status footer */}
                  <div className="border-t border-slate-900 pt-4 flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${attackRunning ? "bg-amber-400 animate-ping" : attackSuccess ? "bg-[#00ffaa]" : "bg-slate-600"}`} />
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                        {attackRunning ? "Simulating Exploits..." : attackSuccess ? "Threat Neutralized" : "Terminal Standing By"}
                      </span>
                    </div>
                    {selectedAttack && !attackRunning && (
                      <button
                        onClick={() => executeOffensiveSimulation(selectedAttack)}
                        className="text-[10px] text-[#00ffaa] border border-[#00ffaa]/30 hover:border-[#00ffaa] px-2.5 py-1.5 rounded bg-[#00ffaa]/5 hover:bg-[#00ffaa]/10 transition-colors"
                      >
                        Re-run Simulator
                      </button>
                    )}
                  </div>

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SYSTEM FOOTER */}
      <footer className="border-t border-slate-800/40 bg-[#070b10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-2.5">
              <span className="text-slate-300 font-bold font-display text-sm tracking-tight block">
                {SITE_NAME} // {SITE_TAGLINE}
              </span>
              <p className="text-slate-500 text-[11px] font-sans max-w-sm leading-relaxed">
                Proprietary security research, AI governance engineering, and enterprise portfolio.
              </p>
            </div>
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono text-slate-500">
              <a href="#home" className="hover:text-white transition-colors">ROOT</a>
              <span className="text-slate-700">/</span>
              <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
              <span className="text-slate-700">/</span>
              <a href="#experience" className="hover:text-white transition-colors">JOURNEY</a>
              <span className="text-slate-700">/</span>
              <a href="#projects" className="hover:text-white transition-colors">PROJECT_REPOS</a>
              <span className="text-slate-700">/</span>
              <a href="#research" className="hover:text-white transition-colors">BLOG_PAPERS</a>
              <span className="text-slate-700">/</span>
              <a href="#connect" className="hover:text-white transition-colors">CONNECT</a>
            </nav>
          </div>
        </div>
        <div className="border-t border-slate-800/30 py-4">
          <p className="text-center text-[10px] text-slate-600 font-mono tracking-wider">
            {SITE_COPYRIGHT}
          </p>
        </div>
      </footer>
    </div>
  );
}
