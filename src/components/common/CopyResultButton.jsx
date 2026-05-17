import { useState } from "react";

const COPY_HISTORY_KEY = "rehab-score-copy-history";

export default function CopyResultButton({ title, text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);

    const saved = localStorage.getItem(COPY_HISTORY_KEY);
    const history = saved ? JSON.parse(saved) : [];

    const newItem = {
      id: Date.now(),
      title,
      text,
      copiedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      COPY_HISTORY_KEY,
      JSON.stringify(
  [newItem, ...history].slice(0, 100))
    );

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section className="card copy-result-card">
      <h2>結果コピー</h2>

      <pre className="copy-preview">{text}</pre>

      <button onClick={handleCopy}>
        {copied ? "コピーしました" : "結果をコピー"}
      </button>
    </section>
  );
}