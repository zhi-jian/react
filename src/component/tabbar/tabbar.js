import React from 'react';
import './tabbar.css'
import homeYes from '../../iconImg/home-yes.png'
import productYes from '../../iconImg/ysp-yes.png'
import cartYes from '../../iconImg/cart-yes.png'
import myYes from '../../iconImg/my-yes.png'

import { NavLink } from 'react-router-dom';

class TabBar extends React.Component {
    
    render() {
        return (
            <div id='tabBar' className='boxS'>
                <NavLink to='/index' activeStyle={{ color: '#333', fontWeight: 'bold',background:'#ddd' }} className='tabBarItem'>
                    <div><img src={homeYes} width='40px' height='40px' alt=''/></div>
                    <div>首页</div>
                </NavLink>
                <NavLink to='/product' activeStyle={{ color: '#333', fontWeight: 'bold',background:'#ddd'  }} className='tabBarItem'>
                    <div><img src={productYes} width='40px' height='40px' alt=''/></div>
                    <div>衍生品</div>
                </NavLink>
                <NavLink to='/cart' activeStyle={{ color: '#333', fontWeight: 'bold',background:'#ddd'  }} className='tabBarItem'>
                    <div><img src={cartYes}  width='40px' height='40px' alt=''/></div>
                    <div>购物车</div>
                </NavLink>
                <NavLink to='/my' activeStyle={{ color: '#333', fontWeight: 'bold',background:'#ddd'  }} className='tabBarItem'>
                    <div><img src={myYes}  width='40px' height='40px' alt=''/></div>
                    <div>我的</div>
                </NavLink>
            </div>
        )
    }
}
export default TabBar