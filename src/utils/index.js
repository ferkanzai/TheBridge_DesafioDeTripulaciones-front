export const mappingColors = (time) => {
  const times = {
    [time === 0]: "#1DAE69",
    [time <= 15]: "#C5D22A",
    [time > 15 && time <= 30]: "#FAD966",
    [time > 30 && time <= 40]: "#B75454",
    [time > 40]: "#C4C4C4",
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

const carsPath = "/cars";

export const chooseCar = {
  "EQA 350 4MATIC": `${carsPath}/mercedes-eqa.png`,
  "EQA 300 4MATIC": `${carsPath}/mercedes-eqa.png`,
  "EQA 250": `${carsPath}/mercedes-eqa.png`,
  "EQV 300 Extra-Long	": `${carsPath}/mercedes-eqv.png`,
  "EQV 300 Long	": `${carsPath}/mercedes-eqv.png`,
  "EQS 450+": `${carsPath}/mercedes-eqs.png`,
  "EQS 580 4MATIC": `${carsPath}/mercedes-eqs.png`,
  i4: `${carsPath}/bwm-i4.png`,
  iX3: `${carsPath}/bwm-ix3.png`,
  "iX xDrive 40": `${carsPath}/bwm-ix.png`,
  "iX xDrive 50": `${carsPath}/bwm-ix.png`,
  "Model 3 Long Range Dual Motor": `${carsPath}/tesla-3.png`,
  "Model 3 Performance": `${carsPath}/tesla-3.png`,
  "Model 3 Standard Range Plus": `${carsPath}/tesla-3.png`,
  "Model 3 Standard Range Plus LFP": `${carsPath}/tesla-3.png`,
};
