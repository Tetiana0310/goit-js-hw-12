import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector('.gallery');

export function getPicture(picturesArr) {
    const markup = picturesArr
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" height="190px"/>
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: <br>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: <br>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: <br>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: <br>${downloads}</b>
    </p>
  </div>
</div>`;
        })
        .join('');

    galleryEl.insertAdjacentHTML('beforeend', markup);

    const galleryLightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
    });
    galleryLightbox.refresh();
}

export function resetContent() {
    galleryEl.innerHTML = '';
}

export function showLoader() {
    document.querySelector('.loader').classList.remove('hidden');
}

export function hideLoader() {
    document.querySelector('.loader').classList.add('hidden');
}
