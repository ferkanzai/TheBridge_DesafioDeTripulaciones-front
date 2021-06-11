import { useFormContext } from "react-hook-form";

import ConnectionType from "../ConnectionType";

import mennekes from "../../connectionTypes/mennekes.svg";
import chademo from "../../connectionTypes/chademo.svg";
import tesla from "../../connectionTypes/tesla.svg";
import ccsTipo1 from "../../connectionTypes/css-tipo1.svg";
import ccsTipo2 from "../../connectionTypes/css-tipo2.svg";

import "./index.scss";

const ConnectionTypeList = () => {
  const { register } = useFormContext();

  return (
    <div className="connectionTypes">
      <ConnectionType
        source={mennekes}
        name="Mennekes"
        value="Type 2 (Socket Only)"
        id="mennekes"
        register={register}
      />
      <ConnectionType
        source={ccsTipo2}
        name="CCS Tipo 2"
        value="CCS (Type 2)"
        id="ccs2"
        register={register}
      />
      <ConnectionType
        source={chademo}
        name="CHAdeMO"
        value="CHAdeMO"
        id="chademo"
        register={register}
      />
      <ConnectionType
        source={ccsTipo1}
        name="CCS Tipo 1"
        value="CCS (Type 1)"
        id="ccs1"
        register={register}
      />
      <ConnectionType
        source={tesla}
        name="Tesla"
        value="Tesla (Model S/X)"
        id="tesla"
        register={register}
      />
    </div>
  );
};

export default ConnectionTypeList;
