export interface Project {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  is_featured?: boolean;
}

export interface ResearchCard {
  id: string;
  title: string;
  date: string;
  summary: string;
  tag: string;
  external_url: string;
}

export interface SpeakingCard {
  id: string;
  title: string;
  event: string;
  date: string;
  description: string;
  embedUrl?: string; // Podcast Spotify/Apple Podcasts iframe placeholder
  link?: string;
}

export const USERNAME_PLACEHOLDER = "mack-droid";

export const FEATURED_PROJECTS: Project[] = [
  {
    name: "SRE-Incident-Remediation-Agent",
    description: "An AI-powered SRE assistant that automates repetitive operational tasks, accelerates incident remediation, and improves troubleshooting efficiency for SRE teams.",
    language: "Python",
    stargazers_count: 154,
    updated_at: "2026-06-15",
    html_url: "https://github.com/mack-droid/SRE-Incident-Remediation-Agent",
    is_featured: true
  },
  {
    name: "Agentic-RAG-Platform",
    description: "An enterprise Agentic RAG solution utilizing FAISS vector databases and Gemini embeddings to enable intelligent retrieval of operational runbooks and enterprise knowledge bases.",
    language: "Python",
    stargazers_count: 112,
    updated_at: "2026-06-10",
    html_url: "https://github.com/mack-droid/Agentic-RAG-Platform",
    is_featured: true
  },
  {
    name: "owasp-genai-contributions",
    description: "Active blueprints and tooling maps contributed to the OWASP AI Vulnerability Scoring System (AIVSS) and OWASP GenAI Red Teaming Guide frameworks.",
    language: "TypeScript",
    stargazers_count: 88,
    updated_at: "2026-05-22",
    html_url: "https://github.com/mack-droid/owasp-genai-contributions",
    is_featured: true
  },
  {
    name: "Malware-Sandbox-Analysis",
    description: "Static and dynamic analysis scripts for Redline and Dreambus ransomware, built within a highly isolated, dedicated virtual machine.",
    language: "PowerShell",
    stargazers_count: 45,
    updated_at: "2026-04-05",
    html_url: "https://github.com/mack-droid/Malware-Sandbox-Analysis"
  },
  {
    name: "Secure-AWS-CIS-Cloud",
    description: "A secure infrastructure-as-code layout complying with AWS CIS benchmarks and the Well-Architected Framework's 6 pillars, integrating EC2, S3, GuardDuty, and Lambda.",
    language: "HCL",
    stargazers_count: 73,
    updated_at: "2026-03-20",
    html_url: "https://github.com/mack-droid/Secure-AWS-CIS-Cloud"
  }
];

export const STATIC_RESEARCH: ResearchCard[] = [
  {
    id: "mcp-agent-sec",
    title: "Understanding MCP and Agent-to-Agent Protocol: Capabilities, Vulnerabilities, and Security Measures",
    date: "May 2026",
    summary: "A deep dive into Model Context Protocol (MCP) server endpoints, mapping client capabilities, privilege boundaries, and security architectures in multi-agent orchestration frameworks.",
    tag: "MCP & Multi-Agent",
    external_url: "https://skylabs.hashnode.dev/understanding-mcp-and-agent-to-agent-protocol-capabilities-vulnerabilities-and-security-measures"
  },
  {
    id: "confusedcomposer",
    title: "ConfusedComposer: Demystifying Dependency Confusion Vulnerabilities",
    date: "April 2026",
    summary: "Comprehensive study on Composer dependency confusion vectors, showcasing how private registry namespaces are hijacked and presenting proactive package resolution mitigations.",
    tag: "Supply Chain",
    external_url: "https://skylabs.hashnode.dev/confusedcomposer-demystifying-vulnerability"
  },
  {
    id: "ai-agent-threat-surface",
    title: "AI Agent Threat Surface Reduction: Approach to Proactive Enterprise Risk Management",
    date: "March 2026",
    summary: "Pragmatic threat mitigation architecture patterns for enterprise multi-agent pipelines. Focuses on sandboxing, API-level isolation, and transaction authorization limits.",
    tag: "Enterprise AI Risk",
    external_url: "https://skylabs.hashnode.dev/ai-agent-threat-surface-reduction-approach-to-proactive-enterprise-risk-management"
  },
  {
    id: "architecting-secure-ai",
    title: "Architecting Secure AI: A Maestro-Driven Deep Dive with a Smart Customer Support Agent",
    date: "February 2026",
    summary: "Practical implementation patterns of intermediate guardrails and LLM validation stages utilizing a Maestro router pattern to containerize and sanitize untrusted inputs.",
    tag: "Secure AI Patterns",
    external_url: "https://skylabs.hashnode.dev/architecting-secure-ai-a-maestro-driven-deep-dive-with-a-smart-customer-support-agent"
  },
  {
    id: "k8s-policy-engines",
    title: "Decoding the Future of Kubernetes Security Policy Engines",
    date: "January 2026",
    summary: "Comparing Kyverno vs. OPA Gatekeeper for validating, mutating, and generating custom security rules in production Kubernetes control planes.",
    tag: "Cloud Native Sec",
    external_url: "https://skylabs.hashnode.dev/decoding-the-future-of-kubernetes-security-policy-engines"
  }
];

export const STATIC_SPEAKING: SpeakingCard[] = [
  {
    id: "bsides-dublin",
    title: "Securing Agentic RAG Pipelines: Memory Poisoning & Prompt Hijacking",
    event: "BSides Dublin (Upcoming)",
    date: "2026",
    description: "Selected to present on the L1-L4 tiered memory model and detail how persistent agent storage can be infected with passive prompt payloads that trigger on specific user queries.",
    link: "https://bsidesdublin.ie"
  },
  {
    id: "podcast-agentic-sec",
    title: "EP #42: The Non-Human Identity (NHI) Crisis in Autonomous AI Networks",
    event: "The Security Sandbox Podcast",
    date: "March 2026",
    description: "An hour-long deep dive discussing why classic OAuth scope structures fail when applied to agent-to-agent communication networks, and the necessity of strict gateway-level contract enforcement.",
    embedUrl: "https://open.spotify.com/embed/episode/779834241?utm_source=generator" // Spotify Web Player Embed template
  }
];

export const SITE_NAME = "Logos AI Labs";
export const SITE_TAGLINE = "AI & Agentic Security";
export const SITE_COPYRIGHT = "© 2026 Logos AI Labs. All rights reserved.";
