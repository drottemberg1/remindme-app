import "./SpinnerApp.css";

import React, { useEffect, useRef } from "react";

import { SpinnerSVG } from "./SpinnerSVG";

export const SpinnerApp = ({
  className,
  spinnerClassName,
  size = SpinnerApp.Size.x2,
  seRef,
}) => {
  const spinnerRef = useRef()

  useEffect(() => {
    if (seRef) seRef(spinnerRef)
  }, [seRef])

  const getRootClass = () => {
    const classes = ["kr-spinner-app__wrap"]
    if (className) classes.push(className)
    return classes.join(' ')
  };

  const getSpinnerClass = () => {
    const classes = ["kr-spinner-app"];
    if (size) classes.push(`kr-spinner-app--${size}`)
    if (spinnerClassName) classes.push(spinnerClassName)
    return classes.join(' ')
  };

  return (
    <div className={getRootClass()} ref={spinnerRef}>
      <div className={getSpinnerClass()}>
        <SpinnerSVG className="kr-spinner-app__fade" />
        {/* <img
          className="kr-spinner-app__app-icon"
          src="/images/appicon.png"
          alt="App Icon"
        /> */}
      </div>
    </div>
  );
};

SpinnerApp.Size = {
  x1: "x1",
  x2: "x2",
  x3: "x3",
  x4: "x4",
};



export const showLoader = (message) => {
  const appSpinner = document.getElementById('app-spinner')

  if (appSpinner) {

    let spinnerPopup = document.getElementById('app-spinner-popup');
    let spinnerMessage = document.getElementById('app-spinner-message');
    if (message) {
      spinnerMessage.textContent = message;
      spinnerPopup.classList.add('app-spinner-popup-with-text');
    } else {
      spinnerMessage.textContent = '';
      spinnerPopup.classList.remove('app-spinner-popup-with-text');
    }

    return;
  }

  var spinnerContainer = document.createElement('div');
  spinnerContainer.setAttribute("id", "app-spinner");
  spinnerContainer.classList.add('app-spinner-wrap');


  var spinnerPopup = document.createElement('div');
  spinnerPopup.setAttribute("id", "app-spinner-popup");
  spinnerPopup.classList.add('app-spinner-popup');
  var spinner = document.createElement('div');
  spinner.classList.add('app-spinner');

  var spinnerIcon = document.createElement('div');
  spinnerIcon.classList.add('app-spinner-icon');
  var spinnerFade = document.createElement('div');
  spinnerFade.classList.add('app-spinner-fade');

  if (message) {
    var messageEl = document.createElement('div');
    messageEl.setAttribute("id", "app-spinner-message");
    messageEl.classList.add('app-spinner-message');
    messageEl.textContent = message;
    spinnerPopup.classList.add('app-spinner-popup-with-text');
    spinnerPopup.appendChild(messageEl);
  } else {
    spinnerPopup.classList.remove('app-spinner-popup-with-text');
  }

  spinner.appendChild(spinnerFade);
  spinner.appendChild(spinnerIcon);
  spinnerPopup.appendChild(spinner);
  spinnerContainer.appendChild(spinnerPopup);

  document.body.appendChild(spinnerContainer);

  setTimeout(() => {
    spinnerContainer.classList.add('show');
  }, 10);
}

export const hideLoader = () => {
  var spinnerContainer = document.querySelector('.app-spinner-wrap');

  if (spinnerContainer) {
    spinnerContainer.classList.remove('show');

    setTimeout(() => {
      spinnerContainer.remove();
    }, 300);
  }
}