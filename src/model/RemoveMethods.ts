// Деструктуризирует массив ключей класса <T>, создавая объект из ключе, не являющимися функциями.
type NonMethodKeys<T> =
    {
        [P in keyof T]: T[P] extends Function ? never : P
    }[keyof T];

// Создаёт тип данных, который включает в себя только НЕ функциональные поля класса <T>
export type RemoveMethods<T> = Pick<T, NonMethodKeys<T>>;