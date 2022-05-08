import { Alternative, CharacterClassRange, Element } from 'regexpp/ast';

/* parse strings
SuperExpressive()
  .string('abC')
.toRegex();
*/

/* 
/abC/
*/

//input
/*AST
[
  {
    type: 'Alternative',
    raw: 'abC',
    elements: [
      { type: 'Character', raw: 'a' },
      { type: 'Character', raw: 'b' },
      { type: 'Character', raw: 'C' }
    ]
  }
]
*/
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

export const handleCharacterClassRange = (
  nodes: CharacterClassRange[],
  pointer: number
) => {
  return {
    pointer: pointer + 1,
    ir: {
      type: 'Range',
      val: nodes[pointer].raw,
      msg: `Matches all characters from ${nodes[pointer].min.raw} to ${nodes[pointer].max.raw}`,
    },
  };
};

//have a try

// const ast = getLiteral(/abC/);
// showAST(ast);
// console.log(handleCharacter(ast[0].elements, 0)); // { pointer: 3, val: { type: 'string', val: 'abC' } }
// pass
