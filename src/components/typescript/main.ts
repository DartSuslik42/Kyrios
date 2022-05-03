//CMD : tsc src\typescript\main.ts
//      node src\typescript\main.js

// Объявление переменной
    // (const/var/let) Name : Type = Initialization(required for const)
    const constName: string = "hello world"

// Типы данных
    const isBool : boolean = true
    const isInt : number = 3.2
    const isString : string = "Here I'm"

    // Array
    const isIntArray : number[] = [1, 2, 3]
    const isIntArray2 : Array<number> = [1, 2, 3] // Generic Types

    // Tuple - массив из разных типов данных
    const isTuple : [string, number] = ["42", 42]

    // Any - функционал let
    let isAnything : any = 42
        //...
    isAnything = "42"

    // Void - функционал undefined
    function makeRequest(request : string) : void {
        console.log(request)
    }

    // Never -  1) ф-я возвращает ошибку и никогда не заканчивает выполнение
    //          2) ф-я постоянно что-то делает
    function renderWindow() : never {
        while (true){}
    }

    // Алиасы для примитивов / создание собственных приметивов
        // Тип принемает значение одного приметива
        type Name = string
        const name : Name = "myName"

        // Тип принемает значение нескольких приметивов
        type ID = string | number
        const id : ID = 42

export {}