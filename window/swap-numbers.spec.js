import {swapNumbers1, swapNumbers2} from './swap-numbers'

describe('Swap numbers with no third var', () => {

  test.each([[1, 2], [-5, 0], [19, -1]])('Swap1 = Swap2: %p, %p', (p1, p2) => {
    expect(swapNumbers1(p1, p2), `Failed: ${p1}, ${p2}`).toEqual(swapNumbers2(p1, p2))
  })
})
