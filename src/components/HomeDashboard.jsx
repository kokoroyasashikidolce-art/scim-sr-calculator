const homeCards = [
  {
    id: "scale-list",
    title: "評価一覧",
    description: "カテゴリ別",
    icon: "📋",
  },
  {
    id: "search",
    title: "検索",
    description: "評価を検索",
    icon: "🔍",
  },
  {
    id: "favorites",
    title: "お気に入り",
    description: "よく使うもの",
    icon: "⭐",
  },
  {
    id: "history",
    title: "履歴",
    description: "最近の閲覧",
    icon: "🕘",
  },
  {
    id: "sets",
    title: "評価セット",
    description: "疾患・場面別",
    icon: "🧩",
  },
  {
    id: "copy-result",
    title: "コピー履歴",
    description: "結果コピーの履歴",
    icon: "📄",
  },
  {
    id: "updates",
    title: "情報",
    description: "お知らせ等",
    icon: "📢",
  },
  {
    id: "settings",
    title: "設定",
    description: "表示や管理",
    icon: "⚙️",
  },
];

export default function HomeDashboard({ onSelectMenu }) {
  return (
    <section className="home-dashboard">
      <p className="home-description">
        評価スコアの計算、概要確認、豆知識をまとめて使えます。
      </p>

      <div className="home-grid">
        {homeCards.map((card) => (
          <button
            key={card.id}
            className="home-card"
            onClick={() => onSelectMenu(card.id)}
          >
            <span className="home-card-icon">{card.icon}</span>

            <span className="home-card-text">
              <strong>{card.title}</strong>
              <small>{card.description}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}