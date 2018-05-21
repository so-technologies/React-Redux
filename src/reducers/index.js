import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import gif from './gif';
import video from './video';
import image from './image';

export default combineReducers({
    gif,
    video,
    image,
    routing: routerReducer
});