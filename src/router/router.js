import React from 'react'
import {Switch, Route, BrowserRouter,Redirect} from 'react-router-dom';
 
import Index from '../component/index/index'
import Product from '../component/product/product'
import Cart from '../component/cart/cart'
import My from '../component/my/my'
import IP from '../component/IP/IP'
import Detail from '../component/detail/detail'
 
class RouteMap extends React.Component {
    updateHandle() {
        console.log('每次router变化之后都会触发')
    }
    render() {
        return (
             <BrowserRouter history={this.props.history} onUpdate={this.updateHandle.bind(this)}>
                <Switch>
                    <Route path='/index' component={Index}></Route>
                    <Route path='/product' component={Product}></Route>
                    <Route path='/cart' component={Cart}></Route>
                    <Route path='/my' component={My}></Route>
                    <Route path='/IP' component={IP}></Route>
                    <Route path='/detail/:id' component={Detail}></Route>
                    <Redirect from="/" to="/index"></Redirect>
                </Switch>
            </BrowserRouter>
        )
    }
}
 
export default RouteMap
