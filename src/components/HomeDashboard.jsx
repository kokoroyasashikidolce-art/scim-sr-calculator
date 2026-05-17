const homeCards = [
  {
    id: "scale-list",
    title: "評価一覧",
    description: "カテゴリ別に評価スコアを探す",
    icon: "📋",
  },
  {
    id: "search",
    title: "検索",
    description: "評価名やキーワードで検索",
    icon: "🔍",
  },
  {
    id: "favorites",
    title: "お気に入り",
    description: "よく使う評価を登録",
    icon: "⭐",
  },
  {
    id: "history",
    title: "履歴",
    description: "最近使った評価を表示",
    icon: "🕘",
  },
  {
    id: "sets",
    title: "評価セット",
    description: "疾患・場面ごとの評価セット",
    icon: "🧩",
  },
  {
    id: "copy-result",
    title: "コピー履歴",
    description: "最近コピーした結果を確認",
    icon: "📄",
  },
  {
    id: "updates",
    title: "更新情報",
    description: "追加・修正履歴を確認",
    icon: "📢",
  },
  {
    id: "settings",
    title: "設定",
    description: "表示や保存の設定",
    icon: "⚙️",
  },
];

export default function HomeDashboard({ onSelectMenu }) {
  return (
    <section className="home-dashboard">
      <p className="home-lead">
        評価スコアの計算、概要確認、豆知識をまとめて使えます。
      </p>

      <div className="home-card-grid">
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