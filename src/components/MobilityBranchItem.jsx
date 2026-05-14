import SelectBox from "./SelectBox";
import { calculateMobilityScore } from "../utils/scoring";

export default function MobilityBranchItem({ title, value, onChange }) {
  const score = calculateMobilityScore(value);

  return (
    <div className="branch-item">
      <h3>{title}</h3>

      <label>移動方法</label>
      <SelectBox
        value={value.method}
        onChange={(newValue) =>
          onChange({ method: newValue, wheelchair: "", walking: "" })
        }
        options={[
          { value: "wheelchair", label: "車椅子を使用する" },
          { value: "walking", label: "歩行する" },
        ]}
      />

      {value.method === "wheelchair" && (
        <>
          <label>車椅子での移動</label>
          <SelectBox
            value={value.wheelchair}
            onChange={(newValue) => onChange({ ...value, wheelchair: newValue })}
            options={[
              { value: "full_help", label: "全面的に介助が必要" },
              {
                value: "partial_help",
                label: "電動車椅子を必要とする，または手動車椅子操作に部分的に介助が必要",
              },
              { value: "independent", label: "手動車椅子で自立している" },
            ]}
          />
        </>
      )}

      {value.method === "walking" && (
        <>
          <label>歩行での移動</label>
          <SelectBox
            value={value.walking}
            onChange={(newValue) => onChange({ ...value, walking: newValue })}
            options={[
              { value: "supervision", label: "歩行時に見守りを必要とする（補助具の要否は問わない）" },
              {
                value: "walker_or_crutches_swing",
                label: "歩行器または松葉杖を使用し，両足を同時に振り出す",
              },
              {
                value: "two_crutches_or_two_canes",
                label: "松葉杖またはT字杖2本で，片足ずつ振り出す",
              },
              { value: "one_cane", label: "一本杖で歩行" },
              { value: "orthosis_only", label: "下肢装具のみで歩行" },
              { value: "no_aid", label: "補助具なしに歩行" },
            ]}
          />
        </>
      )}

      <p className="score-result">
        点数：{score === null ? "未確定" : `${score} / 8 点`}
      </p>
    </div>
  );
}

