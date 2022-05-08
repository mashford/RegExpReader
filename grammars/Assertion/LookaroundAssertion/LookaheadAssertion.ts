import { Element, LookaheadAssertion } from 'regexpp/ast'
import { getLiteral, showAST } from '../../util'

//handle Assertion
export const handleLookaheadAssertion = (nodes: Element[], pointer: number) => {
  const node = nodes[pointer] as LookaheadAssertion
  if (node.negate === true) {
    return {
      pointer: pointer + 1,
      ir: {
        type: 'LookaheadAssertion',
        raw: node.raw,
        msg: `(not before ${node.alternatives[0].raw})`,
      },
    }
  } else {
    return {
      pointer: pointer + 1,
      ir: {
        type: 'LookaheadAssertion',
        raw: node.raw,
        msg: `(before ${node.alternatives[0].raw})`,
      },
    }
  }
}

//have a try
// const ast = getLiteral(/(?<!%)\d/)
// showAST(ast)
// console.log(handleLookaheadAssertion(ast[0].elements, 0))
