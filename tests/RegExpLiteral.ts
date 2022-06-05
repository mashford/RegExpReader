import { getLiteral, panic, safelyParseRegExp, showAST } from '../grammars/util'
import assert from 'node:assert/strict'
import { Quantifier } from 'regexpp/ast'
import { handlePattern } from '../grammars/Pattern/Pattern'
import { handleRegExpLiteral } from '../grammars/RegExpLiteral/RegExpLiteral'

// RegExpLiteral
function testRegExpLiteral() {
  const AST1 = safelyParseRegExp(/be+?p/g)
  // showAST(QuantifierAst1 as any)
  // panic({ data: QuantifierAst1?.pattern })
  const IR1 = AST1 && handleRegExpLiteral(AST1)
  panic({ data: IR1 })
  // assert.deepStrictEqual(QuantifierIR1, {
  //   ir: {
  //     type: 'Pattern',
  //     children: [
  //       {
  //         type: 'Alternative',
  //         raw: 'be+?p',
  //         children: [
  //           { type: 'Character', raw: 'b', msg: 'b' },
  //           {
  //             type: 'Quantifier',
  //             min: 1,
  //             max: Infinity,
  //             children: [{ type: 'Character', raw: 'e', msg: 'e' }],
  //             greedy: false,
  //             raw: 'e+?',
  //             msg: 'as less times as possible, matches 1 to Infinity time(s) of',
  //           },
  //           { type: 'Character', raw: 'p', msg: 'p' },
  //         ],
  //       },
  //     ],
  //     raw: 'be+?p',
  //   },
  // })
}
testRegExpLiteral()
