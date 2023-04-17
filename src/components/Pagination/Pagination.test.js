import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component', () => {
  const props = {
    productsPerPage: 5,
    totalProducts: 20,
    paginate: jest.fn(),
    currentPage: 1,
  };

  it('renders the correct number of buttons', () => {
    const { getAllByRole } = render(<Pagination {...props} />);
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(4);
  });

  it('renders the active button for the current page', () => {
    const { getByText } = render(<Pagination {...props} />);
    const activeButton = getByText('1');
    expect(activeButton).toHaveClass('pagination__btn_active');
  });

  it('calls the paginate function with the correct page number when a button is clicked', () => {
    const { getByText } = render(<Pagination {...props} />);
    const page2Button = getByText('2');
    fireEvent.click(page2Button);
    expect(props.paginate).toHaveBeenCalledWith(2);
  });
});
