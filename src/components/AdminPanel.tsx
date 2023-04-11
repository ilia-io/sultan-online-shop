import React, { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { IProduct } from '../@types/Product';
import {
  productsSelector,
  currentItemSelector,
  localItemsSelector,
  setLocalItems,
  getCurrentItem,
  removeProduct,
  addNewProduct,
  emptyProduct,
  editProduct,
} from '../app/reducers/productSlice';
import { render } from 'react-dom';
import { filterSelector } from '../app/reducers/filterSlice';
import EditForm from './EditForm';
import AdminPanelProduct from './AdminPanelProduct';

// useEffect(() => {
//   setLocalProducts(JSON.parse(localStorage.getItem('products') as string));

//   return () => {};
// }, []);

// const [localProducts, setLocalProducts] = useState();

type Props = {};

const AdminPanel = (props: Props) => {
  const PRODUCTS: IProduct[] = useAppSelector(productsSelector);
  const currentProduct: IProduct = useAppSelector(currentItemSelector);
  const localProducts = useAppSelector(localItemsSelector);

  const [selectedOption, setSelectedOption] = useState(currentProduct.barcode);

  const dispatch = useAppDispatch();
  // const [currentProd, setCurrentProd] = useState(currentProduct);
  // const [mainInputBarcode, setMainInputBarcode] = useState(
  //   String(currentProduct.barcode)
  // );
  // const [currentKeys, setCurrentKeys] = useState(
  //   Object.keys(currentProduct || {}) || []
  // );
  // const [currentValues, setCurrentValues] = useState(
  //   Object.values(currentProduct || {})
  // );

  // const [careTypeOption, setCareTypeOption] = useState(currentProduct.careType);

  // useEffect(() => {
  //   fillUpInputs(currentProduct);
  //   setCareTypeValue(careType);
  //   return () => {};
  // }, [currentProduct, careType]);

  function handleLoadData() {
    localStorage.setItem('products', JSON.stringify(PRODUCTS));
    // setLocalProducts(JSON.parse(localStorage.getItem('products') as string));

    setLocalItems(PRODUCTS);
  }

  // const cachedFill = useCallback(fillUpInputs, []);

  // function fillUpInputs(currentProduct: IProduct) {
  //   setImageURL(currentProduct.imageURL);
  //   setName(currentProduct.name);
  //   setType(currentProduct.type);
  //   setSize(currentProduct.size);
  //   setBarcode(currentProduct.barcode);
  //   setManufacturer(currentProduct.manufacturer);
  //   setBrand(currentProduct.brand);
  //   setDescription(currentProduct.description);
  //   setPrice(currentProduct.price);
  //   setCareType(currentProduct.careType);
  // }

  const [curr, setCurr] = useState(currentProduct);

  function handleCurrentProductChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(Number(e.target.value));
    getCurrentItem(Number(e.target.value));
    const getItem = localProducts.find(
      (item) => item.barcode === Number(e.target.value)
    );

    setCurr(getItem as IProduct);

    // console.log(curr);
    // fillUpInputs(getItem as IProduct);
  }

  function handleRemoveProduct(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    dispatch(removeProduct(currentProduct));
    // fillUpInputs(currentProduct);
    writeToLS(localProducts);
  }

  function readFromLS() {
    const local = JSON.parse(localStorage.getItem('products') as string);
    dispatch(setLocalItems(local));
  }
  function writeToLS(items: IProduct[]) {
    localStorage.setItem('products', JSON.stringify(items));
  }

  function addEmptyProduct(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    dispatch(addNewProduct());
    // fillUpInputs(emptyProduct);
    // writeToLS([...localProducts, emptyProduct]);
  }

  function handleEditProduct(product: IProduct) {
    dispatch(editProduct(product));
    const temp = [...localProducts].map((item) =>
      item.barcode === product.barcode ? (item = product) : item
    );
    writeToLS(temp);
  }
  return (
    <section className="admin-panel">
      <div className="admin-panel__wrapper container">
        <h1 className="admin-panel__title">Админка</h1>
        {/* <button
          type="button"
          onClick={handleLoadData}
          className="admin-panel__loadBtn"
        >
          Подгрузить данные из исходного JSON
        </button> */}
        <div className="admin-panel__form-wrapper">
          <div className="admin-panel__create-box">
            <h2 className="admin-panel__create-box-title">Добавить товар</h2>
            <EditForm
              product={{
                imageURL: '',
                name: '',
                type: '',
                size: 0,
                barcode: 0,
                manufacturer: '',
                brand: '',
                description: '',
                price: 0,
                careType: [''],
              }}
              handleEdit={handleEditProduct}
              button='create'
            />
          </div>
          <div className="admin-panel__edit-box">
            <h2 className="admin-panel__edit-box-title">Все товары</h2>
            <input
              placeholder="Поиск..."
              type="text"
              className="admin-panel__search"
            />
            <ul className="admin-panel__edit-list">
              {localProducts.map((product) => (
                <li className="admin-panel__edit-item" key={product.barcode}>
                  <AdminPanelProduct
                    product={product}
                    handleEdit={handleEditProduct}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
