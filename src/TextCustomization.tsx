import React from "react";
import { useState } from "react";
import "./TextCustomization.css";

const TextCustomization = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [fontSize, setFontSize] = useState(""); // State to store font size
  const [textColor, setTextColor] = useState("#000000"); // State to store text color
  const [fontFamily, setFontFamily] = useState("Arial"); // State to store font family
  const [selectedColor, setSelectedColor] = useState("");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const applySettings = () => {
    // Apply the selected settings to the text in the QuestionCard or selected box
    // For example, you can pass these settings as props to the QuestionCard component
    // Or use a state management library to share these settings across components
    console.log(`Font Size: ${fontSize}`);
    console.log(`Text Color: ${textColor}`);
    console.log(`Font Family: ${fontFamily}`);
    // You can apply these settings directly where needed instead of logging
    // For instance, update the styles of the QuestionCard or selected text box
  };

  const applyFormatting = (style: string) => {
    // Apply text formatting (bold, italic, underline, subscript, superscript)
    document.execCommand(style);
  };

  const optionStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "5px 10px",
    borderBottom: "1px solid #ccc",
  };

  const expandedOptionsStyle = {
    display: "block",
    padding: "10px",
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
    <>
      <div className="text-customization">
        <div
          className="text-customization-header"
          onClick={toggleExpand}
          style={optionStyle}
        >
          Text Customization
          <label className="symbol">{isExpanded ? "^" : ">"}</label>
        </div>
        {isExpanded && (
          <div
            className="text-customization-options"
            style={expandedOptionsStyle}
          >
            <div className="panel-text" id="text-heading">
              <label>
                Text:
                <div className="text-box" id="font-family">
                  <select
                    value={fontFamily}
                    onChange={(e) => {
                      setFontFamily(e.target.value);
                      applySettings();
                    }}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Times New Roman">Times New Roman</option>
                    {/* Add more font options as needed */}
                  </select>
                </div>
              </label>
            </div>
            <div className="text-box" id="size-formatting">
              <div id='formatting'>
              <select
                onChange={(e) => {
                  applyFormatting(e.target.value);
                  applySettings();
                }}
              >
                <option
                  value="Bold"
                  className="Formating-Buttons"
                  id="bold"
                  onClick={() => applyFormatting("bold")}
                >
                  Bold
                </option>
                <option
                  value="Italic"
                  className="Formating-Buttons"
                  id="italic"
                  onClick={() => applyFormatting("italic")}
                >
                  Italic
                </option>
                <option
                  value="underline"
                  className="Formating-Buttons"
                  id="underline"
                  onClick={() => applyFormatting("underline")}
                >
                  Underline
                </option>
                {/* Add more font options as needed */}
              </select>
              
              <input id="size"
                type="number"
                value={fontSize}
                onChange={(e) => {
                  setFontSize(e.target.value);
                  applySettings();
                }}
              />
              </div>
            </div>
            
            <div className="SelectPalette">
              Select Palette:<br></br>
              <div
                className="color-options"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {colorPalette.map((color, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: color,
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "1px solid #000",
                      margin: "5px",
                    }}
                    onClick={() => {
                      setSelectedColor(color === selectedColor ? "" : color);
                      setTextColor(color);
                      applySettings();
                    }}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TextCustomization;
