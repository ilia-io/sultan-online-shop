import React, { useState } from 'react';
import { filterSelector, setActiveCaterogy } from '../app/reducers/filterSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import SelectionByParams from './SelectionByParams';
import mUpIcon from '../assets/icons/mobile-up.svg';
import mDownIcon from '../assets/icons/mobile-down.svg';

type Props = {};

const SideFilters = (props: Props) => {
  const [showParams, setShowParams] = useState(true);
  const { activeCategory, categories } = useAppSelector(filterSelector);

  const dispatch = useAppDispatch();

  function handleClickCategory(categorie: string) {
    dispatch(setActiveCaterogy(categorie));
  }
  return (
    <section className="catalog__side-filters">
      <div
        onClick={() => setShowParams(!showParams)}
        className="catalog__side-filters-title-box"
      >
        <h2 className="catalog__side-filters-title">ПОДБОР ПО ПАРАМЕТРАМ</h2>
        <div className="mobile__filter-arrow">
          <img
            src={showParams ? mUpIcon : mDownIcon}
            alt="arrow"
            className="mobile__filter-arrow-img"
          />
        </div>
      </div>

      <div
        hidden={showParams ? false : true}
        className="catalog__mobile-filter-wrapper"
      >
        <SelectionByParams />
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
