import {
  Character,
  CharacterClass,
  CharacterClassRange,
  CharacterSet,
} from 'regexpp/ast'
import { handleCharacter } from '../Character/Character'
import { handleCharacterSet } from '../CharacterSet/CharacterSet'
import { loopChecker } from '../shared'
import { handleCharacterClassRange } from '../CharacterClassRange/CharacterClassRange'
import { IRNode } from '../types'

export const handleCharacterClass = (
  characterClassNodes: CharacterClass[],
  index: number
) => {
  const characterClassNode = characterClassNodes[index]
  const elements = characterClassNode.elements
  const IRNodes: IRNode[] = []
  for (
    let pointer = 0, checker = 0;
    pointer < elements.length;
    checker = loopChecker(pointer, checker, elements)
  ) {
    const curNode = elements[pointer]
    switch (curNode.type) {
      case 'Character': {
        const { pointer: nextPointer, ir: IR } = handleCharacter(
          elements as Character[],
          pointer
        )
        pointer = nextPointer
        IRNodes.push(IR)
        break
      }
      case 'CharacterSet': {
        const { pointer: nextPointer, ir: IR } = handleCharacterSet(
          elements as CharacterSet[],
          pointer
        )
        pointer = nextPointer
        IRNodes.push(IR)
        break
      }
      case 'CharacterClassRange': {
        const { pointer: nextPointer, ir: IR } = handleCharacterClassRange(
          elements as CharacterClassRange[],
          pointer
        )
        pointer = nextPointer
        IRNodes.push(IR)
        break
      }
      // default: {
      //   panic({
      //     msg: 'illegal AST node type',
      //     data: curNode.data,
      //     layers: 1,
      //   });
      // }
    }
  }

  const characterClassIR = {
    type: 'CharacterClass',
    children: IRNodes,
    raw: characterClassNode.raw,
    negate: characterClassNode.negate,
    msg: characterClassNode.negate
      ? 'a char not in following set:'
      : 'a char in following set:',
  }
  //[^a-c]: a char that is not:
  return {
    pointer: index + 1,
    ir: characterClassIR,
  }
}

//have a try
// const ast = getLiteral(/[xyz\W][^abc][a-z]abc./);
// const ast = getLiteral(/[^a-csdf]/);

// showAST(ast, 1);
// console.log(handleCharacterClass(ast[0].elements[0] as CharacterClass, 0)); // { pointer: 3, val: { type: 'string', val: 'abC' } }
//pass
