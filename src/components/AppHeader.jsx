export default function AppHeader({
  title,
  onBack,
  rightContent = null,
}) {
  return (
    <div className="scale-fixed-header">
      <button className="back-button" onClick={onBack}>
  <span aria-hidden="true">&larr;</span>
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