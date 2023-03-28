import React from 'react';
import arrowDown from '../assets/icons/sort-arrow-down.svg';
import arrowUp from '../assets/icons/sort-arrow-up.svg';

type Props = {};

type TCategorie = string;

const categories: string[] = [
  "Уход за телом","Уход за руками","Уход за ногами","Уход за лицом","Уход за волосами","Средства для загара","Средства для бритья","Подарочные наборы","Гигиеническая продукция","Гигиена полости рта","Бумажная продукция",
];

const manufacturers: string[] = ["BioMio","Нэфис","Grifon","Boyscout","Paclan","Булгари Грин",
];

const Catalog = (props: Props) => {
  return (
    <section className="catalog">
      <div className="catalog__wrapper container">
        <section className="catalog__title-box">
          <h1 className="catalog__title">Косметика и гигиена</h1>
          <div className="catalog__sort-box">
            <p className="catalog__sort-text">Сортировка:</p>
            <button className="catalog__sort-btn" type="button">
              выбрать
            </button>
            <ul className="catalog__sort-list">
              <li className="catalog__sort-option">
                Название
                <img
                  src={arrowDown}
                  alt="arrow down"
                  className="catalog__sort-icon"
                />
              </li>
              <li className="catalog__sort-option">
                Название
                <img
                  src={arrowUp}
                  alt="arrow up"
                  className="catalog__sort-icon"
                />
              </li>
              <li className="catalog__sort-option">
                Цена
                <img
                  src={arrowDown}
                  alt="arrow down"
                  className="catalog__sort-icon"
                />
              </li>
              <li className="catalog__sort-option">
                Цена
                <img
                  src={arrowUp}
                  alt="arrow up"
                  className="catalog__sort-icon"
                />
              </li>
            </ul>
          </div>
        </section>
        <section className="catalog__top-line-categories">
          <ul className="catalog__top-line-categories-list">
            {categories.map((categorie) => (
              <li key={categorie} className="catalog__top-line-categories-item">
                {categorie}
              </li>
            ))}
          </ul>
        </section>
        <section className="catalog-main">
          
        </section>
      </div>
    </section>
  );
};

export default Catalog;
