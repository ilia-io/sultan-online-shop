import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const BreadCrumbs = (props: Props) => {
  return (
    <section className="bread-crumbs">
      <div className="bread-crumbs__wrapper container">
        <Link to={'/catalog'} className="bread-crumbs__element">
          Главная
        </Link>
        <div className="bread-crumbs__vertical-line"></div>
        <a href="/" className="bread-crumbs__element_active">
          Косметика и гигиена
        </a>
      </div>
    </section>
  );
};

export default BreadCrumbs;
