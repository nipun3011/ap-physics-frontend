import React from 'react';

function MyComponent() {
  const text = "This is a very long string that will not wrap and should have an ellipsis.";

  return (
    <div className="no-wrap" title={text} style={{ width: '200px', height: '30px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
      {text}
    </div>
  );
}

export default MyComponent;