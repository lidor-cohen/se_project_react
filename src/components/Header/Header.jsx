import './Header.css';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useState, useEffect } from 'react';

function Header({ cityName }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const currentDate = new Date().toLocaleString('en-EN', {
    month: 'long',
    day: 'numeric',
  });
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768 && isMobileMenuOpened) {
        setIsMobileMenuOpened(false);
      } else if (window.innerWidth < 768 && !isMobileMenuOpened) {
        setIsMobileMenuOpened(true);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpened]);

  return (
    <header className="header">
      {modalOpened && (
        <ModalWithForm
          title="Add garment"
          name="garment"
          onClose={() => setModalOpened(false)}
          buttonText="Add garment"
        >
          <div className="form-modal__input-container">
            <label className="form-modal__label">Name</label>
            <input
              placeholder="Name"
              type="text"
              className="form-modal__input form-modal__input_type_text"
            />
          </div>

          <div className="form-modal__input-container">
            <label className="form-modal__label">Image</label>
            <input
              placeholder="Image URL"
              type="text"
              className="form-modal__input form-modal__input_type_text"
            />
          </div>

          <div className="form-modal__input-container">
            <p className="form-modal__label">Select the weather type:</p>

            <div className="form-modal__radio-container">
              <input
                className="form-modal__input_type_radio"
                type="radio"
                id="hot-weather"
                name="weather"
                value="hot"
                defaultChecked
              />
              <label htmlFor="hot-weather" className="form-modal__label-radio">
                Hot
              </label>
            </div>

            <div className="form-modal__radio-container">
              <input
                className="form-modal__input_type_radio"
                type="radio"
                id="warm-weather"
                name="weather"
                value="warm"
              />
              <label htmlFor="warm-weather" className="form-modal__label-radio">
                Warm
              </label>
            </div>

            <div className="form-modal__radio-container">
              <input
                className="form-modal__input_type_radio"
                type="radio"
                id="cold-weather"
                name="weather"
                value="cold"
              />
              <label htmlFor="cold-weather" className="form-modal__label-radio">
                Cold
              </label>
            </div>
          </div>
        </ModalWithForm>
      )}

      <div className="header__left-section">
        <h1 className="header__logo">wtwr°</h1>
        <h2 className="header__date">
          {currentDate}, {cityName}
        </h2>
      </div>

      {isMobileMenuOpened ? (
        <p>mobile opened</p>
      ) : (
        <ul className="header__right-section">
          <li
            className="header__nav-item header__nav-item_type_add-clothes"
            onClick={() => setModalOpened(true)}
          >
            + Add Clothes
          </li>
          <li className="header__nav-item header__nav-item_type_name">
            Terrence Tegegne
          </li>
          <li className="header__nav-item header__nav-item_type_avatar">
            <img
              className="header__user-image"
              src="https://s3-alpha-sig.figma.com/img/bf9a/322c/2e259a8c8558ae5104a4ec0d6ae39021?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fpc4Be7OTBRUP~98B3-BSolBgXxs36lNCTOtye6mHkdnDd-M~P-avetaDWRrxIhuXUC8Wf466y3kl6r9gHY9HAYXKnFL0UYbKjN386TP-dui3sgiv2k7rW5Y35Ot1LK3uxMtN2FH0XsecXTRVUuYJpJOFwthy6VrLqBAzYPebnpqIC5HwaUpZpGNl1tw1dcXRs~Nac8wwfIn8FVwwxHiuJtdL6-xtmWZksgAlrZoX9W18ncVSR3I2bEGmGNHvdA19o4R0cNESO~6aw63X0UhgieDRC4ytIjWeqjAk2sFt1r-smX76-6Id9XCIU8KyPVNdjOn3qREO0ePPho79Yzpzw__"
              alt="user image"
            />
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
