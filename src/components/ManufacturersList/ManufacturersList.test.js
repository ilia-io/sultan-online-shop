import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ManufacturersList from './ManufacturersList';

const mockStore = configureStore([]);

describe('ManufacturersList', () => {
  it('should render a list of manufacturers and a "show all" button', () => {
    const manufacturers = ['Apple', 'Samsung', 'Sony'];
    const store = mockStore({
      filter: { manufacturers },
    });
    const { getByText } = render(
      <Provider store={store}>
        <ManufacturersList />
      </Provider>
    );

    expect(getByText(manufacturers[0])).toBeInTheDocument();
    expect(getByText(manufacturers[1])).toBeInTheDocument();
    expect(getByText(manufacturers[2])).toBeInTheDocument();
    expect(getByText('Показать все')).toBeInTheDocument();
  });

  it('should show all manufacturers when "show all" button is clicked', () => {
    const manufacturers = ['Apple', 'Samsung', 'Sony', 'Xiaomi', 'LG'];
    const store = mockStore({
      filter: { manufacturers },
    });
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <ManufacturersList />
      </Provider>
    );

    expect(getByText('Показать все')).toBeInTheDocument();
    expect(queryByText(manufacturers[4])).not.toBeInTheDocument();

    fireEvent.click(getByText('Показать все'));

    expect(queryByText(manufacturers[3])).toBeInTheDocument();
    expect(queryByText(manufacturers[4])).toBeInTheDocument();
    expect(getByText('Свернуть')).toBeInTheDocument();
  });

  it('should dispatch setActiveManufacturers action when checkbox is clicked', () => {
    const manufacturers = ['Apple', 'Samsung', 'Sony'];
    const store = mockStore({
      filter: { manufacturers },
    });
    const { getByLabelText } = render(
      <Provider store={store}>
        <ManufacturersList />
      </Provider>
    );

    fireEvent.click(getByLabelText(manufacturers[0]));

    expect(store.getActions()).toEqual([
      {
        type: 'filter/setActiveManufacturers',
        payload: manufacturers[0],
      },
    ]);
  });
});
