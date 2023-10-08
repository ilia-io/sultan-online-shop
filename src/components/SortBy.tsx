import React, { useState, useEffect } from 'react';
import arrowDown from '../assets/icons/sort-arrow-down.svg';
import arrowUp from '../assets/icons/sort-arrow-up.svg';
import { IProduct } from '../@types/Product';
import { useAppDispatch } from '../app/hooks';
import { setLocalItems } from '../app/reducers/productSlice';

type Props = {
  filteredProducts: IProduct[];
  // setFilteredProducts?: React.Dispatch<React.SetStateAction<IProduct[]>>;
  classPrefix?: string;
};

interface ISortOption {
  type: 'name' | 'price';
  reversed: boolean;
}

const sortOptionsArr: ISortOption[] = [
  { type: 'name', reversed: false },
  { type: 'name', reversed: true },
  { type: 'price', reversed: false },
  { type: 'price', reversed: true },
];

const SortBy = ({
  filteredProducts,
  classPrefix,
}: Props) => {
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [activeSortOption, setActiveSortOption] = useState(sortOptionsArr[0]);
const dispatch = useAppDispatch()
  function toggleSortOptions() {
    setShowSortOptions(!showSortOptions);
  }

  function handleSort(option: ISortOption) {
    setActiveSortOption(option);
    setShowSortOptions(false);
    sort();
  }

  function sort() {
    const itemsCopy = [...filteredProducts];

    if (activeSortOption.type === 'name') {
      itemsCopy.sort((itemA, itemB) => {
        if (activeSortOption.reversed) {
          return itemB.name.localeCompare(itemA.name);
        }
        return itemA.name.localeCompare(itemB.name);
      });
      dispatch(setLocalItems(itemsCopy));
    } else {
      itemsCopy.sort((itemA, itemB) => {
        if (activeSortOption.reversed) {
          return itemA.price - itemB.price;
        }
        return itemB.price - itemA.price;
      });
      dispatch(setLocalItems(itemsCopy));
    }
  }

  useEffect(() => sort(), [activeSortOption]);

  return (
    <div
      className={
        classPrefix === 'mobile'
          ? 'catalog__sort-box_mobile'
          : 'catalog__sort-box'
      }
    >
      <div className="catalog__sort-text-wrapper">
        <p className="catalog__sort-text">Сортировка:</p>
        <button
          onClick={toggleSortOptions}
          className="catalog__sort-btn"
          type="button"
        >
          {activeSortOption.type === 'name' ? 'Название' : 'Цена'}
          <img
            src={activeSortOption.reversed ? arrowUp : arrowDown}
            alt="arrow down"
            className="catalog__sort-icon"
          />
        </button>
      </div>

      {showSortOptions && (
        <ul className="catalog__sort-list">
          {sortOptionsArr.map((option, index) => (
            <li
              onClick={() => handleSort(option)}
              key={index}
              className="catalog__sort-option"
            >
              {option.type === 'name' ? 'Название' : 'Цена'}
              <img
                src={option.reversed ? arrowUp : arrowDown}
                alt="arrow down"
                className="catalog__sort-icon"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortBy;
