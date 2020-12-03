import React from 'react';
import Navbar from './component/Header/Navbar';
import Hero from './component/Header/Hero';
import SearchBar from "./component/Header/SearchBar";
import About from "./component/Section/About";
import Footer from './component/Section/Footer';

function App() {
    return (
        <div className="App">
            <header>
                <Navbar/>
                <Hero/>
                <SearchBar/>
            </header>
            <main>
                <About/>
                <Footer/>
            </main>
        </div>
    );
}

export default App;
