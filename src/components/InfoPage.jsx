export default function InfoPage() {

const contactEmail = "あなたのメールアドレス@example.com";

const createMailTo = () => {
  const subject = "リハすこ お問い合わせ";

  const body = `【お問い合わせ種別】
該当するものを残してください。
・不具合ご報告
・誤情報のご指摘
・追記、修正の提案
・追加してほしい評価スコア
・機能リクエスト
・その他

【内容】
できるだけ具体的にご記載くださると助かります。

【該当する評価スコア・ページ】
例：SCIM-SR / MAS / FIM / BI / 検索 / コピー履歴 など

【端末・環境】
端末：
OS：
ブラウザ：
PWA版 / ブラウザ版：

【その他】
`;

  return `mailto:${contactEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};




  return (
    <>
      <section className="card">
        <h2>アプリ情報</h2>
          <h2>リハすこについて</h2>
        <p>リハすこは、リハビリテーション領域で使う評価スコアを
           すばやく計算・参照できるようにまとめたアプリです。</p>
        <p>個人制作でコード全然分からない人がAIに聞きながらシドロモドロやってます。</p>
        <p>少しずつ評価項目や機能を増やしていく予定です。</p>
        <p>バグや記載情報の誤り、追加推奨情報のご報告やリクエストなど大歓迎です！（叶えるとは言ってない）</p>
        <p>バージョン：v0.1.0</p>
      </section>

      <section className="card">
      <h2>更新履歴</h2>
      <div className="update-history">
    {`
v0.1.0 2026/5/18 公開
追加評価　SCIM-SR、MAS、FIM、BI
追加機能　・検索　・お気に入り　・閲覧履歴　・コピー履歴
　　　　　・入力保存　・PWA対応　・情報ページ
`}
      </div>
     </section>

      <section className="card">
        <h2>注意事項</h2>
        <p>  本アプリは評価スコアの計算・参照を補助する目的で作成しています。</p>
        <p>診断や治療方針を決定するものではありません。</p>
        <p> 評価の運用や解釈については、原著論文、
          ガイドライン、施設運用ルール等をご確認ください
        </p>
      </section>

       <section className="card">
        <h2>追加予定</h2>
        
        <p>
          ASIA / ISNCSCI、SCIM III、
          SIAS などを順次追加予定です。
        </p>
      </section>

      <section className="card">
  <h2>お問い合わせ</h2>

  <p>
    不具合、誤情報のご指摘、追記・修正の提案、
    追加してほしい評価スコアや機能要望などがあれば、
    下のボタンからお知らせください。
    （個人制作なので対応に時間頂きます）
  </p>

  <a
    className="contact-button"
    href={createMailTo()}
  >
    お問い合わせする
  </a>
</section>
    </>
  );
}