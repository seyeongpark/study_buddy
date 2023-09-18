import React, { useState, useEffect } from 'react';
import LinkList from './components/LinkList';
import DateCounter from './components/DateCounter';
import Goals from './components/Goals';

function App() {
  return (
    <div className="App">
      {/* <LinkList/> */}
      {/* <DateCounter/> */}
      <Goals/>
    </div>
  );
}

export default App;
