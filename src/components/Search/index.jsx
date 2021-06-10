import exit from "../../svg/exit.svg";

import "./index.scss";

const Search = ({ toggleSearch }) => {
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
        <form className="search__all__form">
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
          <input
            type="submit"
            value="Buscar"
            className="search__all__form__submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Search;
