import { CapturingGroup, Quantifier } from 'regexpp/ast'
import { handleAlternative } from '../Alternative/Alternative'
import { IterateWithHandler } from '../shared'
import { Handler, IRNode } from '../types'
import { getLiteral, panic, showAST } from '../util'

export const handleCapturingGroup: Handler = (
  nodes: CapturingGroup[],
  pointer: number
) => {
  const node = nodes[pointer]

  const children: IRNode[] = IterateWithHandler({
    elements: node.alternatives,
    handler: handleAlternative,
  }).irNodes

  return {
    pointer: pointer + 1,
    ir: {
      type: 'CapturingGroup',
      raw: node.raw,
      msg: `an expression group ${node.raw.slice(
        1,
        -1
      )} that can be referred in match results.`,
      children: children,
      name: node.name ?? undefined,
    },
  }
}

//have a try
// const ast = getLiteral(/(?<name>ha)+x/)
// showAST(ast)
// const capturingGroup = (ast[0].elements[0] as unknown as Quantifier).element
// panic(handleCapturingGroup([capturingGroup] as unknown as CapturingGroup[], 0))
