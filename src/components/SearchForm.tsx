import React from 'react';
import searchBtn from '../assets/icons/search-btn.svg';

type Props = {};

const SearchForm = (props: Props) => {
  return (
    <form className="header__search-form">
      <input
        name="text"
        type="text"
        placeholder="Поиск..."
        className="header__search-input"
      />
      <input
        name="btn"
        type="submit"
        className="header__search-btn"
        value=""
        style={{
          backgroundImage: `url(${searchBtn})`,
          border: 'none',
          borderRadius: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          width: '40px',
          height: '40px',
        }}
      />
    </form>
  );
};

export default SearchForm;
