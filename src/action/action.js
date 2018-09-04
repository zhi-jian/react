//action
const CHANGE_TEXT = 'CHANGE_TEXT';
const BUTTON_CLICK = 'BUTTON_CLICK'

 export function changeTextAction (){
    return {
        type:CHANGE_TEXT
    }
    
}
export function buttonClickAction () {
    return {
        type:BUTTON_CLICK
    }
    
}

