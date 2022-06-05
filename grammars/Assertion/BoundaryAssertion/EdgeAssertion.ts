import {
  Alternative,
  EdgeAssertion,
  Element,
  LookaheadAssertion,
} from 'regexpp/ast'
import { Handler, IRNode } from '../../types'
import { getLiteral, panic, showAST } from '../../util'

//handle Assertion
export const handleEdgeAssertion: Handler = (
  nodes: Element[],
  pointer: number
) => {
  const node = nodes[pointer] as EdgeAssertion
  if (node.type !== 'Assertion') panic('node type error')
  if (node.kind === 'start') {
    return {
      pointer: pointer + 1,
      ir: {
        type: 'EdgeAssertion',
        raw: node.raw,
        msg: `(Start here)`,
      },
    }
  } else if (node.kind === 'end') {
    return {
      pointer: pointer + 1,
      ir: {
        type: 'EdgeAssertion',
        raw: node.raw,
        msg: `(End here)`,
      },
    }
  } else {
    throw new Error('node type error')
  }
}

//have a try
// const ast = getLiteral(/^\w+/)
// showAST(ast)
// console.log(handleEdgeAssertion(ast[0].elements, 0))
