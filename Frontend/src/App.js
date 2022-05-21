import './App.css';
import Nav from './components/Nav'
import Main from "./components/Main";
import Footer from './components/Footer';
// import Temp from './components/Temp';



function App() {
  return (
    <div className="App">
      <Nav />
      <Main />
      {/* <Temp /> */}
      <Footer />
    </div>
  );
}

export default App;
