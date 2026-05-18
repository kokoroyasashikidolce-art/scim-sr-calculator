export default function SettingsPage({
  onClearCopyHistory,
  onClearRecentHistory,
  onClearFavorites,
  onClearSavedInputs,
}) {
  return (
    <>
      <section className="card">
        <h2>データ管理</h2>

        <p className="description">
          この端末に保存されている履歴や入力内容を削除できます。
        </p>

        <div className="settings-list">
          <button
            className="danger-button"
            onClick={onClearCopyHistory}
          >
            コピー履歴を削除
          </button>

          <button
            className="danger-button"
            onClick={onClearRecentHistory}
          >
            閲覧履歴を削除
          </button>

          <button
            className="danger-button"
            onClick={onClearFavorites}
          >
            お気に入りを削除
          </button>

          <button
            className="danger-button"
            onClick={onClearSavedInputs}
          >
            保存済み入力を削除
          </button>
        </div>
      </section>

      <section className="card">
        <h2>補足</h2>

        <p className="description">
          削除したデータは元に戻せません。必要な結果は事前にコピーして保存してください。
        </p>
      </section>
    </>
  );
}