import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import styles from "./alert.module.css";

const Alert = ({ message, onAccept }) => (
  <>
    <div className={styles.Backdrop} />
    <div className={styles.Alert}>
      <div className={styles.AlertContent}>{message}</div>
      <div className={styles.AlertButtons}>
        <button autoFocus onClick={onAccept}>
          Yay
        </button>
      </div>
    </div>
  </>
);

export const alert = message => {
  const alerts = document.createElement("div");
  document.getElementById("root").parentNode.appendChild(alerts);

  return new Promise(resolve => {
    const handleOnAccept = () => {
      unmountComponentAtNode(alerts);
      alerts.parentNode.removeChild(alerts);
      resolve();
    };

    render(<Alert message={message} onAccept={handleOnAccept} />, alerts);
  });
};

export default Alert;
