import React from "react";
import { useState } from "react";
import "./TextCustomization.css";
import {
  MdChevronRight, 
  MdHorizontalDistribute, 
  MdVerticalDistribute, 
  MdTextFields, 
  MdFormatAlignCenter, 
  MdFormatAlignRight,
  MdFormatAlignLeft, 
  MdFormatAlignJustify, 
  MdSpaceBar} from 'react-icons/md';
import Select from "./components/Select";


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

  React.useEffect(() => {
  }, []);

  return (
    <>
      <div className={`text-customization ${isExpanded ? "expanded" : ""}`}>
        <div
          className="text-customization-header"
          onClick={toggleExpand}
        >
          Question Header
          <MdChevronRight/>
        </div>
        <div
          className="text-customization-options">
          <div>
            <div className="panel-items">
              <div className="panel-heading">
                  Text
              </div>
              <div className="item">
                <Select options={[
                  {
                    label: "Arial",
                    value: "arial"
                  },
                  {
                    label: "Times New Roman",
                    value: "times"
                  }
                ]}/>
              </div>
              <div className="item item-combined w-70-30">
                <Select options={[
                  {
                    label: "Bold",
                    value: "bold"
                  },
                  {
                    label: "Italic",
                    value: "italic"
                  },
                  {
                    label: "Underline",
                    value: "underline"
                  }
                ]}/>
                <div className="input-combined child">
                  <div className="label left"><MdTextFields/></div>
                  <input type="number"/>
                </div>
              </div>
              <div className="item item-combined">
                <div className="child btn">
                  <div>
                    <MdFormatAlignLeft />
                  </div>
                </div>
                <div className="child btn active">
                  <div>
                    <MdFormatAlignCenter />
                  </div>
                </div>
                <div className="child btn">
                  <div>
                    <MdFormatAlignRight />
                  </div>
                </div>
                <div className="child btn">
                  <div>
                    <MdFormatAlignJustify />
                  </div>
                </div>
              </div>
              <div className="panel-heading">
                Text Color
              </div>
              <div className="item">
                <div className="color-box">
                  <input type="color" />
                  <input type="text"/>
                </div>
              </div>
              <div className="panel-heading">
                Background Color
              </div>
              <div className="item">
                <div className="color-box">
                  <input type="color" />
                  <input type="text"/>
                </div>
              </div>
              <div className="panel-heading">
                Border
              </div>
              <div class="item item-combined w-70-30">
                <Select options={[
                  {
                    label: "Solid",
                    value: "solid"
                  },
                  {
                    label: "Dotted",
                    value: "dotted"
                  },
                  {
                    label: "Dashed",
                    value: "dashed"
                  },
                ]} />
                <div className="input-combined child">
                  <input type="number" />
                  <div className="label small">px</div>
                </div>
              </div>
              <div className="panel-heading">
                Margins
              </div>
              <div className="item">
                <div className="margin-container">
                  <div className="b1">
                    <div className="icons-horizontal">
                      <div className="icon">
                        <MdHorizontalDistribute />
                      </div>
                      <div className="icon">
                        <MdHorizontalDistribute />
                      </div>
                    </div>
                    <div className="icons-vertical">
                      <div className="icon">
                        <MdVerticalDistribute />
                      </div>
                      <div className="icon">
                        <MdVerticalDistribute />
                      </div>
                    </div>
                    <div className="input-combined top">
                      <input type="number"/>
                      <div className="label right">
                        px
                      </div>
                    </div>
                    <div className="input-combined right">
                      <input type="number"/>
                      <div className="label right">
                        px
                      </div>
                    </div>
                    <div className="input-combined bottom">
                      <input type="number"/>
                      <div className="label right">
                        px
                      </div>
                    </div>
                    <div className="input-combined left">
                      <input type="number"/>
                      <div className="label right">
                        px
                      </div>
                    </div>
                  </div>
                  <div className="b2">
                    <div className="icons-horizontal">
                      <div className="icon">
                        <MdHorizontalDistribute />
                      </div>
                      <div className="icon">
                        <MdHorizontalDistribute />
                      </div>
                    </div>
                    <div className="icons-vertical">
                      <div className="icon">
                        <MdVerticalDistribute />
                      </div>
                      <div className="icon">
                        <MdVerticalDistribute />
                      </div>
                    </div>
                  </div>
                  <div className="b3"></div>
                </div>
              </div>
              <div className="panel-heading">
                Paddings
              </div>
              <div className="item">
                <div className="padding-container">
                  <div className="b1">
                    <div className="icons-horizontal">
                      <div className="icon">
                        <MdHorizontalDistribute />
                      </div>
                      <div className="icon">
                        <MdHorizontalDistribute />
                      </div>
                    </div>
                    <div className="icons-vertical">
                      <div className="icon">
                        <MdVerticalDistribute />
                      </div>
                      <div className="icon">
                        <MdVerticalDistribute />
                      </div>
                    </div>
                    <div className="input-combined top">
                      <input type="number"/>
                      <div className="label right">
                        px
                      </div>
                    </div>
                    <div className="input-combined right">
                      <input type="number" />
                      <div className="label right">
                        px
                      </div>
                    </div>
                    <div className="input-combined bottom">
                      <input type="number" />
                      <div className="label right">
                        px
                      </div>
                    </div>
                    <div className="input-combined left">
                      <input type="number"/>
                      <div className="label right">
                        px
                      </div>
                    </div>
                  </div>
                  <div className="b2">
                    <div className="icons-horizontal">
                      <div className="icon">
                        <MdHorizontalDistribute />
                      </div>
                      <div className="icon">
                        <MdHorizontalDistribute />
                      </div>
                    </div>
                    <div className="icons-vertical">
                      <div className="icon">
                        <MdVerticalDistribute />
                      </div>
                      <div className="icon">
                        <MdVerticalDistribute />
                      </div>
                    </div>
                  </div>
                  <div className="b3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextCustomization;
