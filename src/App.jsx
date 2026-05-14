import { useEffect, useMemo, useState } from "react";

import "./App.css";

import { simpleDomains } from "./data/scimData";

import {
  calculateRespirationScore,
  calculateBladderScore,
  calculateBowelScore,
  calculateMobilityScore,
} from "./utils/scoring";

import RespirationItem from "./components/RespirationItem";
import BladderItem from "./components/BladderItem";
import BowelItem from "./components/BowelItem";
import MobilityBranchItem from "./components/MobilityBranchItem";



export default function App() {
  const [loading, setLoading] = useState(true);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showIosInstallGuide, setShowIosInstallGuide] = useState(false);
  const STORAGE_KEY = "scim-sr-calculator-data";
  const getSavedData = () => {
    const saved = localStorage.getItem(STORAGE_KEY);

   if (!saved) return null; 

   try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};
  const savedData = getSavedData();


  const initialScores = {};
  simpleDomains.forEach((domain) => {
    domain.items.forEach((item) => {
      initialScores[item.id] = "";
    });
  });

 const [scores, setScores] = useState(savedData?.scores ?? initialScores);

 const [respiration, setRespiration] = useState(
  savedData?.respiration ?? {
    tracheostomy: "",
    trachCare: "",
    noTrachStatus: "",
  }
);

const [bladder, setBladder] = useState(
  savedData?.bladder ?? {
    catheter: "",
    intermittent: "",
    collector: "",
  }
);

const [bowel, setBowel] = useState(
  savedData?.bowel ?? {
    help: "",
    regularity: "",
    incontinence: "",
  }
);

const [mobility, setMobility] = useState(
  savedData?.mobility ?? {
    indoor: { method: "", wheelchair: "", walking: "" },
    moderate: { method: "", wheelchair: "", walking: "" },
    outdoor: { method: "", wheelchair: "", walking: "" },
  }
);

  useEffect(() => {
    const timer = setTimeout(() => {
    setLoading(false);
  }, 1000);

  return () => clearTimeout(timer);
}, []);

  useEffect(() => {
  const data = {
    scores,
    respiration,
    bladder,
    bowel,
    mobility,
  };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}, [scores, respiration, bladder, bowel, mobility]);

  useEffect(() => {
  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setInstallPrompt(event);
  };

  const handleAppInstalled = () => {
    setInstallPrompt(null);
    setShowIosInstallGuide(false);
  };

  window.addEventListener(
    "beforeinstallprompt",
    handleBeforeInstallPrompt
  );
  
  window.addEventListener("appinstalled", handleAppInstalled);

  const isIosOrIpad =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && 
      navigator.maxTouchPoints > 1);

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  if (isIosOrIpad && !isStandalone) {
    setShowIosInstallGuide(true);
  }

  return () => {
    window.removeEventListener(
      "beforeinstallprompt", 
      handleBeforeInstallPrompt
    );
    
    window.removeEventListener(
      "appinstalled", 
      handleAppInstalled
    );
  };
}, []);

  const respirationScore = calculateRespirationScore(respiration);
  const bladderScore = calculateBladderScore(bladder);
  const bowelScore = calculateBowelScore(bowel);
  const indoorScore = calculateMobilityScore(mobility.indoor);
  const moderateScore = calculateMobilityScore(mobility.moderate);
  const outdoorScore = calculateMobilityScore(mobility.outdoor);

  const simpleTotals = useMemo(() => {
    return simpleDomains.map((domain) => {
      const total = domain.items.reduce((sum, item) => {
        const value = scores[item.id];
        if (value === "") return sum;
        return sum + Number(value);
      }, 0);

      return {
        domain: domain.domain,
        total,
      };
    });
  }, [scores]);

  const selfCareTotal = simpleTotals.find((d) => d.domain === "Self-care").total;

  const respirationTotal =
    simpleTotals.find((d) => d.domain === "Respiration and sphincter management")
      .total +
    (respirationScore ?? 0) +
    (bladderScore ?? 0) +
    (bowelScore ?? 0);

  const mobilityTotal =
    simpleTotals.find((d) => d.domain === "Mobility").total +
    (indoorScore ?? 0) +
    (moderateScore ?? 0) +
    (outdoorScore ?? 0);

  const totalScore = selfCareTotal + respirationTotal + mobilityTotal;

  const selectedSimpleCount = Object.values(scores).filter(
    (value) => value !== ""
  ).length;

  const selectedBranchCount = [
    respirationScore,
    bladderScore,
    bowelScore,
    indoorScore,
    moderateScore,
    outdoorScore,
  ].filter((score) => score !== null).length;

  const selectedCount = selectedSimpleCount + selectedBranchCount;
  const totalItemCount = 17;

  const handleChange = (itemId, value) => {
    setScores((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const resetScores = () => {
    localStorage.removeItem(STORAGE_KEY);

    setScores(initialScores);
    setRespiration({
      tracheostomy: "",
      trachCare: "",
      noTrachStatus: "",
    });
    setBladder({ catheter: "", intermittent: "", collector: "" });
    setBowel({ help: "", regularity: "", incontinence: "" });
    setMobility({
      indoor: { method: "", wheelchair: "", walking: "" },
      moderate: { method: "", wheelchair: "", walking: "" },
      outdoor: { method: "", wheelchair: "", walking: "" },
    });
    
  };

  const handleInstallClick = async () => {
  if (!installPrompt) return;

  installPrompt.prompt();
  const choiceResult = await installPrompt.userChoice;

  if (choiceResult.outcome === "accepted") {
    setInstallPrompt(null);
  }
};

if (loading) {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <img
          src="/icon-512.png"
          alt="SCIM-SR"
          className="splash-logo"
        />

        <h1>SCIM-SR</h1>

        <p>Spinal Cord Independence Measure</p>
      </div>
    </div>
  );
}

  return (
    <main className="container">
      <h1>
        SCIM-SR
        <br />
        <span style={{ fontSize: "16px", fontWeight: "normal" }}>
          (Japanese version of Spinal Cord Independence Measure – self report
          自己報告形式の脊髄障害自立度評価法)
        </span>
      </h1>

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
{installPrompt && (
  <div className="install-banner">
    <div>
      <strong>アプリとして追加できます</strong>
      <p>ホーム画面からすぐ起動できます。</p>
    </div>
    <button onClick={handleInstallClick}>追加</button>
  </div>
)}

{showIosInstallGuide && (
  <div className="install-banner">
    <div>
      <strong>ホーム画面に追加できます</strong>
      <p>共有ボタン →「ホーム画面に追加」を選んでください。</p>
    </div>
    <button onClick={() => setShowIosInstallGuide(false)}>閉じる</button>
  </div>
)}

      <div className="bottom-score-bar">
      <div className="bottom-score-main">
       <span>合計</span>
       <strong>{totalScore} / 100 点</strong>
      </div>

  <div className="bottom-score-sub">
    <span>セルフケア {selfCareTotal} / 20</span>
    <span>呼吸と排泄管理 {respirationTotal} / 40</span>
    <span>移動 {mobilityTotal} / 40</span>
  </div>
</div>
    </main>
  );
}