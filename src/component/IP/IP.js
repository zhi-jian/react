import React, { Component } from 'react';
import './IP.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactPullLoad, { STATS } from 'react-pullload'
import '../../../node_modules/react-pullload/dist/ReactPullLoad.css'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'
import Header from '../header/header'
import index from '../index';
//定义组件
class IP extends Component {
    constructor(props) {
        super(props)
        this.state = {
            priceUp: 1,//价格排序
            navbarActive: 1,  //导航激活状态
            hasMore: true,
            action: STATS.init,
            pageNum: 1,
            bigList: 1,
            urlParam: 'index.php?r=product/list&source=miniProgram&order=0&page=',
            lists: [],
            right: false,
            categoryLists: [],
            cId: 0,
            themeLists: [],
            tId: 0
        }
        // this.handelHot = this.handelHot.bind(this)
        // this.priceChange = this.priceChange.bind(this)
        // this.handelScreenModal = this.handelScreenModal.bind(this)
        // this.handelSearch = this.handelSearch.bind(this)
    }
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    getList(params) {

        var pageNum = this.state.pageNum;
        var urlParam = this.state.urlParam;
        axios({
            method: 'GET',
            url: '/api/' + urlParam + pageNum,
        }).then(res => {
            var data = res.data;
            console.log(data)
            var tLists = data.theme_list;
            tLists.shift()
            this.setState({
                lists: data.product,
                categoryLists: data.category_list,
                themeLists: tLists
            })
        })
    }
    //页面挂载完成
    componentDidMount() {
        var rUrl = this.props.match.path;
        if (rUrl === '/IP') {
            sessionStorage.setItem('headerTitle', '艺术IP库')
        }
        console.log(this)
        this.getList();
    }
    handelNew = () => {
        window.scrollTo(0, 0)
        this.setState({
            navbarActive: 1,
            urlParam: 'index.php?r=product/list&source=miniProgram&order=0&page=',
            pageNum: 1,
        })
        var pageNum = 1;
        var urlParam = 'index.php?r=product/list&source=miniProgram&order=0&page=';
        axios({
            method: 'GET',
            url: '/api/' + urlParam + pageNum,
        }).then(res => {
            var data = res.data;
            console.log(data)
            this.setState({
                lists: data.product
            })
        })
    }
    handelHot = () => { //热门
        window.scrollTo(0, 0)
        this.setState({
            navbarActive: 2,
            urlParam: 'index.php?r=product/list&source=miniProgram&order=3&page=',
            pageNum: 1,
        })
        var pageNum = 1;
        var urlParam = 'index.php?r=product/list&source=miniProgram&order=3&page=';
        axios({
            method: 'GET',
            url: '/api/' + urlParam + pageNum,
        }).then(res => {
            var data = res.data;
            console.log(data)
            this.setState({
                lists: data.product
            })
        })
    }

    handelScreenModal = () => { //筛选
        var isRight = this.state.right
        this.setState({
            navbarActive: 3,
            right: !isRight
        })

    }
    handelSearch = () => { //搜索
        this.setState({
            navbarActive: 4
        })
    }
    handelTabs = () => {
        var bigList = this.state.bigList;
        if (bigList === 1) {
            bigList = 2
        } else if (bigList === 2) {
            bigList = 1
        }
        this.setState({
            bigList: bigList
        })
    }
    handleAction = (action) => {
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
        this.setState({
            action: STATS.refreshing
        })
        var pageNum = this.state.pageNum;
        var urlParam = this.state.urlParam;
        var lists = this.state.lists;
        axios({
            method: 'GET',
            url: '/api/' + urlParam + pageNum,
        }).then(res => {
            var data = res.data;
            console.log(data)
            this.setState({
                lists: lists,
                hasMore: true,
                action: STATS.refreshed,
            })
        })
    }

