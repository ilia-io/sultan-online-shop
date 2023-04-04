import React from 'react';
import location from '../assets/icons/location.svg';
import mail from '../assets/icons/mail.svg';
import logoHeader from '../assets/images/logo-header.svg';
import catalogBtnIcon from '../assets/icons/catalog-in-btn.svg';
import contactImg from '../assets/images/person-online.svg';
import priceListBtnIcon from '../assets/icons/price-list-in-btn.svg';
import cartIcon from '../assets/icons/cart.svg';
import SearchForm from './SearchForm';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { cartSelector } from '../app/reducers/cartSlice';
import burgerIcon from '../assets/icons/burger-menu.svg';
import mobileCatalogIcon from '../assets/icons/mobile-catalog.svg';
import mobileSearchIcon from '../assets/icons/mobile-search.svg';

type Props = {};

const Header = (props: Props) => {
  const { items, totalPrice } = useAppSelector(cartSelector);
  const totalCount: number = items.reduce(
    (prev, current) => prev + current.count,
    0
  );
  return (
    <header className="header">
      <div className="header__wrapper container">
        <section className="header__menu-wrapper">
          <div className="header__location-mail-box">
            <div className="header__location-box">
              <img
                src={location}
                alt="point on map"
                className="header__location-icon"
              />
              <div className="header__location-text-box">
                <p className="header__location-text">
                  г. Кокчетав, ул. Ж. Ташенова 129Б
                </p>
                <p className="header__location-note">(Рынок Восточный)</p>
              </div>
            </div>
            <div className="header__location-vertical-line"></div>
            <div className="header__mail-box">
              <img src={mail} alt="envelope" className="header__mail-icon" />
              <div className="header__mail-text-box">
                <p className="header__mail-text">opt.sultan@mail.ru</p>
                <p className="header__mail-note">На связи в любое время</p>
              </div>
            </div>
          </div>
          <ul className="nav-list menu">
            <li className="nav-list__item">
              <a className="nav-list__link">О компании</a>
            </li>
            <div className="header__menu-vertical-line"></div>
            <li className="nav-list__item">
              <a className="nav-list__link">Доставка и оплата</a>
            </li>
            <div className="header__menu-vertical-line"></div>
            <li className="nav-list__item">
              <a className="nav-list__link">Возврат</a>
            </li>
            <div className="header__menu-vertical-line"></div>
            <li className="nav-list__item">
              <a className="nav-list__link">Контакты</a>
            </li>
          </ul>
        </section>
        <section className="header__main-section">
          <div className="header__mobile-burger-menu">
            <img
              src={burgerIcon}
              alt="burger menu"
              className="header__mobile-burger-img"
            />
          </div>
          <Link to={'/catalog'}>
            <img src={logoHeader} alt="sultan" className="header__logo" />
          </Link>
          <Link to={'/catalog'} className="mobile-hide">
            <button className="header__catalogBtn" type="button">
              Каталог
              <img
                src={catalogBtnIcon}
                alt="4 squares"
                className="header__catalogBtn-icon"
              />
            </button>
          </Link>
          <SearchForm classPrefix="header" />
          <div className="header__contact-wrapper">
            <div className="header__contact-text-wrapper">
              <h2 className="header__contact-title">+7 (777) 490-00-91</h2>
              <p className="header__contact-text">время работы: 9:00-20:00</p>
              <a className="header__contact-link">Заказать звонок</a>
            </div>
            <img
              src={contactImg}
              alt="person with headset"
              className="header__contact-img"
            />
          </div>
          <div className="header__main-vertical-line"></div>
          <button className="header__price-list-btn" type="button">
            Прайс-лист{' '}
            <img
              src={priceListBtnIcon}
              alt="arrow pointing down"
              className="header__price-list-btn-icon"
            />
          </button>
          <div className="header__main-vertical-line"></div>
          <Link to={'/cart'}>
            <div className="header__cart">
              <div className="header__cart-img-box">
                <img src={cartIcon} alt="cart" className="header__cart-icon" />
                <div className="header__cart-img-note-box">
                  <span className="header__cart-img-note-text">
                    {totalCount}
                  </span>
                </div>
              </div>
              <div className="header__cart-text-wrapper">
                <p className="header__cart-text">Корзина</p>
                <h2 className="header__cart-price">
                  {Math.round(totalPrice)} ₸
                </h2>
              </div>
            </div>
          </Link>
        </section>
        <div className="header__mobile-buttons">
          <div className="header__mobile-buttons-wrapper">
            <button className="header__mobile-buttons-catalog">
              <img
                src={mobileCatalogIcon}
                alt="catalog"
                className="header__mobile-buttons-catalog-img"
              />
              Каталог
            </button>
            <div className="header__mobile-vertical-line"></div>
            <button className="header__mobile-buttons-search">
              <img
                src={mobileSearchIcon}
                alt="magnifying glass"
                className="header__mobile-buttons-search-img"
              />
              Поиск
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
