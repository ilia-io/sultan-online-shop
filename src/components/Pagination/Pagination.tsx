import React from 'react';
import leftIcon from '../../assets/icons/pagination-left.svg';
import rightIcon from '../../assets/icons/pagination-right.svg';

type Props = {
  productsPerPage: number;
  totalProducts: number;
  paginate: (number: number) => void;
  currentPage: number;
};

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {pageNumbers.length > 0 && (
        <nav className="pagination">
          <img
            src={leftIcon}
            alt="arrow pointing left"
            className="pagination__icon"
            onClick={() => {
              paginate(currentPage === 1 ? 1 : currentPage - 1);
            }}
          />

          <ul className="pagination__list">
            {pageNumbers.map((number, index) => (
              <li
                key={number}
                className={
                  currentPage === index + 1
                    ? `pagination__item_active pagination__item`
                    : 'pagination__item'
                }
              >
                <button
                  className={
                    currentPage === index + 1
                      ? `pagination__btn_active pagination__btn`
                      : 'pagination__btn'
                  }
                  type="button"
                  onClick={() => {
                    paginate(number);
                  }}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>

          <img
            src={rightIcon}
            alt="arrow pointing right"
            className="pagination__icon"
            onClick={() => {
              paginate(currentPage < pageNumbers.length ? currentPage + 1 : currentPage);
            }}
          />
        </nav>
      )}
    </>
  );
};

export default Pagination;
