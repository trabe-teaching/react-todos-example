import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./confirm.module.css";

const Confirm = ({ visible, message, onAccept, onCancel }) => {
  const confirms = useRef();

  useEffect(() => {
    confirms.current = document.getElementById("confirms");
    if (confirms.current) {
      confirms.current.dataset.count = Number(confirms.current.dataset.count) + 1;
    } else {
      confirms.current = document.createElement("div");
      confirms.current.setAttribute("id", "confirms");
      confirms.current.dataset.count = 1;
      document.getElementById("root").parentNode.appendChild(confirms.current);
    }

    return () => {
      confirms.current.dataset.count = Number(confirms.current.dataset.count) - 1;
      if (Number(confirms.current.dataset.count) === 0) {
        confirms.current.parentNode.removeChild(confirms.current);
      }
    };
  }, []);

  return (
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
      confirms.current,
    )
  );
};

export default Confirm;
