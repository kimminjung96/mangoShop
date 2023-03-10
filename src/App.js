import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import ProductPage from './components/ProductPage';
import UploadPage from './components/UploadPage';
import Header from './components/Header';
import Footer from './components/Footer';
import "./components/MainPage.css"

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/ProductPage/:id' element={<ProductPage />} />
        <Route path='/UploadPage' element={<UploadPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
