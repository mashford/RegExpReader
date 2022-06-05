import { Alternative, Element, Group } from 'regexpp/ast'
import { handleAlternative } from '../Alternative/Alternative'
import { IterateWithHandler } from '../shared'
import { Handler, IRNode } from '../types'
import { getLiteral, panic } from '../util'

export const handleGroup: Handler = (nodes: Group[], pointer: number) => {
  const node = nodes[pointer]

  const children: IRNode[] = IterateWithHandler({
    elements: node.alternatives,
    handler: handleAlternative,
  }).irNodes

  return {
    pointer: pointer + 1,
    ir: {
      type: 'Group',
      raw: node.raw,
      msg: `a grouping that cannot be referenced: ${node.raw.slice(3, -1)}`,
      children: children,
    },
  }
}

//have a try

// const ast = getLiteral(/(?:regex)/)
// panic(ast)
// console.log(handleGroup(ast[0].elements, 0)) // { pointer: 3, val: { type: 'string', val: 'abC' } }
// panic(handleGroup(ast[0].elements, 0))
// pass
