import SelectBox from "./SelectBox";
import { calculateBowelScore } from "../utils/scoring";

export default function BowelItem({ value, onChange }) {
  const score = calculateBowelScore(value);

  return (
    <div className="branch-item">
      <h3>7. 排便管理</h3>

      <label>7A. 排便管理に他人の助け（例：座薬の挿入 ）が必要ですか？</label>
      <SelectBox
        value={value.help}
        onChange={(newValue) => onChange({ ...value, help: newValue })}
        options={[
          { value: "yes", label: "はい" },
          { value: "no", label: "いいえ" },
        ]}
      />

      <label>7B. 排便は</label>
      <SelectBox
        value={value.regularity}
        onChange={(newValue) => onChange({ ...value, regularity: newValue })}
        options={[
          { value: "irregular", label: "不規則またはまれ（3日に1回未満）" },
          { value: "regular", label: "規則的（3日に1回以上）" },
        ]}
      />

      <label>7C. 便失禁が起こるのは</label>
      <SelectBox
        value={value.incontinence}
        onChange={(newValue) => onChange({ ...value, incontinence: newValue })}
        options={[
          { value: "twice_or_more", label: "1ヶ月に2回以上" },
          { value: "once", label: "1ヶ月に1回" },
          { value: "none", label: "全くない" },
        ]}
      />

      <p className="score-result">
        点数：{score === null ? "未確定" : `${score} / 10 点`}
      </p>
    </div>
  );
}

