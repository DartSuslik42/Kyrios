export default function (number){
    if (!number) return ''
    return new Intl.NumberFormat('ru-RU',{
        minimumIntegerDigits : 1,
        minimumFractionDigits : 2,
    }).format(number.toPrecision(4))
}