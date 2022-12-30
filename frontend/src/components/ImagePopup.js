import Popup from './Popup';

function ImagePopup({card, isOpen, onClose, name}) {
    return (
        <Popup name={name}
               onClose={onClose}
               isOpen={isOpen}
               card={card}
               className={"popup__image-container"}>
                <figure className="popup__figure">
                    <img className="popup__image"
                         src={card.link}
                         alt={card.name}
                    />
                    <figcaption className="popup__caption">{card.name}</figcaption>
                </figure>
        </Popup>
    )
}

export default ImagePopup;