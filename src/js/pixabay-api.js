import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = "45170254-42a85dd1494e2c1786d1d6be2";

export async function searchImgByQuery(query, page = 1) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 15,
        page: page,
    });

    try {
        const response = await axios.get(BASE_URL, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}

