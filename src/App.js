import './App.css';
import {Routes, Route } from 'react-router-dom';
import SignUpPage from './components/sign-up';
import SignInPage from './components/sign-in';
import HomePage from './components/home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </div>
  );
}

export default App;
