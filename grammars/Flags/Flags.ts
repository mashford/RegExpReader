import { Alternative, Element, Flags, Quantifier } from 'regexpp/ast'
import { handleAlternative, handleElements } from '../Alternative/Alternative'
import { IterateWithHandler } from '../shared'
import { IRNode } from '../types'
import { getFlags, getLiteral, panic, showAST } from '../util'

export const handleFlags = (node: Flags) => {
  // const node = nodes[pointer]
  const msgArr: string[] = []
  if (node.ignoreCase) msgArr.push(`search being case-insensitive`)
  if (node.global) msgArr.push(`return all matches`)
  if (node.multiline) msgArr.push(`anchors ^ $ work in multiline mode`)
  if (node.dotAll) msgArr.push(`dot . also matches newline character \n`)
  if (node.unicode) msgArr.push(`enables full Unicode support`)
  if (node.sticky)
    msgArr.push(`enables sticky mode: search exactly at lastIndex`)

  return {
    ir: {
      type: 'Flags',
      dotAll: node.dotAll,
      global: node.global,
      hasIndices: node.hasIndices,
      ignoreCase: node.ignoreCase,
      multiline: node.multiline,
      sticky: node.sticky,
      unicode: node.unicode,
      raw: node.raw,
      msg: msgArr.join('; '),
    },
  }
}

//have a try

// const ast = getFlags(/cat/i)
// const ast = getLiteral(/be+p/)
// const ast = getLiteral(/be*p/)
// const ast = getLiteral(/colou?r/)
// const ast = getLiteral(/(c|r)at/)
// panic(ast)
// panic(handleFlags([ast.flags], 0)) // { pointer: 3, val: { type: 'string', val: 'abC' } }
// pass
