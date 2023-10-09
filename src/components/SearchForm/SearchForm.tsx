import React, { useState } from 'react';
import searchBtn from '../../assets/icons/search-btn.svg';
import { useAppDispatch } from '../../app/hooks';
import { setManufacturersSearch } from '../../app/reducers/filterSlice';

type Props = {
  classPrefix: string;
};

const SearchForm = ({ classPrefix }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setManufacturersSearch(searchValue));
  }
  return (
    <form
      data-testid="search-form"
      onSubmit={(e) => handleSearch(e)}
      className={`${classPrefix}__search-form`}
      style={{
        borderRadius: '36px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <input
        data-testid="search-input"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        name="text"
        type="text"
        placeholder="Поиск..."
        className={`${classPrefix}__search-input`}
        style={{
          border: 'none',
          outline: 'none',
          backgroundColor: 'inherit',
          opacity: '0.6',
        }}
        disabled={classPrefix === 'header' ? true : false}
      />
      <input
        data-testid="search-btn"
        name="btn"
        type="submit"
        className={`${classPrefix}__search-btn`}
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
        disabled={classPrefix === 'header' ? true : false}
      />
    </form>
  );
};

export default SearchForm;
