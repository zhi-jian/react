import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './detail.css'
import ReactPullLoad, { STATS } from 'react-pullload'
import '../../../node_modules/react-pullload/dist/ReactPullLoad.css'
import axios from 'axios'
import Header from '../header/header'
import IP from '../IP/IP';

//定义组件
class Detail extends Component {
    constructor(props) {
        super(props)
        this.state={
            detail:{},
            userInfo:{}
        }

    }
    componentDidMount() {
        console.log(this)
        console.log(this.props.match.params.id)
        var IPId = this.props.match.params.id;
        axios({
            method:'GET',
            url:'/api/index.php?r=product/detail&source=miniProgram&product_id='+IPId,
        }).then(res=>{
            console.log(res)
            var data = res.data;
            this.setState({
                detail:data.info,
                userInfo:data.user_info
            })
        })
    }
    render() {
        var detail = this.state.detail,
            userInfo = this.state.userInfo
        return (
            <div id='detail'>
                <Header></Header>
                <div id='main' style={{ background: '#fff', textAlign: 'center', height: '100%' }}>
                    <div id='proImg'>
                        <div className='mainImg' style={{height:'100%'}}>
                            <img src='' width='100%' height='100%'></img>
                        </div>
                    </div>
                    <div id='proInfo'>
                        <div className='proInfo-name'>{detail.products_name}</div>
                        <div className='proInfo-ac'>
                            <div className='proInfo-art'>作者：{userInfo.user_nick_name}</div>
                        </div>
                        <div className='proInfo-type'> / {detail.products_length} / {detail.products_creation_time}</div>
                    </div>
                    <div className='buyhr'></div>
                    <div id='art'>
                        <div className='art_content'>
                            {/* <div className='art_info boxS'>
                                <Link to="{path:'detail',name:'detail',params:{id:''}}" className='boxS'>
                                    <img src='baseUrl+detail.user_info.user_avatar' className='tx'></img>
                                    <div className='name'>{detail.user_info.user_nick_name}</div>
                                    <div className='procount boxC'>{IPCount.length}件作品</div>
                                    <div className='yspcount boxC' v-if="proCount.length>0">{proCount.length}个衍生品</div>
                                </Link>
                            </div> */}
                            {/* <div className='art_introduce'>
                                <div className='art_introduce_resume'>{artistResume}</div>
                                <div className='art_introduce_exhibition'>
                                    <div v-for="(item,idx) in artistExhibition" key="idx">
                                        <div>{item}</div>
                                    </div>
                                    <div v-else-if="" className='art_introduce_exhibition' style="color:#bbb;">艺术家展览未知</div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div id='detailImg'>
                        <div className='d_title'>
                            <div className='d_title_icon'></div>
                            <div className='d_title_text'>IP细节展示</div>
                        </div>
                        <div className='detailImg_content'>
                            <div>
                                <div><img src='baseUrl + item' width='351px'></img></div>
                            </div>
                        </div>
                    </div>
                    <div id='artEvent'>
                        <div className='d_title'>
                            <div className='d_title_icon'></div>
                            <div className='d_title_text boxS'>
                                艺术家大事件
                        <div className='d_title_text_dot'></div>
                                {/* <div className='d_title_text_artName'>{detail.user_info.user_nick_name}</div> */}
                            </div>
                        </div>
                        {/* <div className='artEvent_content'>{artistEvent}</div> */}
                    </div>
                    <div id='tjpro'>
                        <div className='tjpro-title boxC'>／／ 推荐作品 ／／</div>
                        <div className='tjpro-content'>
                            {/* <div >
                                <Link to="{path:'detail',name:'detail',params:{id:item.products_id}}">
                                    <div style='margin-bottom:7px;'>
                                        <div className='tjpro-item-img' style={{ width: '184px', height: '184px', overflow: 'hidden' }}>
                                            <img src='baseUrl + item.products_img_url' width='184px' height='184px'></img>
                                        </div>
                                        <div className='tjpro-item-info'>
                                            <div className='item-info-name'>{item.products_name}</div>
                                            <div className='item-info-type'>{item.products_description} / {item.products_creation_time}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div id='bottomBtn' className='boxS'>
                    <button> IP衍生定制</button>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail)