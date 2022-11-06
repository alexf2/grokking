class Node {
  constructor(data) {
    this.data = data
    this.prev = null
    this.next = null
  }
}

export class DoubleList {
  constructor() {
    this.firstItem = null
    this.lastItem = null
    this.size = 0
  }

  add(data) {
    const n = new Node(data)

    if (!this.firstItem) {
      if (this.size !== 0)
        throw new Error('List is corrupted: no root, but has size')

      this.lastItem = this.firstItem = n
      this.size = 1
    } else {
      if (this.size < 1 || !this.lastItem)
          throw new Error('List is corrupted: there is root, but no size')
      
        n.prevItem = this.lastItem
        this.lastItem.nextItem = n
        this.lastItem = n
        this.size++
    }
    return n
  }
  addMany(...items) {
    const res = []
    items.forEach((item) => res.push(this.add(item)))

    return res
  }
  append(data, nodeAfter) {
    if (!nodeAfter || nodeAfter === this.lastItem) {
      return this.add(data)
    }

    const n = new Node(data)

    n.prevItem = nodeAfter
    n.nextItem = nodeAfter.nextItem
    nodeAfter.nextItem.prevItem = n
    nodeAfter.nextItem = n
    this.size++

    return n
  }
  prepend(data, nodeBefore) {
    const n = new Node(data)

    if (!nodeBefore || nodeBefore === this.firstItem) {
      n.nextItem = this.firstItem
      this.firstItem.prev = n
      this.firstItem = n
    } else {
      n.prevItem = nodeBefore.prevItem
      n.nextItem = nodeBefore
      nodeBefore.prevItem.nextItem = n
      nodeBefore.prevItem = n
    }

    this.size++
    return n
  }
  find(data, cmp = (a, b) => a === b) {
    for (let node = this.firstItem; !!node; node = node?.nextItem) {
      if (cmp(data, node.data))
        return node
    }
    return null
  }
  removeNode(nodeToRemove) {    
    if (!nodeToRemove)
      throw Error('No node to remove specified')
      
    if (nodeToRemove === this.firstItem) {
      nodeToRemove.nextItem.prevItem = null
      this.firstItem = nodeToRemove.nextItem
      nodeToRemove.nextItem = null

      this.size--
      return nodeToRemove
    } 
    
    if (nodeToRemove === this.lastItem) {
      nodeToRemove.prevItem.nextItem = null
      this.lastItem = nodeToRemove.prevItem
      nodeToRemove.prevItem = null

      this.size--
      return nodeToRemove
    } 

    nodeToRemove.prevItem.nextItem = nodeToRemove.nextItem
    nodeToRemove.nextItem.prevItem = nodeToRemove.prevItem
    nodeToRemove.prevItem = null
    nodeToRemove.nextItem = null

    this.size--
    return nodeToRemove    
  }
  validateIntegrity() {
    if (!this.firstItem || !this.lastItem) {
      if (this.firstItem || this.lastItem)
        throw new Error('Root or tail without tail/root')
    }
    if (!this.firstItem && this.size)
      throw new Error('Size with no list')
    if (!this.size && this.firstItem)
      throw new Error('List with no size')

    return true
  }
  forEach(callback) {
    for (let node = this.firstItem; !!node; node = node?.nextItem) {
      const result = callback(node)
      if (result === false)
        break
    }
  }
  reversedForEach(callback) {
    for (let node = this.lastItem; !!node; node = node?.prevItem) {
      const result = callback(node)
      if (result === false)
        break
    }
  }
  reverse() {
    if (this.size < 2)
      return

    let tmp = null
    let node = this.firstItem

    while(node) {
      tmp = node.prevItem
      node.prevItem = node.nextItem
      node.nextItem = tmp
      node = node.prevItem
    }

    [this.firstItem, this.lastItem] = [this.lastItem, this.firstItem]
  }
  printToString(reversed = false) {
    const result = []
    const conv = ({data}) => result.push(String(data))

    reversed ? this.reversedForEach(conv) : this.forEach(conv)
    
    return result.join(', ')
  }
  toArray(reversed = false) {
    const result = []
    const conv = ({data}) => result.push(data)

    reversed ? this.reversedForEach(conv) : this.forEach(conv)

    return result
  }
  get count() {
    return this.size
  }
  get first() {
    return this.firstItem?.data
  }
  get last() {
    return this.lastItem?.data
  }
}