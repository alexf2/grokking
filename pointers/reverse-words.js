/*
  Given a sentence, reverse the order of its words without affecting the order of letters within a given word.

  Because the array is traversed twice, the time complexity of this solution is O(n + n) = O(n).
*/
import {errorWrapper} from '../utils/error-wrapper.js'

const reverseStr = (arr, left, right) => {
  if (left >= right)
    return

  for (let i1 = left, i2 = right; i1 < i2; ++i1, --i2)
    [arr[i2], arr[i1]] = [arr[i1], arr[i2]]
}

export const reverseWords = (str) => {
  if (!str)
    return str

  const s = str.trim().replace(/\s+/g, ' ')
  if (!s)
    return str

  const arr = Array.from(s)

  reverseStr(arr, 0, arr.length - 1)

  let start = 0, end = 1
  while (end < arr.length) {
    if (arr[end] === ' ') {
      if (end - start > 1)
        reverseStr(arr, start, end - 1)

      for (; arr[end] === ' ' && end < arr.length; ++end);

      start = end
    }

    end++
  }

  if (end - start > 1)
    reverseStr(arr, start, end - 1)

  return arr.join('')
}

function test() {
  [
    'Hello World!', //1
    '123 931', //2
    'с прошлой пятницы мировые площадки и нефть', //3
    'По итогам торгов индекс МосБиржи составил 2208,78 пункта', //4
    '', //5
    ' ', //6
    '1', //7
    '123 ', //8
    '123 1   ', //9
    '12 0 57', //10

    'We love Python',
    'To be or not to be',
    'You are amazing',
    'Hello     World',
    'Hey',
  ].forEach((str, i) => {
    errorWrapper(i, () => reverseWords(str));
  });
}

if (process.env.NODE_ENV !== 'test')
  test();
