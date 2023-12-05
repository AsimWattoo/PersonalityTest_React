import React from 'react';
import NavigationBar from '../NavigationBar';
import PagesBar from '../components/PagesBar';
import { useParams } from 'react-router';

let PresentationPage = () => {

    let params = useParams();

    return (
    <div className="page">
      <NavigationBar hasSubmitBtn={true} hasPreview={true} hasEditBtn={false}/>
      <div className='content-container'>
        <PagesBar currentPage={'presentation'} quizId={params.id}/>
      </div>
    </div>
    )
}

export default PresentationPage;