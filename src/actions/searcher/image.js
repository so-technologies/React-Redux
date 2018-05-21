import {GET_IMAGES_REQUEST, GET_IMAGES_SUCCESS, TOGGLE_DIALOG} from '../../constants/searcher/image';
import axios from 'axios';

export function getImages(data) {

    return (dispatch) => {
        dispatch({
            type: GET_IMAGES_REQUEST,
            payload: data.images
        });


        const headers = {
            'Ocp-Apim-Subscription-Key' : '6f925b17010344a6a8351366d2ba6081'
        };
        axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${data.query}&offset=${data.offset}&count=${data.limit}`,
                {headers: headers})
            .then(response => {
                dispatch({
                    type: GET_IMAGES_SUCCESS,
                    payload: response.data.value
                })
            });
    }

}

export function toggleViewDialog(status, image) {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_DIALOG,
            payload: {status: status, image: image}
        })
    }
}