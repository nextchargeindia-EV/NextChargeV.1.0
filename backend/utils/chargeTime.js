export function estimateChargeTimeMin({
  powerKW,
  batteryKWh = 40,
  chargeFrom = 15,
  chargeTo = 80,
}) {
  if (!powerKW || powerKW <= 0) return 60;
  const energyNeededKWh = ((chargeTo - chargeFrom) / 100) * batteryKWh;
  return Math.round((energyNeededKWh / powerKW) * 60);
}

export function getChargeTimeBucket(chargeTimeMin) {
  return Math.round(chargeTimeMin / 15) * 15;
}
