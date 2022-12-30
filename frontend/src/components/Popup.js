function Popup({ isOpen, onClose, name, children, className }) {
    function closePopupByOverlayClick(e) {
        if (e.target === e.currentTarget) onClose(e);
    }
    return (
        <div className="popup__box">
            <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
                 onClick={closePopupByOverlayClick}>
                <div className={className ?? "popup__container"}>
                    {children}
                    <button type="button"
                            className="popup__close"
                            aria-label="Закрыть окно"
                            onClick={onClose}
                    />
                </div>
            </div>

        </div>

    )
}

export default Popup