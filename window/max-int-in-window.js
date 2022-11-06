/*
  Given an integer array and a window of size w, find the current maximum value in the window as it slides through the entire array.
*/
import {SimpleDequeue} from '../utils/simple-dequeue.js'
import {errorWrapper} from '../utils/error-wrapper.js'
import {DoubleList} from '../utils/double-list.js'

export const moveAndFindMax = (arr, size) => {
  const result = []
  if (!Array.isArray(arr))
    return result

  if (size < 1)
    throw new Error(`Illegal size: ${size}. Should be > 0`)

  const { length } = arr
  if (length < 1)
    return result

  const windowLen = Math.min(length, size)  
  const q = new SimpleDequeue() // индексы

  const processWindow = (index) => {
    const value = arr[index]
    // Удаляем из очереди бесполезные элементы, которые меньше текущего добавляемого элемента из массива.
    // Таким образом, максимальный элемент будет первым.
    while(!q.empty && value >= arr[q.last])
      q.pop()

    q.push(index)
  }

  for (let i = 0; i < length; ++i) {
    if (i >= windowLen) {
      result.push(arr[q.first])

      // Удаляем индексы из очереди, которые уже вне окна.
      while(!q.empty && q.first <= i - windowLen)
        q.popFront()
    }

    processWindow(i)
  }

  result.push(arr[q.first])

  return result
}

export const moveAndFindMaxDequeue = (arr, size) => {
  const result = []
  if (!Array.isArray(arr))
    return result

  if (size < 1)
    throw new Error(`Illegal size: ${size}. Should be > 0`)

  const { length } = arr
  if (length < 1)
    return result

  const windowLen = Math.min(length, size)  
  const dq = new DoubleList() // индексы

  const processWindow = (index) => {
    const value = arr[index]
    // Удаляем из очереди бесполезные элементы, которые меньше текущего добавляемого элемента из массива.
    // Таким образом, максимальный элемент будет первым.
    while(!dq.empty && value >= arr[dq.last])
      dq.removeLast()

    dq.add(index)
  }

  for (let i = 0; i < length; ++i) {
    if (i >= windowLen) {
      result.push(arr[dq.first])

      // Удаляем индексы из очереди, которые уже вне окна.
      while(!dq.empty && dq.first <= i - windowLen)
        dq.removeFirst()
    }

    processWindow(i)
  }

  result.push(arr[dq.first])

  return result
}

function test() {
  [
    [, 3], //1
    [undefined, 3], //2

    [[], 0], //3
    [[], 1], //4
    [[1, 3, 1], 0], //5
    [[1, 3, 1], 1], //6
    [[1, 3, 1, 4, 1], 2], //7
    [[-1, 1], 2], //8
    [[-1, 1], 1], //9
    [[-1, 1], 3], //10

    [[1,2,3,4,5,6,7,8,9,10] , 3],
    [[3,3,3,3,3,3,3,3,3,3] , 4],
    [[10,6,9,-3,23,-1,34,56,67,-1,-4,-8,-2,9,10,34,67] , 2],
    [[4,5,6,1,2,3] , 1],
    [[9,5,3,1,6,3] , 2],
    [[9,5,3,1,6,3] , 3],
    [[9,5,3,1,6,3] , 4],
    [[1,2] , 2],
  ].forEach(([arr, windowSize], i) => {
    errorWrapper(i, () => `${moveAndFindMax(arr, windowSize)} / ${moveAndFindMaxDequeue(arr, windowSize)}`);
  });
}

if (process.env.NODE_ENV !== 'test')
  test();

