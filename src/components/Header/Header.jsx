import { useEffect } from 'react';
import './Header.css';

function Header() {
  const currentDate = new Date().toLocaleString('en-EN', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header">
      <div className="header__left-section">
        <h1 className="header__logo">wtwr°</h1>
        <h2 className="header__date">{currentDate}</h2>
      </div>

      <ul className="header__right-section">
        <li className="header__nav-item">+ Add Clothes</li>
        <li className="header__nav-item">Terrence Tegegne</li>
        <li className="header__nav-item">
          <img
            className="header__user-image"
            src="https://s3-alpha-sig.figma.com/img/bf9a/322c/2e259a8c8558ae5104a4ec0d6ae39021?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fpc4Be7OTBRUP~98B3-BSolBgXxs36lNCTOtye6mHkdnDd-M~P-avetaDWRrxIhuXUC8Wf466y3kl6r9gHY9HAYXKnFL0UYbKjN386TP-dui3sgiv2k7rW5Y35Ot1LK3uxMtN2FH0XsecXTRVUuYJpJOFwthy6VrLqBAzYPebnpqIC5HwaUpZpGNl1tw1dcXRs~Nac8wwfIn8FVwwxHiuJtdL6-xtmWZksgAlrZoX9W18ncVSR3I2bEGmGNHvdA19o4R0cNESO~6aw63X0UhgieDRC4ytIjWeqjAk2sFt1r-smX76-6Id9XCIU8KyPVNdjOn3qREO0ePPho79Yzpzw__"
            alt="user image"
          />
        </li>
      </ul>
    </header>
  );
}

export default Header;
