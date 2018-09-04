import React from 'react';
import { connect } from 'react-redux';
import TabBar from '../tabbar/tabbar'

// 定义组件
class My extends React.Component{
    
    render (){
        return (
            <div id='cart'>
                <h1>this is page my</h1>
                <TabBar></TabBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        
    }
}
//映射Redux actions到组件的属性 
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        
    }
}

//连接组件
export default connect(mapStateToProps, mapDispatchToProps)(My)