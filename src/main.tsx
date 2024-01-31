import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import PageLayout from './pages/QuestionsPage';
import NewQuizPage from './pages/NewQuizPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import QuestionPreviewPage from './pages/QuestionsPreviewPage';
import PresentationPreviewPage from './pages/PresentationPreviewPage';

import store, {persistor} from './store';
import PresentationPage from './pages/PresentationPage';
import PresentationPlayPage from './pages/PresentationPlayPage';
import QuestionsPlayPage from './pages/QuestionsPlayPage';
import SettingsPage from './pages/SettingsPage';
import FontsPage from './pages/FontsPage';
import FontAddPage from './pages/FontAddPage';
import App from './App';
import PersonalityPage from './pages/PersonalityPage';
import WinnerPage from './pages/WinnerPage';
import WinnerPreviewPage from './pages/WinnerPreviewPage';
import WinnerPlayPage from './pages/WinnerPlayPage';
import LosersPage from './pages/LosersPage';
import LosersPlayPage from './pages/LosersPlayPage';
import LosersPreviewPage from './pages/LosersPreviewPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import RegistrationPreviewPage from './pages/RegistrationPreviewPage';
import RegistrationPlayPage from './pages/RegistrationPlayPage';
import ThankYouPage from './pages/ThankYouPage';
import ResultsPage from './pages/ResultsPage';
import QuizResultPage from './pages/QuizResultPage';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<App />}>
                <Route path="/" element={<NewQuizPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/results/quiz/:id" element={<QuizResultPage />} />
                <Route path="/quiz/questions/:id" element={<PageLayout />} />
                <Route path="/quiz/preview/questions/:id" element={<QuestionPreviewPage />} />
                <Route path="/quiz/preview/presentation/:id" element={<PresentationPreviewPage />} />
                <Route path="/quiz/presentation/:id" element={<PresentationPage />} />
                <Route path='/quiz/play/presentation/:id' element={<PresentationPlayPage />} />
                <Route path='/quiz/play/questions/:id' element={<QuestionsPlayPage />} />
                <Route path="/quiz/personality/:id" element={<PersonalityPage />} />
                <Route path='/quiz/winner/:id' element={<WinnerPage />} />
                <Route path='/quiz/preview/winner/:id' element={<WinnerPreviewPage />} />
                <Route path='/quiz/play/winner/:id' element={<WinnerPlayPage />} />
                <Route path='/quiz/loser/:id' element={<LosersPage />} />
                <Route path='/quiz/preview/loser/:id' element={<LosersPreviewPage />} />
                <Route path='/quiz/play/loser/:id' element={<LosersPlayPage />} />
                <Route path='/quiz/registration/:id' element={<RegistrationPage />} />
                <Route path='/quiz/preview/registration/:id' element={<RegistrationPreviewPage />} />
                <Route path='/quiz/play/registration/:id' element={<RegistrationPlayPage />} />
                <Route path='/quiz/thankyou/:id' element={<ThankYouPage />} />
                <Route path='/settings' element={<SettingsPage />}>
                  <Route path='fonts' element={<FontsPage />}/>
                  <Route path='fonts/add' element={<FontAddPage />}/>
                </Route>
              </Route>
              <Route path='/login' element={<LoginPage />}/>
            </Routes>
          </BrowserRouter>
        </PersistGate>
    </Provider>
  </React.StrictMode>,
)
