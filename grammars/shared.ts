import { Handler, IRNode } from './types'
import { panic } from './util'

export const loopChecker = (
  nextPointer: number,
  previousPointer: number,
  elements: any[]
) => {
  if (nextPointer === previousPointer) {
    // panic({
    //   msg: 'a loop detected in handleAlternative',
    //   data: elements[previousPointer]?.raw,
    //   layer: 2,
    // })
    throw new Error('a loop detected in handleAlternative')
  }
  return nextPointer
}

export const IterateWithHandler = ({
  elements,
  handler,
}: {
  elements: any[]
  handler: Handler
}) => {
  const irNodes: IRNode[] = []
  for (
    let index = 0, checker = 0;
    index < elements.length;
    checker = loopChecker(index, checker, elements)
  ) {
    const { pointer: newPointer, ir: IR } = handler(elements, index)
    index = newPointer
    irNodes.push(IR)
  }
  return { irNodes }
}

export const IterateElements = ({
  elements,
  handlerMap,
  sourceNode,
}: {
  elements: any
  handlerMap: any
  sourceNode?: any
}) => {
  const irNodes: IRNode[] = []
  for (
    let index = 0, checker = 0;
    index < elements.length;
    checker = loopChecker(index, checker, elements)
  ) {
    const type = elements[index]?.type
    if (handlerMap[type]) {
      const { pointer: newPointer, ir: IR } = handlerMap[type](elements, index)
      index = newPointer
      irNodes.push(IR)
    } else {
      panic({
        msg: 'unknown AST node type',
        data: elements[index]?.raw,
        layer: 1,
      })
    }
  }
  return { irNodes }
}
