import { searchImgByQuery } from './js/pixabay-api.js';
import {
    getPicture,
    resetContent,
    showLoader,
    hideLoader,
} from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', onSearch);

async function onSearch(event) {
    event.preventDefault();

    const queryInput = event.currentTarget.elements.searchQuery;  
    query = queryInput.value.trim();

    if (!query) {
        iziToast.error({
            message: 'Please, enter your request',
            position: 'topRight',
        });
        return;
    }

    resetContent();
    showLoader();
    loadBtn.classList.add('hidden');
    page = 1; // Reset page to 1 for new search

    try {
        const data = await searchImgByQuery(query, page);
        totalHits = data.totalHits;
        console.log('Total Hits:', totalHits);

        hideLoader();
        if (data.hits.length === 0) {
            iziToast.warning({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
        } else {
            getPicture(data.hits);
            if (data.hits.length < 15 || totalHits <= 15) {
                iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight',
                });
            } else {
                loadBtn.classList.remove('hidden');
            }
        }
    } catch (error) {
        iziToast.error({ title: 'Error', message: error.message });
        console.error(error);
    } finally {
        hideLoader();
        form.reset();
    }
}

loadBtn.addEventListener('click', async () => {
    page += 1;
    showLoader();

    try {
        const data = await searchImgByQuery(query, page);
        if (data.hits.length === 0 || page * 15 >= totalHits) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
            loadBtn.classList.add('hidden');
        } else {
            getPicture(data.hits);
            if (page * 15 >= totalHits) {
                loadBtn.classList.add('hidden');
            }
        }
        smoothScroll();
    } catch (error) {
        iziToast.error({ title: 'Error', message: error.message });
        console.error(error);
    } finally {
        hideLoader();
    }
});

function smoothScroll() {
    const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}
