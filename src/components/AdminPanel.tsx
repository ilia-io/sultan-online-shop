import React, { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { IProduct } from '../@types/Product';
import {
  productsSelector,
  currentItemSelector,
  localItemsSelector,
  setLocalItems,
  getCurrentItem,
  removeSelected,
  addNew,
  emptyProduct,
} from '../app/reducers/productSlice';
import { render } from 'react-dom';
import { filterSelector } from '../app/reducers/filterSlice';

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
  const { categories } = useAppSelector(filterSelector);

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

  const [imageURL, setImageURL] = useState(currentProduct.imageURL);
  const [name, setName] = useState(currentProduct.name);
  const [type, setType] = useState(currentProduct.type);
  const [size, setSize] = useState(currentProduct.size);
  const [barcode, setBarcode] = useState(currentProduct.barcode);
  const [manufacturer, setManufacturer] = useState(currentProduct.manufacturer);
  const [brand, setBrand] = useState(currentProduct.brand);
  const [description, setDescription] = useState(currentProduct.description);
  const [price, setPrice] = useState(currentProduct.price);
  const [careType, setCareType] = useState(currentProduct.careType);
  // const [careTypeOption, setCareTypeOption] = useState(currentProduct.careType);

  function handleCareType(e: React.ChangeEvent<HTMLSelectElement>) {
    let options = e.target.options;
    let value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setCareTypeValue(value);
  }

  function setCareTypeValue(value: string[]) {
    setCareType(value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // setPrice(currentProduct.price);
    // localStorage.setItem(
    //   'products',
    //   JSON.stringify({
    //     imageURL,
    //     name,
    //     type,
    //     size,
    //     barcode,
    //     manufacturer,
    //     brand,
    //     description,
    //     price,
    //     careType,
    //   })
    // );
  };

  useEffect(() => {
    fillUpInputs(currentProduct);
    setCareTypeValue(careType);
    // return () => {};
  }, [currentProduct, careType]);

  function handleLoadData() {
    localStorage.setItem('products', JSON.stringify(PRODUCTS));
    // setLocalProducts(JSON.parse(localStorage.getItem('products') as string));

    setLocalItems(PRODUCTS);
  }

  // const cachedFill = useCallback(fillUpInputs, []);

  function fillUpInputs(currentProduct: IProduct) {
    setImageURL(currentProduct.imageURL);
    setName(currentProduct.name);
    setType(currentProduct.type);
    setSize(currentProduct.size);
    setBarcode(currentProduct.barcode);
    setManufacturer(currentProduct.manufacturer);
    setBrand(currentProduct.brand);
    setDescription(currentProduct.description);
    setPrice(currentProduct.price);
    setCareType(currentProduct.careType);
  }

  function handleCurrentProductChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(Number(e.target.value));
    getCurrentItem(Number(e.target.value));
    const getItem = localProducts.find(
      (item) => item.barcode === Number(e.target.value)
    );
    fillUpInputs(getItem as IProduct);
  }

  function removeProduct(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    dispatch(removeSelected(currentProduct));
    fillUpInputs(currentProduct);
    writeToLS(localProducts);
  }

  function readFromLS() {
    const local = JSON.parse(localStorage.getItem('products') as string);
    dispatch(setLocalItems(local));
  }
  function writeToLS(items: IProduct[]) {
    localStorage.setItem('products', JSON.stringify(items));
  }

  function addEmptyProduct() {
    dispatch(addNew());
    fillUpInputs(emptyProduct);
    writeToLS([...localProducts, emptyProduct]);
  }
  return (
    <section className="admin-panel">
      <div className="admin-panel__wrapper container">
        <h1 className="admin-panel__title">Админка</h1>
        <button
          type="button"
          onClick={handleLoadData}
          className="admin-panel__loadBtn"
        >
          Подгрузить данные из исходного JSON
        </button>
        <select
          onChange={(e) => handleCurrentProductChange(e)}
          value={selectedOption}
          // id={String(currentProduct.barcode)}
          className="admin-panel__main-select"
        >
          {localProducts.map((item) => (
            <option
              className="admin-panel__products-option"
              key={item.barcode}
              value={item.barcode}
            >
              {item.name}
            </option>
          ))}
        </select>
        {'или'}
        <button
          onClick={addEmptyProduct}
          type="button"
          className="admin-panel__add-new-btn"
        >
          Добавить новый
        </button>
        <div className="admin-panel__form">
          <ul className="admin-panel__prop-list">
            {Object.keys(currentProduct).map((item) => (
              <li key={item} className="admin-panel__prop-item">
                <p className="admin-panel__prop-item-key">{item} </p>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit} className="admin-panel__prop-list">
            <div className="admin-panel__prop-item">
              <label className="admin-panel__prop-label">
                <input
                  type="text"
                  className="admin-panel__prop-input"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                />
              </label>
            </div>
            <div className="admin-panel__prop-item">
              <label className="admin-panel__prop-label">
                <input
                  type="text"
                  className="admin-panel__prop-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div className="admin-panel__prop-item">
              <label className="admin-panel__prop-label">
                <input
                  type="text"
                  className="admin-panel__prop-input"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </label>
            </div>
            <div className="admin-panel__prop-item">
              <label className="admin-panel__prop-label">
                <input
                  type="number"
                  className="admin-panel__prop-input"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="admin-panel__prop-item">
              <label className="admin-panel__prop-label">
                <input
                  type="number"
                  className="admin-panel__prop-input"
                  value={barcode}
                  onChange={(e) => setBarcode(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="admin-panel__prop-item">
              <label className="admin-panel__prop-label">
                <input
                  type="text"
                  className="admin-panel__prop-input"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                />
              </label>
            </div>
            <div className="admin-panel__prop-item">
              <label className="admin-panel__prop-label">
                <input
                  type="text"
                  className="admin-panel__prop-input"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </label>
            </div>
            <div className="admin-panel__prop-item">
              <label className="admin-panel__prop-label">
                <input
                  type="text"
                  className="admin-panel__prop-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
            </div>
            <div className="admin-panel__prop-item">
              <label className="admin-panel__prop-label">
                <input
                  type="number"
                  className="admin-panel__prop-input"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="admin-panel__prop-item">
              <label className="admin-panel__prop-label">
                {/* <input
                  // type="text"
                  // className="admin-panel__prop-input"
                  // value={careType}
                  // onChange={(e) => setCareType(e.target.value)}
                /> */}
                <select
                  multiple
                  defaultValue={careType}
                  onChange={(e) => handleCareType(e)}
                  className="admin-panel__prop-input"
                  size={categories.length}
                >
                  {categories.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="admin-panel__buttons">
              <button type="submit" className="admin-panel__submit-btn">
                Изменить
              </button>
              <button
                onClick={removeProduct}
                type="button"
                className="admin-panel__remove-btn"
              >
                Удалить товар
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
