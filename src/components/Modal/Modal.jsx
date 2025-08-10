import React from 'react';

const Modal = ({onClose, user}) => {
    if (!user) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" >
                <div className="modal-header">
                    <h5>Данные пользователя {user.lastName} {user.firstName}</h5>
                    <img className="cross" src="/cross.svg" alt="Cross"/>
                </div>
                <div className="modal-body">
                    <div className="userAvatar">
                        <img src={user.image} alt={`${user.lastName} ${user.firstName}`}/>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Полное имя: {user.lastName} {user.firstName} {user.maidenName}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Возраст: {user.age}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Место проживания: {user.address?.country}, {user.address?.city}, {user.address?.address}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Рост: {user.height} см</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Вес: {user.weight} кг</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Номер телефона: {user.phone}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Email: {user.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;