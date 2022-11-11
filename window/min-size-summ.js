/*
  Given an array of positive integers nums and a positive integer target, find the window size of the shortest contiguous subarray whose sum is greater than or 
  equal to the target value. If no subarray is found, 0 is returned.

  As we use a fixed size array and slide a specific size of the window over the whole array, the time complexity of this solution is O(n).
*/

import {errorWrapper} from '../utils/error-wrapper.js'

const formatSubstr = (desc, arr) => {
  const { left, right, size } = desc
  if (!size)
    return ''

  return arr.slice(left, right).join(', ')
}

export const minSizeSumm = (target, arr) => {
  let result = {
    left: 0,
    right: 0,
    size: Infinity,
  }

  if (!Array.isArray(arr) || !arr.length) {
    result.size = 0
    return result
  }

  let summ = 0, left = 0, right = 1
  for ( let i = 0; i < arr.length; right = ++i + 1) {
    summ += arr[i]

    const updateResult = () => {
      if (summ >= target) {
        const size = right - left
        if (result.size > size)
          result.size = size, result.left = left, result.right = right
      }
    }
    
    while (summ >= target && left < right - 1) {
      updateResult()
      summ -= arr[left]
      left++
    }
    updateResult()
  }

  if (result.size === Infinity) result.size = 0
  return result
}



function test() {
  [
    [1, []],
    [1, [1]],
    [1, [2]],
    [1, [2, 1]],
    [3, [2, 1]],
    [3, [0, 2, 1]],
    [1, [1, 3]],
    [10, [1, 9, 2]],
    [10, [1, 1, 1, 1, 5, 1, 1, 1, 1, 9, 2]],
    [7 , [2,3,1,2,4,3]],
    [4 , [1,4,4]],
    [11 , [1,1,1,1,1,1,1,1]],
    [10 , [1,2,3,4]],
    [5 , [1,2,1,3]],
    [5 , [1,1,2,3]],
  ].forEach(([target, data], i) => {
    const res = minSizeSumm(target, data)
    errorWrapper(i, () => `${target}/${data?.join(',')}: sz=${res.size} - ${formatSubstr(res, data)}`);
  });
}

if (process.env.NODE_ENV !== 'test')
  test();

