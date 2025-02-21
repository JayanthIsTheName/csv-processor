import React from 'react';
import FileUploader from './components/FileUploader';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CSV Processor</h1>
      </header>
      <main>
        <FileUploader />
      </main>
    </div>
  );
}

export default App;