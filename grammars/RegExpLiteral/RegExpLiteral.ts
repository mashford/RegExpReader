import { Pattern, RegExpLiteral } from 'regexpp/ast'
import { handleAlternative } from '../Alternative/Alternative'
import { handleFlags } from '../Flags/Flags'
import { handlePattern } from '../Pattern/Pattern'
import { IterateWithHandler } from '../shared'
import { IRNode } from '../types'
import { getLiteral, panic, showAST } from '../util'

export const handleRegExpLiteral = (node: RegExpLiteral): IRNode => {
  //   const { ir } = handleAlternative(node.alternatives, 0)
  const { ir: patternIR } = handlePattern(node.pattern)
  const { ir: flagsIR } = handleFlags(node.flags)
  return {
    type: 'RegExpLiteral',
    children: [patternIR, flagsIR],
    raw: node.raw,
  }
}
