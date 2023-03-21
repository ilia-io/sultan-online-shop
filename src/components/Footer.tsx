import React from 'react';
import logoFooter from '../assets/images/logo-footer.svg';
import emailBtn from '../assets/icons/email-btn.svg';
import priceListBtnIcon from '../assets/icons/price-list-in-btn.svg';
import telegram from '../assets/icons/telegram.svg';
import whatsapp from '../assets/icons/whatsapp.svg';

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="footer">
      <div className="footer-wrapper container">
        <section className="footer__logo-box">
          <img src={logoFooter} alt="sultan" className="footer__logo" />
          <p className="footer__logo-text">
            Компания «Султан» — снабжаем розничные магазины товарами "под ключ"
            в Кокчетаве и Акмолинской области
          </p>
          <p className="footer__logo-note">Подпишись на скидки и акции</p>
          <form className="footer__email-form">
            <input
              name="text"
              type="text"
              placeholder="Введите ваш E-mail"
              className="footer__email-input"
            />
            <input
              name="btn"
              type="submit"
              className="footer__email-btn"
              value=""
              style={{
                backgroundImage: `url(${emailBtn})`,
                border: 'none',
                borderRadius: '50%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                width: '40px',
                height: '40px',
              }}
            />
          </form>
        </section>
        <nav className="footer__info">
          <h2 className="footer__info-title">Меню сайта:</h2>
          <ul className="nav-list">
            <li className="nav-list__item">
              <a href="/" className="nav-list__link">
                О компании
              </a>
            </li>
            <li className="nav-list__item">
              <a href="/" className="nav-list__link">
                Доставка и оплата
              </a>
            </li>
            <li className="nav-list__item">
              <a href="/" className="nav-list__link">
                Возврат
              </a>
            </li>
            <li className="nav-list__item">
              <a href="/" className="nav-list__link">
                Контакты
              </a>
            </li>
          </ul>
        </nav>
        <nav className="footer__info">
          <h2 className="footer__info-title">Категории:</h2>
          <ul className="nav-list">
            <li className="nav-list__item">
              <a href="/" className="nav-list__link">
                Бытовая химия
              </a>
            </li>
            <li className="nav-list__item">
              <a href="/" className="nav-list__link">
                Косметика и гигиена
              </a>
            </li>
            <li className="nav-list__item">
              <a href="/" className="nav-list__link">
                Товары для дома
              </a>
            </li>
            <li className="nav-list__item">
              <a href="/" className="nav-list__link">
                Товары для детей и мам
              </a>
            </li>
            <li className="nav-list__item">
              <a href="/" className="nav-list__link">
                Посуда
              </a>
            </li>
          </ul>
        </nav>
        <section className="footer__contact">
          <h2 className="footer__contact-title">Скачать прайс-лист:</h2>
          <button className="header__price-list-btn" type="button">
            Прайс-лист{' '}
            <img
              src={priceListBtnIcon}
              alt="arrow pointing down"
              className="header__price-list-btn-icon"
            />
          </button>
          <p className="footer__contact-text">Связь в мессенджерах:</p>
          <div className="footer__contact-icon-box">
            <img
              src={whatsapp}
              alt="telegram"
              className="footer__contact-icon"
            />
            <img
              src={telegram}
              alt="telegram"
              className="footer__contact-icon"
            />
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
