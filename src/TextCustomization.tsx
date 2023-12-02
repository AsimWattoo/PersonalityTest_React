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
  MdBlock} from 'react-icons/md';
import type { PropertyUpdate, PropertyRemove } from "./redux/question";
import { updateProperty, addProperty, removeProperty } from "./redux/question";
import { useAppDispatch } from "./redux/hooks";
import Select from "./components/Select";

const SelectDropDown = ({propertyName, value, updateProperty, options, process=true}) => {
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

const InputField = ({propertyName, value, updateProperty, icon, unit, format}) => {
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
        <input type="number" value={value} onChange={e => updateProperty(propertyName, format ? format(e.target.value) : e.target.value)}/>
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
    let val = parseFloat(value);
    updateProperty(propName, val);
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

const FileUpload = ({propertyName, value, updateProperty, accept}) => {

  let selectFile = () => {
    document.getElementById("fileInput")?.click();
  }

  let readFile = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      updateProperty(propertyName, `url(${URL.createObjectURL(file)})`)
    };
  }

  let clearImage = () => {
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
        <input type="file" hidden id="fileInput" onChange={e => readFile(e)} accept={accept}/>
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
    let val = parseFloat(value);
    updateProperty(propName, val);
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

const TextCustomization = ({title, propertySection, questions, questionId}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverFlowAllowed, setIsOverFlowAllowed] = useState(false)
  let dispatch = useAppDispatch();

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
    setRequiredProperties(Object.keys(questions[questionId].properties[propertySection]));
  }, [questionId, questions]);

  let updateCSSProperty = (property, value) => {
    
    let propertyUpdate : PropertyUpdate = {
      questionId: questionId,
      propertySection: propertySection,
      propertyName: property,
      value: value
    }

    dispatch(updateProperty(propertyUpdate))
  }

  let fontFamilies = [
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
        }
      ]
    },
    "fontFamily": {
      render: SelectDropDown,
      options: fontFamilies,
      process: true,
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
      icon: () => <MdRoundedCorner/>,
      unit: 'px',
      format: (v) => parseInt(v)
    },
    "backgroundBtns": {
      render: Buttons,
      options: backgroundBtns,
      hasOptions: true,
      hasCustomValue: true,
      getValue: () => {
        return questions[questionId].properties[propertySection]["backgroundColor"] ? "backgroundColor" : (questions[questionId].properties[propertySection]["backgroundImage"] !== undefined ? "backgroundImage" : "noBackground");
      },
      customAction: (propertyName, value) => {

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
          let propertyRemove : PropertyRemove = {
            questionId: questionId,
            propertySection: propertySection,
            propertyNames: ["backgroundImage", "bacgkroundPosition", "backgroundRepeat", "backgroundSize"]
          }

          let propertyAdd : PropertyUpdate = {
            questionId: questionId,
            propertySection: propertySection,
            propertyName: "backgroundColor",
            value: "transparent",
          }

          dispatch(removeProperty(propertyRemove))
          dispatch(addProperty(propertyAdd))
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
      accept: ".png,.jpeg,.jpg,.gif"
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

  let createControl = (configuration, property) => {
    
    let value;

    if(configuration.hasCustomValue) {
      value = configuration.getValue();
    }
    else {
      value = questions[questionId].properties[propertySection][property];
    }

    let control_configuration = {value: value, updateProperty: configuration.customAction ? configuration.customAction : updateCSSProperty};
      if(configuration.requiresName)
        control_configuration["propertyName"] = property;

      if(configuration.hasMultipleValues) {
        let value : number[] = [];
        for(let prop of configuration.valueProperties) {
          value.push(questions[questionId].properties[propertySection][prop]);
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

      if(configuration.format) {
        control_configuration['format'] = configuration.format;
      }

      if(configuration.accept) {
        control_configuration["accept"] = configuration.accept;
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
  }, [required_properties]);

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
                controls.map(t => t)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextCustomization;
