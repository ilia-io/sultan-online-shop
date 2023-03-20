import React from 'react';
import location from '../assets/icons/location.svg';
import mail from '../assets/icons/mail.svg';

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="header">
      <div className="header__wrapper container">
        <section className="header__menu-wrapper ">
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
                <a href="#" className="nav-list__link">
                  О компании
                </a>
              </li>
              <div className="header__menu-vertical-line"></div>
              <li className="nav-list__item">
                <a href="#" className="nav-list__link">
                  Доставка и оплата
                </a>
              </li>
              <div className="header__menu-vertical-line"></div>
              <li className="nav-list__item">
                <a href="#" className="nav-list__link">
                  Возврат
                </a>
              </li>
              <div className="header__menu-vertical-line"></div>
              <li className="nav-list__item">
                <a href="#" className="nav-list__link">
                  Контакты
                </a>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </header>
  );
};

export default Header;
