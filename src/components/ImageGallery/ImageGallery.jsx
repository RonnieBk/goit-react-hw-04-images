import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export function ImageGallery({ data, onClick }) {
  return (
    <ul className={css.list}>
      {data.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            image={webformatURL}
            largeImg={largeImageURL}
            tags={tags}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
  onClick: PropTypes.func,
};
