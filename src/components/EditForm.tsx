import React, { useState, SetStateAction, Dispatch } from 'react';
import { IProduct } from '../@types/Product';
import { useAppSelector } from '../app/hooks';
import { filterSelector } from '../app/reducers/filterSlice';

type Props = {
  product: IProduct;
  handleClick: (product: IProduct) => void;
  button: 'edit' | 'create';
  setStatus?: Dispatch<SetStateAction<boolean>>;
};

const EditForm = ({ product, handleClick, button, setStatus }: Props) => {
  const [imageURL, setImageURL] = useState(product.imageURL);
  const [name, setName] = useState(product.name);
  const [type, setType] = useState(product.type);
  const [size, setSize] = useState(product.size);
  const [barcode, setBarcode] = useState(product.barcode);
  const [manufacturer, setManufacturer] = useState(product.manufacturer);
  const [brand, setBrand] = useState(product.brand);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [careType, setCareType] = useState(product.careType);

  const { categories } = useAppSelector(filterSelector);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleClick({
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
    });
    setStatus && setStatus(false);
  }

  function handleCareType(e: React.ChangeEvent<HTMLSelectElement>) {
    let options = e.target.options;
    let value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setCareType(value);
  }

  return (
    <form onSubmit={handleSubmit} className="admin-panel__prop-list">
      <div className="admin-panel__prop-item">
        <label className="admin-panel__prop-label">
          <span className="admin-panel__prop-label_note">URL картинки</span>
          <input
            required
            type="text"
            className="admin-panel__prop-input"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </label>
      </div>
      <div className="admin-panel__prop-item">
        <label className="admin-panel__prop-label">
          <span className="admin-panel__prop-label_note">Название</span>
          <input
            required
            type="text"
            className="admin-panel__prop-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div className="admin-panel__prop-item">
        <label className="admin-panel__prop-label">
          <span className="admin-panel__prop-label_note">Тип</span>
          <input
            required
            type="text"
            className="admin-panel__prop-input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </label>
      </div>
      <div className="admin-panel__prop-item">
        <label className="admin-panel__prop-label">
          <span className="admin-panel__prop-label_note">Размер</span>
          <input
            required
            type="number"
            className="admin-panel__prop-input"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="admin-panel__prop-item">
        <label className="admin-panel__prop-label">
          <span className="admin-panel__prop-label_note">Штрихкод</span>
          <input
            required
            type="number"
            className="admin-panel__prop-input"
            value={barcode}
            onChange={(e) => setBarcode(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="admin-panel__prop-item">
        <label className="admin-panel__prop-label">
          <span className="admin-panel__prop-label_note">Производитель</span>
          <input
            required
            type="text"
            className="admin-panel__prop-input"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          />
        </label>
      </div>
      <div className="admin-panel__prop-item">
        <label className="admin-panel__prop-label">
          <span className="admin-panel__prop-label_note">Бренд</span>
          <input
            required
            type="text"
            className="admin-panel__prop-input"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </label>
      </div>
      <div className="admin-panel__prop-item">
        <label className="admin-panel__prop-label">
          <span className="admin-panel__prop-label_note">Описание</span>
          <input
            required
            type="text"
            className="admin-panel__prop-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div className="admin-panel__prop-item">
        <label className="admin-panel__prop-label">
          <span className="admin-panel__prop-label_note">Цена, ₸</span>
          <input
            required
            type="number"
            className="admin-panel__prop-input"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="admin-panel__prop-item">
        <label className="admin-panel__prop-label">
          <span className="admin-panel__prop-label_note">Тип ухода</span>
          <select
            required
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
        <button
          data-testid="create"
          type="submit"
          className="admin-panel__submit-btn"
        >
          {button === 'edit' ? 'Изменить' : 'Добавить'}
        </button>
      </div>
    </form>
  );
};

export default EditForm;
