import { Pattern } from 'regexpp/ast'
import { handleAlternative } from '../Alternative/Alternative'
import { IterateWithHandler } from '../shared'
import { IRNode } from '../types'
import { getLiteral, panic, showAST } from '../util'

export const handlePattern = (node: Pattern) => {
  const { ir } = handleAlternative(node.alternatives, 0)
  return {
    ir: {
      type: 'Pattern',
      children: [ir],
      raw: node.raw,
    },
  }
}
