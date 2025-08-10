import React from 'react';

const Modal = (active, setActive) => {
    return (
        <div className="modal">
            <div className="modal__content">
                <h3>Данные о пользователе</h3>
                <img className="cross" src="/cross.svg" alt="Cross"/>
            </div>
        </div>
    );
};

export default Modal;