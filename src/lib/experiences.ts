export type ExperienceDetail = {
  slug: string;
  role: string;
  company: string;
  meta?: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  bullets: string[];
  tags: string[];
  context?: string;
  problem?: string;
  approach?: string[];
  architecture?: { title: string; description: string }[];
  metrics?: { label: string; value: string }[];
  techStack?: { label: string; items: string[] }[];
  media?: {
    diagrams?: { title: string; caption?: string; url?: string }[];
    videos?: { title: string; caption?: string; url?: string }[];
    gallery?: { title: string; caption?: string; url?: string }[];
  };
  links?: { label: string; href: string }[];
};

export const experiences: ExperienceDetail[] = [
  {
    slug: "roundesk-ai-engineer",
    role: "AI Engineer",
    company: "Roundesk",
    meta: "Part-time · Agile/Scrum · GitLab · Jira",
    period: "Nov 2025 – Present",
    current: true,
    summary:
      "Architecting a multi-tenant agentic SaaS platform with LangGraph, MCP, and multi-LLM routing — turning enterprise tools into permission-aware agent ecosystems.",
    highlights: [
      "Multi-tenant agentic SaaS on LangGraph + ReAct",
      "Two-mode escalation: ~35% fewer handoffs vs. baseline",
      "Memory + summarization: ~50% input-token savings on long sessions",
    ],
    bullets: [
      "Architected a multi-tenant agentic SaaS platform using LangGraph and ReAct, with configurable LLM backends and inter-agent delegation across structured agent workflows.",
      "Engineered MCP servers connecting external APIs (CRM, ticketing, internal tools) into agent tool ecosystems with permission-based execution controls per tenant.",
      "Built a two-mode escalation system — deterministic trigger-word handoff and confidence-based escalation with auto-generated summaries — reducing unnecessary escalations by ~35% vs. trigger-only baseline.",
      "Layered a persistent memory system combining short-term context windows with long-term vector-stored history; applied conversation summarization cutting input tokens by ~50% on sessions exceeding 10 turns.",
      "Developed multi-KB RAG fan-out with score-based reranking across multiple knowledge bases before each LLM call.",
      "Implemented multi-LLM routing and per-user billing logic across OpenAI, Anthropic, Groq, and Google via a unified provider abstraction layer.",
      "Instrumented per-turn observability logging — decision traces, tool call outcomes, latency, and hallucination signals — across all production deployments.",
      "Shipped full stack via Docker with CI/CD pipelines and documented FastAPI microservices in weekly Agile sprints.",
    ],
    tags: [
      "LangGraph", "ReAct", "MCP", "FastAPI", "MongoDB", "ChromaDB", "Qdrant",
      "Docker", "OpenAI", "Anthropic", "Groq",
    ],
    context:
      "Roundesk is building a B2B agentic platform where each tenant configures its own LLM stack, knowledge bases, and tool permissions. The product had to scale from a single-agent prototype to a multi-tenant orchestration layer with observability and cost controls.",
    problem:
      "Prototype agents were brittle: opaque escalations, runaway token costs on long sessions, and no clean way to wire customer APIs into tool calls without leaking permissions across tenants.",
    approach: [
      "Modeled every workflow as a LangGraph state machine with explicit nodes for tool selection, retrieval, reasoning, and escalation.",
      "Wrapped customer APIs behind MCP servers so agents see a clean tool catalog while RBAC stays enforced server-side.",
      "Layered memory: per-turn working context, summarized session memory, and a long-term vector store keyed per tenant + user.",
      "Made provider routing a first-class concern — one abstraction over OpenAI, Anthropic, Groq, Google with per-tenant billing.",
    ],
    architecture: [
      { title: "Agent Orchestration", description: "LangGraph graphs with ReAct nodes, tool routing, and confidence-based escalation." },
      { title: "Tooling Layer", description: "MCP servers exposing CRM, ticketing, and internal APIs with permission scopes per tenant." },
      { title: "Memory & Retrieval", description: "Multi-KB RAG fan-out, score-based reranking, and summarized long-term memory in Qdrant/ChromaDB." },
      { title: "Observability", description: "Per-turn traces of tool calls, latency, confidence, and hallucination signals piped to dashboards." },
    ],
    metrics: [
      { label: "Escalation reduction", value: "~35%" },
      { label: "Token savings (long sessions)", value: "~50%" },
      { label: "LLM providers unified", value: "4" },
    ],
    techStack: [
      { label: "Agents & LLM", items: ["LangGraph", "ReAct", "MCP", "OpenAI", "Anthropic", "Groq", "Google"] },
      { label: "Backend", items: ["FastAPI", "Python", "MongoDB", "Beanie ODM"] },
      { label: "Vector / Memory", items: ["Qdrant", "ChromaDB", "Embeddings", "Reranking"] },
      { label: "Infra", items: ["Docker", "GitLab CI/CD", "Prometheus", "Grafana"] },
    ],
    media: {
      diagrams: [
        { title: "Multi-tenant agent architecture", caption: "LangGraph orchestration + MCP tool layer + per-tenant memory.", url: "/diagrams/roundia_multi_tenant_architecture.svg" },
        { title: "Escalation decision flow", caption: "Trigger-word vs. confidence-based handoff with summary generation.", url: "/diagrams/roundia_escalation_decision_flow.svg" },
      ],
      videos: [{ title: "Live agent walkthrough", caption: "Demo coming soon." }],
      gallery: [{ title: "Observability dashboard", caption: "Per-turn traces, latency, hallucination signals." }],
    },
  },
  {
    slug: "carthaplay-ai-engineer",
    role: "AI Engineer",
    company: "CarthaPlay",
    period: "Jun 2025 – Sep 2025",
    summary:
      "Hybrid LSTM + Transformer behavior pipeline and a Neo4j-backed RAG that turns 7,000+ gameplay logs into evidence-backed learning recommendations.",
    highlights: [
      "+20% lift over rule-based behavior detection",
      "Explainable RAG with confidence scores",
      "<10s inference SLA under concurrent load",
    ],
    bullets: [
      "Built a hybrid LSTM + Transformer behavior analysis pipeline over 7,000+ gameplay logs — detecting temporal learning patterns with a 20% lift over rule-based baseline.",
      "Developed a RAG system (LangChain + Neo4j + LLM) generating explainable, evidence-backed student recommendations with per-recommendation confidence scores delivered to educator dashboards.",
      "Deployed the full inference pipeline via FastAPI, meeting the <10s response SLA under concurrent load.",
      "Engineered ETL pipelines for gameplay log ingestion, cleaning, and aggregation feeding both the detection models and the RAG knowledge base.",
    ],
    tags: ["LSTM", "Transformers", "LangChain", "Neo4j", "FastAPI", "RAG", "TensorFlow", "PyTorch"],
    context:
      "CarthaPlay is an educational gaming platform that needed to turn raw gameplay telemetry into actionable insights for educators.",
    problem:
      "Rule-based detection missed temporal learning patterns and produced recommendations educators could not trust without justification.",
    approach: [
      "Combined LSTM for sequence modeling with Transformer attention for long-range dependencies.",
      "Modeled the curriculum as a Neo4j knowledge graph driving retrieval + reasoning for each recommendation.",
      "Surfaced confidence and supporting evidence directly in the educator dashboard.",
    ],
    architecture: [
      { title: "Behavior Pipeline", description: "ETL → feature engineering → LSTM+Transformer hybrid model." },
      { title: "Recommendation RAG", description: "Neo4j graph + dense retrieval + LLM with citation-style outputs." },
      { title: "Serving", description: "FastAPI with batched inference under <10s SLA." },
    ],
    metrics: [
      { label: "Logs processed", value: "7,000+" },
      { label: "Detection lift", value: "+20%" },
      { label: "Inference SLA", value: "<10s" },
    ],
    techStack: [
      { label: "ML", items: ["TensorFlow", "PyTorch", "LSTM", "Transformers"] },
      { label: "RAG", items: ["LangChain", "Neo4j", "Embeddings"] },
      { label: "Serving", items: ["FastAPI", "Docker"] },
    ],
    media: {
      diagrams: [
        { title: "Hybrid LSTM + Transformer pipeline", url: "/diagrams/carthaplay_lstm_transformer_pipeline.svg" },
        { title: "Neo4j-backed RAG recommendation flow", url: "/diagrams/carthaplay_neo4j_rag_recommendation_flow.svg" },
      ],
      videos: [{ title: "Educator dashboard walkthrough", caption: "Demo coming soon." }],
    },
  },
  {
    slug: "esprim-affrioffre",
    role: "AI Engineer",
    company: "ESPRIM, AffriOffre Project",
    period: "Jun 2025 – Jul 2025",
    summary:
      "Pan-African tender aggregation platform — hybrid scraping, semantic search, and a RAG bid-prep assistant across 5 countries.",
    highlights: [
      ">95% scraping success across 500+ tenders",
      "<300ms multilingual search responses",
      "RAG bid-prep assistant + multi-channel alerts",
    ],
    bullets: [
      "Led AI engineering in a 2-person team to build a pan-African tender aggregation platform — aggregating 500+ public tenders across 5 countries with a hybrid scraping pipeline achieving >95% scraping success rate.",
      "Built a semantic search and recommendation engine combining TF-IDF, dense embeddings, and Azure AI Search — serving filtered tender results at <300ms API response time across multilingual listings.",
      "Developed a RAG assistant for bid preparation (LangChain + LLM) enabling users to chat with tender documents and generate structured proposal outlines.",
      "Integrated multi-channel notifications (email, WhatsApp Business API, WebSocket dashboard) and a platform chatbot backed by a vector knowledge base (ChromaDB + RAG).",
    ],
    tags: ["BeautifulSoup", "Playwright", "Azure AI Search", "ChromaDB", "LangChain", "FastAPI", "MongoDB", "WhatsApp API"],
    context:
      "AffriOffre centralizes public tenders across multiple African markets with multilingual content and inconsistent source structures.",
    problem:
      "Sources were heterogeneous, frequently broken, and offered no semantic search — making opportunity discovery slow and error-prone.",
    approach: [
      "Hybrid scraping with BeautifulSoup + Playwright, proxy rotation, and scheduled retries.",
      "Hybrid retrieval combining TF-IDF and dense embeddings via Azure AI Search.",
      "RAG layer turning tender PDFs into chat + structured bid outlines.",
    ],
    metrics: [
      { label: "Tenders aggregated", value: "500+" },
      { label: "Countries", value: "5" },
      { label: "Search latency", value: "<300ms" },
      { label: "Scraping success", value: ">95%" },
    ],
    techStack: [
      { label: "Scraping", items: ["BeautifulSoup", "Playwright", "Proxy rotation", "APScheduler"] },
      { label: "Search & RAG", items: ["Azure AI Search", "ChromaDB", "LangChain", "TF-IDF", "Embeddings"] },
      { label: "Backend", items: ["FastAPI", "MongoDB", "WebSockets"] },
      { label: "Notifications", items: ["WhatsApp API", "Email"] },
    ],
    media: {
      diagrams: [{ title: "Scraping → indexing → RAG architecture", url: "/diagrams/affrioffre_scraping_indexing_rag_architecture.svg" }],
      videos: [{ title: "Bid-prep assistant demo", caption: "Demo coming soon." }],
    },
  },
  {
    slug: "anypli-eventify",
    role: "Software Engineer Intern",
    company: "Anypli",
    period: "Jun 2024 – Aug 2024",
    summary:
      "Eventify — a real-time event management platform with WebSockets, Power BI dashboards, and OWASP-aligned security.",
    highlights: [
      "+25% user engagement via live interaction",
      "-35% SQL query latency",
      "MFA + RBAC with OWASP best practices",
    ],
    bullets: [
      "Built Eventify, a real-time event management platform (Laravel, WebSockets, Power BI dashboards) — delivering a 25% increase in user engagement through live interaction features.",
      "Reduced SQL query latency by 35% via Eloquent ORM tuning and query caching; implemented MFA and RBAC with OWASP-compliant session security.",
      "Contributed to Agile sprints, code reviews, and technical documentation within a cross-functional engineering team.",
    ],
    tags: ["Laravel", "WebSockets", "Power BI", "Eloquent ORM", "MFA", "RBAC"],
    metrics: [
      { label: "Engagement lift", value: "+25%" },
      { label: "Query latency", value: "-35%" },
    ],
    techStack: [
      { label: "Backend", items: ["Laravel", "PHP", "MySQL"] },
      { label: "Real-time", items: ["WebSockets"] },
      { label: "BI", items: ["Power BI", "DAX"] },
      { label: "Security", items: ["MFA", "RBAC", "OWASP"] },
    ],
    media: {
      diagrams: [{ title: "Eventify real-time architecture", url: "/diagrams/eventify_platform_architecture.svg" }],
      gallery: [{ title: "Power BI engagement dashboard", url: "/diagrams/eventify-powerbi-dashbord.png" }],
    },
  },
  {
    slug: "freelance-ai-fullstack",
    role: "Freelance AI & Full-Stack Developer",
    company: "Independent",
    period: "2023 – 2025",
    summary:
      "Delivered AI-integrated web apps and conversational assistants end-to-end across e-commerce, services, and SMB clients.",
    highlights: [
      "Full lifecycle delivery: requirements → production",
      "Telegram + web chat assistants on multiple LLMs",
      "AI/ML lead for partner dev teams",
    ],
    bullets: [
      "Delivered AI-integrated web applications for clients across e-commerce, services, and SMB sectors — full lifecycle from requirements to production using React/Next.js, Django, and Flask.",
      "Built and deployed conversational AI assistants (LangChain + Mistral/LLaMA/OpenAI) across Telegram and web channels — handling customer support, FAQ automation, and lead qualification.",
      "Integrated matching and recommendation systems into marketplace platforms, improving product discovery and user retention.",
      "Engaged as AI specialist by development teams — owning the full AI/ML layer across client projects from architecture to deployment.",
    ],
    tags: ["React", "Next.js", "Django", "Flask", "LangChain", "Mistral", "LLaMA", "Telegram Bot API"],
    techStack: [
      { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
      { label: "Backend", items: ["Django", "Flask", "FastAPI"] },
      { label: "AI", items: ["LangChain", "Mistral", "LLaMA", "OpenAI"] },
      { label: "Channels", items: ["Telegram Bot API", "Web chat"] },
    ],
    media: {
      gallery: [{ title: "Selected client work", caption: "Case studies on request." }],
    },
  },
];

export function getExperience(slug: string) {
  return experiences.find((e) => e.slug === slug);
}