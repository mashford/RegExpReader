import { AST } from 'regexpp'
import util from 'util'

export const panic = (data: any) => {
  let str = new Error().stack?.toString()
  let Regexp = /\w+\.(js|ts):\d+:\d+/g
  // console.log(str.split('\n')[2].split('/').reverse()[0].slice(0,-1))
  console.log(
    `${Regexp.exec(str ?? '')![0]}:  ${util.inspect(data, {
      showHidden: true,
      depth: null,
      colors: true,
    })}`
  )
  // console.log(/\w+\.(js|ts):\d+:\d+/g.exec('empty.js:7:1'))
}

type ASTobj = Partial<
  Pick<
    AST.RegExpLiteral,
    'type' | 'start' | 'end' | 'raw' | 'pattern' | 'alternatives'
  >
>

export const printAST = (literal: AST.RegExpLiteral | undefined) => {
  const pattenObj: ASTobj = {}
  if (!literal) return pattenObj
  for (let key of Object.keys(literal ?? {})) {
    switch (key) {
      case 'parent': {
        break
      }
      case 'type': {
        pattenObj['type'] = literal[key]
      }
      case 'raw': {
        pattenObj['raw'] = literal[key]
      }
      case 'pattern': {
        pattenObj['pattern'] = literal[key]
      }
      case 'type': {
        pattenObj['type'] = literal[key]
      }
    }
  }
}
