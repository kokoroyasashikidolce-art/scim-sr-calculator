import { useState } from "react";

const COPY_HISTORY_KEY = "rehab-score-copy-history";

export default function CopyHistory() {
  const [openedId, setOpenedId] = useState(null);

  const saved = localStorage.getItem(COPY_HISTORY_KEY);
  const histories = saved ? JSON.parse(saved) : [];

const handleCopyAgain = async (event, text) => {
  event.stopPropagation();
  await navigator.clipboard.writeText(text);
};  

  if (histories.length === 0) {
    return (
      <section className="card">
        <p>コピー履歴はまだありません。</p>
      </section>
    );
  }

  return (
  <>
    <section className="card">
      <h3>コピー履歴について</h3>

      <p>
        コピー履歴は最新100件まで保存されます。
      </p>

      <p>
        100件を超えると古い履歴から自動削除されます。
      </p>

      <p>
        ブラウザデータ削除、PWA削除、端末変更などで
        履歴が消える場合があります。
      </p>
    </section>

    <section className="copy-history-list">
      {histories.map((item) => {
        const isOpen = openedId === item.id;
        const lines = item.text.split("\n").filter(Boolean);
        const preview = lines.slice(0, 3).join("\n");

        return (
          
          <div
            key={item.id}
            className="copy-history-card"
            onClick={() => setOpenedId(isOpen ? null : item.id)}
          >
            <strong>{item.title}</strong>
            <small>
              {new Date(item.copiedAt).toLocaleString("ja-JP")}
            </small>

            <pre>{isOpen ? item.text : preview}</pre>
            {isOpen && (
  <button
    className="copy-again-button"
    onClick={(event) => handleCopyAgain(event, item.text)}
  >
    再コピー
  </button>
)}
  </div>
);
 
      })}
    </section>
  </>
);
}