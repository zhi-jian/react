import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import store from './store/store'
import "lib-flexible"
import RouterMap from './router/router'

//渲染组件
ReactDOM.render(
    <Provider store={store}>
        <RouterMap />
    </Provider>,
    document.getElementById('root')
)
