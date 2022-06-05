import { Element, WordBoundaryAssertion } from 'regexpp/ast'
import { Handler } from '../../types'
import { getLiteral, panic, showAST } from '../../util'

//handle Assertion
export const handleWordBoundaryAssertion: Handler = (
  nodes: Element[],
  pointer: number
) => {
  const node = nodes[pointer] as WordBoundaryAssertion
  if (node.type !== 'Assertion') panic('node type error')
  if (node.kind !== 'word') panic('node type error')
  if (node.negate === false) {
    return {
      pointer: pointer + 1,
      ir: {
        type: 'WordBoundaryAssertion',
        raw: node.raw,
        msg: `(Word boundary)`,
      },
    }
  } else if (node.negate === true) {
    return {
      pointer: pointer + 1,
      ir: {
        type: 'WordBoundaryAssertion',
        raw: node.raw,
        msg: `(Not word boundary)`,
      },
    }
  } else {
    throw new Error('node type error')
  }
}

//have a try
// const ast = getLiteral(/n\b/)
// showAST(ast)
// console.log(handleWordBoundaryAssertion(ast[0].elements, 1))
