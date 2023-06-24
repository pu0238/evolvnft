export function applyDecimal(number: BigInt, decimals = 18) {
    let stringNumber = number.toString();
    const numLen = stringNumber.length

    if (numLen <= decimals) {
        let zero = '0'
        for (let i = 0; i < decimals - numLen; i++) {
            zero += '0'
        }
        stringNumber = zero + stringNumber
        const decimalPoint = stringNumber.length - decimals
        return stringNumber.slice(0, decimalPoint) + '.' + stringNumber.slice(decimalPoint)
    } else{
        const decimalPoint = stringNumber.length - decimals
        return stringNumber.slice(0, decimalPoint) + '.' + stringNumber.slice(decimalPoint)
    }
}