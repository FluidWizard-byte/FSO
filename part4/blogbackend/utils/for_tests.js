const reverseString=(stringVal)=>{
    return stringVal
    .split('')
    .reverse()
    .join('')

}

const average=(numberList)=>{
    const total=numberList.reduce((sum,num)=>{
        return sum+num
    },0)
    return numberList.length===0?0: total/numberList.length
}

module.exports={
    reverseString,
    average,
}