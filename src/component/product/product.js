import React, { Component } from 'react';
import { connect } from 'react-redux';
import './product.css'
import { Link } from 'react-router-dom';
import TabBar from '../tabbar/tabbar'
import ReactPullLoad, { STATS } from 'react-pullload'
import '../../../node_modules/react-pullload/dist/ReactPullLoad.css'
import axios from 'axios'
//定义组件
class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            priceUp: 1,//价格排序
            navbarActive: 1,  //导航激活状态
            hasMore: true,
            action: STATS.init,
            pageNum:1
        }
        // this.handelHot = this.handelHot.bind(this)
        // this.priceChange = this.priceChange.bind(this)
        // this.handelScreenModal = this.handelScreenModal.bind(this)
        // this.handelSearch = this.handelSearch.bind(this)
    }
    //页面挂载完成
    componentDidMount() {
        console.log(this)
        const {pageNum} = this.props
        axios({
            method:'GET',
            url:'/api/index.php?r=product/list&type=1&source=miniProgram&order=3&page='+pageNum,
        }).then(res=>{
            var data = res.data;
            console.log(data)
        })
    }
    handelHot = () => { //热门
        this.setState({
            navbarActive: 1
        })
    }
    priceChange = () => { //价格排序方法
        console.log(this.state.priceUp)
        var priceUp = this.state.priceUp;
        if (priceUp === 1) {
            priceUp = 2
        } else if (priceUp === 2) {
            priceUp = 1
        }
        this.setState({
            priceUp: priceUp,
            navbarActive: 2
        })
    }
    handelScreenModal = () => { //筛选
        this.setState({
            navbarActive: 3
        })
    }
    handelSearch = () => { //搜索
        this.setState({
            navbarActive: 4
        })
    }
    handleAction = (action) => {
        console.info(action, this.state.action, action === this.state.action);
        //new action must do not equel to old action
        if (action === this.state.action) {
            return false
        }
        if (action === STATS.refreshing) {
            this.handRefreshing();
        } else if (action === STATS.loading) {
            this.handLoadMore();
        } else {
            //DO NOT modify below code
            this.setState({
                action: action
            })
        }
    }

    handRefreshing = () => {
        if (STATS.refreshing === this.state.action) {
            return false
        }

        setTimeout(() => {
            //refreshing complete
            console.log(122)
            this.setState({
                hasMore: true,
                action: STATS.refreshed,
            });
        }, 3000)

        this.setState({
            action: STATS.refreshing
        })
    }

    handLoadMore = () => {
        console.log(STATS.loading,this.state.action)
        if (STATS.loading === this.state.action) {
            return false
        }
        //无更多内容则不执行后面逻辑
        if (!this.state.hasMore) {
            return;
        }

        this.setState({
            action: STATS.refreshed,
            hasMore:true
        })
    }
    render() {
        const { hasMore } = this.props
        return (
            <div id='product_list'>
                <div id='navbar' className='boxS'>
                    <div className={this.state.navbarActive === 1 ? 'navbarItem active' : 'navbarItem'} onClick={this.handelHot}>热门</div>
                    <div className='navbarItem boxS' onClick={this.priceChange}>
                        <div style={{ marginRight: 6 }} className={this.state.navbarActive === 2 ? 'active' : ''}>价格</div>
                        <div className='priceIcon boxC'>
                            <div style={{ marginBottom: -22 }}>
                                <img src={this.state.priceUp === 1 ? "http://www.shangyibazaar.com/WeChatMiniProgram/images/ysp/上三角-中.png" : "http://www.shangyibazaar.com/WeChatMiniProgram/images/ysp/上三角-未.png"} width='12' height='6' alt=''></img>
                            </div>
                            <div>
                                <img src={this.state.priceUp === 2 ? "http://www.shangyibazaar.com/WeChatMiniProgram/images/ysp/下三角-中.png" : "http://www.shangyibazaar.com/WeChatMiniProgram/images/ysp/下三角-未.png"} width='12' height='6' alt=''></img>
                            </div>
                        </div>
                    </div>
                    <div className='navbarItem' onClick={this.handelScreenModal}>
                        <div style={{ marginRight: 12 }} className={this.state.navbarActive === 3 ? 'active' : ''}>筛选</div>
                        <img src={'http://www.shangyibazaar.com/upload/common/screen-yes.png'} width='20' height='22' alt=''></img>
                    </div>
                    <div className='navbarItem' onClick={this.handelSearch}>
                        <img src={'http://www.shangyibazaar.com/upload/common/search.png'} width='30' height='30' style={{ verticalAlign: 'middle' }} alt=''></img>
                    </div>
                </div>
                <div id='list'>
                    <div>
                        
                        <ReactPullLoad
                            downEnough={100}
                            action={this.state.action}
                            handleAction={this.handleAction}
                            hasMore={hasMore}
                            style={{ paddingTop: 50 }}
                            distanceBottom={10}>
                            <div>123</div>
                        </ReactPullLoad>
                    </div>
                </div>
                <TabBar></TabBar>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)