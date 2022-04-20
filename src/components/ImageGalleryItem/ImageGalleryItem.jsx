import { useState } from 'react';

import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';

export default function ImageGalleryItem({ image }) {
  const [modal, setModal] = useState(false);
  const { webformatURL, largeImageURL, tags } = image;
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={() => setModal(true)}
      />
      {modal && (
        <Modal
          imageUrl={largeImageURL}
          imageTags={tags}
          onClose={() => setModal(false)}
        />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
