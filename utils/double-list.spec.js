import {DoubleList} from '../utils/double-list'

describe('Double linked list', () => {

  let l

  beforeEach(() => {
    l = new DoubleList()
    l.add(1)
    l.add(12)
    l.add(7)
  })

  afterEach(() => {
    l = null
  })

  test('toArray', () => {
    expect(l.toArray()).toHaveLength(3)
    expect(l.count).toBe(3)
    expect(l.toArray()).toStrictEqual([1, 12, 7])
    expect(l.first).toBe(1)
    expect(l.last).toBe(7)
  })

  test('toArrayRev', () => {
    expect(l.toArray(true)).toHaveLength(3)
    expect(l.count).toBe(3)
    expect(l.toArray(true)).toStrictEqual([7, 12, 1])
  })

  test('print', () => {
    expect(l.printToString()).toBe('1, 12, 7')
  })
  test('printRev', () => {
    expect(l.printToString(true)).toBe('7, 12, 1')
  })

  test('reverse', () => {
    l.reverse()

    expect(l.toArray()).toStrictEqual([7, 12, 1])
    expect(l.count).toBe(3)
    expect(l.first).toBe(7)
    expect(l.last).toBe(1)
  })

  test('add', () => {
    l.add(20)

    expect(l.toArray()).toHaveLength(4)
    expect(l.count).toBe(4)
    expect(l.toArray()).toStrictEqual([1, 12, 7, 20])
    expect(l.firstItem).toBeDefined()
    expect(l.firstItem.data).toBe(1)
    expect(l.lastItem).toBeDefined()
    expect(l.lastItem.data).toBe(20)
    expect(l.first).toBe(1)
    expect(l.last).toBe(20)
  })

  test('addMany', () => {
    l.addMany(20, 21, 50)

    expect(l.toArray()).toHaveLength(6)
    expect(l.count).toBe(6)
    expect(l.toArray()).toStrictEqual([1, 12, 7, 20, 21, 50])
    expect(l.firstItem).toBeDefined()
    expect(l.firstItem.data).toBe(1)
    expect(l.lastItem).toBeDefined()
    expect(l.lastItem.data).toBe(50)
    expect(l.first).toBe(1)
    expect(l.last).toBe(50)
  })

  test('find', () => {
    expect(l.find(12)).toBeDefined()
    expect(l.find(12)?.data).toBe(12)
    expect(l.find(1)).toBeDefined()
    expect(l.find(1)?.data).toBe(1)
    expect(l.find(7)).toBeDefined()
    expect(l.find(7)?.data).toBe(7)
  })

  test('append', () => {
    const node = l.find(12)
    l.append(17, node)

    expect(l.toArray()).toHaveLength(4)
    expect(l.count).toBe(4)
    expect(l.toArray()).toStrictEqual([1, 12, 17, 7])
  })

  test('append back', () => {
    l.append(17)

    expect(l.toArray()).toHaveLength(4)
    expect(l.toArray()).toStrictEqual([1, 12, 7, 17])
  })

  test('prepend', () => {
    const node = l.find(12)
    l.prepend(17, node)

    expect(l.toArray()).toHaveLength(4)
    expect(l.count).toBe(4)
    expect(l.toArray()).toStrictEqual([1, 17, 12, 7])
  })

  test('prepend root', () => {
    l.prepend(17)

    expect(l.toArray()).toHaveLength(4)
    expect(l.count).toBe(4)
    expect(l.toArray()).toStrictEqual([17, 1, 12, 7])
  })

  test('removeNode', () => {
    const node = l.find(12)
    l.removeNode(node)

    expect(l.toArray()).toHaveLength(2)
    expect(l.count).toBe(2)
    expect(l.toArray()).toStrictEqual([1, 7])
    expect(l.first).toBe(1)
    expect(l.last).toBe(7)
  })

  test('removeNode front', () => {
    l.removeNode(l.firstItem)

    expect(l.toArray()).toHaveLength(2)
    expect(l.count).toBe(2)
    expect(l.toArray()).toStrictEqual([12, 7])
    expect(l.first).toBe(12)
    expect(l.last).toBe(7)
  })

  test('removeNode back', () => {
    l.removeNode(l.lastItem)

    expect(l.toArray()).toHaveLength(2)
    expect(l.count).toBe(2)
    expect(l.toArray()).toStrictEqual([1, 12])
    expect(l.first).toBe(1)
    expect(l.last).toBe(12)
  })

  test('add and remove', () => {
    l.addMany(50, -1, 60, 0)
    const node = l.find(-1)
    l.prepend(-2, node)

    expect(l.toArray()).toHaveLength(8)
    expect(l.count).toBe(8)
    expect(l.toArray()).toStrictEqual([1, 12, 7, 50, -2, -1, 60, 0])
    expect(l.first).toBe(1)
    expect(l.last).toBe(0)

    const node2 = l.find(50)
    l.removeNode(node2)

    expect(l.toArray()).toHaveLength(7)
    expect(l.count).toBe(7)
    expect(l.toArray()).toStrictEqual([1, 12, 7, -2, -1, 60, 0])
    expect(l.first).toBe(1)
    expect(l.last).toBe(0)
  })
})
