import { combineReducers } from 'redux';
import {title} from './tests';
import {content} from './test2Reducer'
 
const reducer = combineReducers({
    title,
    content
});

export default reducer;