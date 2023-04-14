import React, { useState } from 'react';
import EditForm from './EditForm';
import { IProduct } from '../@types/Product';
import editImg from '../assets/icons/edit-pencil.svg';
import deleteImg from '../assets/icons/cart-delete.svg';

type Props = {
  product: IProduct;
  handleEdit: (product: IProduct) => void;
  handleRemove: (product: IProduct) => void;
};

const AdminPanelProduct = ({ product, handleEdit, handleRemove }: Props) => {
  const [edit, setEdit] = useState(false);
  return (
    <div className="admin-product">
      {edit ? (
        <EditForm
          product={product}
          handleClick={handleEdit}
          button="edit"
          setStatus={setEdit}
        />
      ) : (
        <div className="admin-product__mini">
          <div className="admin-product__mini-actions">
            <button
              data-testid="edit-btn"
              onClick={() => setEdit(!edit)}
              className="admin-product__edit-btn"
            >
              <img
                src={editImg}
                alt="pencil"
                className="admin-product__edit-btn-icon"
              />
            </button>
            <button
              onClick={() => handleRemove(product)}
              className="admin-product__delete-btn"
            >
              <img
                src={deleteImg}
                alt="trash bin"
                className="admin-product__delete-btn-icon"
              />
            </button>
          </div>
          <img
            src={product.imageURL}
            alt={product.name}
            className="admin-product__mini-img"
          />
          <div className="admin-product__mini-props">
            <p className="admin-product__mini-prop">
              <span className="admin-product__mini-prop_bold">Название: </span>
              {product.name}
            </p>
            <p className="admin-product__mini-prop">
              <span className="admin-product__mini-prop_bold">Штрихкод: </span>
              {product.barcode}
            </p>
            <p className="admin-product__mini-prop">
              <span className="admin-product__mini-prop_bold">Бренд: </span>
              {product.brand}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanelProduct;
