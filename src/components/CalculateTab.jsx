import RespirationItem from "./RespirationItem";
import BladderItem from "./BladderItem";
import BowelItem from "./BowelItem";
import MobilityBranchItem from "./MobilityBranchItem";
import CopyResultButton from "./common/CopyResultButton";

export default function CalculateTab({
  scale,
  scores,
  respiration,
  setRespiration,
  bladder,
  setBladder,
  bowel,
  setBowel,
  mobility,
  setMobility,
  handleChange,
  resetScores,
  selfCareTotal,
  respirationTotal,
  mobilityTotal,
  totalScore,
  selectedCount,
  totalItemCount,
}) {
  const simpleDomains = scale?.domains ?? [];

  if (simpleDomains.length < 3) {
    return (
      <section className="card">
        <h2>読み込みエラー</h2>
        <p>この評価スコアのデータ形式を確認してください。</p>
      </section>
    );
  }

  return (


    <>
      <section className="summary">
        <h2>合計：{totalScore} / 100 点</h2>
        <p>
          入力済み：{selectedCount} / {totalItemCount} 項目
        </p>

        <p>セルフケア：{selfCareTotal} / 20</p>
        <p>呼吸と排泄管理：{respirationTotal} / 40</p>
        <p>移動：{mobilityTotal} / 40</p>

        <button onClick={resetScores}>リセット</button>
      </section>

      <section className="card">
        <h2>セルフケア</h2>
        {simpleDomains[0].items.map((item) => (
          <div className="item" key={item.id}>
            <label>{item.name}</label>

            {item.description && (
              <p className="description">{item.description}</p>
            )}

            <select
              value={scores[item.id]}
              onChange={(e) => handleChange(item.id, e.target.value)}
            >
              <option value="">未選択</option>
              {item.options.map(([score, description], index) => (
                <option key={index} value={score}>
                  {score}点：{description}
                </option>
              ))}
            </select>
          </div>
        ))}
      </section>

      <section className="card">
        <h2>呼吸と排泄管理</h2>

        <RespirationItem value={respiration} onChange={setRespiration} />
        <BladderItem value={bladder} onChange={setBladder} />
        <BowelItem value={bowel} onChange={setBowel} />

        <div className="item">
          <label>{simpleDomains[1].items[0].name}</label>

          {simpleDomains[1].items[0].description && (
            <p className="description">
              {simpleDomains[1].items[0].description}
            </p>
          )}

          <select
            value={scores.toilet}
            onChange={(e) => handleChange("toilet", e.target.value)}
          >
            <option value="">未選択</option>
            {simpleDomains[1].items[0].options.map(
              ([score, description], index) => (
                <option key={index} value={score}>
                  {score}点：{description}
                </option>
              )
            )}
          </select>
        </div>
      </section>

      <section className="card">
        <h2>移動</h2>

        {simpleDomains[2].items.slice(0, 3).map((item) => (
          <div className="item" key={item.id}>
            <label>{item.name}</label>

            {item.description && (
              <p className="description">{item.description}</p>
            )}

            <select
              value={scores[item.id]}
              onChange={(e) => handleChange(item.id, e.target.value)}
            >
              <option value="">未選択</option>
              {item.options.map(([score, description], index) => (
                <option key={index} value={score}>
                  {score}点：{description}
                </option>
              ))}
            </select>
          </div>
        ))}

        <MobilityBranchItem
          title="12. 屋内の移動"
          value={mobility.indoor}
          onChange={(newValue) =>
            setMobility((prev) => ({ ...prev, indoor: newValue }))
          }
        />

        <MobilityBranchItem
          title="13. 中程度の距離（10〜100m）の移動"
          value={mobility.moderate}
          onChange={(newValue) =>
            setMobility((prev) => ({ ...prev, moderate: newValue }))
          }
        />

        <MobilityBranchItem
          title="14. 100m以上の屋外の移動"
          value={mobility.outdoor}
          onChange={(newValue) =>
            setMobility((prev) => ({ ...prev, outdoor: newValue }))
          }
        />

        {simpleDomains[2].items.slice(3).map((item) => (
          <div className="item" key={item.id}>
            <label>{item.name}</label>

            {item.description && (
              <p className="description">{item.description}</p>
            )}

            <select
              value={scores[item.id]}
              onChange={(e) => handleChange(item.id, e.target.value)}
            >
              <option value="">未選択</option>

              {item.options.map(([score, description], index) => (
                <option key={index} value={score}>
                  {score}点：{description}
                </option>
              ))}
            </select>
          </div>
        ))}
      </section>

      <CopyResultButton
  title="SCIM-SR"
  text={`SCIM-SR：${totalScore}/100点
セルフケア：${selfCareTotal}/20
呼吸と排泄管理：${respirationTotal}/40
移動：${mobilityTotal}/40`}
/>

    </>
  );
}