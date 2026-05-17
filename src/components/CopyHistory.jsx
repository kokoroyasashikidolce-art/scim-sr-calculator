import { useState } from "react";

const COPY_HISTORY_KEY = "rehab-score-copy-history";

export default function CopyHistory() {
  const [openedId, setOpenedId] = useState(null);

  const saved = localStorage.getItem(COPY_HISTORY_KEY);
  const histories = saved ? JSON.parse(saved) : [];

  if (histories.length === 0) {
    return (
      <section className="card">
        <p>コピー履歴はまだありません。</p>
      </section>
    );
  }

  return (
    <section className="copy-history-list">
      {histories.map((item) => {
        const isOpen = openedId === item.id;
        const lines = item.text.split("\n").filter(Boolean);
        const preview = lines.slice(0, 3).join("\n");

        return (
          <button
            key={item.id}
            className="copy-history-card"
            onClick={() => setOpenedId(isOpen ? null : item.id)}
          >
            <strong>{item.title}</strong>
            <small>
              {new Date(item.copiedAt).toLocaleString("ja-JP")}
            </small>

            <pre>{isOpen ? item.text : preview}</pre>
          </button>
        );
      })}
    </section>
  );
}