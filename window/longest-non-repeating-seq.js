/*
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
    return result
  }

  const chars = new Map()
  const current = {
    index: 0,
    len: -1,
  }

  const pushStr = (indexStop, index) => {
    current.len = index - current.index
    if (current.len > result.len)
      result = {...current}

    if (indexStop === undefined)
      return

    current.index = indexStop + 1
    current.len = -1

    for (let [ch, idx] of chars)
      if (idx < indexStop)
        chars.delete(ch)
      else  
        break
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
  ].forEach((str, i) => {
    errorWrapper(i, () => `${str}: ${formatSubstr(longestNonRep(str), str)}, len = ${longestNonRep(str).len}`);
  });
}

if (process.env.NODE_ENV !== 'test')
  test();

