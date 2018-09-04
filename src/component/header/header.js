import React from 'react';
import './header.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../../node_modules/mdui/dist/css/mdui.css'
class Header extends React.Component{
    constructor(props){
        super(props)
        this.state={
            headerTitle:'首页'
        }
    }
    //页面挂载完成
    componentWillMount() {
        console.log(this)
        this.setState({
            headerTitle:sessionStorage.getItem('headerTitle')
        })
    }
    pageBack=()=>{
        window.history.back(-1)
    }
    render(){
        return (
            <div id='header'>
                <i className="mdui-icon material-icons" onClick={this.pageBack}>&#xe5c4;</i>
                <div className='headerTitle'>{this.state.headerTitle}</div>
            </div>
        )
    }
}
export default Header