import { Alternative, Backreference, Element } from 'regexpp/ast'
import { getLiteral, showAST } from '../util'
import ordinal from 'ordinal'

export const handleBackreference = (
  nodes: Backreference[],
  pointer: number
) => {
  const node = nodes[pointer]
  if (typeof node.ref === 'number') {
    return {
      pointer: pointer + 1,
      ir: {
        type: 'Backreference',
        raw: node.raw,
        msg: `reference to the ${ordinal(node.ref)} grouped expression.`,
      },
    }
    // eslint-disable-next-line no-empty
  } else {
    return {
      pointer: pointer + 1,
      ir: {
        type: 'Backreference',
        raw: node.raw,
        msg: `reference to the grouped expression: ${node.ref}.`,
      },
    }
  }
}

//have a try

// const ast = getLiteral(/(\w)a\1/)
// showAST(ast)
// console.log(
//   handleBackreference(ast[0].elements as unknown as Backreference[], 2)
// ) // { pointer: 3, val: { type: 'string', val: 'abC' } }
// pass
