
export function calculateRespirationScore(respiration) {
  const { tracheostomy, trachCare, noTrachStatus } = respiration;

  if (!tracheostomy) return null;

  if (tracheostomy === "yes") {
    if (trachCare === "heavy_help") return 0;
    if (trachCare === "little_help") return 2;
    if (trachCare === "independent") return 4;
    return null;
  }

  if (tracheostomy === "no") {
    if (noTrachStatus === "oxygen_sometimes") return 6;
    if (noTrachStatus === "cough_little_help") return 8;
    if (noTrachStatus === "independent") return 10;
    return null;
  }

  return null;
}

export function calculateBladderScore(bladder) {
  const { catheter, intermittent, collector } = bladder;

  if (catheter === "yes") return 0;
  if (catheter !== "no") return null;
  if (!intermittent || !collector) return null;

  if (intermittent === "full_help") return 6;
  if (intermittent === "with_help") return 6;

  if (intermittent === "independent") {
    if (collector === "full_help") return 6;
    if (collector === "partial_help") return 6;
    if (collector === "independent") return 9;
    if (collector === "none_no_incontinence") return 11;
  }

  if (intermittent === "not_used") {
    if (collector === "full_help") return 6;
    if (collector === "partial_help") return 6;
    if (collector === "independent") return 13;
    if (collector === "none_no_incontinence") return 15;
  }

  return null;
}

export function calculateBowelScore(bowel) {
  const { help, regularity, incontinence } = bowel;

  if (!help || !regularity || !incontinence) return null;

  if (regularity === "irregular") return 0;

  if (regularity === "regular") {
    if (incontinence === "twice_or_more") return 5;
    if (incontinence === "once") return help === "no" ? 8 : 5;
    if (incontinence === "none") return help === "no" ? 10 : 5;
  }

  return null;
}

export function calculateMobilityScore(mobility) {
  const { method, wheelchair, walking } = mobility;

  if (!method) return null;

  if (method === "wheelchair") {
    if (wheelchair === "full_help") return 0;
    if (wheelchair === "partial_help") return 1;
    if (wheelchair === "independent") return 2;
    return null;
  }

  if (method === "walking") {
    if (walking === "supervision") return 3;
    if (walking === "walker_or_crutches_swing") return 4;
    if (walking === "two_crutches_or_two_canes") return 5;
    if (walking === "one_cane") return 6;
    if (walking === "orthosis_only") return 7;
    if (walking === "no_aid") return 8;
    return null;
  }

  return null;
}