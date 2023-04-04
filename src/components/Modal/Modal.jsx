import { createPortal } from "react-dom";
import { useEffect } from "react";

import css from "./Modal.module.css";

import PropTypes from "prop-types";

const modalRoot = document.querySelector("#root");

const Modal = ({url, closeModal}) =>{
    useEffect(() => {
        window.addEventListener("keydown", closeEscape);
    });

    useEffect(() => {
        return () => {window.removeEventListener("keydown", closeEscape); };
    });

    const closeEscape = (event) => {
        if (event.code === 'Escape') {
            closeModal();    
        }
    }

    const closeMouse = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }
    return createPortal(
        <div className={css.overlay} onClick={closeMouse}>
            <div className={css.modal}>
                <img src={url} alt="icon" />
            </div>
        </div>,
        modalRoot
    );
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired
}

export default Modal;