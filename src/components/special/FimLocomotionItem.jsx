const fimOptions = [
  { score: 1, label: "全介助" },
  { score: 2, label: "最大介助" },
  { score: 3, label: "中等度介助" },
  { score: 4, label: "最小介助" },
  { score: 5, label: "監視・準備" },
  { score: 6, label: "修正自立" },
  { score: 7, label: "完全自立" },
];

export default function FimLocomotionItem({ value, onChange }) {
  const method = value?.method ?? "";
  const score = value?.score ?? "";

  const handleMethodChange = (newMethod) => {
    onChange({
      method: newMethod,
      score: "",
    });
  };

  const handleScoreChange = (newScore) => {
    onChange({
      method,
      score: newScore,
    });
  };

  return (
    <div className="branch-item">
      <h3>移動</h3>

      <label>移動方法</label>
      <select
        value={method}
        onChange={(e) => handleMethodChange(e.target.value)}
      >
        <option value="">未選択</option>
        <option value="walk">歩行</option>
        <option value="wheelchair">車いす</option>
      </select>

      {method && (
        <>
          <label>{method === "walk" ? "歩行の点数" : "車いす移動の点数"}</label>
          <select
            value={score}
            onChange={(e) => handleScoreChange(e.target.value)}
          >
            <option value="">未選択</option>
            {fimOptions.map((option) => (
              <option key={option.score} value={option.score}>
                {option.score}点：{option.label}
              </option>
            ))}
          </select>
        </>
      )}

      <p className="score-result">
        点数：{score === "" ? "未確定" : `${score} / 7 点`}
      </p>
    </div>
  );
  }