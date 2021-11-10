import React from 'react';
import '@testing-library/jest-dom';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Home from '../pages/index';



describe('Todo List', () => {
  test('add a todo and see in list', async () => {
    render(<Provider store={store}><Home /></Provider>);
    userEvent.type(screen.getByRole('textbox'), 'ilham ganteng');
    userEvent.keyboard('{Enter}');

    expect(screen.getByRole('textbox')).toHaveValue('');
    screen.getByText('ilham ganteng');
  });
});