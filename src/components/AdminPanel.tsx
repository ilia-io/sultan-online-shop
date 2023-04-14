import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { IProduct } from '../@types/Product';
import {
  productsSelector,
  localItemsSelector,
  setLocalItems,
  removeProduct,
  editProduct,
  addProduct,
} from '../app/reducers/productSlice';
import EditForm from './EditForm';
import AdminPanelProduct from './AdminPanelProduct';

type Props = {};

const AdminPanel = (props: Props) => {
  const localProducts = useAppSelector(localItemsSelector);

  const dispatch = useAppDispatch();

  function writeToLS(items: IProduct[]) {
    localStorage.setItem('products', JSON.stringify(items));
  }

  function handleAddNewProduct(product: IProduct) {
    dispatch(addProduct(product));
    writeToLS([product, ...localProducts]);
  }

  function handleEditProduct(product: IProduct) {
    dispatch(editProduct(product));
    const temp = [...localProducts].map((item) =>
      item.barcode === product.barcode ? (item = product) : item
    );
    writeToLS(temp);
  }

  function handleRemoveProduct(product: IProduct) {
    dispatch(removeProduct(product));
    const temp = [...localProducts].filter(
      (item) => item.barcode !== product.barcode
    );
    writeToLS(temp);
  }

  return (
    <section className="admin-panel">
      <div className="admin-panel__wrapper container">
        <h1 className="admin-panel__title">Админка</h1>
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
              handleClick={handleAddNewProduct}
              button="create"
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
                    handleRemove={handleRemoveProduct}
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
