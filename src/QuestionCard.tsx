import React from 'react';
import { useState, ChangeEvent, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon from react-icons/fa
import {MdAdd} from 'react-icons/md';

// QuestionCard component
function QuestionCard({properties}) {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['']);


  // Function to handle question title change
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // Function to add a new option
  const handleAddOption = () => {
    const newOptions = [...options, ''];
    setOptions(newOptions);
  };

  // Function to handle option change
  const handleOptionChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const updatedOptions = [...options];
    updatedOptions[index] = event.target.value;
    setOptions(updatedOptions);
  };

  // Function to delete an option
  const handleDeleteOption = (index: number) => {
    const filteredOptions = options.filter((_, idx) => idx !== index);
    setOptions(filteredOptions);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center full" style={properties.background}>
      <div className="card mt-3" style={{ width: '800px', marginBottom: '50px', background: 'transparent', border: '2px solid grey' }}>
        <div className="rounded-top"></div>
        <div className="card-body">
          {/* Question title */}
          <h1 className="card-title">
            <input
              type="text"
              className="form-control h1-input" // Class for h1-styled text
              placeholder="Enter your question here"
              value={title}
              style={properties.heading}
              onChange={handleTitleChange}
            />
          </h1>
          {/* Options */}
          <div className="options">
            {
              options.map((option, index) => {
                return (
                    <div key={index} className="row mb-2">
                      <div className="col-sm-20">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control option-input"
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(event) => handleOptionChange(index, event)}
                            style={properties.options}
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-danger delete-btn"
                              style={{ marginLeft: '10px', backgroundColor: '#ff5a5f', border: 'none' }}
                              onClick={() => handleDeleteOption(index)}
                            >
                              <FaTrash color="#fff" /> {/* Use the trash icon */}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              })
            }
          </div>
          {/* Button to add new option */}
          <div className="d-flex align-items-center justify-content-start mt-3">
            <button
              className="btn btn-primary mx-2"
              onClick={handleAddOption}
            >
              Add Option
            </button>
            <button
              className="btn btn-primary mx-2 d-flex align-items-center"
              onClick={handleAddOption}
            >
              <MdAdd />
              New Question
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}








export default QuestionCard;
