import React, { useState } from 'react';

const MyForm = () => {
  const [input1Value, setInput1Value] = useState('');
  const [input2Value, setInput2Value] = useState('');

  const handleInput1Change = (event) => {
    setInput1Value(event.target.value);
  };

  const handleInput2Change = (event) => {
    setInput2Value(event.target.value);
  };

  const handleSubmit = () => {
    // Add your logic for handling the form submission here
    console.log('Input 1:', input1Value);
    console.log('Input 2:', input2Value);
  };

  return (
    <div>
      <label>
        Label 1:
        <input type="text" value={input1Value} onChange={handleInput1Change} />
      </label>
      <br />
      <label>
        Label 2:
        <input type="text" value={input2Value} onChange={handleInput2Change} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MyForm;
