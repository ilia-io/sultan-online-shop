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
import mBackIcon from '../assets/icons/moblie-back.svg';
import SideFilters from './SideFilters';

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

  useEffect(() => {
    // if (inputPriceMin === '' || inputPriceMax === '') {
    // setFilteredProducts(PRODUCTS);
    // } else {
    // priceFilter();
    sort();
    // }

    return () => {};
  }, [activeSortOption]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  function handleClickCategory(categorie: string) {
    dispatch(setActiveCaterogy(categorie));
  }

  // console.log(document.querySelectorAll('.catalog__product').length);
  return (
    <section className="catalog">
      <div className="catalog__wrapper container">
        <section className="catalog__title-box">
          <button className="mobile__back-btn">
            <img
              src={mBackIcon}
              alt="arrow back"
              className="mobile__back-img"
            />
            НАЗАД
          </button>
          <h1 className="catalog__title">Косметика и гигиена</h1>

          <Link to={'/admin'}>
            <button
              type="button"
              className="catalog__product-cartBtn mobile__to-admin-btn"
            >
              В АДМИНКУ{' '}
            </button>
          </Link>

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
          <SideFilters />
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
