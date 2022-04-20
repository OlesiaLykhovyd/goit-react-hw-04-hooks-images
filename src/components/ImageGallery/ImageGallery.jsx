import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images }) {
  return (
    <>
      <ul className={css.imageGallery}>
        {images.map((image, idx) => (
          <ImageGalleryItem key={idx} image={image} />
        ))}
      </ul>
      ;
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
