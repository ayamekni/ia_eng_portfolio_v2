import { BookOpen, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { StaggerGroup, itemVariants } from "./Reveal";

type Article = {
  title: string;
  platform: string;
  desc: string;
  link: string;
};

const articles: Article[] = [
  {
    title: "From Model Training to Scalable Deployment: Understanding the Fundamentals of MLOps",
    platform: "Medium · 2025",
    desc: "A practical deep-dive into MLOps principles through an end-to-end lung cancer prediction pipeline — covering automated environment management, experiment tracking with MLflow, FastAPI deployment, and Makefile automation.",
    link: "https://medium.com/@ayamekni2001/from-model-training-to-scalable-deployment-understanding-the-fundamentals-of-mlops-156c0a21ba76",
  },
  {
    title: "ATHENA: From Classical NLP to Modern LLMs — Building an Intelligent Educational Assistant",
    platform: "Medium · 2025",
    desc: "Technical walkthrough of building ATHENA, a RAG-based academic assistant — from classical NLP techniques to modern LLM integration with semantic search, document chunking, and LangChain.",
    link: "https://medium.com/@ayamekni2001/athena-from-classical-nlp-to-modern-llms-building-an-intelligent-educational-assistant-1025860c7ca6",
  },
];

export function Publications() {
  return (
    <section id="publications" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Publications" title="Writing & Research" />
        <StaggerGroup className="grid md:grid-cols-2 gap-5">
          {articles.map((a) => (
            <motion.article
              key={a.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 hover:glow-cyan transition flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-slate-950" />
                </div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-cyan-300/80">
                  {a.platform}
                </div>
              </div>
              <h3 className="text-lg font-semibold leading-snug">{a.title}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed flex-1">
                {a.desc}
              </p>
              <a
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 self-start rounded-lg px-4 py-2 text-sm font-medium bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-slate-950 hover:opacity-90 transition glow-cyan"
              >
                Read on Medium <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
