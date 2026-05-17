export const biScale = {
  id: "bi",
  title: "Barthel Index",
  shortTitle: "BI",
  headerTitle:
  "BI (Barthel Index) : バーセルインデックス",
  category: "adl",
  totalScore: 100,
  showTotal: true,
  fixedBottomBar: true,

  tabs: {
    overview:
      "Barthel Indexは，日常生活動作（ADL）の自立度を10項目で評価する尺度です。",
    tips:
      "合計100点で評価し，点数が高いほどADL自立度が高いことを示します。",
  },

  domains: [
    {
      id: "adl",
      title: "ADL",
      maxScore: 100,
      items: [
        {
          id: "feeding",
          title: "食事",
          type: "select",
          options: [
            { score: 0, label: "全介助" },
            { score: 5, label: "部分介助" },
            { score: 10, label: "自立" },
          ],
        },
        {
          id: "transfer",
          title: "移乗",
          type: "select",
          options: [
            { score: 0, label: "全介助または不能" },
            { score: 5, label: "座位保持は可能だが多くの介助を要する" },
            { score: 10, label: "軽介助または監視を要する" },
            { score: 15, label: "自立" },
          ],
        },
        {
          id: "grooming",
          title: "整容",
          type: "select",
          options: [
            { score: 0, label: "介助を要する" },
            { score: 5, label: "自立" },
          ],
        },
        {
          id: "toilet",
          title: "トイレ動作",
          type: "select",
          options: [
            { score: 0, label: "全介助" },
            { score: 5, label: "部分介助" },
            { score: 10, label: "自立" },
          ],
        },
        {
          id: "bathing",
          title: "入浴",
          type: "select",
          options: [
            { score: 0, label: "介助を要する" },
            { score: 5, label: "自立" },
          ],
        },
        {
          id: "walking",
          title: "歩行",
          type: "select",
          options: [
            { score: 0, label: "不能" },
            { score: 5, label: "車いす操作が自立" },
            { score: 10, label: "歩行に介助または監視を要する" },
            { score: 15, label: "自立歩行" },
          ],
        },
        {
          id: "stairs",
          title: "階段昇降",
          type: "select",
          options: [
            { score: 0, label: "不能" },
            { score: 5, label: "介助または監視を要する" },
            { score: 10, label: "自立" },
          ],
        },
        {
          id: "dressing",
          title: "更衣",
          type: "select",
          options: [
            { score: 0, label: "全介助" },
            { score: 5, label: "部分介助" },
            { score: 10, label: "自立" },
          ],
        },
        {
          id: "bowel",
          title: "排便管理",
          type: "select",
          options: [
            { score: 0, label: "失禁" },
            { score: 5, label: "時々失禁あり" },
            { score: 10, label: "自制" },
          ],
        },
        {
          id: "bladder",
          title: "排尿管理",
          type: "select",
          options: [
            { score: 0, label: "失禁または管理不能" },
            { score: 5, label: "時々失禁あり" },
            { score: 10, label: "自制" },
          ],
        },
      ],
    },
  ],
};