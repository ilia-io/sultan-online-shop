import React, { useState } from 'react';
import searchBtn from '../assets/icons/search-btn.svg';
import { useAppDispatch } from '../app/hooks';
import { setManufacturersSearch } from '../app/reducers/filterSlice';

type Props = {};

const SearchForm = (props: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setManufacturersSearch(searchValue));
  }
  return (
    <form
      onSubmit={(e) => handleSearch(e)}
      className="search-form"
      style={{
        borderRadius: '36px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        name="text"
        type="text"
        placeholder="Поиск..."
        className="search-input"
        style={{
          border: 'none',
          outline: 'none',
          backgroundColor: 'inherit',
          opacity: '0.6',
        }}
      />
      <input
        name="btn"
        type="submit"
        className="search-btn"
        value=""
        style={{
          backgroundImage: `url(${searchBtn})`,
          border: 'none',
          borderRadius: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
        }}
      />
    </form>
  );
};

export default SearchForm;
