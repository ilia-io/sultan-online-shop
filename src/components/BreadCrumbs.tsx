import React from 'react';

type Props = {};

const BreadCrumbs = (props: Props) => {
  return (
    <section className="bread-crumbs">
      <div className="bread-crumbs__wrapper container">
        <a href="/" className="bread-crumbs__element">
          Главная
        </a>
        <div className="bread-crumbs__vertical-line"></div>
        <a href="/" className="bread-crumbs__element_active">
          Косметика и гигиена
        </a>
      </div>
    </section>
  );
};

export default BreadCrumbs;
