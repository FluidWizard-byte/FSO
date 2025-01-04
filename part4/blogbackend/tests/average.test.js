const {test, describe}=require('node:test')

const assert=require('node:assert')

const average=require('../utils/for_tests').average

describe('Average ',()=>{
    test('value for sigle element array is the value',()=>{
        result=average([100])
        assert.strictEqual(result,100)
    })

    test('of many is calculated right', () => {
        assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5)
    })
    
    test('of empty array is zero', () => {
        assert.strictEqual(average([]), 0)
    })
})
