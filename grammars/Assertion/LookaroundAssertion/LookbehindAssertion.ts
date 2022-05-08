import { Element, LookbehindAssertion } from 'regexpp/ast'

//handle Assertion
export const handleLookaheadAssertion = (nodes: Element[], pointer: number) => {
  const node = nodes[pointer] as LookbehindAssertion
  if (node.negate === true) {
    return {
      pointer: pointer + 1,
      ir: {
        type: 'LookbehindAssertion',
        raw: node.raw,
        msg: `(not behind ${node.alternatives[0].raw})`,
      },
    }
  } else {
    return {
      pointer: pointer + 1,
      ir: {
        type: 'LookbehindAssertion',
        raw: node.raw,
        msg: `(behind ${node.alternatives[0].raw})`,
      },
    }
  }
}

//have a try
// const ast = getLiteral(/(?<!%)\d/)
// showAST(ast)
// console.log(handleLookaheadAssertion(ast[0].elements, 0))
