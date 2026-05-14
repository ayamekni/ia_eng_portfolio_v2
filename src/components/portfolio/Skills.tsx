import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import {
  Bot,
  Brain,
  Cog,
  Rocket,
  Wrench,
  Database,
  Cloud,
  Bug,
  BarChart3,
  Hammer,
  type LucideIcon,
} from "lucide-react";

type SubGroup = { label?: string; items: string[] };
type Category = { id: string; title: string; icon: LucideIcon; groups: SubGroup[] };

const categories: Category[] = [
  {
    id: "llm",
    title: "LLM & Agents",
    icon: Bot,
    groups: [
      {
        label: "Concepts & Techniques",
        items: [
          "RAG", "Multi-agent design", "Agent orchestration", "Tool calling",
          "Prompt optimization", "Memory management", "Context windows",
          "Evaluation", "Observability", "Cost optimization",
          "Human-in-the-loop", "Hallucination detection", "Confidence scoring",
          "Escalation systems",
        ],
      },
      {
        label: "Frameworks & Models",
        items: [
          "LangChain", "LangGraph", "CrewAI", "ReAct", "MCP", "OpenAI GPT",
          "Anthropic Claude", "LLaMA 3.3", "Mistral", "DeepSeek-R1",
          "HuggingFace Transformers", "LlamaIndex", "Embeddings", "Chunking",
        ],
      },
    ],
  },
  {
    id: "ml",
    title: "Data & ML",
    icon: Brain,
    groups: [
      { label: "Classical ML", items: ["scikit-learn", "Random Forest", "PCA", "DQN", "SVM", "Model Evaluation", "CRISP-DM", "TDSP", "Cross-validation"] },
      { label: "Deep Learning", items: ["TensorFlow", "PyTorch", "Keras", "CNN", "LSTM", "Transformers", "SpecAugment", "Model Deployment", "GroupKFold", "MEALPY"] },
      { label: "Computer Vision", items: ["OpenCV", "YOLOv8", "YOLOv5", "DeepSORT", "DeepFace", "Medical Imaging", "Object Detection", "Feature Extraction", "Real-time tracking"] },
      { label: "NLP & Speech", items: ["SentenceTransformers", "HuggingFace", "Speech Emotion Recognition", "Log-mel spectrograms", "Librosa"] },
    ],
  },
  {
    id: "data-eng",
    title: "Data Engineering",
    icon: Cog,
    groups: [
      { label: "Big Data", items: ["Apache Spark", "Hadoop", "Kafka", "MapReduce", "Apache Hive", "Apache Airflow"] },
      { label: "Pipelines", items: ["ETL/ELT Pipelines", "Data Warehousing", "Data ingestion", "Data cleaning", "Feature engineering", "Aggregation pipelines"] },
      { label: "Languages & Libraries", items: ["Python", "SQL", "R", "PL/SQL", "Pandas", "NumPy"] },
      { label: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Neo4j", "Apache Hive", "Beanie (ODM)"] },
    ],
  },
  {
    id: "mlops",
    title: "MLOps & DevOps",
    icon: Rocket,
    groups: [
      { label: "MLOps", items: ["MLflow", "Experiment tracking", "Model versioning", "Model deployment", "FastAPI serving", "REST APIs", "Swagger", "CI/CD for ML"] },
      { label: "DevOps & Containers", items: ["Docker", "Docker Hub", "Kubernetes", "GitHub Actions", "CI/CD", "Makefile", "Linux", "Shell scripting"] },
      { label: "Monitoring & Observability", items: ["Prometheus", "Grafana", "ELK Stack", "Per-turn logging", "Latency tracking", "Hallucination signals"] },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    icon: Wrench,
    groups: [
      { label: "Backend", items: ["Python", "FastAPI", "Flask", "Django", "Laravel (PHP)", "Spring Boot (Java)", "ASP.NET Core (C#)"] },
      { label: "API Design", items: ["REST APIs", "Microservices", "Swagger UI", "API versioning", "Multi-tenant architecture", "Permission-based execution"] },
      { label: "Security", items: ["MFA", "RBAC", "OWASP best practices", "Fernet encryption", "JWT", "Session management", "BYOK infrastructure"] },
    ],
  },
  {
    id: "vector",
    title: "Vector Databases",
    icon: Database,
    groups: [
      { items: ["ChromaDB", "Qdrant", "Pinecone", "FAISS", "Azure AI Search", "Neo4j (graph + vector)", "Score-based reranking", "Multi-KB fan-out", "Semantic search", "Dense embeddings", "TF-IDF"] },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Infra",
    icon: Cloud,
    groups: [
      { label: "Azure", items: ["Azure OpenAI", "Azure ML", "Azure Data Factory", "Azure AI Search", "Azure Cognitive Services", "AI-900 Certified"] },
      { label: "Infrastructure", items: ["Docker", "Docker Hub", "Kubernetes", "GitHub Actions", "Linux", "CI/CD pipelines", "Multi-tenant isolation", "Microservices architecture"] },
      { label: "Other Cloud", items: ["AWS (Cloud Practitioner — In Progress)", "Git", "GitHub"] },
    ],
  },
  {
    id: "scraping",
    title: "Scraping & Automation",
    icon: Bug,
    groups: [
      { label: "Scraping", items: ["BeautifulSoup", "Playwright", "Selenium", "Proxy rotation", "Scheduled runs", "APScheduler", ">95% scraping success rate"] },
      { label: "Automation & Integration", items: ["n8n", "Power Automate", "WebSockets", "WhatsApp Business API", "Telegram Bot API", "Slack API", "Email automation", "Multi-channel notifications"] },
    ],
  },
  {
    id: "bi",
    title: "BI & Visualization",
    icon: BarChart3,
    groups: [
      { items: ["Power BI", "DAX", "Power Query", "Tableau", "RStudio", "Matplotlib", "Seaborn", "Grafana", "Prometheus", "ELK Stack", "Storytelling with data", "Interactive dashboards"] },
    ],
  },
  {
    id: "practices",
    title: "Practices & Tools",
    icon: Hammer,
    groups: [
      { label: "Methodologies", items: ["Agile", "Scrum", "Scrum Fundamentals Certified (SFC™)", "CRISP-DM", "TDSP", "Sprint planning", "Code reviews", "Technical documentation"] },
      { label: "Programming Languages", items: ["Python", "SQL", "R", "Java", "PL/SQL", "TypeScript", "JavaScript", "C#", "PHP"] },
      { label: "Dev Tools", items: ["Git", "GitHub", "GitLab", "Jira", "IntelliJ IDEA", "VS Code", "Postman", "Swagger UI"] },
      { label: "Frontend (supporting skills)", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Vite"] },
    ],
  },
];

function TagCluster({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <span
          key={s}
          className="font-mono text-[11px] px-2 py-1 rounded-md border transition hover:shadow-[0_0_12px_rgba(100,255,218,0.5)]"
          style={{
            backgroundColor: "rgba(100,255,218,0.08)",
            borderColor: "rgba(100,255,218,0.4)",
            color: "rgba(200,255,240,0.92)",
          }}
        >
          {s}
        </span>
      ))}
    </div>
  );
}

function CategoryPanel({ category }: { category: Category }) {
  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-semibold text-gradient mb-6">
        {category.title}
      </h3>
      <div className="space-y-6">
        {category.groups.map((g, i) => (
          <div key={i}>
            {g.label && (
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/70 mb-2">
                {g.label}
              </div>
            )}
            <TagCluster items={g.items} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const [active, setActive] = useState(categories[0].id);
  const activeCat = categories.find((c) => c.id === active)!;

  return (
    <section id="skills" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Technical Skills"
          title="Technologies & Tools I Work With"
        />

        {/* Mobile: 2x5 icon grid */}
        <div className="md:hidden grid grid-cols-2 gap-2 mb-6">
          {categories.map((c) => {
            const isActive = c.id === active;
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-xs font-medium transition"
                style={{
                  background: isActive
                    ? "rgba(0,212,255,0.08)"
                    : "rgba(255,255,255,0.03)",
                  borderLeft: isActive
                    ? "3px solid #00d4ff"
                    : "3px solid transparent",
                }}
              >
                <Icon
                  className="h-4 w-4 shrink-0"
                  style={{ color: isActive ? "#00d4ff" : "rgba(100,255,218,0.5)" }}
                />
                <span
                  className={isActive ? "text-gradient font-semibold" : "text-muted-foreground"}
                >
                  {c.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop & mobile: sidebar + content */}
        <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-6">
          {/* Sidebar (desktop only) */}
          <div
            className="hidden md:flex flex-col gap-1 p-2 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderRight: "1px solid rgba(100,255,218,0.12)",
            }}
          >
            {categories.map((c) => {
              const isActive = c.id === active;
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className="group flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-all"
                  style={{
                    background: isActive
                      ? "rgba(0,212,255,0.08)"
                      : "transparent",
                    borderLeft: isActive
                      ? "3px solid #00d4ff"
                      : "3px solid transparent",
                  }}
                >
                  <Icon
                    className="h-4 w-4 shrink-0 transition group-hover:brightness-150"
                    style={{ color: isActive ? "#00d4ff" : "rgba(100,255,218,0.5)" }}
                  />
                  <span
                    className={
                      isActive
                        ? "text-gradient font-semibold"
                        : "text-muted-foreground group-hover:text-foreground transition"
                    }
                  >
                    {c.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <CategoryPanel category={activeCat} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
