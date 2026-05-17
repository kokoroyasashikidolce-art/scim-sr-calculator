import { useState } from "react";
import { categories } from "../data/categories";

export default function SearchPage({ scales, onSelectScale }) {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredScales = scales.filter((scale) => {
    if (!normalizedQuery) return true;

    const category = categories.find(
  (category) => category.id === scale.category
);

const searchText = [
  scale.id,
  scale.title,
  scale.shortTitle,
  scale.headerTitle,
  scale.category,
  category?.title,
  category?.description,
  scale.tabs?.overview,
  scale.tabs?.tips,
]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchText.includes(normalizedQuery);
  });

  return (
    <>
      <section className="card">
        <input
          className="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="評価スコア名・略語・カテゴリで検索"
          autoFocus
        />
      </section>

      <section className="card">
        {filteredScales.length === 0 ? (
          <p>該当する評価スコアはありません。</p>
        ) : (
          <div className="scale-list">
            {filteredScales.map((scale) => (
              <button
                key={scale.id}
                className="scale-card"
                onClick={() => onSelectScale(scale.id)}
              >
                <strong>{scale.shortTitle || scale.title}</strong>
                <span>{scale.headerTitle || scale.title}</span>
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  );
}