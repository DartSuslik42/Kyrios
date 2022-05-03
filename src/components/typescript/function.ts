// Простое определение функции
function sum(a : number, b : number) : number {
    return a + b
}

// У переменных можно вызывать прототипныме методы
function correctTitle(a:string):string{
    return a.trim().toLowerCase()
}

// Перегрузка функции
interface MyPosition{
    x : number | undefined,
    y : number | undefined,
}
interface MyPositionWithDefault extends MyPosition{
    default : string,
}
function position(): MyPosition
function position(a : number): MyPositionWithDefault
function position(a : number, b: number): MyPosition

function position(a?:number, b?:number){
    if(!a && !b){
        return {x: undefined, y: undefined}
    }
    if(a && !b){
        return {x: a, y: undefined, default: a.toString()}
    }
    return {x: a, y: b}
}
