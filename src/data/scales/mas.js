const masOptions = [
  { score: 0, label: "筋緊張の亢進なし" },
  {
    score: 1,
    label:
      "軽度の筋緊張亢進、可動域の最終域で引っかかりとその消失または僅かな抵抗を認める",
  },
  {
    score: 1.5,
    label:
      "1+：軽度の筋緊張亢進、明らかな引っかかりがあり、僅かな抵抗が可動域の1/2以下で認められる",
  },
  {
    score: 2,
    label:
      "より明らかな筋緊張亢進を全可動域にわたり認める。しかし、他動運動は容易",
  },
  {
    score: 3,
    label: "かなりの筋緊張亢進。他動運動は困難",
  },
  {
    score: 4,
    label: "患部は硬直し、他動運動は不可(強直レベル)",
  },
];

export const masScale = {
  id: "mas",
  title: "Modified Ashworth Scale",
  shortTitle: "MAS",
  headerTitle:
  "MAS (Modified Ashworth Scale) : 修正アシュワーススケール",
  category: "stroke",
  showTotal: false,
  scoreUnit: "",

  tabs: {
    overview:
      "MAS（Modified Ashworth Scale：修正アシュワーススケール）は，痙縮の程度を他動運動時の抵抗感として評価する尺度です。",
    tips:
      "MASの1+は数値計算上は便宜的に1.5として扱うことがありますが，臨床記録では「1+」として表記するのが一般的です。",
  },

  domains: [
    {
      id: "upper_limb",
      title: "上肢",
      maxScore: null,
      items: [
        {
          id: "shoulder_adductor",
          title: "肩関節内転筋",
          description: "肩関節を他動的に外転したときの抵抗感を評価。",
          type: "select",
          options: masOptions,
        },
        {
          id: "elbow_flexor",
          title: "肘関節屈筋",
          description: "肘関節を他動的に伸展したときの抵抗感を評価。",
          type: "select",
          options: masOptions,
        },
        {
          id: "wrist_flexor",
          title: "手関節屈筋",
          description: "手関節を他動的に伸展したときの抵抗感を評価。",
          type: "select",
          options: masOptions,
        },
      ],
    },
    {
      id: "lower_limb",
      title: "下肢",
      maxScore: null,
      items: [
        {
          id: "hip_adductor",
          title: "股関節内転筋",
          description: "股関節を他動的に外転したときの抵抗感を評価。",
          type: "select",
          options: masOptions,
        },
        {
          id: "ankle_plantar_flexor",
          title: "足関節底屈筋",
          description: "足関節を他動的に背屈したときの抵抗感を評価。",
          type: "select",
          options: masOptions,
        },
      ],
    },
  ],
};
