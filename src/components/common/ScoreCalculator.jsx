import { useMemo, useState } from "react";
import ScoreSelectItem from "./ScoreSelectItem";

export default function ScoreCalculator({ scale }) {
  const initialScores = {};

  scale.domains.forEach((domain) => {
    domain.items.forEach((item) => {
      if (item.type !== "special") {
        initialScores[item.id] = "";
      }
    });
  });

  const [scores, setScores] = useState(initialScores);

  const handleChange = (itemId, value) => {
    setScores((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const domainTotals = useMemo(() => {
    return scale.domains.map((domain) => {
      const total = domain.items.reduce((sum, item) => {
        if (item.type === "special") return sum;

        const value = scores[item.id];
        if (value === "") return sum;

        return sum + Number(value);
      }, 0);

      return {
        id: domain.id,
        title: domain.title,
        total,
        maxScore: domain.maxScore,
      };
    });
  }, [scores, scale.domains]);

  const totalScore = domainTotals.reduce(
    (sum, domain) => sum + domain.total,
    0
  );

  const selectedCount = Object.values(scores).filter(
    (value) => value !== ""
  ).length;

  const totalItemCount = scale.domains.reduce((sum, domain) => {
    return (
      sum +
      domain.items.filter((item) => item.type !== "special").length
    );
  }, 0);

  const resetScores = () => {
    setScores(initialScores);
  };

  return (
    <>
      <section className="summary">
        {scale.showTotal === false ? (
          <h2>{scale.title}</h2>
        ) : (
          <h2>
            合計：{totalScore}
            {scale.totalScore ? ` / ${scale.totalScore} 点` : " 点"}
          </h2>
      )}

        <p>
          入力済み：{selectedCount} / {totalItemCount} 項目
        </p>

        {scale.showTotal !== false &&
          domainTotals.map((domain) => (
            <p key={domain.id}>
              {domain.title}：{domain.total}
              {domain.maxScore ? ` / ${domain.maxScore}` : ""}
           </p>
         ))}

        <button onClick={resetScores}>リセット</button>
      </section>

      {scale.domains.map((domain) => (
        <section className="card" key={domain.id}>
          <h2>{domain.title}</h2>

          {domain.description && (
            <p className="description">{domain.description}</p>
          )}

          {domain.items.map((item) => {
            if (item.type === "special") {
              return (
                <div className="branch-item" key={item.id}>
                  <h3>{item.title}</h3>
                  <p className="description">
                    この項目は特殊分岐形式です。専用部品で後から表示します。
                  </p>
                </div>
              );
            }

            return (
              <ScoreSelectItem
                key={item.id}
                item={item}
                value={scores[item.id]}
                onChange={(value) => handleChange(item.id, value)}
              />
            );
          })}
        </section>
      ))}
    </>
  );
}