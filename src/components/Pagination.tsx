import React from 'react';
import leftIcon from '../assets/icons/pagination-left.svg';
import rightIcon from '../assets/icons/pagination-right.svg';

type Props = {
  postsPerPage: number;
  totalPosts: number;
  paginate: (number: number) => void;
  currentPage: number;
};

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: Props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <img
        src={leftIcon}
        alt="arrow pointing left"
        className="pagination__icon"
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
      />
    </nav>
  );
};

export default Pagination;
