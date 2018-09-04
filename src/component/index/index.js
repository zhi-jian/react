import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css'
import { changeTextAction, buttonClickAction } from '../../action/action.js'
import { Link } from 'react-router-dom';
import TabBar from '../tabbar/tabbar'
import axios from 'axios'
import { Carousel } from 'element-react';
import 'element-theme-default';
import arrowRightIcon from '../../iconImg/arrowRight.png'
//定义组件
class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bannerAds: [],
            ficationList: [
                {
                    id: "1",
                    routerTo: "product",
                    url: "https://www.shangyibazaar.com/upload/productIcon.png",
                    title: "衍生品"
                },
                {
                    id: "2",
                    routerTo: "outfit",
                    url: "https://www.shangyibazaar.com/upload/outfitIcon.png",
                    title: "软装+版权"
                },
                {
                    id: "3",
                    routerTo: "VI",
                    url: "https://www.shangyibazaar.com/upload/VIIcon.png",
                    title: "企业VI"
                },
                {
                    id: "4",
                    routerTo: "merchant",
                    url: "https://www.shangyibazaar.com/upload/merchantIcon.png",
                    title: "合作商"
                }
            ],
            zypro: [],
            hzartPro: [],
            videoList: [],
            artistInfo: {},
            artistProductList: [],
            hotRecommendList: []
        }
    }
    componentDidMount() {
        window.scrollTo(0,0)
        axios({
            method: 'GET',
            url: '/api/api.php?r=home/index&test=1&source=miniProgram',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }).then(res => {
            console.log(res.data)
            const data = res.data;
            const artistId = data.artist[0].artist_id;
            this.setState({
                bannerAds: data.banner_ads,
                zypro: data.recommend_list.微信小程序兿自营,
                hzartPro: data.recommend_list.微信小程序合作艺术家的衍生品,
                videoList: data.video,
                hotRecommendList: data.recommend_list.微信小程序热门推荐
            })
            //艺术家推荐，获取艺术家详情
            axios({
                method: 'GET',
                url: '/api/index.php?r=artist/detail&source=miniProgram&id=' + artistId
            }).then(res => {
                const data = res.data;
                // console.log(data)
                this.setState({
                    artistInfo: data.artist_detail,
                    artistProductList: data.product_list
                })
            })
        })
    }
    render() {
        var ficitiousStyle = {
            marginBottom: '0'
        }
        return (
            <div id="home_main">
                <div className="swiperList">
                    <Carousel height="500px" arrow="always">
                        {
                            this.state.bannerAds.map((item, index) => {
                                return (
                                    <Carousel.Item key={index}>
                                        <img src={'/api/' + item.ad_image} alt=''></img>
                                        <h3>{item.ad_image}</h3>
                                    </Carousel.Item>
                                )
                            })
                        }
                    </Carousel>
                </div>
                <div id="top_main">
                    {/* <!-- 四个分类图标 --> */}
                    <div id="classfication" className="boxS">
                        {
                            this.state.ficationList.map((item, idx) => {
                                return (
                                    <div className="fication_item" key={item.id}>
                                        <Link to={'/' + item.routerTo}>
                                            <img src={item.url} alt="" />
                                            <div className="fication_item_text">{item.title}</div>
                                        </Link>
                                    </div>
                                )
                            })

                        }
                    </div>
                    <div id="top_main_middle">
                        {/* <!-- 独家设计 艺术家 IP库 --> */}
                        <Link to="/fictitious" className="boxC">
                            <div id="fictitious" className="box">
                                <div className="introduce_title" style={ficitiousStyle}>独家设计</div>
                                <div className="introduce_content">精挑细选  随心定制</div>
                            </div>
                        </Link>
                        <div className='boxStart'>
                            <Link to="/artist" className="boxC">
                                <div id='top_artist'>
                                    <div className='introduce'>
                                        <div className='introduce_title'>艺术家</div>
                                        <div className='introduce_content'>大师荟萃 精彩纷呈</div>
                                    </div>
                                </div>
                            </Link>
                            <div id='top_IPpro'>
                                <Link to="/IP">
                                    <div className='introduce'>
                                        <div className='introduce_title'>艺术IP库</div>
                                        <div className='introduce_content'>寻找您最钟意的IP，定制衍生～</div>
                                    </div>
                                </Link>
                            </div >
                        </div >
                    </div >
                    {/* < !--上兿自营 --> */}
                    < div id='zypro' >
                        <div className='zypro-all zypro-allcolor'>
                            <Link to="/product" className='zy-alltext'>
                                <div className='zy-allname'>兿自营</div>
                                <div className='zy-allhr'></div>
                                <div className='zy-alllook'>查看全部</div>
                            </Link>
                        </div >
                        {this.state.zypro.map((item, idx) => {
                            return (
                                <div className="zypro_itme" key={idx}>
                                    <Link to={"/productDetail" + item.product_url}>
                                        <div className='zypro-all'>
                                            <img src={'/api/' + item.product_image} alt=''></img>
                                            <div className='zy-model'>￥{item.product_price}</div>
                                        </div>
                                    </Link>
                                </div >
                            )
                        })}

                    </div >
                </div >
                {/* 合作艺术家的衍生品 */}
                < div id='hzatr-pro' >
                    <Link to="{path: 'product',name:'product'}">
                        <div className='hzatr-protitle'>
                            <div>合作艺术家的衍生品</div>
                            <img src={arrowRightIcon} width='12px' height='22px' alt=''></img>
                        </div>
                    </Link>
                    <div className='hzatr-pro'>
                        {this.state.hzartPro.map((item, idx) => {
                            return (
                                <div className="hzart_pro_item" key={idx}>
                                    <Link to={"/productDetail" + item.product_url}>
                                        <div className='hzatr-proall'>
                                            {/* <!-- <div className='hzatr-proall-top'>￥{{ item.price }}</div> --> */}
                                            <img src={'/api/' + item.product_image} className='proall-topimg' alt=''></img>
                                            <div className='hzatr-proall-bottom'>
                                                <div className='hzatr-proall-bottomname'>{item.artist_name}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div >
                            )
                        })}

                    </div >
                </div >
                {/* < !--上兿视频 --> */}
                < div id='syVideo' >
                    <Link to={'/video'}>
                        <div className='hzatr-protitle'>
                            <div>上艺视频</div>
                            <img src={arrowRightIcon} width='12px' height='22px' alt=''></img>
                        </div>
                    </Link>
                    <div className='hzatr-pro'>

                        {this.state.videoList.map((item, idx) => {
                            return (
                                <Link to={'/video'} key={idx}>
                                    <div className='videoItem'>
                                        <div className='videoItem_img'>
                                            <img src={'/api/' + item.video_image} className='video-topimg' width='300' height='168' alt=''></img>
                                        </div>
                                        <div className='video-bottom'>
                                            <div className='video-bottom'>{item.video_name}</div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div >
                </div >
                {/* < !--作者介绍 --> */}
                < div id='artist' >
                    <Link to={'/artistDetail'}>
                        <div className='artist-info'>
                            <div className='info-pimg'>
                                <img src={'/api/' + this.state.artistInfo.user_avatar} alt=''></img>
                            </div>
                            <div className='info-interduce'>
                                <div className='interduce-top'>
                                    <div className='boxStart'>
                                        <div className='top-name'>{this.state.artistInfo.artist_name}</div>
                                        <div className='top-tuijian boxC'>推荐</div>
                                        <div className='top-procoutent boxC'>{this.state.artistInfo.product_count}件作品</div>
                                    </div>
                                </div>
                                <div className='interduce-bottom'>{this.state.artistInfo.artist_resume}</div>
                            </div>
                        </div>
                    </Link>

                    <div className='artist-pro'>
                        {this.state.artistProductList.map((item, idx) => {
                            return (
                                <Link to={'/detail/'+item.product_id} key={idx}>
                                    <div className='pro-img boxC'>
                                        <img src={'/api/' + item.products_img_url} alt=''></img>
                                    </div>
                                </Link>
                            )
                        })}
                    </div >
                </div >
                {/* < !--热门推荐 --> */}
                < div id='rmtuijian'>
                    <div className='tuijian-brand'>
                        <div className='brand-hr'></div>
                        <div className='brand-text'>热门推荐</div>
                    </div>
                    {this.state.hotRecommendList.map((item, idx) => {
                        return (
                            <Link to={'/detail/'+item.product_url} key={idx}>
                                <div className='tuijianItem'>
                                    <div className='tuijian-bigimg'>
                                        <img src={'/api/'+item.product_image} alt='' />
                                        <div className='bigimg-text boxS'>
                                            <div className='text-name'>{item.product_name}</div>
                                            <div className='text-info'>
                                                <div className='info-info'>{item.category_name}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='tuijian-art'>
                                        <div className='art-left'>
                                            <img src={'/api/'+item.artist_avatar} className='artleft-img' alt='' />
                                            <div className='artleft-name'>{item.artist_name}</div>
                                        </div>
                                        <div className='art-right'></div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}


                </div >
                <TabBar></TabBar>
            </div >
        );

    }
}

const mapStateToProps = (state) => {
    return {
        text: state.title.text
    }
}
//映射Redux actions到组件的属性
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onButtonClick: () => {
            dispatch(buttonClickAction())
        },
        onChangeText: () => dispatch(changeTextAction())
    }
}

//连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Index)