    handLoadMore = () => {
        // console.log(STATS.loading, this.state.action)
        if (STATS.loading === this.state.action) {
            return false
        }
        //无更多内容则不执行后面逻辑
        if (!this.state.hasMore) {
            return;
        }
        this.setState({
            hasMore: true,
            action: STATS.loading,
        });
        var pageNum = this.state.pageNum;
        if (pageNum === 1) {
            pageNum = 2
        }
        var urlParam = this.state.urlParam;
        var lists = this.state.lists;
        axios({
            method: 'GET',
            url: '/api/' + urlParam + pageNum,
        }).then(res => {
            var data = res.data;
            console.log(data)
            if (pageNum >= data.pages.totalPage) {
                this.setState({
                    lists: lists,
                    hasMore: false,
                    pageNum: pageNum,
                    action: STATS.reset,
                })
            } else {
                pageNum++;
                this.setState({
                    lists: lists.concat(data.product),
                    hasMore: true,
                    pageNum: pageNum,
                    action: STATS.reset,
                })
            }

        })
    }
    chooseCategory = (e) => {
        this.setState({
            cId: e.target.getAttribute('data-cid')
        })
    }
    chooseTheme = (e) => {
        this.setState({
            tId: e.target.getAttribute('data-tid')
        })
    }
    clearScreenModal=()=>{
        this.setState({
            cId:0,
            tId: 0
        })
    }
    submitScreenModal=()=>{
        var cid = this.state.cId,tid = this.state.tId;
        window.scrollTo(0, 0)
        this.setState({
            urlParam:'index.php?r=product/list&source=miniProgram&page='+pageNum+'&cid=' + cid + '&theme=' + tid
        })
        var pageNum = 1;
        var urlParam = 'index.php?r=product/list&source=miniProgram&page='+pageNum+'&cid=' + cid + '&theme=' + tid;
        axios({
            method: 'GET',
            url: '/api/' + urlParam,
        }).then(res => {
            var data = res.data;
            this.setState({
                lists: data.product,
                right:false,
                cId:0,
                tId:0
            })
        })
    }
    render() {
        const { hasMore } = this.props
        return (
            <div id='IP'>
                <Header></Header>
                <div id='navbar' className='boxS'>
                    <div className='navBar_list'>
                        <div className={this.state.navbarActive === 1 ? 'navbarItem active' : 'navbarItem'} onClick={this.handelNew}>最新</div>
                        <div className={this.state.navbarActive === 2 ? 'navbarItem active' : 'navbarItem'} onClick={this.handelHot}>热门</div>
                        <div className='navbarItem' onClick={this.handelScreenModal}>
                            <div style={{ marginRight: 12 }} className={this.state.navbarActive === 3 ? 'active' : ''}>筛选</div>
                            <img src={'http://www.shangyibazaar.com/upload/common/screen-yes.png'} width='20' height='22' alt=''></img>
                        </div>
                        <div className='navbarItem' onClick={this.handelSearch}>
                            <img src={'http://www.shangyibazaar.com/upload/common/search.png'} width='30' height='30' style={{ verticalAlign: 'middle' }} alt=''></img>
                        </div>
                    </div>
                    <div className='tabBtn boxStart' onClick={this.handelTabs}>
                        <img src={this.state.bigList === 1 ? 'http://www.shangyibazaar.com/WeChatMiniProgram/images/ysIP/列表icon@3x.png' : 'http://www.shangyibazaar.com/WeChatMiniProgram/images/ysIP/方片列表icon@3x.png'} width='30' height='30' style={{ verticalAlign: 'middle' }} alt=''></img>
                    </div>
                </div>

                {this.state.bigList === 1 &&
                    <div id='bigList'>
                        <ReactPullLoad
                            downEnough={100}
                            action={this.state.action}
                            handleAction={this.handleAction}
                            hasMore={hasMore}
                            style={{}}
                            distanceBottom={100}>
                            <div className='tjpro-content' style={{ padding: 0 }}>
                                {this.state.lists.map((item, idx) => {
                                    return (
                                        <div className='item' key={idx}>
                                            <Link to={"/detail/"+item.product_id}>
                                                <div className='tuijian-bigimg'>
                                                    <img src={"/api/" + item.products_img_url} width='100%' />
                                                    <div className='bigimg-text boxS'>
                                                        <div className='text-name'>{item.products_name}</div>
                                                        <div className='text-info'>{item.category_name}</div>
                                                    </div>
                                                </div>
                                                <div className='tuijian-art'>
                                                    <div className='art-left'>
                                                        <img src={"/api/" + item.user_avatar} className='artleft-img' />
                                                        <div className='artleft-name'>{item.user_name}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </ReactPullLoad>
                        {!this.state.hasMore &&
                            <div id="onBottom">---------------     到底啦     ---------------</div>
                        }
                    </div>
                }
                {this.state.bigList === 2 &&
                    <div id='list'>
                        <ReactPullLoad
                            downEnough={100}
                            action={this.state.action}
                            handleAction={this.handleAction}
                            hasMore={hasMore}
                            style={{}}
                            distanceBottom={100}>
                            <div className='tjpro-content' style={{ padding: 0 }}>
                                {this.state.lists.map((item, idx) => {
                                    return (
                                        <div className='item' key={idx} style={{ marginLeft: 22 + 'px', marginBottom: 22 + 'px' }}>
                                            <Link to={"/detail/"+item.product_id}>
                                                <div className='tjpro-item-img boxC' style={{ width: 340, height: 340, overflow: 'hidden' }}>
                                                    <img src={"/api/" + item.products_img_url} style={{ width: 340 }}></img>
                                                </div>
                                                <div className='tjpro-item-info'>
                                                    <div className='item-info-name'>{item.products_name}</div>
                                                    <div className='boxS'>
                                                        <div className='item-info-type boxS'>
                                                            <div>{item.user_name}</div>/
                                                            <div>{item.category_name}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </ReactPullLoad>
                        {!this.state.hasMore &&
                            <div id="onBottom">---------------     到底啦     ---------------</div>
                        }
                    </div>
                }
                <Drawer anchor="right" open={this.state.right} >
                    <div
                        tabIndex={0}
                        role="button"

                        style={{ width: 580, zIndex: 10 }}
                        id='screenModal'
                    >
                        <div>
                            <div className="screen_modal_title boxStart">
                                <div className="boxC"><img src={'http://www.shangyibazaar.com/WeChatMiniProgram/images/ysIP/biaoqian@3x.png'} alt='' width='24' height='24' /></div>
                                <div className="title_text boxC">艺术类别</div>
                            </div>
                            <div className="screem_modal_list boxStart">
                                {this.state.categoryLists.map((item, idx) => {
                                    return (
                                        <div key={idx} onClick={this.chooseCategory} data-cid={item.category_id}
                                            className={this.state.cId == item.category_id ? 'modal_list_item modal_list_itemActive boxC' : 'modal_list_item boxC'}
                                        >{item.category_name}</div>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <div className="screen_modal_title boxStart">
                                <div className="boxC"><img src={'http://www.shangyibazaar.com/WeChatMiniProgram/images/ysIP/biaoqian@3x.png'} alt='' width='24' height='24' /></div>
                                <div className="title_text boxC">艺术主题</div>
                            </div>
                            <div className="screem_modal_list boxStart">
                                <div onClick={this.chooseTheme} data-tid={0}
                                    className={this.state.tId == 0 ? 'modal_list_item modal_list_itemActive boxC' : 'modal_list_item boxC'}
                                >全部</div>
                                {this.state.themeLists.map((item, idx) => {
                                    return (
                                        <div key={idx} onClick={this.chooseTheme} data-tid={item.theme_id}
                                            className={this.state.tId == item.theme_id ? 'modal_list_item modal_list_itemActive boxC' : 'modal_list_item boxC'}
                                        >{item.theme_name}</div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="screenBtns boxS">
                            <div id="clearScreenModal" className="boxC" onClick={this.clearScreenModal}>清除选项</div>
                            <div id="screenModalSbumit" className="boxC" onClick={this.submitScreenModal}>确定</div>
                        </div>
                    </div>
                </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(IP)