export default function InfoPage() {
  return (
    <>
      <section className="card">
        <h2>アプリ情報</h2>
          <h2>リハすこについて</h2>
        <p>リハすこは、リハビリテーション領域で使う評価スコアを
           すばやく計算・参照できるようにまとめたアプリです。</p>
        <p>個人制作でコード全然分からない人がAIに聞きながらシドロモドロ作ってます。</p>
        <p>少しずつ評価項目や機能を増やしていく予定です。</p>
        <p>バグや記載情報の誤り、追加推奨情報のご報告やリクエストなど大歓迎です！（叶えるとは言ってない）</p>
        <p>バージョン：v0.1.0</p>
      </section>

      <section className="card">
      <h2>更新履歴</h2>
      <div className="update-history">
    {`
v0.1.0

追加評価
・SCIM-SR
・MAS
・FIM
・Barthel Index

追加機能
・検索
・お気に入り
・閲覧履歴
・コピー履歴
・入力保存
・PWA対応
・情報ページ
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
          不具合、改善要望、追加してほしい評価スコアがあれば、開発者までご連絡ください。
        </p>
      </section>
    </>
  );
}