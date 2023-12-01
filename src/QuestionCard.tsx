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
    <div className="question-container" style={properties.heading}>
      Question
    </div>
  );
}

export default QuestionCard;
