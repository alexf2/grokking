/*
  Given a string, inputString find the longest substring without repeating characters, and return the length of that longest substring.
  
  We have to iterate over all the n elements in the string. Therefore, the time complexity is O(n).
*/
import {errorWrapper} from '../utils/error-wrapper.js'

const formatSubstr = (desc, str) => {
  const { index, len } = desc
  if (index === -1 || !len)
    return ''

  return str.substr(index, len)
}

export const longestNonRep = (str) => {
  let result = {
    index: -1,
    len: -1,
  }

  if (typeof str !== 'string' || !str.trim()) {
    result.len = 0
    return result
  }

  const chars = new Map()
  const current = {
    index: 0,
    len: -1,
  }

  const pushStr = (indexStop, index) => {
    if (indexStop < current.index)
      return

    current.len = index - current.index
    if (current.len > result.len)
      result = {...current}

    if (indexStop === undefined)
      return

    current.index = indexStop + 1
    current.len = -1
  }

  for (let i = 0; i < str.length; ++i) {
    const c = str[i]
    if (chars.has(c)) {
      pushStr(chars.get(c), i)
    }
    chars.set(c, i)
  }

  if (current.len === -1)
    pushStr(undefined, str.length)

  result.len = result.len === -1 ? 0 : result.len
  return result
}



function test() {
  [
    undefined,
    '',
    ' ',
    '1',
    '11',
    '111',
    'abc',
    '11567891',
    '56789511023',
    '11211',
    "abcdbea",
    "aba",
    "abccabcabcc",
    "aaaabaaa",
    "bbbbb",
    "ABCDEFGHI",
    '1231a312096',
  ].forEach((str, i) => {
    const desc = longestNonRep(str)
    errorWrapper(i, () => `${str}: ${formatSubstr(desc, str)}, len = ${desc.len}`);
  });
}

if (process.env.NODE_ENV !== 'test')
  test();

