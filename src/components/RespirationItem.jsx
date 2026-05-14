
import SelectBox from "./SelectBox";
import { calculateRespirationScore } from "../utils/scoring";

export default function RespirationItem({ value, onChange }) {
  const score = calculateRespirationScore(value);

  return (
    <div className="branch-item">
      <h3>5. 呼吸</h3>

      <label>気管チューブが必要ですか？</label>
      <SelectBox
        value={value.tracheostomy}
        onChange={(newValue) =>
          onChange({
            tracheostomy: newValue,
            trachCare: "",
            noTrachStatus: "",
          })
        }
        options={[
          { value: "yes", label: "必要である" },
          { value: "no", label: "不要である" },
        ]}
      />

      {value.tracheostomy === "yes" && (
        <>
          <label>気管チューブが必要な場合</label>
          <SelectBox
            value={value.trachCare}
            onChange={(newValue) =>
              onChange({ ...value, trachCare: newValue })
            }
            options={[
              {
                value: "heavy_help",
                label: "常にまたは時に補助換気をする必要がある",
              },
              {
                value: "little_help",
                label: "酸素の投与や咳をするとき、呼吸チューブの管理に多大な介助が必要",
              },
              {
                value: "independent",
                label: "咳をするときや呼吸チューブの管理にほとんど介助を必要としない",
              },
            ]}
          />
        </>
      )}

      {value.tracheostomy === "no" && (
        <>
          <label>気管チューブが不要な場合</label>
          <SelectBox
            value={value.noTrachStatus}
            onChange={(newValue) =>
              onChange({ ...value, noTrachStatus: newValue })
            }
            options={[
              {
                value: "oxygen_sometimes",
                label: "酸素や咳をするときに多大な介助を必要としたり、ときどきマスク(例：ピープ)や補助換気(例：バイパップ)の使用が必要",
              },
              {
                value: "cough_little_help",
                label: "咳をする時に介助や刺激がほんのわずかに必要",
              },
              {
                value: "independent",
                label: "介助や補助具なしで自立して呼吸や咳が可能",
              },
            ]}
          />
        </>
      )}

      <p className="score-result">
        点数：{score === null ? "未確定" : `${score} / 10 点`}
      </p>
    </div>
  );
}
