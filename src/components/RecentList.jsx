export default function RecentList({
  scales,
  recentScaleIds,
  onSelectScale,
}) {
  const recentScales = recentScaleIds
    .map((scaleId) => scales.find((scale) => scale.id === scaleId))
    .filter(Boolean);

  if (recentScales.length === 0) {
    return (
      <section className="card">
        <p>履歴はまだありません。</p>
        <p className="description">
          評価スコアを開くと、ここに最近使った評価が表示されます。
        </p>
      </section>
    );
  }

  return (
    <section className="card">
      <div className="scale-list">
        {recentScales.map((scale) => (
          <button
            key={scale.id}
            className="scale-card"
            onClick={() => onSelectScale(scale.id)}
          >
            <strong>{scale.shortTitle || scale.title}</strong>
            <span>{scale.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}