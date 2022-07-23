import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import style from './searchBar.module.css';

function Searchbar({ onSubmitForm }) {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    const { value } = event.currentTarget;

    return setQuery(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.warn('🦄 please, type a request', {
        autoClose: 3000,
        theme: 'dark',
      });
    }

    onSubmitForm(query);

    setQuery('');
  };

  return (
    <header className={style.searchbar}>
      <form className={style.form} onSubmit={handleSubmit}>
        <button type="submit" className={style.button}>
          <AiOutlineSearch color={'navy'} size={40} />
          <span className={style.button_label}></span>
        </button>

        <input
          value={query}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={style.searchForm_input}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func,
};
export default Searchbar;
