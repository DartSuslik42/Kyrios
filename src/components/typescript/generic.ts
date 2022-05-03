const arrayOfNumbers: Array<number> = [1, 2, 3]

// Шаблонизирование
function reverse<T>(array: T[]): T[]{
    return array.reverse()
}