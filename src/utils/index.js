export const mappingColors = (time) => {
  const times = {
    [time === 0]: "#1DAE69",
    [time <= 5]: "#89CC33",
    [time > 5 && time <= 15]: "#C5D22A",
    [time > 15 && time <= 30]: "#FAD966",
    [time > 30 && time <= 45]: "#B75454",
    [time > 45]: "#C4C4C4",
  };

  return times[true];
};

const path = "/operators";

export const chooseSrc = {
  Iberdrola: `${path}/iberdrola.jpg`,
  "Unknown Operator": `${path}/interrogation.png`,
  Wenea: `${path}/wenea.png`,
  Etecnic: `${path}/etecnic.jpg`,
  Ionity: `${path}/ionity.png`,
  EasyCharger: `${path}/easycharger.png`,
  "Fenie Energía (Spain)": `${path}/fenie.png`,
  Endesa: `${path}/endesa.png`,
  "Tesla Motors (Worldwide)": `${path}/tesla.png`,
  "LIVE Barcelona": `${path}/live.png`,
  EDP: `${path}/edp.png`,
  "IBIL (Es)": `${path}/ibil.png`,
  Electromaps: `${path}/electromaps.png`,
  "Estabanell Energia": `${path}/estabanell.png`,
  "AMB (Àrea metropolitana de Barcelona)": `${path}/amb.png`,
  "evcharge.online": `${path}/evcharge.png`,
  "(Business Owner at Location)": `${path}/interrogation.png`,
  "BP Pulse": `${path}/bp.jpg`,
  Amersam: `${path}/amersam.png`,
  "GE WattStation (No longer active)": `${path}/ge.png`,
  "MELIB (ES)": `${path}/melib.png`,
  "Be Energised (has-to-be)": `${path}/beenergised.png`,
  "Urbener Energía": `${path}/urbener.png`,
  "POD Point (UK)": `${path}/podpoint.png`,
  Renault: `${path}/renault.png`,
  "Viesgo (Spain)": `${path}/viesgo.jpg`,
  GIC: `${path}/gic.png`,
  "Enel X": `${path}/enel.png`,
  Nomadpower: `${path}/nomadpower.png`,
  sofos: `${path}/sofos.jpeg`,
  "MobecPoint (Es)": `${path}/mobecpoint.png`,
  "The New Motion (BE)": `${path}/newmotion.png`,
  "EV-Box": `${path}/evbox.png`,
};
