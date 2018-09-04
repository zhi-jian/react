const intialState = {
    text: '这是test2页面'
}

export const content = (state = intialState, action) => {
    switch (action.type) {
        case 'TEST2TEXT':
            return {
                text: state.text === '这是test2页面' ? '这就是test2页面哈哈哈哈哈' : '这就是test2页面'
            }
        case 'TEST2BTN':
            return {
                text: state.text = '这是test2页面'
            }
        default:
            return intialState
    }
}  