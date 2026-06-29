export function estimateChargeTime(
  powerKW: number,
  batteryKWh = 40,
  chargeFrom = 15,
  chargeTo = 80,
): number {
  if (!powerKW || powerKW <= 0) return 60;
  const energyNeededKWh = ((chargeTo - chargeFrom) / 100) * batteryKWh;
  return Math.round((energyNeededKWh / powerKW) * 60);
}
