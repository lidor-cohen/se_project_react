import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <ModalWithForm name="New garment" />
      <Footer />
    </div>
  );
}

export default App;
