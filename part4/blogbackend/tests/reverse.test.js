const {test}=require('node:test')
const assert=require('node:assert')

const reverse=require('../utils/for_tests').reverseString

test('reverse of a',()=>{
    result=reverse('a')
    assert.strictEqual(result,'a')
})

test('reverse of AbC123',()=>{
    result=reverse('AbC123')
    assert.strictEqual(result,'321CbA')
})

test('reverse of racecar',()=>{
    result=reverse('racecar')
    assert.strictEqual(result,'racecar')
})