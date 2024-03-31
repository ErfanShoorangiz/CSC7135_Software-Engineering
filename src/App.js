
import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FileUpload from './components/FileUpload';
import background from './backgroundimg.png';
function App() {
  return (
    <div className="container">
      <header>
    
      </header>
      <Navbar />


      <main>
        <FileUpload>
         
        </FileUpload>
        
        <Footer />

        {/* we may add more components  here */}
      </main>
      
    </div>
    
  );
}


export default App;
