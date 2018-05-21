import {GET_VIDEO_REQUEST, GET_VIDEO_SUCCESS, TOGGLE_DIALOG} from '../../constants/searcher/video';
import axios from 'axios';

export function getVideo(data) {

    return (dispatch) => {
        dispatch({
            type: GET_VIDEO_REQUEST,
            payload: data.video
        });

        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDbZOGbxkLou0F_LJyKXvFF1quIVBCN4gs&q=
                    ${data.query}&maxResults=${data.limit}&type=video`;
        if (data.offset !== 0)
            url += `&pageToken=${data.offset}`;
        axios.get(url)
            .then(response => {
                dispatch({
                    type: GET_VIDEO_SUCCESS,
                    payload: {video: response.data.items, offset: response.data.nextPageToken}
                })
            });
    }

}

export function toggleViewDialog(status, video) {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_DIALOG,
            payload: {status: status, video: video}
        })
    }
}