function fetchImages(searchQuery, page = 1) {
  const url = 'https://pixabay.com/api/';
  const myKey = '25229894-13820056b4acb6f2fee7ed633';
  const filter = 'image_type=photo&orientation=horizontal&per_page=12';

  return fetch(
    `${url}?key=${myKey}&q=${searchQuery}&${filter}&page=${page}`
  ).then(response => response.json());
}

export default fetchImages;
