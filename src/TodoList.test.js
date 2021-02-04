import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import TodoList from './TodoList';

describe('<TodoList />', () => {
  const sampleTodos = [
    {
      id: 1,
      text: 'TDD 배우기',
      done: true,
    },
    {
      id: 2,
      text: 'TDD 배우기2',
      done: false,
    }
  ];

  it('renders todos properly', () => {
    const { getByText } = render(<TodoList todos={sampleTodos} />);
    getByText(sampleTodos[0].text);
    getByText(sampleTodos[1].text);
  });

  it('calls onToggle and onRemove', () => {
    const onToggle = jest.fn();
    const onRemove = jest.fn();
    const { getByText, getAllByText } = render(
      <TodoList todos={sampleTodos} onToggle={onToggle} onRemove={onRemove} />
    );
    fireEvent.click(getByText(sampleTodos[0].text));
    expect(onToggle).toHaveBeenCalledWith(sampleTodos[0].id);

    fireEvent.click(getAllByText('삭제')[0]);
    expect(onRemove).toHaveBeenCalledWith(sampleTodos[0].id);

  });

});