export class SimpleDequeue {
  constructor() {
    this.data = []
  }

  pushFront(item) {
    this.data.unshift(item)
  }
  push(item) {
    this.data.push(item)
  }
  pop() {
    return this.data.pop()
  }
  popFront() {
    return this.data.shift()
  }
  get size() {
    return this.data.length
  }
  get empty() {
    return this.data.length === 0
  }
  get last() {
    return this.data.length ? this.data[this.data.length - 1] : undefined
  }
  get first() {
    return this.data.length ? this.data[0] : undefined
  }
  removeBy(searcher) {
    if (!this.data.length)
      return

    for (let i = 0; i < this.data.length; ++i)
      if (searcher(this.data[i])) {
        return this.data.splice(i, 1)[0]
      }
  }
}
