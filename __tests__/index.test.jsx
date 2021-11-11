import React from 'react';
import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Home from '../pages/index';



describe('Todo List', () => {
  test('add a todo and see in list', async () => {
    render(<Provider store={store}><Home /></Provider>);
    const title = 'ilham ganteng';
    userEvent.type(screen.getByRole('textbox'), title);
    fireEvent.submit(screen.getByRole('my-form'));
    expect(screen.getByRole('textbox')).toHaveValue('');
    screen.getByText(title);
  });
});