/*
  Write a function that takes a string s as input and checks whether it’s a palindrome or not.

  The time complexity is O(n), where n - is the number of characters present in the string.
*/
import {errorWrapper} from '../utils/error-wrapper.js'

export const isPolindrome = (str) => {
  if (!str)
    return true

  const s = str.trim().replace(/\s+/g, ' ')
  if (!s || s.length === 1)
    return true

  for (let left = 0, right = s.length - 1; left < right; left++, right--)
    if (s[left] !== s[right])
      return false

  return true
}

function test() {
  [
    '', //1
    'ab', //2
    'bb', //3
    'kayak', //4
    'hello', //5
    'RACEACAR', //6
    'A', //7
    'ABCDABCD', //8
    'DCBAABCD', //9
    'ABCBA', //10
  ].forEach((str, i) => {
    errorWrapper(i, () => isPolindrome(str));
  });
}

if (process.env.NODE_ENV !== 'test')
  test();
