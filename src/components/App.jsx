import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import style from './app.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from 'components/Button';
import API from 'services/API';
import Loader from './Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleSubmit = searchQuery => {
    setPage(1);
    setGallery([]);
    setSearchQuery(searchQuery);
  };

  const loadMoreBtn = () => {
    setPage(page => page + 1);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    async function fetchQuery() {
      setStatus('pending');
      try {
        const gallery = await API.getGallery(searchQuery, page);

        if (gallery.total === 0) {
          setError(`Not found: ${searchQuery}`);
          setStatus('rejected');
        } else {
          setGallery(prevState => [...prevState, ...gallery.hits]);
          setStatus('resolved');
        }
      } catch (error) {
        setError(true);
        setStatus('rejected');
      }
    }
    fetchQuery();
  }, [page, searchQuery]);

  if (status === Status.IDLE) {
    return (
      <div>
        <Searchbar onSubmitForm={handleSubmit} />
        <ToastContainer />
      </div>
    );
  }

  if (status === Status.PENDING) {
    return (
      <div className={style.app}>
        <Searchbar onSubmitForm={handleSubmit} />
        <ToastContainer />
        <ImageGallery gallery={gallery}></ImageGallery>
        <Loader />
        {gallery.length > 11 && (
          <Button onClick={loadMoreBtn}>Load more...</Button>
        )}
      </div>
    );
  }

  if (status === Status.RESOLVED) {
    return (
      <div className={style.app}>
        <Searchbar onSubmitForm={handleSubmit} />
        <ToastContainer />
        <ImageGallery gallery={gallery}></ImageGallery>
        {gallery.length > 11 && (
          <Button onClick={loadMoreBtn}>Load more...</Button>
        )}
        <ToastContainer />
      </div>
    );
  }
  if (status === Status.REJECTED) {
    return (
      <div>
        <Searchbar onSubmitForm={handleSubmit} />
        <h1 style={{ textAlign: 'center', color: 'red' }}>{error}</h1>
        <ToastContainer />
      </div>
    );
  }
}
