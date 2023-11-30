import React from 'react';
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

const PageLayout: React.FC<PageLayoutProps> = () => {
  const leftColumnWidth = "80%";
  const rightColumnWidth = "20%";



  return (
    <div>
      <NavigationBar />
      <div className='contentContainer'>
        <div className='leftColumn' 
         >
          <QuestionCard />
        </div>
        <div className='rightColumn'>
          <TextCustomization />
          <BackgroundCustomization />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
