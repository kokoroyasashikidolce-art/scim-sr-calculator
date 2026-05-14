import { useState } from "react";

export default function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeTab < tabs.length - 1) {
        setActiveTab(activeTab + 1);
      }

      if (diff < 0 && activeTab > 0) {
        setActiveTab(activeTab - 1);
      }
    }

    setTouchStartX(null);
  };

  return (
    <>
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            className={activeTab === index ? "tab-button active" : "tab-button"}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className="tab-content"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {tabs[activeTab].content}
      </div>
    </>
  );
}