import {GET_VIDEO_REQUEST, GET_VIDEO_SUCCESS, TOGGLE_DIALOG} from '../constants/searcher/video';

const initialState = {
    video: [],
    loading: false,
    offset: 0,
    query: '',
    limit: 20,
    timeout: false,
    viewDialogStatus: false,
    selectedVideo: {}
};

export default function video (state = initialState, action) {

    switch (action.type){
        case GET_VIDEO_REQUEST:
            return {...state, video: action.payload, loading: true};

        case GET_VIDEO_SUCCESS:
            if (state.offset !== 0) {
                state.video.push(...action.payload.video);
                return {...state, video: state.video, loading: false, offset: action.payload.offset};
            }
            return {...state, video: action.payload.video, loading: false, offset: action.payload.offset};

        case TOGGLE_DIALOG:
            return {...state, viewDialogStatus: action.payload.status, selectedVideo: action.payload.video};

        default:
            return state;
    }
}