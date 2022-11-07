/*
  Given an array of integers, nums, and an integer value, target, determine if there are any three integers in nums whose sum equals the target. Return TRUE if three such integers are found in the array. Otherwise, return FALSE.

  The time complexity of this solution is O(n^2).
*/
import {errorWrapper} from '../utils/error-wrapper.js'

export const hasThreeSumm = (arrToFind, target) => {
  if (!Array.isArray(arrToFind) || isNaN(target) || arrToFind.length < 3)
    return false

  const arr = [...arrToFind]
  arr.sort()
  const {length} = arr

  for (let i = 0; i < length - 2; ++i) {
    for (let left = i + 1, right = length - 1; left < right;) {
      let summ = arr[i] + arr[left] + arr[right]
      
      if (summ === target)
        return true

      if (summ > target)
        --right
      else if (summ < target)
        ++left
    }
  }
  
  return false
}

function test() {
  [
    [[], 5],
    [[1], 1],
    [[1, 1, 1], 3],
    [[1, 0, 1, 1], 3],
    [[1,-1,0], -1],
    [[3,7,1,2,8,4,5], 10],
    [[3,7,1,2,8,4,5], 20],
    [[3,7,1,2,8,4,5], 21],
    [[-1,2,1,-4,5,-3], -8],
    [[-1,2,1,-4,5,-3], 0],
    [[-1,2,1,-4,5,-3], 7],
  ].forEach(([arr, target], i) => {
    errorWrapper(i, () => hasThreeSumm(arr, target));
  });
}

if (process.env.NODE_ENV !== 'test')
  test();
