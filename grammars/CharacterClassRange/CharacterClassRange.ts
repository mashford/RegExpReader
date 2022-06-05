import { Alternative, CharacterClassRange, Element } from 'regexpp/ast'

export const handleCharacterClassRange = (
  nodes: CharacterClassRange[],
  pointer: number
) => {
  return {
    pointer: pointer + 1,
    ir: {
      type: 'Range',
      raw: nodes[pointer].raw,
      msg: `a char from ${nodes[pointer].min.raw} to ${nodes[pointer].max.raw}`,
    },
  }
}

//have a try

// const ast = getLiteral(/abC/);
// showAST(ast);
// console.log(handleCharacter(ast[0].elements, 0)); // { pointer: 3, val: { type: 'string', val: 'abC' } }
// pass
