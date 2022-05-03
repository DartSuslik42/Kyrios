//CMD : tsc src\typescript\interface.ts
//      node src\typescript\interface.js

// Создание интерфейсов
interface Rectangle {
    readonly id : string // readonly - поле только для чтения
    color ?: string // ?: - необязательный параметр
    size : {
        width : number
        height : number
    }
}

//Создание объектов на основе интерфейса
const rect : Rectangle = {
    id : "42",
    size : {
        width : 42,
        height : 42
    }
}
rect.color = "now i'm Black"
const rectWithColor : Rectangle = {
    id : "42",
    size : {
        width : 42,
        height : 42
    },
    color : "red",
}

// Приведение типов объектов
const rect2_1 = {} as Rectangle
const rect2_2 = <Rectangle>{}

// ==========================

// Наследование интерфейсов
interface RectWithArea extends Rectangle{
    getArea : () => number  // Поле типа "стрелочная функция, возвращающая number"
}
const rectWithArea : RectWithArea = {
    id : "42",
    size : {
        width : 42,
        height : 42
    },
    getArea():number {
        return this.size.width * this.size.height
    }
}

// ==============================
// Интерфейсы и классы

interface IClock {
    time : Date,
    setTime(date : Date): void
}

class Clock implements IClock {
    time : Date = new Date()
    setTime(date: Date): void{
        this.time = date
    }
}

// ===============================
// Интерфейсы с большим кол-вом полей

interface ICSSStyles_bad {
    margin : string
    padding : string
    //...
}
interface ICSSStyles {
    [key : string] : string
}
const tableStyle : ICSSStyles = {
    margin : "10px"
    // ...
}