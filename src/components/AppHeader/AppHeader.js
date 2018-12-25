import React from 'react';
import './AppHeader.css';

const AppHeader = ({toDo = 3, done = 0}) => {
  return (
    <header className="app-header">
      <h3>Hey, don`t give up!</h3>
      <h4>You just have to do a couple of things.</h4>
      <p>{toDo} more to do, {done} done</p>
    </header>
  )
};

export default AppHeader;