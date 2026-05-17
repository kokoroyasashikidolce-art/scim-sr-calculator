export default function InfoPage() {
  return (
    <>
      <section className="card">
        <h2>アプリ情報</h2>
        <p>
          リハビリテーション領域でよく使う評価スコアを、計算・概要確認・豆知識とあわせて使えるPWAアプリです。
        </p>
        <p>バージョン：v0.1.0</p>
      </section>

      <section className="card">
        <h2>更新履歴</h2>
        <ul>
          <li>SCIM-SR、MAS、FIM、BIを追加</li>
          <li>評価一覧、検索、お気に入り、履歴、コピー履歴を追加</li>
          <li>各評価スコアの入力保存と結果コピーに対応</li>
        </ul>
      </section>

      <section className="card">
        <h2>注意事項</h2>
        <p>
          本アプリは評価スコアの入力・計算・参照を補助するためのツールです。
          臨床判断、診断、治療方針の決定を代替するものではありません。
        </p>
        <p>
          評価尺度の正式な運用、解釈、研究利用、商用利用については、原著・公式資料・所属施設の運用ルールを確認してください。
        </p>
      </section>

      <section className="card">
        <h2>今後追加予定</h2>
        <ul>
          <li>ASIA / ISNCSCI</li>
          <li>SCIM III</li>
          <li>BBS</li>
          <li>mRS</li>
          <li>TUG、10m歩行</li>
          <li>HDS-R、MMSE、MoCA</li>
          <li>SIAS、FMA、NIHSS</li>
        </ul>
      </section>

      <section className="card">
        <h2>お問い合わせ</h2>
        <p>
          不具合、改善要望、追加してほしい評価スコアがあれば、開発者までご連絡ください。
        </p>
      </section>
    </>
  );
}