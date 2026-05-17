export default function ScoreSelectItem({
  item,
  value,
  onChange,
}) {
  return (
    <div className="item">
      <label>{item.title || item.name}</label>

      {item.description && (
        <p className="description">
          {item.description}
        </p>
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">未選択</option>

        {item.options.map((option, index) => {
          const score =
            option.score ?? option[0];

          const label =
            option.label ?? option[1];

          return (
            <option
              key={index}
              value={score}
            >
              {score}{item.scoreUnit ?? "点"}：
            </option>
          );
        })}
      </select>
    </div>
  );
}