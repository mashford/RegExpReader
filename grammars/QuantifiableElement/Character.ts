import { Alternative, Element } from 'regexpp/ast';
import { getLiteral, showAST } from '../util';

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
// version 1: squaze
// export const handleCharacter = (nodes: Element[], pointer: number) => {
//   const chars = [];
//   while (nodes[pointer]?.type === 'Character') {
//     chars.push(nodes[pointer].raw);
//     pointer++;
//   }
//   const string = chars.join('');
//   return {
//     pointer,
//     ir: {
//       type: 'string',
//       raw: string,
//       msg: `matches ${string}`,
//     },
//   };
// };

export const handleCharacter = (nodes: Element[], pointer: number) => {
  return {
    pointer: pointer + 1,
    ir: {
      type: 'Character',
      raw: nodes[pointer].raw,
      msg: `matches ${nodes[pointer].raw}`,
    },
  };
};

//have a try
// const ast = getLiteral(/abC/);
// showAST(ast);
// console.log(handleCharacter(ast[0].elements, 0)); // { pointer: 3, val: { type: 'string', val: 'abC' } }
// pass
