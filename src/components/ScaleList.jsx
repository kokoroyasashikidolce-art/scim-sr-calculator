import { categories } from "../data/categories";

export default function ScaleList({ scales, onSelectScale }) {
  return (
    <section className="card">
      {categories.map((category) => {
        const categoryScales = scales.filter(
          (scale) => scale.category === category.id
        );

        if (categoryScales.length === 0) return null;

        return (
          <div className="category-block" key={category.id}>
            <h3>
              <span>{category.icon}</span> {category.title}
            </h3>

            <p className="description">{category.description}</p>

            <div className="scale-list">
              {categoryScales.map((scale) => (
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
          </div>
        );
      })}
    </section>
  );
}