import Popup from './Popup';

function PopupWithForm({name, title, children, isOpen, onClose, onSubmit}) {
    return (
        <Popup
            title={title}
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={onSubmit}>
            <>
                <h2 className="popup__title">{title}</h2>
                <form name={`${name}-form`}
                      action="#"
                      className="form popup__form"
                      onSubmit={onSubmit} noValidate>
                    {children}
                </form>
            </>
        </Popup>
    )
}

export default PopupWithForm;