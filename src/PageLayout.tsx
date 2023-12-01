import React, {useState, useEffect} from 'react';
import NavigationBar from './NavigationBar';
import QuestionCard from './QuestionCard';
import TextCustomization from './TextCustomization';
import BackgroundCustomization from './BackgroundCustomization';
import './PageLayout.css';

interface PageLayoutProps {}

interface Styles {
  container: React.CSSProperties;
  contentContainer: React.CSSProperties;
  leftColumn: React.CSSProperties;
  rightColumn: React.CSSProperties;
}

function createDefaultStyle () {
  return {
    "fontFamily": "Arial",
    "fontStyle": "normal",
    "fontSize": 24,
    "fontWeight": 400,
    "textAlign": "left",
    "color": '#000000',
    "borderColor": '#dedede',
    "borderWidth": 1,
    "borderStyle": "Solid",
    "borderRadius": 5,
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 8,
    "paddingRight": 8,
    "paddingBottom": 8,
    "paddingLeft": 8,
    "backgroundColor": "#FFFFFF",
  }
}

const PageLayout: React.FC<PageLayoutProps> = () => {
  const leftColumnWidth = "80%";
  const rightColumnWidth = "20%";
  let [questionProperties, setQuestionProperties] = useState({
    heading: createDefaultStyle(),
    options: createDefaultStyle(),
    background: {
      "backgroundColor": "#FFFFFF"
    }
  });

  return (
    <div>
      <NavigationBar hasSubmitBtn={true}/>
      <div className='contentContainer'>
        <div className='leftColumn' 
         >
          <QuestionCard properties={questionProperties}/>
        </div>
        <div className='rightColumn'>
          <TextCustomization title={'Question Background'} propertySection={'background'} properties={questionProperties} setProperties={setQuestionProperties}/>
          <TextCustomization title={'Question Header'} propertySection={'heading'} properties={questionProperties} setProperties={setQuestionProperties}/>
          <TextCustomization title={'Option'} propertySection={'options'} properties={questionProperties} setProperties={setQuestionProperties}/>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
