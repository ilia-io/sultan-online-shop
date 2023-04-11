import React, { useEffect, useState } from 'react';
import arrowDown from '../assets/icons/sort-arrow-down.svg';
import arrowUp from '../assets/icons/sort-arrow-up.svg';
import SearchForm from './SearchForm';
import ManufacturersList from './ManufacturersList';
import { IProduct } from '../@types/Product';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';
import {
  getCurrentItem,
  localItemsSelector,
} from '../app/reducers/productSlice';
import {
  filterSelector,
  setActiveCaterogy,
  setPriceFilterMax,
  setPriceFilterMin,
} from '../app/reducers/filterSlice';
import Pagination from './Pagination';
import { addItemToCart } from '../app/reducers/cartSlice';
import CatalogProduct from './CatalogProduct';

type Props = {};

// const categories: string[] = DB.careTypes;
// export const manufacturers: string[] = DB.manufacturers;
// export const PRODUCTS: IProduct[] = DB.products;

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

export function getProductsFromLocalStorage() {
  const products = JSON.parse(localStorage.getItem('products') as string);

  if (!products || products.length === 0) return null;

  return products;
}

const Catalog = (props: Props) => {
  const [showSortOptions, setShowSortOptions] = useState(false);

  const dispatch = useAppDispatch();

  // const PRODUCTS = useAppSelector((state: RootState) => state.product.items);
  const localItems = useAppSelector(localItemsSelector);

  const {
    activeCategory,
    categoryFilter,
    categories,
    activeManufacturers,
    manufacturersFilter,
    manufacturersSearch,
    priceFilterMin,
    priceFilterMax,
  } = useAppSelector(filterSelector);

  function toggleSortOptions() {
    setShowSortOptions(!showSortOptions);
  }

  function handleClickCategory(categorie: string) {
    dispatch(setActiveCaterogy(categorie));
  }

  const [activeSortOption, setActiveSortOption] = useState(sortOptionsArr[0]);

  function handleSort(option: ISortOption) {
    setActiveSortOption(option);
    setShowSortOptions(false);
    sort();
  }

  const [filteredProducts, setFilteredProducts] = useState(localItems);

  useEffect(() => {
    setFilteredProducts(localItems);

    return () => {};
  }, [localItems]);

  function sort() {
    const itemsCopy = [...filteredProducts];

    if (activeSortOption.type === 'name') {
      itemsCopy.sort((itemA, itemB) => {
        if (activeSortOption.reversed) {
          return itemB.name.localeCompare(itemA.name);
        }
        return itemA.name.localeCompare(itemB.name);
      });
      setFilteredProducts(itemsCopy);
    } else {
      itemsCopy.sort((itemA, itemB) => {
        if (activeSortOption.reversed) {
          return itemA.price - itemB.price;
        }
        return itemB.price - itemA.price;
      });
      setFilteredProducts(itemsCopy);
    }
  }

  const [inputPriceMin, setInputPriceMin] = useState('0');
  const [inputPriceMax, setInputPriceMax] = useState('10000');

  useEffect(() => {
    // if (inputPriceMin === '' || inputPriceMax === '') {
    // setFilteredProducts(PRODUCTS);
    // } else {
    // priceFilter();
    sort();
    // }

    return () => {};
  }, [activeSortOption]);

  function handlePriceMin(e: React.ChangeEvent<HTMLInputElement>) {
    setInputPriceMin(e.target.value);
    dispatch(setPriceFilterMin(e.target.value));
  }

  function handlePriceMax(e: React.ChangeEvent<HTMLInputElement>) {
    setInputPriceMax(e.target.value);
    dispatch(setPriceFilterMax(e.target.value));
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // console.log(document.querySelectorAll('.catalog__product').length);
  return (
    <section className="catalog">
      <div className="catalog__wrapper container">
        <section className="catalog__title-box">
          <h1 className="catalog__title">Косметика и гигиена</h1>
          <div className="catalog__sort-box">
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
        </section>
        <section className="catalog__top-line-categories">
          <ul className="catalog__top-line-categories-list">
            {categories.map((categorie) => (
              <li
                onClick={() => handleClickCategory(categorie)}
                key={categorie}
                className={
                  activeCategory === categorie
                    ? 'catalog__top-line-categories-item catalog__top-line-categories-item_active'
                    : 'catalog__top-line-categories-item'
                }
              >
                {categorie}
              </li>
            ))}
          </ul>
        </section>
        <section className="catalog__main">
          <section className="catalog__side-filters">
            <h2 className="catalog__side-filters-title">
              ПОДБОР ПО ПАРАМЕТРАМ
            </h2>
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
                  onChange={(e) => handlePriceMin(e)}
                />
                <p className="catalog__price-filter-divider">-</p>
                <label htmlFor="priceMax"></label>
                <input
                  id="priceMax"
                  type="number"
                  className="catalog__price-filter-max"
                  placeholder="10 000"
                  value={inputPriceMax}
                  onChange={(e) => handlePriceMax(e)}
                />
              </div>
            </div>
            <div className="catalog__manufacturer-filter-box">
              <h2 className="catalog__manufacturer-filter-title">
                Производитель
              </h2>
              <SearchForm classPrefix="catalog" />
              <ManufacturersList />

              <div className="catalog__manufacturer-filter-divider"></div>
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
          <section className="catalog__products">
            <ul className="catalog__products-list">
              {currentProducts
                .filter((item) =>
                  categoryFilter ? item.careType.includes(activeCategory) : true
                )
                .filter((item) =>
                  manufacturersFilter
                    ? activeManufacturers.includes(item.manufacturer)
                    : true
                )
                .filter((item) =>
                  item.manufacturer
                    .toLowerCase()
                    .includes(manufacturersSearch.toLowerCase())
                )
                .filter((item) => item.price >= Number(priceFilterMin))
                .filter((item) => item.price <= Number(priceFilterMax))
                .map((product: IProduct) => (
                  <CatalogProduct key={product.barcode} product={product} />
                ))}
            </ul>
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={filteredProducts.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </section>
        </section>
      </div>
    </section>
  );
};

export default Catalog;
