interface Person{
    name : string,
    age : number,
}

type PersonKeys = keyof Person
let myName: PersonKeys = 'name'
myName = 'age'
// myName = 'haha' // error

type User = {
    _id: number
    pass: string
    name: string
}

type UserKeysNoMeta1 = Exclude<keyof User, '_id' | 'pass'> // принимает значения ключей User, но НЕ "_id" & "pass"
type UserKeysNoMeta2 = Pick<User, 'name'> // принимает только значение "name"