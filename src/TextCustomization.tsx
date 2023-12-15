import React from "react";
import { useState, useEffect } from "react";
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
  MdPalette,
  MdImage,
  MdOutlineUploadFile,
  MdClose,
  MdHorizontalRule,
  MdRoundedCorner,
  MdBlock,
  MdGirl,
  MdOpacity} from 'react-icons/md';
import type { PropertyUpdate, PropertyRemove } from "./redux/question";
import { updateProperty, addProperty, removeProperty } from "./redux/question";
import type { SharedPropertyRemove, SharedPropertyUpdate } from "./redux/shared";
import { useAppDispatch } from "./redux/hooks";
import type { Question } from "./redux/question";
import Select from "./components/Select";
import ToggleBtn from "./components/ToggleBtn";
import { PayloadAction } from "@reduxjs/toolkit";
import { sendRequest } from "./helpers/request";
import { addFile, removeFile } from "./redux/files";
import type { File } from "./redux/files";
import Urls from "./links";

type SelectDropDownProps = {
  propertyName: string,
  value: string,
  updateProperty(property: string, value: string): void,
  options: string[],
  process: boolean
}

const SelectDropDown = ({propertyName, value, updateProperty, options, process=true}: SelectDropDownProps) => {
  let processedOptions = options;
  if(process) {
    processedOptions = options.map(option => {
      return {
        label: option,
        value: option
      }
    })
  }
  return (
      <div className="item">
        <Select options={processedOptions} value={value}
        onChange={option => updateProperty(propertyName, option.value)}/>
      </div>
  )
}

const FontStyleSize = ({value, updateProperty}) => {
  return (
    <div className="item item-combined w-70-30">
      <Select options={[
        {
          label: "Italic",
          value: "italic"
        },
        {
          label: "Normal",
          value: "normal"
        }
      ]} value={value[0]}
      onChange={option => updateProperty("fontStyle", option.value)}/>
      <div className="input-combined child">
        <div className="label left"><MdTextFields/></div>
        <input type="number" value={value[1]} onChange={e => updateProperty("fontSize", parseInt(e.target.value))}/>
      </div>
    </div>
  )
}

