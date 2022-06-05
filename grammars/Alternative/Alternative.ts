import { Alternative, Element } from 'regexpp/ast'
import { handleAssertion } from '../Assertion/Assertion'
import { handleBackreference } from '../Backreference/Backreference'
import { handleCapturingGroup } from '../CapturingGroup/CapturingGroup'
import { handleCharacter } from '../Character/Character'
import { handleCharacterClass } from '../CharacterClass/CharacterClass'
import { handleCharacterClassRange } from '../CharacterClassRange/CharacterClassRange'
import { handleCharacterSet } from '../CharacterSet/CharacterSet'
import { handleGroup } from '../Group/Group'
import { handleQuantifier } from '../Quantifier/Quantifier'
import { loopChecker } from '../shared'
import { Handler, HandlerMap, IRNode } from '../types'
import { getLiteral, panic, showAST } from '../util'

const handlerMap: HandlerMap = {
  Assertion: handleAssertion,
  CharacterClass: handleCharacterClass,
  CharacterSet: handleCharacterSet,
  Character: handleCharacter,
  Quantifier: handleQuantifier,
  Group: handleGroup,
  CapturingGroup: handleCapturingGroup,
  Backreference: handleBackreference,
}

export const handleElements = ({ elements }: { elements: Element[] }) => {
  const irNodes: IRNode[] = []
  for (
    let index = 0, checker = 0;
    index < elements.length;
    checker = loopChecker(index, checker, elements)
  ) {
    const type = elements[index]?.type
    if (handlerMap[type]) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { pointer: newPointer, ir: IR } = handlerMap[type]!(elements, index)
      index = newPointer
      irNodes.push(IR)
    } else {
      panic({
        msg: 'unknown AST node type',
        data: elements[index]?.raw,
      })
    }
  }
  return irNodes
}

export const handleAlternative: Handler = (
  nodes: Alternative[],
  pointer: number
) => {
  const node = nodes[pointer]
  const children = handleElements({ elements: node.elements })
  return {
    pointer: pointer + 1,
    ir: {
      type: 'Alternative',
      raw: node.raw,
      children: children,
    },
  }
}

// //have a try
// const ast = getLiteral(/abC/)
// showAST(ast)
// console.log(handleAlternative(ast, 0))
// // pass
