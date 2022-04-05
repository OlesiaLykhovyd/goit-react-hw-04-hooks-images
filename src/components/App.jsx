import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImages from 'services/image-api';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal';
import css from './App.module.css';

import Notiflix from 'notiflix';

class App extends Component {
  state = {
    searchInput: '',
    page: 1,
    isLoading: false,
    images: [],
    totalHits: 0,
    imagesOnPage: 0,
    error: null,
    showModal: false,
    currentLargeImageUrl: '',
    currentImageTags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchInput;
    const nextQuery = this.state.searchInput;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (nextQuery !== prevQuery) {
      window.scrollTo(0, 0);
      this.setState({ isLoading: true, page: 1 });

      fetchImages(nextQuery, nextPage)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            this.setState({ images: [], imagesOnPage: 0, totalHits: 0 });
            return Promise.reject(
              new Error(`There is no image with name ${nextQuery}`)
            );
          }

          this.setState({
            images: hits,
            isLoading: false,
            totalHits,
            imagesOnPage: hits.length,
          });
        })

        .catch(error => {
          this.setState({ error });
          Notiflix.Notify.warning(`${error.message}`);
        })

        .finally(() => this.setState({ isLoading: false }));
    }

    if (nextPage > prevPage) {
      this.setState({ isLoading: true });

      fetchImages(nextQuery, nextPage)
        .then(({ hits }) => {
          this.setState(prevState => {
            return { images: [...prevState.images, ...hits] };
          });
          this.setState({
            isLoading: false,
            imagesOnPage: this.state.images.length,
          });
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  formSubmitHandler = data => {
    this.setState({ searchInput: data });
  };

  nextFetch = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  openModal = event => {
    const currentLargeImageUrl = event.target.dataset.large;
    const currentImageTags = event.target.alt;

    this.setState({ currentLargeImageUrl, currentImageTags });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const {
      images,
      isLoading,
      showModal,
      currentLargeImageUrl,
      currentImageTags,
      imagesOnPage,
      totalHits,
    } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {images && <ImageGallery images={images} openModal={this.openModal} />}
        {isLoading && <Loader />}
        {images.length !== 0 && imagesOnPage < totalHits && (
          <Button onClick={this.nextFetch} />
        )}
        {showModal && (
          <Modal
            imageUrl={currentLargeImageUrl}
            imageTags={currentImageTags}
            onClose={this.toggleModal}
          />
        )}
      </div>
    );
  }
}

export default App;
