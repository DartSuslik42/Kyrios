class myClass {
    classField : string

    constructor(classField : string){
        this.classField = classField
    }

    classMethod(param : string): string{
        return this.classField + param
    }
}

class Car {
    readonly model_1 : string
    // readonly model_2 : string
    readonly creationDate : Date

    constructor(model_1 : string, readonly model_2 : string) {
        this.model_1 = model_1
        this.creationDate = new Date()
    }
}

// Модификаторы доступа

class Animal {
    protected voice : string = ""
    public color : string = "black"

    private walk() {
        console.log("walking")
    }
}
class Cat extends Animal {
    public setVoice(voice:string):void{
        this.voice = voice
    }
}
const cat = new Cat()
// cat.go - нет такого свойства, тк private поля не наследуются
// cat.voice - не доступен вне декларации класса (protected)

// Абстрактные классы
abstract class Component{
    abstract render(): void
    abstract info(): string
}
class AppComponent extends Component{
    render() {
    }
    info(): string {
        return "";
    }
}