import { Alternative, Element, Quantifier } from 'regexpp/ast'
import { handleAlternative, handleElements } from '../Alternative/Alternative'
import { IterateWithHandler } from '../shared'
import { IRNode } from '../types'
import { getLiteral, panic, showAST } from '../util'

export const handleQuantifier = (nodes: Quantifier[], pointer: number) => {
  const node = nodes[pointer]
  const children: IRNode[] = handleElements({ elements: [node.element] })

  if (node.greedy) {
    return {
      pointer: pointer + 1,
      ir: {
        type: 'Quantifier',
        min: node.min,
        max: node.max,
        children,
        greedy: node.greedy,
        raw: node.raw,
        msg: `matches ${node.min} to ${node.max} time(s) of`,
      },
    }
  } else {
    return {
      pointer: pointer + 1,
      ir: {
        type: 'Quantifier',
        min: node.min,
        max: node.max,
        children,
        greedy: node.greedy,
        raw: node.raw,
        msg: `as less times as possible, matches ${node.min} to ${node.max} time(s) of`,
      },
    }
  }
}

//have a try

// const ast = getLiteral(/be{1,2}p/)
// const ast = getLiteral(/be+?p/)
// const ast = getLiteral(/be*p/)
// const ast = getLiteral(/colou?r/)
// const ast = getLiteral(/(c|r)at/)
// showAST(ast)
// panic(handleQuantifier(ast[0].elements as unknown as Quantifier[], 4)) // { pointer: 3, val: { type: 'string', val: 'abC' } }
// pass
