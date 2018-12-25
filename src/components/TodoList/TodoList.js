import React from 'react';
import TodoListItem from '../TodoListItem';
import './TodoList.css';

const TooList = ({
                   dataList, onDeleted,
                   onToggleDone,
                   onToggleImportant
                 }) => {

  const els = dataList.map((el) => {
    const { id, ...elProps } = el;
    return (
      <li key={ id } className="list-group-item">
        <TodoListItem
          { ...elProps }
          onDeleted={ () => onDeleted(id) }
          onToggleImportant={ () => onToggleImportant(id) }
          onToggleDone={ () => onToggleDone(id) }/>
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { els }
    </ul>
  )
};

export default TooList;