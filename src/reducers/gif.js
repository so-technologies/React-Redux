import {GET_GIFS_REQUEST, GET_GIFS_SUCCESS, TOGGLE_DIALOG} from '../constants/searcher/gif';

const initialState = {
    gifs: [],
    loading: false,
    page: 0,
    offset: 0,
    query: '',
    limit: 20,
    timeout: false,
    viewDialogStatus: false,
    selectedGif: {}
};

export default function gif (state = initialState, action) {

    switch (action.type){
        case GET_GIFS_REQUEST:
            return {...state, gifs: action.payload, loading: true};

        case GET_GIFS_SUCCESS:
            if (state.page > 0) {
                state.gifs.push(...action.payload);
                return {...state, gifs: state.gifs, loading: false};
            }
            return {...state, gifs: action.payload, loading: false};

        case TOGGLE_DIALOG:
            return {...state, viewDialogStatus: action.payload.status, selectedGif: action.payload.gif};

        default:
            return state;
    }
}