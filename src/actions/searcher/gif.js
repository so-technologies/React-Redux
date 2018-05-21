import {GET_GIFS_REQUEST, GET_GIFS_SUCCESS, TOGGLE_DIALOG} from '../../constants/searcher/gif';
import axios from 'axios';

export function getGifs(data) {

    return (dispatch) => {
        dispatch({
            type: GET_GIFS_REQUEST,
            payload: data.gifs
        });

        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=TWUFTsRt2XQ86wScEYC51LgHraNEygZp&q=
                    ${data.query}&limit=${data.limit}&offset=${data.offset}&rating=G&lang=en`)
            .then(response => {
                dispatch({
                    type: GET_GIFS_SUCCESS,
                    payload: response.data.data
                })
            });
    }

}

export function toggleViewDialog(status, gif) {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_DIALOG,
            payload: {status: status, gif: gif}
        })
    }
}