import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, openModal }) {
  return (
    <>
      <ul className={css.imageGallery}>
        {images.map((image, idx) => (
          <ImageGalleryItem key={idx} image={image} openModal={openModal} />
        ))}
      </ul>
      ;
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
