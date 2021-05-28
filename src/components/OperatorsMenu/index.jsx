import { useFormContext } from "react-hook-form";

import Operator from "../Operator";

import iberdrola from "../../operators/iberdrola.jpg";
import amb from "../../operators/amb.png";
import amersam from "../../operators/amersam.png";
import beenergised from "../../operators/beenergised.png";
import bp from "../../operators/bp.jpg";
import easycharger from "../../operators/easycharger.png";
import edp from "../../operators/edp.png";
import electromaps from "../../operators/electromaps.png";
import endesa from "../../operators/endesa.png";
import enel from "../../operators/enel.png";
import estabanell from "../../operators/estabanell.png";
import etecnic from "../../operators/etecnic.jpg";
import evbox from "../../operators/evbox.png";
import evcharge from "../../operators/evcharge.png";
import fenie from "../../operators/fenie.png";
import ge from "../../operators/ge.png";
import gic from "../../operators/gic.png";
import ibil from "../../operators/ibil.png";
import ionity from "../../operators/ionity.png";
import interrogation from "../../operators/interrogation.png";
import wenea from "../../operators/wenea.png";
import tesla from "../../operators/tesla.png";
import live from "../../operators/live.png";
import melib from "../../operators/melib.png";
import urbener from "../../operators/urbener.png";
import pod from "../../operators/podpoint.png";
import renault from "../../operators/renault.png";
import viesgo from "../../operators/viesgo.jpg";
import nomadpower from "../../operators/nomadpower.png";
import sofos from "../../operators/sofos.jpeg";
import mobecpoint from "../../operators/mobecpoint.png";
import newmotion from "../../operators/newmotion.png";

import "./index.scss";

const OperatorsMenu = () => {
  const { register } = useFormContext();

  return (
    <div className="operators">
      <Operator
        source={iberdrola}
        name="Iberdrola"
        value="1"
        id="iberdrola"
        register={register}
      />
      <Operator
        source={endesa}
        name="Endesa"
        value="8"
        id="endesa"
        register={register}
      />
      <Operator source={bp} name="BP" value="18" id="bp" register={register} />
      <Operator
        source={edp}
        name="EDP"
        value="11"
        id="edp"
        register={register}
      />
      <Operator
        source={enel}
        name="Enel"
        value="28"
        id="enel"
        register={register}
      />
      <Operator
        source={amb}
        name="AMB"
        value="15"
        id="amb"
        register={register}
      />
      <Operator
        source={amersam}
        name="Amersam"
        value="19"
        id="amersam"
        register={register}
      />
      <Operator
        source={beenergised}
        name="Be Energised"
        value="22"
        id="beenergised"
        register={register}
      />
      <Operator
        source={electromaps}
        name="Electromaps"
        value="13"
        id="electromaps"
        register={register}
      />
      <Operator
        source={estabanell}
        name="Estabanell"
        value="14"
        id="estebanell"
        register={register}
      />
      <Operator
        source={etecnic}
        name="Etecnic"
        value="4"
        id="etecnic"
        register={register}
      />
      <Operator
        source={evbox}
        name="EV Box"
        value="33"
        id="evbox"
        register={register}
      />
      <Operator
        source={evcharge}
        name="EV Charge"
        value="16"
        id="evcharge"
        register={register}
      />
      <Operator
        source={fenie}
        name="Fenie"
        value="7"
        id="fenie"
        register={register}
      />
      <Operator
        source={ge}
        name="General Electrics"
        value="20"
        id="ge"
        register={register}
      />
      <Operator
        source={gic}
        name="GIC"
        value="27"
        id="gic"
        register={register}
      />
      <Operator
        source={ibil}
        name="Ibil"
        value="12"
        id="ibil"
        register={register}
      />
      <Operator
        source={easycharger}
        name="Easy Charger"
        value="6"
        id="easycharger"
        register={register}
      />
      <Operator
        source={ionity}
        name="Ionity"
        value="5"
        id="ionity"
        register={register}
      />
      <Operator
        source={interrogation}
        name="Proveedor desconocido"
        value="2"
        id="unknown"
        register={register}
      />
      <Operator
        source={wenea}
        name="Wenea"
        value="3"
        id="wenea"
        register={register}
      />
      <Operator
        source={tesla}
        name="Tesla"
        value="9"
        id="tesla"
        register={register}
      />
      <Operator
        source={live}
        name="LIVE Barcelona"
        value="10"
        id="live"
        register={register}
      />
      <Operator
        source={interrogation}
        name="Dueño propietario"
        value="17"
        id="owner"
        register={register}
      />
      <Operator
        source={melib}
        name="MELIB"
        value="21"
        id="melib"
        register={register}
      />
      <Operator
        source={urbener}
        name="Urbener"
        value="23"
        id="urbener"
        register={register}
      />
      <Operator
        source={pod}
        name="POD Point"
        value="24"
        id="pod"
        register={register}
      />
      <Operator
        source={renault}
        name="Renault"
        value="25"
        id="renault"
        register={register}
      />
      <Operator
        source={viesgo}
        name="Viesgo"
        value="26"
        id="viesgo"
        register={register}
      />
      <Operator
        source={nomadpower}
        name="Nomadpower"
        value="29"
        id="nomadpower"
        register={register}
      />
      <Operator
        source={sofos}
        name="Sofos"
        value="30"
        id="sofos"
        register={register}
      />
      <Operator
        source={mobecpoint}
        name="MobecPoint"
        value="31"
        id="mobecpoint"
        register={register}
      />
      <Operator
        source={newmotion}
        name="The New Motion"
        value="32"
        id="newmotion"
        register={register}
      />
    </div>
  );
};

export default OperatorsMenu;
