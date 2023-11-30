import React from 'react';
import { useState, ChangeEvent } from "react";
import "./BackgroundCustomization.css";

type Color = string; // Define a type for Color

const BackgroundCustomization = () => {
  const [selectedOption, setSelectedOption] = useState<string>("solid");
  const [selectedColor, setSelectedColor] = useState<Color>("#ffffff");
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // Define a type for selected image
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleColorChange = (color: Color) => {
    setSelectedColor(color);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageFile = files[0];
      setSelectedImage(imageFile);
    } else {
      setSelectedImage(null); // Set selected image to null if no file is selected
    }
  };
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };



  const colorPalette = [
    "#ff1493",
    "#00ffff",
    "#008000",
    "#800080",
    "#ffa500",
    "#ff6347",
    "#ffd700",
    "#008080",
    "#b0e0e6",
    // Add more colors as needed
  ];

   return (
    <div className="BackgroundCustomization">
      <div 
        className="Background-customization-header"
        onClick={toggleExpand}
      >
        Background Customization
        <div className='symbol'>
        <label >{isExpanded ? "^" : ">"}</label>
        </div>
      </div>
      {isExpanded && (
        <div className="Background-customization-options">
          <h5 margin>Background Type:</h5>
          <div className="Background-Options">
            <label className='BackgroundOptions'>
              <input
                type="radio"
                value="image"
                checked={selectedOption === 'image'}
                onChange={() => handleOptionChange('image')}
              />
              <span style={{margin:'5px'}}>Image Background</span>
            </label>
            <span style={{margin:'50px'}}></span>
            <label className='BackgroundOptions'>
              <input
                type="radio"
                value="color"
                checked={selectedOption === 'color'}
                onChange={() => handleOptionChange('color')}
              />
              <span style={{margin:'5px'}}>Color Background</span>
            </label>
          </div>
          {isExpanded && selectedOption === 'image' && (
            <div className="additional-options">
              <div className="image-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    // Handle image change logic
                  }}
                />
                {/* You can add additional image preview or handling logic here */}
              </div>
            </div>
          )}
          <div className="SelectPalette">
            Select Palette:<br></br>
            <div className="color-options" style={{ display: 'flex', flexWrap: 'wrap' }}>
              {colorPalette.map((color, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: color,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    border: '1px solid #000',
                    margin: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleColorChange(color)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BackgroundCustomization;
