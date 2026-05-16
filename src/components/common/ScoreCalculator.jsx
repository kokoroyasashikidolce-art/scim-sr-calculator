import { useMemo, useState } from "react";
import ScoreSelectItem from "./ScoreSelectItem";
import CopyResultButton from "./CopyResultButton";
import FimLocomotionItem from "../special/FimLocomotionItem";

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

  const [specialScores, setSpecialScores] = useState({});

  const handleChange = (itemId, value) => {
    setScores((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const domainTotals = useMemo(() => {
    return scale.domains.map((domain) => {
      const total = domain.items.reduce((sum, item) => {
       if (item.type === "special") {
  const specialValue = specialScores[item.id];
  if (!specialValue?.score) return sum;
  return sum + Number(specialValue.score);
}
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
    });}, [scores, specialScores, scale.domains]);

  const totalScore = domainTotals.reduce(
    (sum, domain) => sum + domain.total,
    0
  );

  const selectedCount = Object.values(scores).filter(
    (value) => value !== ""
  ).length;

  const totalItemCount = scale.domains.reduce((sum, domain) => {
    return (
      sum + domain.items.filter((item) => item.type !== "special").length
    );
  }, 0);

  const resetScores = () => {
    setScores(initialScores);
  };

  const selectedNormalItems = scale.domains.flatMap((domain) =>
  domain.items
    .filter((item) => item.type !== "special")
    .filter((item) => scores[item.id] !== "")
    .map((item) => {
      const selectedOption = item.options.find(
        (option) => String(option.score) === String(scores[item.id])
      );

      const scoreText = selectedOption?.score ?? scores[item.id];

      return `${item.title || item.name}：${scoreText}点`;
    })
);

const selectedSpecialItems = scale.domains.flatMap((domain) =>
  domain.items
    .filter((item) => item.type === "special")
    .map((item) => {
      const value = specialScores[item.id];

      if (!value?.score) return null;

      const methodText =
        value.method === "walk"
          ? "歩行"
          : value.method === "wheelchair"
          ? "車いす"
          : "";

      return `${item.title || item.name}（${methodText}）：${value.score}点`;
    })
    .filter(Boolean)
);

const selectedItemsText = [
  ...selectedNormalItems,
  ...selectedSpecialItems,
].join("\n");


  const copyText =
    scale.showTotal === false
      ? `${scale.shortTitle || scale.title}

【選択項目】
${selectedItemsText || "未選択"}`
      : `${scale.shortTitle || scale.title}：${totalScore}${
          scale.totalScore ? `/${scale.totalScore}点` : "点"
        }

${domainTotals
  .map((domain) => `${domain.title}：${domain.total}`)
  .join("\n")}

【選択項目】
${selectedItemsText || "未選択"}`;

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
            if (item.type === "special" && item.component === "FimLocomotionItem") {
  return (
    <FimLocomotionItem
      key={item.id}
      value={specialScores[item.id]}
      onChange={(newValue) =>
        setSpecialScores((prev) => ({
          ...prev,
          [item.id]: newValue,
        }))
      }
    />
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

      <CopyResultButton
        title={scale.shortTitle || scale.title}
        text={copyText}
      />
    </>
  );
}