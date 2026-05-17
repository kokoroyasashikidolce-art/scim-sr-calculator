export default function AppHeader({ title, onBack }) {
  return (
    <div className="scale-fixed-header">
      <button className="back-button" onClick={onBack}>
        ←
      </button>

      <div className="scale-header-title">
        {title}
      </div>
    </div>
  );
}