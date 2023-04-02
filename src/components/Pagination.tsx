import React from 'react';

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
    <nav>
      <ul className="pagination__list">
        {pageNumbers.map((number, index) => (
          <li
            key={number}
            className={
              currentPage === index + 1
                ? `active pagination__list`
                : 'pagination__list'
            }
          >
            <button type="button" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
