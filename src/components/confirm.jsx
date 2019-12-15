import React, { Component } from "react";
import { createPortal } from "react-dom";
import styles from "./confirm.module.css";

class Confirm extends Component {
  confirms;

  componentDidMount() {
    this.confirms = document.getElementById("confirms");
    if (this.confirms) {
      this.confirms.dataset.count = Number(this.confirms.dataset.count) + 1;
    } else {
      this.confirms = document.createElement("div");
      this.confirms.setAttribute("id", "confirms");
      this.confirms.dataset.count = 1;
      document.getElementById("root").parentNode.appendChild(this.confirms);
    }
  }

  componentWillUnmount() {
    this.confirms.dataset.count = Number(this.confirms.dataset.count) - 1;
    if (Number(this.confirms.dataset.count) === 0) {
      this.confirms.parentNode.removeChild(this.confirms);
    }
  }

  render() {
    const { visible, message, onAccept, onCancel } = this.props;
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
        this.confirms,
      )
    );
  }
}

export default Confirm;
