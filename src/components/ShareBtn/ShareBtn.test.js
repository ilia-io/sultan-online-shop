import React from 'react';
import { render } from '@testing-library/react';
import ShareBtn from './ShareBtn';

describe('ShareBtn', () => {
  test('renders ShareBtn component', () => {
    const { getByRole } = render(<ShareBtn />);
    const shareBtn = getByRole('button');
    expect(shareBtn).toBeInTheDocument();
    expect(shareBtn).toHaveAttribute('disabled');
  });

  test('renders ShareBtn component with classPrefix "mobile"', () => {
    const { getByRole } = render(<ShareBtn classPrefix="mobile" />);
    const shareBtn = getByRole('button');
    expect(shareBtn).toBeInTheDocument();
    expect(shareBtn).toHaveAttribute('disabled');
    expect(shareBtn).toHaveClass('product-card__share-link_mobile');
  });

  test('renders ShareBtn component without classPrefix', () => {
    const { getByRole } = render(<ShareBtn />);
    const shareBtn = getByRole('button');
    expect(shareBtn).toBeInTheDocument();
    expect(shareBtn).toHaveAttribute('disabled');
    expect(shareBtn).toHaveClass('product-card__share-link');
  });
});
