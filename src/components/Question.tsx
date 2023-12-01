"use client";
import React, { useState } from "react";

function QuestionComponent({
  onDelete,
  onBackgroundChange,
  backgroundColor,
  ...props
}) {
  const [questionType, setQuestionType] = useState("Multiple Choice");

  const [options, setOptions] = useState(["option 1", "option 1"]);

  const [shortAnswer, setShortAnswer] = useState("");
  const [showBackgroundOptions, setShowBackgroundOptions] = useState(false);
  const [backgroundType, setBackgroundType] = useState("Color");
  const [selectedColor, setSelectedColor] = useState("#FFFFFF"); // Default color

  // Function to handle color selection
  React.useEffect(() => {
    onBackgroundChange(backgroundColor);
  }, [backgroundColor]);
  const backgroundTypes = ["Color", "Image", "Video"]; // The types of backgrounds available

  // Function to handle file selection
  const handleFileSelect = (event) => {
    // Handle the file upload process here
    const file = event.target.files[0];
    // For example, to change the page background to this image:
    const reader = new FileReader();
    reader.onload = function (e) {
      onBackgroundChange(e.target.result); // Set the image as the background
    };
    reader.readAsDataURL(file);
  };

  const handleOptionChange = (index, event) => {
    const newOptions = options.map((option, i) =>
      i === index ? event.target.value : option
    );
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleDeleteOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  // Toggle the display of the background options popup
  const toggleBackgroundOptions = () => {
    setShowBackgroundOptions(!showBackgroundOptions);
  };

  // Set the selected color from the color picker
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onBackgroundChange(color);
    // You would also handle setting the actual background here
  };

  // Render the color picker popup
  const renderColorPicker = () => {
    const colors = [
      "#FFC0CB",
      "#FFA07A",
      "#20B2AA",
      "#87CEFA",
      "#778899",
      "#f744d2",
      "#c1f083",
      "#92ed66",
      "#c496dc",
      "#ecb1c8",
      "#b08635",
      "#8aebee",
      "#3cb0b8",
      "#314148",
      "#2bedc7",
      "#36e680",
      "#6e698b",
      "#c4266f",
      "#7c61f0",
      "#61f2f1",
      "#f181a3",
      "#e359d1",
      "#7f92fa",
      "#7df185",
      "#e9043e"
    ];
    
    return (
      <div style={styles.colorPicker}>
        {colors.map((color) => (
          <div
            key={color}
            style={{ ...styles.colorSwatch, backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={styles.questionContainer}>
      <div style={styles.questionTopBar}>
        <input
          type="text"
          placeholder="this is the question"
          style={styles.questionInput}
        />
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          style={styles.dropdown}
        >
          <option value="Multiple Choice">Multiple Choice</option>
          <option value="Simple Question">Simple Question</option>
        </select>
      </div>

      {questionType === "Simple Question" && (
        // Render a simple text input for the short answer
        <div style={styles.simpleQuestionContainer}>
          <input
            type="text"
            value={shortAnswer}
            onChange={(e) => setShortAnswer(e.target.value)}
            placeholder="Answer"
            style={styles.simpleQuestionInput}
          />
        </div>
      )}
      {questionType === "Multiple Choice" && (
        // Render a simple text input for the short answer
        <div style={styles.choice}>
          {options.map((option, index) => (
            <div key={index} style={styles.optionContainer}>
              <input
                type="radio"
                id={`option-${index}`}
                name="question"
                style={styles.radioInput}
                // This input is read-only as it's just for display purposes.
                // Implement onChange to make it interactive if necessary
                readOnly
              />
              <label htmlFor={`option-${index}`} style={styles.optionLabel}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  style={styles.optionTextInput}
                  placeholder={`option ${index + 1}`}
                />
              </label>
              <button
                onClick={() => handleDeleteOption(index)}
                style={styles.deleteOptionButton}
              >
                Delete
              </button>
            </div>
          ))}
          <div style={styles.addOption} onClick={handleAddOption}>
            Add another
          </div>
        </div>
      )}

      <div style={styles.actionButtons}>
        <button
          onClick={toggleBackgroundOptions}
          style={styles.backgroundButton}
        >
          <div
            style={{ ...styles.blueSquare, backgroundColor: selectedColor }}
          ></div>
          Background
        </button>
        {showBackgroundOptions && (
          <div style={styles.backgroundOptions}>
            <select
              value={backgroundType}
              onChange={(e) => setBackgroundType(e.target.value)}
              style={styles.backgroundTypeDropdown}
            >
              {backgroundTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {backgroundType === "Color" && renderColorPicker()}
            {backgroundType === "Image" && (
              <div style={styles.uploadContainer}>
                <div style={styles.uploadBox}>
                  <div style={styles.uploadIcon}></div>
                  <div style={styles.uploadText}>
                    Upload File
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                  </div>
                  <button
                    style={styles.browseButton}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Browse Files
                  </button>
                  <input
                    id="fileInput"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        <button onClick={onDelete} style={styles.deleteButton}>
          Delete
        </button>
      </div>
    </div>
  );
}

const styles = {
  uploadBox: {
    border: "2px dashed #ccc",
    borderRadius: "10px",
    textAlign: "center",
    color: "#000",
    width: "200px",
    padding: "20px",
    // ... additional styles for the upload box
  },
  questionContainer: {
    width: "768px",
    maxHeight:'348px',
    padding: "32px 40px 32px 40px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "24px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  questionTopBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  questionInput: {
    flexGrow: 1,
    border: "1px solid #dcdcdc",
    borderRadius: "4px",
    color: "#000",
    padding: "10px",
    fontSize: "20px",
  },
  dropdown: {
    marginLeft: "8px",
    border: "1px solid #dcdcdc",
    borderRadius: "10px",
    padding: "5px 20px",
    fontSize: "16px",
    cursor: "pointer",
    color: "#000",
    width: "30%",
  },
  deleteOptionButton: {
    padding: "2px 6px",
    color: "Red",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  optionContainer: {
    display: "flex",
    alignItems: "center",
  },
  radioInput: {
    marginRight: "12px",
  },
  optionLabel: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    color: "#000",
  },
  optionTextInput: {
    borderBottom: "1px solid #dcdcdc",
    borderRadius: "4px",
    padding: "10px",
    fontSize: "16px",
    width: "50%",
    color: "#000",
  },
  addOption: {
    color: "#0070f3",
    cursor: "pointer",
    fontSize: "16px",
    alignSelf: "start",
  },
  actionButtons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "12px",
    gap: "10px",
  },
  backgroundButton: {
    padding: "5px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    color: "#0070f3",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  blueSquare: {
    width: "16px", // Adjust size as needed
    height: "16px", // Adjust size as needed
    backgroundColor: "#007BFF", // The blue color as per your design
    borderRadius: "4px", // Adjust for desired curvature
    marginRight: "8px", // Space between the square and the text
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  deleteButton: {
    padding: "5px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    color: "#FF6347",
    backgroundColor: "transparent",
  },
  simpleQuestionInput: {
    // Styles for the short answer input field
    width: "100%", // Take full width
    padding: "10px",
    margin: "10px 0", // Add some margin at the top and bottom
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  choice: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "24px",
    maxHeight:'250px',
    overflow:'auto'
  },
  backgroundOptions: {
    position: "absolute",
    top:'100%',
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    zIndex: 1000, // Make sure it's above other elements
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  colorPicker: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)", // Adjust based on the number of columns you want
    gap: "10px",
    color: "#000",
    width: "200px",
  },
  colorSwatch: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  backgroundTypeDropdown: {
    marginBottom: "30px",
    color: "#000",
    width: "100%",
    fontSize: "16px",
    // ... additional dropdown styles
  },
  browseButton: {
    padding: "5px 20px",
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "5px",
  },
};

export default QuestionComponent;
