import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ image, openModal }) {
  const { webformatURL, largeImageURL, tags } = image;
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        data-large={largeImageURL}
        onClick={openModal}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};
