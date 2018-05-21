import {GET_IMAGES_REQUEST, GET_IMAGES_SUCCESS, TOGGLE_DIALOG} from '../constants/searcher/image';

const initialState = {
    images: [],
    loading: false,
    page: 0,
    offset: 0,
    query: '',
    limit: 20,
    timeout: false,
    viewDialogStatus: false,
    selectedImage: {}
};

export default function image (state = initialState, action) {

    switch (action.type){
        case GET_IMAGES_REQUEST:
            return {...state, images: action.payload, loading: true};

        case GET_IMAGES_SUCCESS:
            if (state.page > 0) {
                state.images.push(...action.payload);
                return {...state, images: state.images, loading: false};
            }
            return {...state, images: action.payload, loading: false};

        case TOGGLE_DIALOG:
            return {...state, viewDialogStatus: action.payload.status, selectedImage: action.payload.image};

        default:
            return state;
    }
}