
const fimOptions = [
  { score: 1, label: "全介助　自分で行うのは25％未満" },
  { score: 2, label: "最大介助　25％以上自分で行う" },
  { score: 3, label: "中等度介助　50％以上自力で行う" },
  { score: 4, label: "最小介助　75％以上自力で行う" },
  { score: 5, label: "監視・準備　介助は不要だが見守り/指示/促しを要す" },
  { score: 6, label: "修正自立　補助具を要す " },
  { score: 7, label: "完全自立" },
];

export const fimScale = {
  id: "fim",
  title: "Functional Independence Measure",
  shortTitle: "FIM",
  category: "adl",
  totalScore: 126,
  showTotal: true,

  tabs: {
    overview:
      "FIMはADLの介助量を18項目で評価する尺度です。",
    tips:
      "各項目は1〜7点で評価し、合計点は18〜126点です。",
  },

  domains: [
    {
      id: "motor",
      title: "運動項目",
      maxScore: 91,
      items: [
        {
          id: "eating",
          title: "食事",
          type: "select",
          options: fimOptions,
        },
        {
          id: "grooming",
          title: "整容",
          type: "select",
          options: fimOptions,
        },
        {
          id: "bathing",
          title: "清拭・入浴",
          type: "select",
          options: fimOptions,
        },

        // ここに通常項目を追加

        {
          id: "locomotion",
          title: "移動",
          type: "special",
          component: "FimLocomotionItem",
        },
      ],
    },

    {
      id: "cognitive",
      title: "認知項目",
      maxScore: 35,
      items: [
        {
          id: "comprehension",
          title: "理解",
          type: "select",
          options: fimOptions,
        },
        {
          id: "expression",
          title: "表出",
          type: "select",
          options: fimOptions,
        },
        {
          id: "social_interaction",
          title: "社会的交流",
          type: "select",
          options: fimOptions,
        },
        {
          id: "problem_solving",
          title: "問題解決",
          type: "select",
          options: fimOptions,
        },
        {
          id: "memory",
          title: "記憶",
          type: "select",
          options: fimOptions,
        },
      ],
    },
  ],
};
