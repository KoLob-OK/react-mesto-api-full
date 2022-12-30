import successIcon from '../images/success.svg';
import failIcon from '../images/fail.svg';

import Popup from './Popup';

function InfoTooltip({name, isOpen, onClose, isSuccessfulAction}) {

    return (
        <Popup name={name}
               onClose={onClose}
               isOpen={isOpen}
               isSuccessfulAction={isSuccessfulAction}>
            <div className="popup__auth">
                {isSuccessfulAction ? (
                    <>
                        <img
                            className="popup__auth-icon"
                            src={successIcon}
                            alt="Регистрация успешна"
                        />
                        <h2 className="popup__auth-text">
                            Вы успешно зарегистрировались!
                        </h2>
                    </>
                ) : (
                    <>
                        <img
                            className="popup__auth-icon"
                            src={failIcon}
                            alt="Ошибка. Регистрация не выполнена"
                        />
                        <h2 className="popup__auth-text">
                            Что-то пошло не так!
                            Попробуйте ещё раз.
                        </h2>
                    </>
                )}
            </div>
        </Popup>
    );
}


export default InfoTooltip;