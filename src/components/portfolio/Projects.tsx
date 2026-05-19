import { useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

type Project = {
  title: string;
  desc: string;
  tags: string[];
  category: string;
  github?: string;
};

const projects: Project[] = [
  {
    title: "AdminDoc-X",
    desc: "End-to-end document intelligence platform automating the analysis of administrative documents. Processes unstructured PDFs (invoices, forms, certificates) through a multi-stage AI pipeline — OCR, layout-aware understanding with fine-tuned LayoutLMv3, NER for structured field extraction — and exposes results via a Flask REST API with a React/TypeScript frontend.",
    tags: ["Python", "OCR", "LayoutLMv3", "NER", "Flask", "React", "TypeScript", "Tailwind", "Document AI", "HuggingFace"],
    category: "Document AI & OCR",
    github: "https://github.com/ayamekni/AdminDoc-X",
  },
  {
    title: "ARIA — Agentic Research & Intelligence Assistant",
    desc: "Multi-agent NL-to-SQL system that translates natural language into automated data analyses. LangGraph orchestrates 5 specialized agents (analyst, SQL, Python, visualization, synthesis) with dual memory (short-term LangGraph state + long-term ChromaDB) — returning executed SQL, Python analyses, interactive Plotly charts, and natural language explanations.",
    tags: ["LangGraph", "LangChain", "FastAPI", "ChromaDB", "PostgreSQL", "Plotly", "Streamlit", "Docker", "Multi-agent", "NL2SQL"],
    category: "MLOps & Data Engineering",
    github: "https://github.com/ayamekni/ARIA",
  },
  {
    title: "DATAFLOW — Data Pipeline Orchestration Platform",
    desc: "Production-grade orchestration platform for batch and streaming pipelines — Airflow DAGs on scheduled runs, Spark distributed processing, Kafka real-time ingestion, automated alerting via n8n and Power BI business dashboards.",
    tags: ["Airflow", "Spark", "Kafka", "PostgreSQL", "Azure", "Power BI", "MLflow", "Docker", "n8n"],
    category: "MLOps & Data Engineering",
    github: "https://github.com/ayamekni/DATAFLOW",
  },
  {
    title: "Vision-X — AI Camera Challenge",
    desc: "Real-time Computer Vision system built in 24h hackathon. Person detection, multi-object tracking, queue analytics, real-time alerts via Telegram bot. Measures waiting time, service time, congestion, peak hours.",
    tags: ["Python", "YOLOv8", "DeepSORT", "OpenCV", "Telegram Bot API", "Computer Vision"],
    category: "Computer Vision",
    github: "https://github.com/ayamekni/Vision-X-Hac-hackathon-ai-camera-",
  },
  {
    title: "ATHENA — AI Academic Knowledge Assistant",
    desc: "RAG-based academic assistant. Semantic search over chunked documents using SentenceTransformers + FAISS/ChromaDB. Full pipeline: document parsing → chunking → retrieval → LLM answer generation.",
    tags: ["Python", "LangChain", "HuggingFace", "FAISS", "ChromaDB", "FastAPI", "RAG", "LLMs"],
    category: "NLP",
    github: "https://github.com/ayamekni/DataProcessingProjectAthena",
  },
  {
    title: "Speech Emotion Recognition (SER)",
    desc: "CNN on log-mel spectrograms using TensorFlow/Keras for SER on EMO-DB and RAVDESS. 85% weighted-F1. SpecAugment augmentation, MEALPY hyperparameter optimization.",
    tags: ["Python", "TensorFlow", "Keras", "Librosa", "CNN", "SpecAugment", "Scikit-learn"],
    category: "AI/ML",
    github: "https://github.com/ayamekni/Speech-Emotion-Recognition",
  },
  {
    title: "Lung Cancer Prediction — MLOps Pipeline",
    desc: "End-to-end ML pipeline with SVM classifier. CI/CD via Makefile, MLflow experiment tracking, FastAPI REST deployment, Docker, monitoring with Elasticsearch + Kibana.",
    tags: ["Python", "Scikit-learn", "SVM", "MLflow", "FastAPI", "Docker", "Elasticsearch"],
    category: "AI/ML",
    github: "https://github.com/ayamekni/lung-cancer-prediction-ml",
  },
  {
    title: "Trash to Cash — AI Recycling Ecosystem",
    desc: "EfficientNet CNN for bottle classification + eco-points. Rebottle autonomous robot with YOLOv5 + Reinforcement Learning. Full-stack platform with Django REST + React.",
    tags: ["Python", "TensorFlow", "EfficientNet", "YOLOv5", "RL", "Django", "React", "MongoDB"],
    category: "AI/ML",
    github: "https://github.com/ayamekni/Trash_To_Cash_Final",
  },
  {
    title: "Traffic Prediction for Smart Cities",
    desc: "Predictive traffic model from IoT data using SARIMA and seasonal regression. Hourly forecasting for 4 intersections. Statistical validation via ACF/PACF.",
    tags: ["Python", "Pandas", "Statsmodels", "ARIMA", "SARIMA", "IoT", "Time Series"],
    category: "Data Science",
    github: "https://github.com/ayamekni/IoT-Time-Series-Forecasting-Urban-Traffic",
  },
  {
    title: "Real-Time Facial Emotion Detection",
    desc: "Real-time facial emotion detection using webcam. Keras CNN + DeepFace for 7 emotions. OpenCV Haar Cascades. Logging pipelines, alert system (pygame), deployed on web.",
    tags: ["Python", "OpenCV", "TensorFlow", "DeepFace", "Flask", "React", "Computer Vision"],
    category: "Computer Vision",
    github: "https://github.com/ayamekni/EmotionGen",
  },
  {
    title: "Personal Chatbot Portfolio Assistant",
    desc: "AI assistant in Next.js + TypeScript. Floating chat widget. Lightweight local retrieval for fast Q&A about professional experience, skills, and projects.",
    tags: ["Next.js", "TypeScript", "React", "NLP", "Local Retrieval"],
    category: "Web Development",
    github: "https://github.com/ayamekni/aya-portfolio-chatbot",
  },
  {
    title: "JobNest — Job Aggregator",
    desc: "Flask web app with MongoDB. Web scraping with BeautifulSoup + Selenium. Responsive UI with Bootstrap. Application tracking system.",
    tags: ["Flask", "Python", "Selenium", "BeautifulSoup", "MongoDB", "Bootstrap"],
    category: "Web Development",
    github: "https://github.com/ayamekni/JobNest-App",
  },
  {
    title: "FocusFlow — Productivity App",
    desc: "Task tracking, Pomodoro timer, Spotify integration, Lo-Fi themes. Responsive, WCAG 2.2 AA compliant.",
    tags: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Vite"],
    category: "Web Development",
    github: "https://github.com/ayamekni/focusFlow",
  },
  {
    title: "Sales Trend Analysis Dashboard",
    desc: "Interactive Power BI dashboard. DAX, Power Query, storytelling visuals.",
    tags: ["Power BI", "DAX", "Data Cleaning"],
    category: "Data Science",
    github: "https://github.com/ayamekni/Customer-Shopping-Sales-Trend-Analysis",
  },
];

const filterKeys = ["All", "AI/ML", "Computer Vision", "NLP", "Document AI & OCR", "MLOps & Data Engineering", "Web Development", "Data Science"] as const;
type FilterKey = typeof filterKeys[number];

export function Projects() {
  const [filter, setFilter] = useState<FilterKey>("All");
  const { t } = useLanguage();

  const list = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projects" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} />
        <Reveal className="flex flex-wrap justify-center gap-2 mb-10">
          {filterKeys.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs px-3 py-1.5 rounded-full transition ${
                filter === f
                  ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-slate-950 font-semibold"
                  : "border border-white/10 text-muted-foreground hover:text-foreground hover:border-cyan-400/40"
              }`}
            >
              {t.projects.filters[f]}
            </button>
          ))}
        </Reveal>
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -y * 8, ry: x * 8 });
  };

  return (
    <motion.div
      ref={ref}
      layout
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group glass rounded-2xl p-5 relative overflow-hidden hover:glow-cyan transition"
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition" style={{
        background: "linear-gradient(135deg, oklch(0.82 0.16 210 / 0.08), oklch(0.65 0.22 310 / 0.08))",
      }} />
      {p.github && (
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${p.title} on GitHub`}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 text-foreground/70 hover:text-cyan-300 hover:border-cyan-400/50 hover:glow-cyan transition"
        >
          <Github className="w-4 h-4" />
        </a>
      )}
      <h3 className="font-semibold text-lg leading-snug">{p.title}</h3>
      <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-300/80 mt-1">
        {p.category}
      </div>
      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{p.desc}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.tags.map((tag) => (
          <span key={tag} className="font-mono text-[10px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-foreground/80">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
