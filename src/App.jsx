import { useEffect, useMemo, useRef, useState } from "react";

import "./App.css";

import {
  calculateRespirationScore,
  calculateBladderScore,
  calculateBowelScore,
  calculateMobilityScore,
} from "./utils/scoring";

import Tabs from "./components/Tabs";
import CalculateTab from "./components/CalculateTab";
import OverviewTab from "./components/OverviewTab";
import TipsTab from "./components/TipsTab";
import ScoreCalculator from "./components/common/ScoreCalculator";
import { scales } from "./data/scales";

import HomeDashboard from "./components/HomeDashboard";

import ScaleList from "./components/ScaleList.jsx";

import AppHeader from "./components/AppHeader";
import CopyHistory from "./components/CopyHistory";
import FavoriteList from "./components/FavoriteList";
import RecentList from "./components/RecentList";
import SearchPage from "./components/SearchPage";

export default function App() {
  const scimSrScale = scales.find(
    (scale) => scale.id === "scim-sr"

  );
  const [loading, setLoading] = useState(true);
  const simpleDomains = scimSrScale.domains;
  const [currentMenu, setCurrentMenu] = useState("home");
  const [selectedScaleId, setSelectedScaleId] = useState(null);
  const [previousMenu, setPreviousMenu] = useState("scale-list");
  const scrollPositionsRef = useRef({});
  const [pendingScrollY, setPendingScrollY] = useState(null);
  const saveCurrentScroll = (menuName) => {
  scrollPositionsRef.current[menuName] = window.scrollY;
};
 const FAVORITES_KEY = "rehab-score-favorites";
 const [favoriteScaleIds, setFavoriteScaleIds] = useState(() => {
  const saved = localStorage.getItem(FAVORITES_KEY);
  return saved ? JSON.parse(saved) : [];
});
const toggleFavorite = (scaleId) => {
  setFavoriteScaleIds((prev) => {
    const next = prev.includes(scaleId)
      ? prev.filter((id) => id !== scaleId)
       : [scaleId, ...prev];

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    return next;
  });
};

const RECENT_KEY = "rehab-score-recent";

const [recentScaleIds, setRecentScaleIds] = useState(() => {
  const saved = localStorage.getItem(RECENT_KEY);
  return saved ? JSON.parse(saved) : [];
});

const addRecentScale = (scaleId) => {
  setRecentScaleIds((prev) => {
    const next = [
      scaleId,
      ...prev.filter((id) => id !== scaleId),
    ].slice(0, 50);

    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    return next;
  });
};

  const selectedScale = scales.find(
    (scale) => scale.id === selectedScaleId
  );
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
  if (pendingScrollY === null) return;

  const timer = setTimeout(() => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: pendingScrollY,
        behavior: "instant",
      });

      setPendingScrollY(null);
    });
  }, 120);

  return () => clearTimeout(timer);
}, [currentMenu, pendingScrollY]);

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
        <img src="/icon-512.png" alt="SCIM-SR" className="splash-logo" />
        <h1>リハ評価スコア</h1>
        <p>Rehabilitation Assessment Tools</p>
      </div>
    </div>
  );
}

