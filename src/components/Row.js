import React from 'react';

function Row({change}) {
    return (
      <tr>
        <td>{change.when}</td>
        <td>{change.who}</td>
        <td>{change.description}</td>
      </tr>
    );
  }
  
  export default Row;