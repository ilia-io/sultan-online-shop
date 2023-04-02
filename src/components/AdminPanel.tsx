import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';
import { IProduct } from '../@types/Product';
import { productsSelector } from '../app/reducers/productSlice';

type Props = {};

const AdminPanel = (props: Props) => {
  const PRODUCTS: IProduct[] = useAppSelector(productsSelector);

  const [localProducts, setLocalProducts] = useState(
    JSON.parse(localStorage.getItem('products') as string)
  );
  const [mainInput, setMainInput] = useState(String(localProducts[0].barcode));
  const [currentProduct, setCurrentProduct] = useState(localProducts[0]);

  const [currentKeys, setCurrentKeys] = useState(Object.keys(currentProduct));
  const [currentValues, setCurrentValues] = useState(
    Object.values(currentProduct)
  );

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
  const [careTypeOption, setCareTypeOption] = useState(currentProduct.careType);

  function handleCareType(e: React.ChangeEvent<HTMLSelectElement>) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    console.log(value);
    setCareTypeOption(value);
  }

  useEffect(() => {
    setLocalProducts(JSON.parse(localStorage.getItem('products') as string));

    return () => {};
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem(
      'products',
      JSON.stringify({
        imageURL,
        name,
        type,
        size,
        barcode,
        manufacturer,
        brand,
        description,
        price,
        careType,
      })
    );
  };

  function handleLoadData() {
    localStorage.setItem('products', JSON.stringify(PRODUCTS));
    setLocalProducts(JSON.parse(localStorage.getItem('products') as string));
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setMainInput(e.target.value);
    setCurrentProduct(
      PRODUCTS.find((item) => item.barcode === Number(mainInput)) || PRODUCTS[0]
    );
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
          Подгрузить данные из JSON
        </button>

        <select
          onChange={(e) => handleChange(e)}
          value={mainInput}
          id={String(currentProduct.barcode)}
          className="admin-panel__main-select"
        >
          {PRODUCTS.map((item) => (
            <option
              className="admin-panel__products-option"
              key={item.barcode}
              value={item.name}
            >
              {item.name}
            </option>
          ))}
        </select>

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
                  onChange={(e) => handleCareType(e)}
                  className="admin-panel__prop-input"
                  name=""
                  id=""
                >
                  {careType.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button type="submit" className="admin-panel__submitBtn">
              Изменить
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
