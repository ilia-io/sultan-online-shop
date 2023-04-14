import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';
import { Provider } from 'react-redux';
import { setManufacturersSearch } from '../../app/reducers/filterSlice';
import configureStore from 'redux-mock-store';

describe('SearchForm', () => {
  const mockStore = configureStore([]);
  let store;

  beforeEach(() => {
    store = mockStore({});

    store.dispatch = jest.fn();
  });

  it('should render search form correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <SearchForm classPrefix="test" />
      </Provider>
    );

    expect(getByPlaceholderText('Поиск...')).toBeInTheDocument();
    expect(getByTestId('search-btn')).toBeInTheDocument();
  });

  test('dispatches setManufacturersSearch action when form is submitted', () => {
    const { getByRole, getByTestId } = render(
      <Provider store={store}>
        <SearchForm classPrefix="some-class" />
      </Provider>
    );

    const input = getByRole('textbox');
    const inputValue = 'test';

    fireEvent.change(input, { target: { value: inputValue } });
    const form = getByTestId('search-form');
    fireEvent.submit(form);

    expect(store.dispatch).toHaveBeenCalledWith(
      setManufacturersSearch(inputValue)
    );
  });
});
