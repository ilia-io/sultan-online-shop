import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  activeItem?: string;
  section?: string;
};

const BreadCrumbs = ({ activeItem, section }: Props) => {
  return (
    <section className="bread-crumbs">
      <div className="bread-crumbs__wrapper container">
        <Link to={'/catalog'} className="bread-crumbs__element">
          Главная
        </Link>
        {section && (
          <>
            <div className="bread-crumbs__vertical-line"></div>
            <Link to={'/catalog'} className="bread-crumbs__element">
              {section}
            </Link>
          </>
        )}
        <div className="bread-crumbs__vertical-line"></div>
        <a href="#" className="bread-crumbs__element_active">
          {activeItem || ''}Косметика и гигиена
        </a>
      </div>
    </section>
  );
};

export default BreadCrumbs;
