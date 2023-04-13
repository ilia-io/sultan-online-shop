import React, { useState } from 'react';
import typeBottleIcon from '../assets/icons/type-bottle.svg';
import typeSolidBoxIcon from '../assets/icons/type-solid-box.svg';
import cartBtnIcon from '../assets/icons/product-cart-in-btn.svg';
import priceListIcon from '../assets/icons/price-list-in-btn-dark.svg';
import arrowDown from '../assets/icons/sort-arrow-down.svg';
import arrowUp from '../assets/icons/sort-arrow-up.svg';
import { IProduct } from '../@types/Product';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { useParams } from 'react-router-dom';
import {
  currentItemSelector,
  productsSelector,
} from '../app/reducers/productSlice';
import {
  addItemToCart,
  cartSelector,
  minusItem,
} from '../app/reducers/cartSlice';
import BreadCrumbs from './BreadCrumbs';
import ShareBtn from './ShareBtn';

type Props = {};

const ProductCard = (props: Props) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showProperties, setShowProperties] = useState(false);

  const dispatch = useAppDispatch();

  const PRODUCTS = useAppSelector(productsSelector);

  const PRODUCT = useAppSelector(currentItemSelector) || PRODUCTS[0];

  const { items } = useAppSelector(cartSelector);

  const currentItemCount: number | undefined = items.find(
    (item) => item.barcode === PRODUCT.barcode
  )?.count;

  // const { barcode } = useParams<{ barcode: string }>();

  function showHideDescription() {
    setShowDescription(!showDescription);
  }

  function showHideProperties() {
    setShowProperties(!showProperties);
  }

  function handleAddItem() {
    dispatch(addItemToCart(PRODUCT));
  }

  function handleMinusItem() {
    dispatch(minusItem(PRODUCT.barcode));
  }

  return (
    <>
      <BreadCrumbs activeItem={PRODUCT.name} section="Каталог" />
      <section className="product-card container">
        <div className="product-card__img-wrapper">
          <img
            src={PRODUCT.imageURL}
            alt={PRODUCT.name}
            className="product-card__img"
            width={100}
          />
        </div>

        <div className="product-card__data">
          <p className="product-card__top-note">В наличии</p>
          <h1 className="product-card__title">
            {' '}
            <span className="product-card__title_bold">
              {PRODUCT.brand}
            </span>{' '}
            {PRODUCT.name}
          </h1>
          <div className="product-card__product-type-box">
            <img
              src={
                PRODUCT.type === 'weight' ? typeSolidBoxIcon : typeBottleIcon
              }
              alt={PRODUCT.type === 'weight' ? 'solid box' : 'bottle'}
              className="product-card__product-type-icon"
            />
            <p className="product-card__product-type-text">
              {PRODUCT.size} {PRODUCT.type === 'weight' ? 'г' : 'мл'}
            </p>
          </div>
          <div className="product-card__product-price-box">
            <p className="product-card__product-price">{PRODUCT.price} ₸</p>
            <div className="product-card__amount-box">
              <button
                onClick={handleMinusItem}
                type="button"
                className="product-card__dec"
              >
                -
              </button>
              <p className="product-card__count">{currentItemCount || 0}</p>
              <button
                onClick={handleAddItem}
                type="button"
                className="product-card__inc"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddItem}
              type="button"
              className="product-card__product-cartBtn"
            >
              В корзину{' '}
              <img
                src={cartBtnIcon}
                alt="cart"
                className="product-card__product-cartBtn-icon"
              />
            </button>
          </div>
          <ShareBtn classPrefix='mobile' />
          <div className="product-card__ad-box">
            <ShareBtn />
            <div className="product-card__ad-text-box">
              <p className="product-card__ad-text">
                При покупке от
                <span className="product-card__ad-text_bold"> 10 000 ₸ </span>
                бесплатная доставка по Кокчетаву и области
              </p>
            </div>

            <button disabled className="product-card__priceListBtn">
              Прайс-лист{' '}
              <img
                src={priceListIcon}
                alt="arrow down"
                className="product-card__priceListBtn-icon"
              />
            </button>
          </div>
          <ul className="product-card__prop-list">
            <li className="product-card__prop">
              Производитель:{' '}
              <span className="product-card__prop_value">
                {PRODUCT.manufacturer}
              </span>
            </li>
            <li className="product-card__prop">
              Бренд:{' '}
              <span className="product-card__prop_value">{PRODUCT.brand}</span>
            </li>
            <li className="product-card__prop">
              Артикул: <span className="product-card__prop_value">460404</span>
            </li>
            <li className="product-card__prop">
              Кол-во в коробке:{' '}
              <span className="product-card__prop_value">2</span>
            </li>
            <li className="product-card__prop">
              Штрихкод:{' '}
              <span className="product-card__prop_value">
                {PRODUCT.barcode}
              </span>
            </li>
            <li className="product-card__prop">
              Размеры коробки(Д*Ш*В):{' '}
              <span className="product-card__prop_value">10х10х10</span>
            </li>
            <li className="product-card__prop">
              Вес коробки:{' '}
              <span className="product-card__prop_value">1020 г</span>
            </li>
          </ul>
          <button
            className="product-card__description-btn"
            type="button"
            onClick={showHideDescription}
          >
            <span className="product-card__description-btn-text">
              Описание{' '}
            </span>
            <img
              src={arrowDown}
              alt="arrow down"
              className="product-card__description-btn-icon"
              hidden={showDescription ? true : false}
            />
            <img
              src={arrowUp}
              alt="arrow up"
              className="product-card__description-btn-icon"
              hidden={showDescription ? false : true}
            />
          </button>
          <p
            hidden={showDescription ? false : true}
            className="product-card__description"
          >
            {PRODUCT.description}
          </p>
          <div className="product-card__divider"></div>
          <button
            className="product-card__properties-btn"
            type="button"
            onClick={showHideProperties}
          >
            <span className="product-card__properties-btn-text">
              Характеристики{' '}
            </span>
            <img
              src={arrowDown}
              alt="arrow down"
              className="product-card__properties-btn-icon"
              hidden={showProperties ? true : false}
            />
            <img
              src={arrowUp}
              alt="arrow up"
              className="product-card__properties-btn-icon"
              hidden={showProperties ? false : true}
            />
          </button>
          <ul
            hidden={showProperties ? false : true}
            className="product-card__all-properties-list"
          >
            <li className="product-card__prop">
              Назначение:{' '}
              <span className="product-card__prop_value">BioMio</span>
            </li>
            <li className="product-card__prop">
              Тип: <span className="product-card__prop_value">BioMio</span>
            </li>
            <li className="product-card__prop">
              Производитель:{' '}
              <span className="product-card__prop_value">
                {PRODUCT.manufacturer}
              </span>
            </li>
            <li className="product-card__prop">
              Бренд:{' '}
              <span className="product-card__prop_value">{PRODUCT.brand}</span>
            </li>
            <li className="product-card__prop">
              Артикул:{' '}
              <span className="product-card__prop_value">4604049097548</span>
            </li>
            <li className="product-card__prop">
              Штрихкод:{' '}
              <span className="product-card__prop_value">
                {PRODUCT.barcode}
              </span>
            </li>
            <li className="product-card__prop">
              Вес:{' '}
              <span className="product-card__prop_value">{PRODUCT.size}</span>
            </li>
            <li className="product-card__prop">
              Объем:{' '}
              <span className="product-card__prop_value">{PRODUCT.size}</span>
            </li>
            <li className="product-card__prop">
              Кол-во в коробке:{' '}
              <span className="product-card__prop_value">90 г</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default ProductCard;
