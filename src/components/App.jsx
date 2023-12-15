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

  useEffect(() => {}, [query, currentPage]);

  const fetchImages = async (query, page) => {
    setIsLoading(true);
    try {
      const data = await getData(query, page);
      return data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async evt => {
    evt.preventDefault();

    const form = evt.target;
    const query = form.elements.input.value;
    const data = await fetchImages(query, 1);
    const images = data.hits;

    setImages(images);
    setQuery(query);
    setTotalHits(data.total);
    setCurrentPage(1);
  };

  const handleMore = async () => {
    const nextImages = await fetchImages(query, currentPage + 1);
    setImages([...images, ...nextImages.hits]);
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
