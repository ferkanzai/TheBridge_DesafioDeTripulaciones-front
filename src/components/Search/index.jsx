import { useState } from "react";

import exit from "../../svg/exit.svg";

import "./index.scss";

const Search = ({ toggleSearch }) => {
  const [showResult, setShowResult] = useState(false);

  const handleClick = () => {
    setShowResult(!showResult);
  };

  return (
    <div className="search">
      <div className="search__all">
        <div className="search__all__top">
          <span>¿Dónde quieres viajar?</span>
          <img
            alt="exit button"
            className="search__all__top__close"
            onClick={toggleSearch}
            src={exit}
          />
        </div>
        <div className="search__all__form">
          <input
            type="text"
            placeholder="Origen"
            className="search__all__form__input"
          />
          <input
            type="text"
            placeholder="Destino"
            className="search__all__form__input"
          />
          <button className="search__all__form__submit" onClick={handleClick}>
            Buscar
          </button>
        </div>
      </div>
      {showResult && (
        <div className="search__result">
          <div className="search__result__info">
            <div className="search__result__info__points">
              <div className="search__result__info__points__start">
                Origen: Arturo Soria Plaza
              </div>
              <div className="search__result__info__points__end">
                Destino: Centro Comercial Torre Sevilla
              </div>
            </div>
            <div className="search__result__info__chargePoints">
              Paradas recomendadas:
              <div className="search__result__info__chargePoints__first">
                Almaraz Supercharge
              </div>
              <div className="search__result__info__chargePoints__second">
                Complejo Leo
              </div>
            </div>
            Distancia total: <strong>539 km</strong>
          </div>
          <div className="search__result__info">
            <div className="search__result__info__points">
              <div className="search__result__info__points__start">
                Origen: Arturo Soria Plaza
              </div>
              <div className="search__result__info__points__end">
                Destino: Centro Comercial Torre Sevilla
              </div>
            </div>
            <div className="search__result__info__chargePoints">
              Paradas recomendadas:
              <div className="search__result__info__chargePoints__first">
                Carrefour Talavera de la Reina
              </div>
              <div className="search__result__info__chargePoints__second">
                Parking Atarazanas
              </div>
            </div>
            Distancia total: <strong>562 km</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
