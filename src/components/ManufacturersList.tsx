import React, { useState } from 'react';
import { manufacturers } from './Catalog';
import arrowDown from '../assets/icons/sort-arrow-down.svg';
import arrowUp from '../assets/icons/sort-arrow-up.svg';

type Props = {};

const ManufacturersList = (props: Props) => {
  const [show, setShow] = useState(true);

  function manufacturerShowHideAll() {
    setShow(!show);
  }

  return (
    <>
      <ul className="catalog__manufacturer-filter-list">
        {(show ? manufacturers.slice(0, 4) : manufacturers).map(
          (manufacturer) => (
            <li
              key={manufacturer}
              className="catalog__manufacturer-filter-item"
            >
              <label className="catalog__manufacturer-filter-label">
                <input
                  type="checkbox"
                  className="catalog__manufacturer-filter-checkbox"
                />
                {manufacturer}
              </label>
            </li>
          )
        )}
      </ul>
      <button
        className="catalog__manufacturer-filter-btn"
        type="button"
        onClick={manufacturerShowHideAll}
      >
        <span
          className="catalog__manufacturer-showAll"
          hidden={show ? false : true}
        >
          Показать все{' '}
        </span>
        <img
          src={arrowDown}
          alt="arrow down"
          className="catalog__sort-icon catalog__manufacturer-showAll"
          hidden={show ? false : true}
        />
        <span
          className="catalog__manufacturer-hideAll"
          hidden={show ? true : false}
        >
          Свернуть{' '}
        </span>
        <img
          src={arrowUp}
          alt="arrow up"
          className="catalog__sort-icon catalog__manufacturer-hideAll"
          hidden={show ? true : false}
        />
      </button>
    </>
  );
};

export default ManufacturersList;