return (
  <>
    <main className="container">
      <h1>
        リハ評価スコア
        <br />
        <span style={{ fontSize: "16px", fontWeight: "normal" }}>
          Rehabilitation Assessment Tools
        </span>
      </h1>

     {currentMenu === "home" && (
  <HomeDashboard onSelectMenu={setCurrentMenu} />
)}

{currentMenu === "scale-list" && !selectedScale && (
  <>
    <AppHeader
      title="評価一覧"
      onBack={() => setCurrentMenu("home")}
    />

    <ScaleList
      scales={scales}
      onSelectScale={(scaleId) => {
         setSelectedScaleId(scaleId);
         addRecentScale(scaleId);
         setPreviousMenu("scale-list");
         saveCurrentScroll("scale-list");
         setCurrentMenu("scale-detail");
         window.scrollTo(0, 0);
      }}
      onBackHome={() => setCurrentMenu("home")}
    />
  </>
)}

{currentMenu === "copy-result" && (
  <>
    <AppHeader
      title="コピー履歴"
      onBack={() => setCurrentMenu("home")}
    />

    <CopyHistory />
  </>
)}

{currentMenu === "favorites" && (
  <>
    <AppHeader
      title="お気に入り"
      onBack={() => setCurrentMenu("home")}
    />

    <FavoriteList
      scales={scales}
      favoriteScaleIds={favoriteScaleIds}
      onSelectScale={(scaleId) => {
  setSelectedScaleId(scaleId);
  addRecentScale(scaleId);
  setPreviousMenu("favorites");
  saveCurrentScroll("favorites");
  setCurrentMenu("scale-detail");
  window.scrollTo(0, 0);
}}
    />
  </>
)}
{currentMenu === "history" && (
  <>
    <AppHeader
      title="履歴"
      onBack={() => setCurrentMenu("home")}
    />

    <RecentList
      scales={scales}
      recentScaleIds={recentScaleIds}
      onSelectScale={(scaleId) => {
  setSelectedScaleId(scaleId);
  addRecentScale(scaleId);
  setPreviousMenu("history");
  saveCurrentScroll("history");
  setCurrentMenu("scale-detail");
  window.scrollTo(0, 0);
}}
    />
  </>
)}

{currentMenu === "search" && (
  <>
    <AppHeader
      title="検索"
      onBack={() => setCurrentMenu("home")}
    />

    <SearchPage
      scales={scales}
      onSelectScale={(scaleId) => {
        setSelectedScaleId(scaleId);
        addRecentScale(scaleId);
        setPreviousMenu("search");
        saveCurrentScroll("search");
        setCurrentMenu("scale-detail");
        window.scrollTo(0, 0);
      }}
    />
  </>
)}

 {currentMenu === "scale-detail" && selectedScale && (
  <>
    <AppHeader
  title={
  selectedScale.headerTitle ||
  selectedScale.shortTitle ||
  selectedScale.title
}
  onBack={() => {
  setPendingScrollY(scrollPositionsRef.current[previousMenu] ?? 0);
  setSelectedScaleId(null);
  setCurrentMenu(previousMenu);
}}
  rightContent={
    <button
      className="favorite-button"
      onClick={() => toggleFavorite(selectedScale.id)}
      aria-label="お気に入り"
    >
      {favoriteScaleIds.includes(selectedScale.id) ? "★" : "☆"}
    </button>
  }
/>

    <Tabs
      tabs={[

             {
  label: "計算",
  content:
    selectedScale.id === "scim-sr" ? (
      <CalculateTab
        scale={scimSrScale}
        scores={scores}
        respiration={respiration}
        setRespiration={setRespiration}
        bladder={bladder}
        setBladder={setBladder}
        bowel={bowel}
        setBowel={setBowel}
        mobility={mobility}
        setMobility={setMobility}
        handleChange={handleChange}
        resetScores={resetScores}
        selfCareTotal={selfCareTotal}
        respirationTotal={respirationTotal}
        mobilityTotal={mobilityTotal}
        totalScore={totalScore}
        selectedCount={selectedCount}
        totalItemCount={totalItemCount}
      />
    ) : (
      <ScoreCalculator scale={selectedScale} />
    ),
},



             {
  label: "概要",
  content: (
    <section className="card">
      <h2>概要</h2>
      <p>{selectedScale.tabs?.overview ?? "概要は未登録です。"}</p>
    </section>
  ),
},
{
  label: "豆知識",
  content: (
    <section className="card">
      <h2>豆知識</h2>
      <p>{selectedScale.tabs?.tips ?? "豆知識は未登録です。"}</p>
    </section>
  ),
},
              
            ]}
          />
        </>
      )}

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

      {selectedScale && selectedScale.id === "scim-sr" && (
      <div className="bottom-score-bar">
        <div className="bottom-score-main">
          <span>合計</span>
          <strong>{totalScore} / 100 点</strong>
        </div>

        <div className="bottom-score-sub">
          <span>セルフケア {selfCareTotal} / 20点</span>
          <span>呼吸と排泄管理 {respirationTotal} / 40点</span>
          <span>移動 {mobilityTotal} / 40点</span>
        </div>
      </div>
      )}
    </main>
  </>
);
}
