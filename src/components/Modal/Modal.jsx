import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export function Modal({ onCloseModal, largeImage }) {
  const handleKeyDown = evt => {
    if (evt.key === 'Escape') {
      onCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleModalClose = evt => {
    if (evt.target.classList.contains(css.overlay)) {
      onCloseModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleModalClose}>
      <div className={css.modal}>
        <img src={largeImage} alt="Bigger version" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string,
  onCloseModal: PropTypes.func,
};
