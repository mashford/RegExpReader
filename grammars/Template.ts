import { Alternative, Element } from 'regexpp/ast'
//input
// [
//   { type: 'Character', raw: 'a' },
//   { type: 'Character', raw: 'b' },
//   { type: 'Character', raw: 'C' }
// ]

//output
/*
[
  {type: 'string', val: 'abC'}
]
*/

export const handleTODO = (nodes: Element[], pointer: number) => {
  return {
    pointer: pointer + 1,
    ir: {
      type: 'TODO',
      raw: nodes[pointer].raw,
      msg: `matches ${nodes[pointer].raw}`,
    },
  }
}

//have a try

// const ast = getLiteral(/abC/);
// showAST(ast);
// console.log(handleCharacter(ast[0].elements, 0)); // { pointer: 3, val: { type: 'string', val: 'abC' } }
// pass
