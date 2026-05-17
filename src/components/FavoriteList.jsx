export default function FavoriteList({
  scales,
  favoriteScaleIds,
  onSelectScale,
}) {
  const favoriteScales = favoriteScaleIds
  .map((favoriteId) =>
    scales.find((scale) => scale.id === favoriteId)
  )
  .filter(Boolean)

  if (favoriteScales.length === 0) {
    return (
      <section className="card">
        <p>お気に入りはまだありません。</p>
        <p className="description">
          各評価スコア画面の右上にある☆を押すと、お気に入りに追加できます。
        </p>
      </section>
    );
  }

  return (
    <section className="card">
      <div className="scale-list">
        {favoriteScales.map((scale) => (
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