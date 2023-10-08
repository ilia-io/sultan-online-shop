import { IProduct } from '../@types/Product';
import { useAppSelector } from '../app/hooks';
import { filterSelector } from '../app/reducers/filterSlice';

export const useFilters = (items: IProduct[]): IProduct[] => {
  const {
    activeCategory,
    categoryFilter,
    activeManufacturers,
    manufacturersFilter,
    manufacturersSearch,
    priceFilterMin,
    priceFilterMax,
  } = useAppSelector(filterSelector);

  const filteredItems = items
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
    .filter((item) => item.price <= Number(priceFilterMax));

  console.log('USE FILTER WORKING');
  return filteredItems;
};
