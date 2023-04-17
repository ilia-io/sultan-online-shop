import { render, screen, fireEvent } from '@testing-library/react';
import AdminPanel from './AdminPanel';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

describe('AdminPanel component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders AdminPanel component', () => {
    render(
      <Provider store={store}>
        <AdminPanel />
      </Provider>
    );
    const titleElement = screen.getByText(/Админка/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('adds new product when "create" button is clicked', () => {
    render(
      <Provider store={store}>
        <AdminPanel />
      </Provider>
    );

    const addButton = screen.getByText(/Добавить товар/i);
    fireEvent.click(addButton);

    const nameInput = screen.getByLabelText(/Название/i);
    const barcodeInput = screen.getByLabelText(/Штрихкод/i);

    fireEvent.change(nameInput, { target: { value: 'Test Product' } });
    fireEvent.change(barcodeInput, { target: { value: '1234567890' } });

    const submitButton = screen.getByTestId('create');
    fireEvent.click(submitButton);

    const addedProduct = screen.getByText(/Test Product/i);
    expect(addedProduct).toBeInTheDocument();

    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    expect(storedProducts.length).toBe(32);
    expect(storedProducts[0].name).toBe('Test Product');
    expect(storedProducts[0].barcode).toBe(1234567890);
  });

  it('edits existing product when "save" button is clicked', () => {
    localStorage.setItem(
      'products',
      JSON.stringify([
        {
          imageURL: '',
          name: 'Test Product',
          type: '',
          size: 0,
          barcode: '1234567890',
          manufacturer: '',
          brand: '',
          description: '',
          price: 0,
          careType: [''],
        },
      ])
    );

    render(
      <Provider store={store}>
        <AdminPanel />
      </Provider>
    );

    const editButton = screen.getAllByTestId('edit-btn')[0];
    fireEvent.click(editButton);

    const nameInput = screen.getAllByLabelText(/Название/i)[0];
    const barcodeInput = screen.getAllByLabelText(/Штрихкод/i)[0];

    fireEvent.change(nameInput, { target: { value: 'Updated Product' } });
    fireEvent.change(barcodeInput, { target: { value: '987654321' } });

    const saveButton = screen.getAllByTestId('create')[0];
    fireEvent.click(saveButton);

    const updatedProduct = screen.getByText(/Updated Product/i);
    expect(updatedProduct).toBeInTheDocument();

    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    expect(storedProducts.length).toBe(33);
    expect(storedProducts[0].name).toBe('Updated Product');
    expect(storedProducts[0].barcode).toBe(987654321);
  });
});
