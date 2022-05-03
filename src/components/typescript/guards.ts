function doSomething(x: string|number){
    if (typeof x === "number"){
        return 0
    }
    return "0"
}

class myClass{
    header = 'class header'
    result = 'class result'
}
class myError{
    header = 'error header'
    message = 'error message'
}
function handler(res : myClass|myError):string{
    if (res instanceof myClass){
        return res.result
    }else{
        return res.message
    }
}

//===================

type AlertType = 'success' | 'danger' | 'warning'

function setAlertType(type : AlertType){
    //...
}

setAlertType('success')
// setAlertType('warning____') // error