const Buttons = ({propertyName, value, updateProperty, options}) => {
  return (
    <div className="item item-combined">
      {
        options.map((option, index) => {
          return (
            <div className={`child btn ${option.value == value ? 'active' : ''}`} key={index}
              onClick={() => updateProperty(propertyName, option.value)}>
              <div>
                {option.icon()}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

const PanelHeading = ({heading}) => {
  return (
    <div className="panel-heading">
          {heading}
    </div>
  )
}

const ColorBox = ({propertyName, value, updateProperty}) => {
  return (
    <div className="item">
      <div className="hidden" id="colorCheck"></div>
      <div className="color-box">
        <input type="color" value={value} onChange={e => updateProperty(propertyName, e.target.value)}/>
        <input type="text" value={value} onChange={e => updateProperty(propertyName, e.target.value)}/>
      </div>
    </div>
  )
}

const BorderStyleWidth = ({value, updateProperty, options, process}) => {

  let processedOptions = options;
  if(process) {
    processedOptions = options.map(option => {
      return {
        label: option,
        value: option
      }
    })
  }
  return (
    <div className="item item-combined w-60-40">
      <Select options={processedOptions} value={value[0]}
        onChange={t => updateProperty("borderStyle", t.value)}/>
      <div className="input-combined child">
        <div className="label small left">
          <MdHorizontalRule />
        </div>
        <input type="number" value={value[1]} onChange={e => updateProperty("borderWidth", parseInt(e.target.value))}/>
        <div className="label small right">px</div>
      </div>
    </div>
  )
}

type InputFieldProps = {
  propertyName: string,
  value: string | number,
  type: string,
  updateProperty(property: string, value: string | number):void,
  icon():React.ReactNode,
  unit: string | null,
  formatter(value: string):string | number,
  parser(value: string | number): string | number
}

const InputField = ({propertyName, value, type, updateProperty, icon, unit, formatter, parser} : InputFieldProps) => {
  return (
    <div className="item">
      <div className="input-combined">
        {
          icon ? 
          <div className="label left">
            {icon()}
          </div> :
          <></>
        }
        <input type={type} value={parser ? parser(value) : value} onChange={e => updateProperty(propertyName, formatter ? formatter(e.target.value) : e.target.value)}/>
        {
          unit ? 
          <div className="label small right">{unit}</div> :
          <></>
        }
      </div>
    </div>
  )
}

const Margin = ({propertyName, value, updateProperty, formatter}) => {
  let changeMargin = (propName, value) => {
    if(value) {
      let val = parseFloat(value);
      updateProperty(propName, val);
    } else {
      updateProperty(propName, 0);
    }
  }

  return (
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
            <input type="number" value={value[0]} onChange={e => changeMargin("marginTop", e.target.value)}/>
            <div className="label right">
              px
            </div>
          </div>
          <div className="input-combined right">
            <input type="number" value={value[1]} onChange={e => changeMargin("marginRight", e.target.value)}/>
            <div className="label right">
              px
            </div>
          </div>
          <div className="input-combined bottom">
            <input type="number" value={value[2]} onChange={e => changeMargin("marginBottom", e.target.value)}/>
            <div className="label right">
              px
            </div>
          </div>
          <div className="input-combined left">
            <input type="number" value={value[3]} onChange={e => changeMargin("marginLeft", e.target.value)}/>
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
  )
}

const FileUpload = ({mainSection, questionId, propertySection, propertyName, value, updateProperty, accept, dispatch}) => {

  let selectFile = () => {
    document.getElementById(`fileInput-${propertySection}`)?.click();
  }

  let readFile = async (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    let blobUrl = URL.createObjectURL(file);
    let newFile = {
      id: "",
      url: blobUrl,
      fileName: file.name,
      mainSection: mainSection,
      propertySection: propertySection,
      property: propertyName,
      questionIndex: questionId,
      state: "added",
    } as File;
    dispatch(addFile(newFile));
    updateProperty(propertyName, `url(${blobUrl})`)
  }

  let clearImage = async () => {
    let urlParts = value.split("/");
    let fileName = urlParts[urlParts.length - 1].replace(")", "");
    let fileToRemove = {
      id: "",
      fileName: fileName,
      url: value,
      mainSection: mainSection,
      property: propertyName,
      propertySection: propertySection,
      questionIndex: questionId,
      state: "removed",
    } as File;
    dispatch(removeFile(fileToRemove));
    updateProperty(propertyName, "");
  };

  return (
    <div className="item">
      <div className="file-upload">
        {
          value ? 
          <div className="preview">
            <div className="close" onClick={clearImage}>
              <MdClose/>
            </div>
            <img src={value?.replace("url(", "").replace(")", "")} />
          </div> : 
          <></>
        }
        <input type="file" hidden id={`fileInput-${propertySection}`} onChange={e => readFile(e)} accept={accept}/>
        <div className="upload-btn"  onClick={selectFile}>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <MdOutlineUploadFile /> 
            Upload Image
          </div>
        </div>
      </div>
    </div>
  )
}

const Padding = ({propertyName, value, updateProperty}) => {

  let changePadding = (propName, value) => {
    if(value) {
      let val = parseFloat(value);
      updateProperty(propName, val);
    } else {
      updateProperty(propName, 0);
    }
  }

  return (
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
            <input type="number" value={value[0]} onChange={e => changePadding("paddingTop", e.target.value)}/>
            <div className="label right">
              px
            </div>
          </div>
          <div className="input-combined right">
            <input type="number" value={value[1]} onChange={e => changePadding("paddingRight", e.target.value)}/>
            <div className="label right">
              px
            </div>
          </div>
          <div className="input-combined bottom">
            <input type="number" value={value[2]} onChange={e => changePadding("paddingBottom", e.target.value)}/>
            <div className="label right">
              px
            </div>
          </div>
          <div className="input-combined left">
            <input type="number" value={value[3]} onChange={e => changePadding("paddingLeft", e.target.value)}/>
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
  )
}

const CheckBox = ({propertyName, value, updateProperty}) => {
  return (
    <div className="item item-check">
        <label>{propertyName}</label>
      <ToggleBtn value={value} onChange={v => updateProperty(propertyName, v)} />
    </div>
  )
}

const OpacityBar = ({propertyName, value, updateProperty}) => {
  return (
    <div className="item item-combined w-60-40">
      <div className="child d-flex align-items-center justify-content-start">
        <input type="range" min='0' max='1' step={0.01} value={value} onChange={e => updateProperty(propertyName, e.target.value)}/>
      </div>
      <div className="input-combined child">
        <div className="label left">
          <MdOpacity />
        </div>
        <input type='number' min={0} max={1} step={0.01} value={value} onChange={e => updateProperty(propertyName, e.target.value)}/>
      </div>
    </div>
  )
}

type TextCustomizationProps = {
  title: string,
  mainSection: string,
  propertySection: string,
  isShared: boolean,
  sharedProperties: {},
  questions: Question[],
  questionId: number,
  updateSharedProperty(action: PayloadAction<SharedPropertyUpdate>): void,
  addSharedProperty(action: PayloadAction<SharedPropertyUpdate>): void,
  removeSharedProperty(action: PayloadAction<SharedPropertyRemove>): void,
}

const TextCustomization = ({title, mainSection, propertySection, isShared=false, sharedProperties={}, questions= [], questionId, updateSharedProperty, addSharedProperty, removeSharedProperty}: TextCustomizationProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverFlowAllowed, setIsOverFlowAllowed] = useState(false)
  let dispatch = useAppDispatch();
  let [fontFamilies, setFontFamilies] = useState([{label: "Select Font", value: "Select Font"}]);

  useEffect(() => {
    let loadFonts = async () => {
      let response = await sendRequest(Urls.getFonts.url(), Urls.getFonts.type);
      let fonts = [
        "Arial",
        "Helvetica",
        "Verdana",
        "Trebuchet MS",
        "Gill Sans",
        "Noto Sans",
        "Avantgarde",
        "Optima",
        "Arial Narrow",
        "Times",
        "Times New Roman",
        "Didot",
        "Georgia",
        "Palatino",
        "URW Palladio L",
        "Bookman",
        "URW Bookman L",
        "New Century Schoolbook",
        "TeX Gyre Schola",
        "American Typewriter",
        "Andale Mono",
        "Courier New",
        "Courier",
        "FreeMono",
        "OCR A Std",
        "DejaVu Sans Mono",
        "Comic Sans MS",
        "Comic Sans",
        "Apple Chancery",
        "Bradley Hand",
        "Brush Script MT",
        "Brush Script Std",
        "Snell Roundhand",
        "URW Chancery L",
        "Impact",
        "Luminari",
        "Chalkduster",
        "Jazz LET",
        "Blippo",
        "Stencil Std",
        "Marker Felt",
        "Trattatello",
      ]
      if(!response.error) {
        let loadedFontFamilies = response.files.map(file => file.name);
        let allFonts = [...fonts, ...loadedFontFamilies];
        allFonts = allFonts.map(font => {
          return {
            label: font,
            value: font
          }
        })
        setFontFamilies(allFonts)
      } else {
        let allFonts = fonts.map(font => {
          return {
            label: font,
            value: font
          }
        })
        setFontFamilies(allFonts)
      }
    }

    loadFonts();
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if(isExpanded) {
      setIsOverFlowAllowed(false);
    }
    else {
      setTimeout(() => {
        setIsOverFlowAllowed(true);
      }, 300)
    }
  };
  
  let [required_properties, setRequiredProperties] = useState<string[]>([]);

  let fontWeights = [{
    label: "Lighter",
    value: 100,
  },
  {
    label: "Light",
    value: 200,
  },
  {
    label: "Medium",
    value: 400,
  },
  {
    label: "Demi Bold",
    value: 600,
  },
  {
    label: "Bold",
    value: 700,
  },
  {
    label: "Dark",
    value: 800,
  },]

  useEffect(() => {
    if(isShared) {
      let keys = Object.keys(sharedProperties[propertySection]);
      keys.sort();
      setRequiredProperties(keys);
    } else {
      let keys = Object.keys(questions[questionId].properties[propertySection]);
      keys.sort();
      setRequiredProperties(keys);
    }
  }, isShared ? [sharedProperties] : [questions, questionId]);

  let updateCSSProperty = (property: string, value: string) => {
    if(isShared) {
      let propertyUpdate : SharedPropertyUpdate = {
        propertySection: propertySection,
        propertyName: property,
        value: value
      }
      dispatch(updateSharedProperty(propertyUpdate))      
    }
    else {
      let propertyUpdate : PropertyUpdate = {
        questionId: questionId,
        propertySection: propertySection,
        propertyName: property,
        value: value
      }
      dispatch(updateProperty(propertyUpdate))
    }
  }

  let alignBtns = [
    {
      icon: () => <MdFormatAlignLeft />,
      value: "left"
    },
    {
      icon: () => <MdFormatAlignCenter />,
      value: "center"
    },
    {
      icon: () => <MdFormatAlignRight />,
      value: "right"
    },
    {
      icon: () => <MdFormatAlignJustify />,
      value: "justify"
    }
  ];

  let justifyBtn = [
    {
      icon: () => <MdFormatAlignLeft />,
      value: "left"
    },
    {
      icon: () => <MdFormatAlignCenter />,
      value: "center"
    },
    {
      icon: () => <MdFormatAlignRight />,
      value: "right"
    },
    {
      icon: () => <MdFormatAlignJustify />,
      value: "justify"
    }
  ];

  let backgroundBtns = [
    {
      icon: () => <MdPalette />,
      value: "backgroundColor"
    },
    {
      icon: () => <MdImage />,
      value: "backgroundImage"
    },
    {
      icon: () => <MdBlock />,
      value: "noBackground"
    }
  ]

  let backgroundPositions = ["Left", "Top", "Center", "Right", "Bottom", "Top Left", "Bottom Left", "Center Left", "Center Right", "Top Right", "Bottom Right", "Top Center", "Top Bottom"]

  let borderStyles = ["Solid", "Dotted", "Dashed", "Double", "Groove", "Ridge", "Inset", "Outset"]

  let backgroundRepeats = [{
    value: "repeat-x",
    label: "Repeat X"
  },
  {
    value: "repeat-y",
    label: "Repeat Y"
  },
  {
    value: "repeat",
    label: "Repeat"
  },
  {
    value: "no-repeat",
    label: "No Repeat"
  },
  {
    value: "space",
    label: "Space"
  },
  {
    value: "round",
    label: "Round"
  }]

  let backgroundSize = ['Contain', "Cover", "80%", "60%", "50%", "25%", "10%"]

  let controlProperties = {
    "headings": {
      render: PanelHeading,
      items: [
        {
          heading: "Font",
          dependencies: ["fontFamily", "fontWeight", "fontSize"]
        },
        {
          heading: "Text Color",
          dependencies: ["color"]
        },
        {
          heading: 'Border',
          dependencies: ["borderColor", "borderWidth", "borderRadius", "borderStyle"]
        },
        {
          heading: 'Background',
          dependencies: ["backgroundColor", "backgroundImage", "backgroundPosition", "backgroundRepeat", "backgroundSize", "noBackground"],
          hasBtns: true,
          btnName: "backgroundBtns"
        },
        {
          heading: "Background Position",
          dependencies: ["backgroundPosition"]
        },
        {
          heading: "Background Repeat",
          dependencies: ["backgroundRepeat"]
        },
        {
          heading: "Background Size",
          dependencies: ["backgroundSize"]
        },{
          heading: "Margins",
          dependencies: ["marginTop", "marginRight", "marginBottom", "marginLeft"]
        },
        {
          heading: "Paddings",
          dependencies: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]
        },
        {
          heading: "Next Button Text",
          dependencies: ["NextButtonText"]
        },
        {
          heading: "Submit Button Text",
          dependencies: ["SubmitButtonText"]
        },
        {
          heading: "Previous Button Text",
          dependencies: ["PreviousButtonText"]
        }, 
        {
          heading: "Next Button Hover Color",
          dependencies: ["NextButtonHoverColor"]
        }, 
        {
          heading: "Next Button Hover Text Color",
          dependencies: ["NextButtonHoverTextColor"]
        }, 
        {
          heading: "Previous Button Hover Color",
          dependencies: ["PreviousButtonHoverColor"]
        }, 
        {
          heading: "Previous Button Hover Text Color",
          dependencies: ["PreviousButtonHoverTextColor"]
        },
        {
          heading: "Start Button Text",
          dependencies: ["StartButtonText"]
        },
        {
          heading: "Start Button Hover Color",
          dependencies: ["StartButtonHoverColor"]
        }, 
        {
          heading: "Start Button Hover Text Color",
          dependencies: ["StartButtonHoverTextColor"]
        },
        {
          heading: "Width",
          dependencies: ["width"]
        },
        {
          heading: "Height",
          dependencies: ["height"]
        }, 
        {
          heading: "Opacity",
          dependencies: ['opacity']
        }
      ]
    },
    "fontFamily": {
      render: SelectDropDown,
      options: fontFamilies,
      process: false,
      requiresName: true,
      hasOptions: true,
    },
    "fontWeight": {
      render: SelectDropDown,
      options: fontWeights,
      process: false,
      requiresName: true,
      hasOptions: true,
    },
    "fontSize": {
      render: FontStyleSize,
      requiresName: false,
      hasOptions: false,
      hasMultipleValues: true,
      valueProperties: ["fontStyle", "fontSize"]
    },
    "textAlign": {
      render: Buttons,
      options: alignBtns,
      requiresName: true,
      hasOptions: true
    },
    "justifyContent": {
      render: Buttons,
      options: justifyBtn,
      requiresName: true,
      hasOptions: true
    },
    "color": {
      render: ColorBox,
      requiresName: true,
    },
    "borderColor": {
      render: ColorBox,
      requiresName: true
    },
    "hoverColor": {
      render: ColorBox,
      requiresName: true
    },
    "borderStyle": {
      render: BorderStyleWidth,
      requiresName: false,
      hasOptions: true,
      options: borderStyles,
      process: true,
      hasMultipleValues: true,
      valueProperties: ["borderStyle", "borderWidth"]
    },
    "borderRadius": {
      render: InputField,
      requiresName: true,
      type: "number",
      icon: () => <MdRoundedCorner/>,
      unit: 'px',
      formatter: (v: string) => parseInt(v)
    },
    "backgroundBtns": {
      render: Buttons,
      options: backgroundBtns,
      hasOptions: true,
      hasCustomValue: true,
      getValue: () => {
        let backgroundColor = isShared ? sharedProperties[propertySection].backgroundColor : questions[questionId].properties[propertySection]["backgroundColor"];
        let backgroundImage = isShared ? sharedProperties[propertySection].backgroundImage : questions[questionId].properties[propertySection]["backgroundImage"];
        return  backgroundColor ? "backgroundColor" : (backgroundImage !== undefined ? "backgroundImage" : "noBackground");
      },
      customAction: (propertyName, value) => {

        let removeBackgroundImage = (imageUrl) => {
          let urlParts = imageUrl.split("/");
          let fileName = urlParts[urlParts.length - 1].replace(")", "");
          let fileToRemove = {
            id: "",
            fileName: fileName,
            url: imageUrl,
            mainSection: mainSection,
            property: propertyName,
            propertySection: propertySection,
            questionIndex: questionId,
            state: "removed",
          } as File;
          dispatch(removeFile(fileToRemove));
        }

        if(isShared) {
          if(value == "backgroundImage"){
            let propertyRemove : SharedPropertyRemove = {
              propertySection: propertySection,
              propertyNames: ["backgroundColor"]
            }
  
            let propertiesToAdd : SharedPropertyUpdate[] = [
              {
                propertySection: propertySection,
                propertyName: "backgroundImage",
                value: ""
              },
              {
                propertySection: propertySection,
                propertyName: "backgroundPosition",
                value: "Center"
              },
              {
                propertySection: propertySection,
                propertyName: "backgroundRepeat",
                value: "no-repeat"
              },
              {
                propertySection: propertySection,
                propertyName: "backgroundSize",
                value: "Cover"
              },
            ]
            dispatch(removeSharedProperty(propertyRemove))
            for(let propertyAdd of propertiesToAdd) {
              dispatch(addSharedProperty(propertyAdd))
            }
          }
          else if(value == "backgroundColor") {
            let imageUrl = sharedProperties[propertySection]["backgroundImage"];
            removeBackgroundImage(imageUrl);
            let propertyRemove : SharedPropertyRemove = {
              propertySection: propertySection,
              propertyNames: ["backgroundImage", "backgroundPosition", "backgroundRepeat", "backgroundSize"]
            }
  
            let propertyAdd : SharedPropertyUpdate = {
              propertySection: propertySection,
              propertyName: "backgroundColor",
              value: "#FFFFFF",
            }
  
            dispatch(removeSharedProperty(propertyRemove))
            dispatch(addSharedProperty(propertyAdd))
          }
          else {
            let imageUrl = sharedProperties[propertySection]["backgroundImage"];
            removeBackgroundImage(imageUrl);
            let propertyRemove : SharedPropertyRemove = {
              propertySection: propertySection,
              propertyNames: ["backgroundImage", "bacgkroundPosition", "backgroundRepeat", "backgroundSize"]
            }
  
            let propertyAdd : SharedPropertyUpdate = {
              propertySection: propertySection,
              propertyName: "backgroundColor",
              value: "#00000000",
            }
  
            dispatch(removeSharedProperty(propertyRemove))
            dispatch(addSharedProperty(propertyAdd))
          }

        }else {
          if(value == "backgroundImage"){

            let propertyRemove : PropertyRemove = {
              questionId: questionId,
              propertySection: propertySection,
              propertyNames: ["backgroundColor"]
            }
  
            let propertiesToAdd : PropertyUpdate[] = [
              {
                questionId: questionId,
                propertySection: propertySection,
                propertyName: "backgroundImage",
                value: ""
              },
              {
                questionId: questionId,
                propertySection: propertySection,
                propertyName: "backgroundPosition",
                value: "Center"
              },
              {
                questionId: questionId,
                propertySection: propertySection,
                propertyName: "backgroundRepeat",
                value: "no-repeat"
              },
              {
                questionId: questionId,
                propertySection: propertySection,
                propertyName: "backgroundSize",
                value: "Cover"
              },
            ]
            dispatch(removeProperty(propertyRemove))
            for(let propertyAdd of propertiesToAdd) {
              dispatch(addProperty(propertyAdd))
            }
          }
          else if(value == "backgroundColor") {
            let imageUrl = questions[questionId].properties[propertySection]["backgroundImage"];
            removeBackgroundImage(imageUrl);
            let propertyRemove : PropertyRemove = {
              questionId: questionId,
              propertySection: propertySection,
              propertyNames: ["backgroundImage", "backgroundPosition", "backgroundRepeat", "backgroundSize"]
            }
  
            let propertyAdd : PropertyUpdate = {
              questionId: questionId,
              propertySection: propertySection,
              propertyName: "backgroundColor",
              value: "#FFFFFF",
            }
  
            dispatch(removeProperty(propertyRemove))
            dispatch(addProperty(propertyAdd))
          }
          else {
            let imageUrl = questions[questionId].properties[propertySection]["backgroundImage"];
            removeBackgroundImage(imageUrl);
            let propertyRemove : PropertyRemove = {
              questionId: questionId,
              propertySection: propertySection,
              propertyNames: ["backgroundImage", "bacgkroundPosition", "backgroundRepeat", "backgroundSize"]
            }
  
            let propertyAdd : PropertyUpdate = {
              questionId: questionId,
              propertySection: propertySection,
              propertyName: "backgroundColor",
              value: "#00000000",
            }
  
            dispatch(removeProperty(propertyRemove))
            dispatch(addProperty(propertyAdd))
          }
        }
      }
    },
    "backgroundColor": {
      render: ColorBox,
      requiresName: true,
    },
    "backgroundImage": {
      render: FileUpload,
      requiresName: true,
      accept: ".png,.jpeg,.jpg,.gif",
      requiresPropertySection: true
    },
    "backgroundPosition": {
      render: SelectDropDown,
      requiresName: true,
      hasOptions: true,
      options: backgroundPositions,
      process: true
    },
    "backgroundRepeat": {
      render: SelectDropDown,
      requiresName: true,
      hasOptions: true,
      options: backgroundRepeats,
      process: false
    }
    ,
    "backgroundSize": {
      render: SelectDropDown,
      requiresName: true,
      hasOptions: true,
      options: backgroundSize,
      process: true
    },
    "marginTop": {
      render: Margin,
      requiresName: false,
      hasMultipleValues: true,
      valueProperties: ["marginTop", "marginRight", "marginBottom", "marginLeft"]
    },
    "paddingTop": {
      render: Padding,
      requiresName: false,
      hasMultipleValues: true,
      valueProperties: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"]
    },
    "NextButton": {
      render: CheckBox,
      requiresName: true
    },
    "NextButtonText" : {
      render: InputField,
      type: "text",
      requiresName: true,
    },
    "SubmitButtonText" : {
      render: InputField,
      type: "text",
      requiresName: true,
    },
    "PreviousButton": {
      render: CheckBox,
      requiresName: true
    },
    "PreviousButtonText" : {
      render: InputField,
      type: "text",
      requiresName: true,
    },
    "NextButtonHoverColor": {
      render: ColorBox,
      requiresName: true
    },
    "PreviousButtonHoverColor": {
      render: ColorBox,
      requiresName: true
    },
    "NextButtonHoverTextColor" : {
      render: ColorBox,
      requiresName: true
    },
    "PreviousButtonHoverTextColor" : {
      render: ColorBox,
      requiresName: true
    },
    "StartButtonText" : {
      render: InputField,
      type: "text",
      requiresName: true,
    },
    "StartButtonHoverColor": {
      render: ColorBox,
      requiresName: true
    },
    "StartButtonHoverTextColor" : {
      render: ColorBox,
      requiresName: true
    },
    "width": {
      render: InputField,
      type: "number",
      requiresName: true,
      unit: "%",
      formatter: (number: string | number) => `${number}%`,
      parser: (number: string | number) => parseFloat(number.toString().replace("%", ''))
    },
    "height": {
      render: InputField,
      type: "number",
      requiresName: true,
      unit: "%",
      formatter: (number: string | number) => `${number}%`,
      parser: (number: string | number) => parseFloat(number.toString().replace("%", ''))
    },
    'opacity': {
      render: OpacityBar,
      type: 'number',
      requiresName: true,
    }
  }

  let [controls, setControls] = useState([]);

  let findHeading = (propertyName, headings, usedHeadings) => {
    for(let heading of headings) {
      if(usedHeadings.includes(heading.heading))
        continue;

      if(heading.dependencies.includes(propertyName))
      {
        return heading;
      }
    }
    return "";
  }

  let createControl = (configuration: {}, property: string) => {
    
    let value;

    if(configuration.hasCustomValue) {
      value = configuration.getValue();
    }
    else {
      value = isShared ? sharedProperties[propertySection][property] : questions[questionId].properties[propertySection][property];
    }

    let control_configuration = {value: value, 
      mainSection: mainSection, 
      questionId: questionId, 
      updateProperty: configuration.customAction ? configuration.customAction : updateCSSProperty,
      dispatch: dispatch,
    };
      if(configuration.requiresName)
        control_configuration["propertyName"] = property;

      if(configuration.hasMultipleValues) {
        let value : number[] = [];
        for(let prop of configuration.valueProperties) {
          let val = isShared ? sharedProperties[propertySection][prop] : questions[questionId].properties[propertySection][prop]
          value.push(val);
        }
        control_configuration.value = value;
      }

      if(configuration.hasOptions)
      {
        control_configuration['options'] = configuration.options;
        control_configuration['process'] = configuration.process;
      }

      if(configuration.icon) {
        control_configuration["icon"] = configuration.icon
      }

      if(configuration.unit) {
        control_configuration["unit"] = configuration.unit
      }

      if(configuration.formatter) {
        control_configuration['formatter'] = configuration.formatter;
      }

      if(configuration.parser) {
        control_configuration["parser"] = configuration.parser;
      }

      if(configuration.accept) {
        control_configuration["accept"] = configuration.accept;
      }

      if(configuration.type) {
        control_configuration["type"] = configuration.type;
      }

      if(configuration.requiresPropertySection) {
        control_configuration["propertySection"] = propertySection;
      }

      let control = configuration.render(control_configuration);
      return control;
  }

  useEffect(() => {
    let renderControls : object[] = []
    let headings = controlProperties["headings"];
    let usedHeadings : string[] = [];

    for(let property of required_properties) {
      let configuration = controlProperties[property];

      let headingToUse = findHeading(property, headings.items, usedHeadings);

      if(headingToUse) {
        usedHeadings.push(headingToUse.heading);
        let headingControl = headings.render({heading: headingToUse.heading});
        renderControls.push(headingControl)

        if(headingToUse.hasBtns) {
          let btnConfig = controlProperties[headingToUse.btnName]
          let btnControl = createControl(btnConfig, headingToUse.btnName);
          renderControls.push(btnControl)
        }

      }

      if(!configuration)
        continue;

      let control = createControl(configuration, property)
      renderControls.push(control)
    }
    setControls(renderControls);
  }, [required_properties, fontFamilies]);

  return (
    <>
      <div className={`text-customization ${isExpanded ? "expanded" : ""}`}>
        <div
          className="text-customization-header"
          onClick={toggleExpand}
        >
          {title}
          <MdChevronRight/>
        </div>
        <div
          className={`text-customization-options ${isOverFlowAllowed ? "overflow-disabled" : ""}`}>
          <div>
            <div className="panel-items">
              {
                controls.map((t, index) => {
                  return (
                    <div key={index}>
                      {t}
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextCustomization;
