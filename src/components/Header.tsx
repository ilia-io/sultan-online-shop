import React from 'react';
import location from '../assets/icons/location.svg';
import mail from '../assets/icons/mail.svg';
import logoHeader from '../assets/images/logo-header.svg';
import catalogBtnIcon from '../assets/icons/catalog-in-btn.svg';
import searchBtn from '../assets/icons/search-btn.svg';
import contactImg from '../assets/images/person-online.svg';
import priceListBtnIcon from '../assets/icons/price-list-in-btn.svg';
import cartIcon from '../assets/icons/cart.svg';

type Props = {};

const Header = (props: Props) => {
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
          <nav className="header__menu">
            <ul className="nav-list">
              <li className="nav-list__item">
                <a href="/" className="nav-list__link">
                  О компании
                </a>
              </li>
              <div className="header__menu-vertical-line"></div>
              <li className="nav-list__item">
                <a href="/" className="nav-list__link">
                  Доставка и оплата
                </a>
              </li>
              <div className="header__menu-vertical-line"></div>
              <li className="nav-list__item">
                <a href="/" className="nav-list__link">
                  Возврат
                </a>
              </li>
              <div className="header__menu-vertical-line"></div>
              <li className="nav-list__item">
                <a href="/" className="nav-list__link">
                  Контакты
                </a>
              </li>
            </ul>
          </nav>
        </section>
        <section className="header__main-section">
          <img src={logoHeader} alt="sultan" className="header__logo" />
          <button className="header__catalogBtn" type="button">
            Каталог{` `}
            <img
              src={catalogBtnIcon}
              alt="4 squares"
              className="header__catalogBtn-icon"
            />
          </button>
          <form className="header__search-form">
            <input
              name="text"
              type="text"
              placeholder="Поиск..."
              className="header__search-input"
            />
            <input
              name="btn"
              type="submit"
              className="header__search-btn"
              value=""
              style={{
                backgroundImage: `url(${searchBtn})`,
                border: 'none',
                borderRadius: '50%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                width: '40px',
                height: '40px',
              }}
            />
          </form>
          <div className="header__contact-wrapper">
            <div className="header__contact-text-wrapper">
              <h2 className="header__contact-title">+7 (777) 490-00-91</h2>
              <p className="header__contact-text">время работы: 9:00-20:00</p>
              <a href="/" className="header__contact-link">
                Заказать звонок
              </a>
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
          <div className="header__cart">
            <img src={cartIcon} alt="cart" className="header__cart-icon" />
            <div className="header__cart-text-wrapper">
              <p className="header__cart-text">Корзина</p>
              <h2 className="header__cart-price">12 478 ₸ </h2>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
};

export default Header;
