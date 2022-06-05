import { getLiteral, panic, showAST } from '../grammars/util'
import assert from 'node:assert/strict'
import { handleQuantifier } from '../grammars/Quantifier/Quantifier'
import { Quantifier } from 'regexpp/ast'

// Quantifier
function testQuantifier() {
  const QuantifierAst1 = getLiteral(/be+?p/)
  const QuantifierIR1 = handleQuantifier(
    QuantifierAst1[0].elements as unknown as Quantifier[],
    1
  )
  assert.deepStrictEqual(QuantifierIR1, {
    pointer: 2,
    ir: {
      type: 'Quantifier',
      min: 1,
      max: Infinity,
      children: [{ type: 'Character', raw: 'e', msg: 'matches e' }],
      greedy: false,
      raw: 'e+?',
      msg: 'as less times as possible, matches 1 to Infinity time(s) of',
    },
  })

  const QuantifierAst2 = getLiteral(/be{1,2}p/)
  // showAST(QuantifierAst2)
  const QuantifierIR2 = handleQuantifier(
    QuantifierAst2[0].elements as unknown as Quantifier[],
    1
  )
  // panic({ data: QuantifierIR2 })
  assert.deepStrictEqual(QuantifierIR2, {
    pointer: 2,
    ir: {
      type: 'Quantifier',
      min: 1,
      max: 2,
      children: [{ type: 'Character', raw: 'e', msg: 'matches e' }],
      greedy: true,
      raw: 'e{1,2}',
      msg: 'matches 1 to 2 time(s) of',
    },
  })
}
// testQuantifier()
