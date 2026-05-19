import { useEffect, useRef, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

type Message = { role: 'user' | 'assistant'; content: string };

const CHATBOT_API = import.meta.env.VITE_CHATBOT_API_URL as string;

export function ChatWidget() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDot, setShowDot] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTooltip(true), 3000);
    const t2 = setTimeout(() => setShowTooltip(false), 9000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleOpen = () => {
    setOpen(v => !v);
    setShowDot(false);
    setShowTooltip(false);
  };

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading]);

  const send = useCallback(async (text: string) => {
    const value = text.trim();
    if (!value || loading) return;

    const user: Message = { role: 'user', content: value };
    setMessages(prev => [...prev, user]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${CHATBOT_API}/api/chat`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, user] }),
      });
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data?.reply ?? 'No answer returned.' },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection error');
    } finally {
      setLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [messages, loading]);

  return (
    <>
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 max-w-[200px] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm font-medium text-white shadow-lg cursor-pointer"
            style={{ background: 'var(--gradient-accent)' }}
            onClick={handleOpen}
          >
            {t.chat.tooltip}
            <div className="absolute -bottom-2 right-4 w-3 h-3 rotate-45" style={{ background: 'oklch(0.65 0.22 310)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.button
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg glow-cyan border border-white/15"
        style={{ background: 'var(--gradient-accent)' }}
        animate={!open ? { y: [0, -6, 0] } : {}}
        transition={!open ? { duration: 1.8, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' } : {}}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Notification dot */}
        {showDot && !open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-slate-950 flex items-center justify-center">
            <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 animate-ping opacity-75" />
            <span className="text-[8px] font-bold text-white leading-none">1</span>
          </span>
        )}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[min(92vw,380px)] h-[min(70vh,560px)] flex flex-col rounded-2xl glass-strong overflow-hidden"
            style={{
              boxShadow: '0 20px 60px -15px oklch(0.16 0.04 260 / 0.8), var(--shadow-glow)',
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3 flex-shrink-0">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0"
                style={{ background: 'var(--gradient-accent)' }}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground">{t.chat.title}</div>
                <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t.chat.status}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0"
            >
              {messages.length === 0 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.chat.welcome}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.chat.suggestions.map(s => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-foreground/80 hover:bg-white/10 hover:border-[oklch(0.82_0.16_210/0.4)] transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => {
                const isUser = m.role === 'user';
                return (
                  <div key={i} className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
                    <div
                      className={cn(
                        'max-w-[85%] text-sm leading-relaxed',
                        isUser
                          ? 'rounded-2xl rounded-br-sm px-3.5 py-2 text-white'
                          : 'text-foreground/90',
                      )}
                      style={isUser ? { background: 'var(--gradient-accent)' } : undefined}
                    >
                      {isUser ? (
                        <span className="whitespace-pre-wrap">{m.content}</span>
                      ) : (
                        <div className="prose prose-invert prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-a:text-[oklch(0.82_0.16_210)] prose-strong:text-[oklch(0.82_0.16_210)]">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-1 px-3 py-2">
                    <span className="w-2 h-2 rounded-full bg-[oklch(0.82_0.16_210)] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[oklch(0.82_0.16_210)] animate-bounce" style={{ animationDelay: '120ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[oklch(0.82_0.16_210)] animate-bounce" style={{ animationDelay: '240ms' }} />
                  </div>
                </div>
              )}

              {error && (
                <div className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
                  {t.chat.error}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={e => {
                e.preventDefault();
                send(input);
              }}
              className="p-3 border-t border-white/10 flex items-end gap-2 flex-shrink-0"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder={t.chat.placeholder}
                className="flex-1 resize-none max-h-32 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[oklch(0.82_0.16_210/0.5)] focus:ring-1 focus:ring-[oklch(0.82_0.16_210/0.3)]"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
                style={{ background: 'var(--gradient-accent)' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
