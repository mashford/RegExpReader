import { RegExpParser } from 'regexpp'
import { handleRegExpLiteral } from '../grammars/RegExpLiteral/RegExpLiteral'
import { IRNode } from '../grammars/types'
import { panic, safelyParseRegExp } from '../grammars/util'

const getIR = (source: string | RegExp, options?: RegExpParser.Options) => {
  const AST = safelyParseRegExp(source, options)
  const IR = AST && handleRegExpLiteral(AST)
  return IR
}

const indentSpace = (indent: number) => {
  return Array(indent).fill('  ').join('')
}
const generatePattern = (IR: IRNode | undefined) => {
  const strArr = []
  dfs(IR?.children?.[0]?.children?.[0])
}

const getPlainText = (IR: IRNode | undefined) => {
  //   panic({ data: IR })
  generatePattern(IR)
}
function dfs(IR: IRNode | undefined, indent = 0) {
  if (IR) {
    console.log(`${indentSpace(indent)}${IR.raw}: ${IR.msg ?? ''}`)
    if (Array.isArray(IR.children)) {
      for (const child of IR.children) {
        dfs(child, indent + 1)
      }
    }
  }
}

const plainText = getPlainText(getIR(/x[0-9A-F][0-9A-F]/g))
