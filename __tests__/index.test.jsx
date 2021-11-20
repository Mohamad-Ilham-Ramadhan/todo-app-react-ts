import React from 'react';
import '@testing-library/jest-dom';
import { screen, render, fireEvent, getAllByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Home from '../pages/index';
import InputBar from '../components/InputBar';

beforeEach(() => {
  render(<Provider store={store}><Home /></Provider>);
});
// afterEach(() => {
//   const deletes = screen.queryAllByRole('deletion');
//   for (let index = 0; index < deletes.length; index++) {
//     userEvent.click(deletes[index]);
//   }
// });
describe('Todo List', () => {
  test('add a todo and see in list', async () => {
    const title = 'ilham ganteng';
    userEvent.type(screen.getByRole('textbox'), title);
    fireEvent.submit(screen.getByRole('my-form'));
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByText(title)).toBeInTheDocument();
    const deletes = screen.queryAllByRole('deletion');
    for (let index = 0; index < deletes.length; index++) {
      userEvent.click(deletes[index]);
    }
  });

  test('remove a todo', async () => {
    userEvent.type(screen.getByRole('textbox'), 'ilham ganteng');
    fireEvent.submit(screen.getByRole('my-form'));
    userEvent.click(screen.getByRole('deletion'));
    expect(screen.queryByText('ilham ganteng')).not.toBeInTheDocument();
  });

  test('add completed todo', async () => {
    userEvent.click(screen.getByTestId('btn-check-input-bar'));
    const title = 'Udah belajar testing';
    userEvent.type(screen.getByRole('textbox'), title);
    fireEvent.submit(screen.getByRole('my-form'));
    expect(screen.getByText(title)).toHaveClass('line-through');
    const deletes = screen.queryAllByRole('deletion');
    for (let index = 0; index < deletes.length; index++) {
      userEvent.click(deletes[index]);
    }
  });

  test('label items left: nothing todo zzz', async () => {
    screen.getByText('nothing todo zzz');
  });

  test('label items left: 3 items left after add 3 todo', async () => {
    const titles = ['todo 1', 'todo 2', 'todo 3'];
    titles.forEach( title => {
      userEvent.type(screen.getByRole('textbox'), title);
      fireEvent.submit(screen.getByRole('my-form'));  
    });
    expect(screen.getByText('3 items left'));
    const deletes = screen.queryAllByRole('deletion');
    for (let index = 0; index < deletes.length; index++) {
      userEvent.click(deletes[index]);
    }
  });

  test('clear completed', async () => {
    const titles = ['todo 1', 'todo 2'];
    titles.forEach( title => {
      userEvent.click(screen.getByTestId('btn-check-input-bar'));
      userEvent.type(screen.getByRole('textbox'), title);
      fireEvent.submit(screen.getByRole('my-form'));  
    });
    userEvent.type(screen.getByRole('textbox'), 'not completed todo');
    fireEvent.submit(screen.getByRole('my-form'));  
    userEvent.click(screen.getByText('Clear Completed'));
    screen.getByText('not completed todo');
    const deletes = screen.queryAllByRole('deletion');
    for (let index = 0; index < deletes.length; index++) {
      userEvent.click(deletes[index]);
    }
  });

  test('filter only active todos', async () => {
    const titles = ['active todo 1', 'active todo 2'];
    titles.forEach( title => {
      userEvent.type(screen.getByRole('textbox'), title);
      fireEvent.submit(screen.getByRole('my-form'));  
    });
    userEvent.click(screen.getByTestId('btn-check-input-bar'));
    userEvent.type(screen.getByRole('textbox'), 'completed todo');
    fireEvent.submit(screen.getByRole('my-form'));  
    userEvent.click(screen.queryAllByText('Active')[0]);
    screen.getByText('active todo 1');
    screen.getByText('active todo 2');
    expect(screen.queryByText('completed todo')).not.toBeInTheDocument();
    const deletes = screen.queryAllByRole('deletion');
    for (let index = 0; index < deletes.length; index++) {
      userEvent.click(deletes[index]);
    }
  });

  test('filter only completed todos', async() => {
    const titles = ['completed todo 1', 'completed todo 2'];
    titles.forEach( title => {
      userEvent.click(screen.getByTestId('btn-check-input-bar'));
      userEvent.type(screen.getByRole('textbox'), title);
      fireEvent.submit(screen.getByRole('my-form'));  
    });
    userEvent.type(screen.getByRole('textbox'), 'active todo');
    fireEvent.submit(screen.getByRole('my-form'));  
    userEvent.click(screen.queryAllByText('Completed')[0]);
    screen.getByText('completed todo 1');
    screen.getByText('completed todo 2');
    expect(screen.queryByText('active todo')).not.toBeInTheDocument();
  });

  test('filter all todos', async() => {
    userEvent.click(screen.queryAllByText('All')[0]);
    screen.getByText('completed todo 1');
    screen.getByText('completed todo 2');
    screen.getByText('active todo');
    const deletes = screen.queryAllByRole('deletion');
    for (let index = 0; index < deletes.length; index++) {
      userEvent.click(deletes[index]);
    }
  });

  test('switch theme light/dark', async () => {
    // light theme initial load
    expect(document.body).not.toHaveClass('dark');
    // switch to dark theme
    userEvent.click(screen.getByTestId('btn-switch-theme'));
    expect(document.body).toHaveClass('dark');
  });
});