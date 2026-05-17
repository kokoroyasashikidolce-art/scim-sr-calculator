export default function AppHeader({
  title,
  onBack,
  rightContent = null,
}) {
  return (
    <div className="scale-fixed-header">
      <button
        className="back-button"
        onClick={onBack}
        aria-label="戻る"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="scale-header-title">
        {title}
      </div>

      <div className="header-right">
        {rightContent}
      </div>
    </div>
  );
}