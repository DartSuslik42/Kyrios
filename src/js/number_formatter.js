export default function (number){
    if (number === null) return ''
    return new Intl.NumberFormat('ru-RU',{
        minimumIntegerDigits : 1,
        minimumFractionDigits : 2,
        maximumFractionDigits : 2,
    }).format(number.toPrecision(4))
}