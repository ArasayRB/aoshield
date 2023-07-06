import logo from './logo.svg';
import './App.css';
//Components
import {Main} from './components/main';
import { Suspense } from 'react';



function App() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
          <header className="App-header">
            <p
              className="h1"
            >
              Aoshield Assesment
            </p>
          <div>
            <Main key='main'/>
          </div>
          </header>
        </div>
      </Suspense>
  );
}

export default App;
