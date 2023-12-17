import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import getData from '../api.js';
import '../index.css';
import { Modal } from './Modal/Modal';

export function App() {
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (query !== '') {
      async function fetchImages() {
        try {
          setIsLoading(true);
          const data = await getData(query, currentPage);
          setImages(prevImages => [...prevImages, ...data.hits]);
          setTotalHits(data.total);
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchImages();
    }
  }, [query, currentPage]);

  const handleSubmit = evt => {
    evt.preventDefault();

    const form = evt.target;
    const query = form.elements.input.value;

    setImages([]);
    setQuery(query);
    setTotalHits(0);
    setCurrentPage(1);

    form.reset();
  };

  const handleMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const clickImage = largeImgUrl => {
    setIsModal(true);
    setSelectedImage(largeImgUrl);
  };

  const closeModal = () => {
    setIsModal(false);
    setSelectedImage('');
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery data={images} onClick={clickImage} />
      {isModal && (
        <Modal largeImage={selectedImage} onCloseModal={closeModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalHits > currentPage * 12 && (
        <Button onClick={handleMore} />
      )}
    </div>
  );
}
