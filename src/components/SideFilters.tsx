import React, { useState } from 'react';
import SearchForm from './SearchForm';
import ManufacturersList from './ManufacturersList';
import {
  filterSelector,
  setActiveCaterogy,
  setPriceFilterMax,
  setPriceFilterMin,
} from '../app/reducers/filterSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

type Props = {};

const SideFilters = (props: Props) => {
  const [inputPriceMin, setInputPriceMin] = useState('0');
  const [inputPriceMax, setInputPriceMax] = useState('10000');

  const { activeCategory, categories } = useAppSelector(filterSelector);
  const dispatch = useAppDispatch();

  function handlePriceMin(e: React.ChangeEvent<HTMLInputElement>) {
    setInputPriceMin(e.target.value);
    dispatch(setPriceFilterMin(e.target.value));
  }

  function handlePriceMax(e: React.ChangeEvent<HTMLInputElement>) {
    setInputPriceMax(e.target.value);
    dispatch(setPriceFilterMax(e.target.value));
  }

  function handleClickCategory(categorie: string) {
    dispatch(setActiveCaterogy(categorie));
  }
  return (
    <section className="catalog__side-filters">
      <h2 className="catalog__side-filters-title">ПОДБОР ПО ПАРАМЕТРАМ</h2>
      <div className="catalog__mobile-filter-wrapper">
        <div className="catalog__price-filter-box">
          <h2 className="catalog__price-filter-title">
            Цена <span className="catalog__price-filter-currency">₸</span>
          </h2>
          <div className="catalog__price-filter-inputs">
            <label htmlFor="priceMin"></label>
            <input
              id="priceMin"
              type="number"
              className="catalog__price-filter-min"
              placeholder="0"
              value={inputPriceMin}
              onChange={handlePriceMin}
            />
            <p className="catalog__price-filter-divider">-</p>
            <label htmlFor="priceMax"></label>
            <input
              id="priceMax"
              type="number"
              className="catalog__price-filter-max"
              placeholder="10 000"
              value={inputPriceMax}
              onChange={handlePriceMax}
            />
          </div>
        </div>
        <div className="catalog__manufacturer-filter-box">
          <h2 className="catalog__manufacturer-filter-title">Производитель</h2>
          <SearchForm classPrefix="catalog" />
          <ManufacturersList />

          <div className="catalog__manufacturer-filter-divider"></div>
        </div>
      </div>
      <div className="catalog__side-filters-categories-box">
        <ul className="catalog__side-filters-categories-list">
          {categories.map((categorie) => (
            <li
              onClick={() => handleClickCategory(categorie)}
              key={categorie}
              className={
                activeCategory === categorie
                  ? 'catalog__side-filters-categories-item catalog__side-filters-categories-item_active'
                  : 'catalog__side-filters-categories-item'
              }
            >
              {categorie}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SideFilters;
