import React from "react";
import { createPortal } from "react-dom";
import styles from "./confirm.module.css";

const Confirm = ({ visible, message, onAccept, onCancel }) =>
  visible &&
  createPortal(
    <>
      <div className={styles.Backdrop} />
      <div className={styles.Confirm}>
        <div className={styles.ConfirmContent}>{message}</div>
        <div className={styles.ConfirmButtons}>
          <button onClick={onCancel}>Nope</button>
          <button onClick={onAccept}>Yay</button>
        </div>
      </div>
    </>,
    document.getElementById("confirms"),
  );

export default Confirm;
