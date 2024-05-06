import { useState } from 'react';
import ModalPopUp from './ModalPopUp';
import './styles.css';

const Modal = () => {
  const [isShow, setIsShow] = useState(false);
  const [isOfferAccepted, setIsOfferAccepted] = useState(false);

  const handleOpenModal = () => {
    setIsShow(true);
  };

  const handleOfferAccept = () => {
    setIsOfferAccepted(true);
    setIsShow(false);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  return (
    <>
      <div className='show-offer'>
        {isOfferAccepted ? (
          <div style={{ fontSize: 40 }}>Offer Accepted!</div>
        ) : (
          <button onClick={handleOpenModal} className='offer-btn'>
            Show Offer
          </button>
        )}
      </div>

      {isShow && (
        <ModalPopUp
          handleClose={handleClose}
          handleOfferAccept={handleOfferAccept}
        />
      )}
    </>
  );
};

export default Modal;
