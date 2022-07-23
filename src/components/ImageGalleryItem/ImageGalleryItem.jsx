import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import style from './imageGalleryItem.module.css';

function ImageGalleryItem(props) {
  const [data, setData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id, url, tags, urlLargeImg } = props;

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const openModal = () => {
    setIsModalOpen(true);
    setData(data);
  };

  return (
    <li key={id} className={style.item}>
      <img
        src={url}
        alt={tags}
        className={style.image}
        onClick={() => openModal(props)}
      />
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <img src={urlLargeImg} alt={tags} />
        </Modal>
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  urlLargeImg: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
