
import SelectBox from "./SelectBox";
import { calculateBladderScore } from "../utils/scoring";

export default function BladderItem({ value, onChange }) {
  const score = calculateBladderScore(value);

  return (
    <div className="branch-item">
      <h3>6. 排尿管理</h3>
     <p className="description">
      膀胱を空にする方法について考えてください
     </p>
      <label>6A. 留置カテーテルの使用</label>
      <SelectBox
        value={value.catheter}
        onChange={(newValue) =>
          onChange({ catheter: newValue, intermittent: "", collector: "" })
        }
        options={[
          { value: "yes", label: "はい → 7Aに進む" },
          { value: "no", label: "いいえ → 6Bと6Cへ進む" },
        ]}
      />

      {value.catheter === "no" && (
        <>
          <label>6B. 間欠的導尿</label>
          <SelectBox
            value={value.intermittent}
            onChange={(newValue) =>
              onChange({ ...value, intermittent: newValue })
            }
            options={[
              { value: "full_help", label: "全面的に介助が必要" },
              { value: "with_help", label: "介助があれば自分でできる(自己導尿法)" },
              { value: "independent", label: "介助なしで自分でできる(自己導尿法)" },
              { value: "not_used", label: "用いない" },
            ]}
          />

          <label>6C. 集尿器の使用</label>
          <SelectBox
            value={value.collector}
            onChange={(newValue) => onChange({ ...value, collector: newValue })}
            options={[
              { value: "full_help", label: "その使用に全面的に介助が必要" },
              { value: "partial_help", label: "その使用に部分的に介助が必要" },
              { value: "independent", label: "介助なしで使用" },
              {
                value: "none_no_incontinence",
                label: "失禁なく，集尿器は使用しない",
              },
            ]}
          />
        </>
      )}

      <p className="score-result">
        点数：{score === null ? "未確定" : `${score} / 15 点`}
      </p>
    </div>
  );}