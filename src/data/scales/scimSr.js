import { simpleDomains } from "../scimData";

export const scimSrScale = {
  id: "scim-sr",
  title: "SCIM-SR",
  shortTitle: "SCIM-SR",
  headerTitle:
  "SCIM-SR (Spinal Cord Independence Measure – self report) : 自己報告形式の脊髄障害自立度評価法",
  totalScore: 100,
  showTotal: true,

  category: "spinal-cord-injury",

  tabs: {
    overview:
      "SCIM-SRは、脊髄障害のある方の日常生活における自立度を自己報告形式で評価する尺度です。",

    tips:
      "SCIM-SRはセルフケア、呼吸と排泄管理、移動の3領域から構成され、合計100点で評価します。",
  },

  domains: simpleDomains,
};

