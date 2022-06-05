import { Alternative, CharacterSet, Element } from 'regexpp/ast'
import { getLiteral, showAST } from '../util'

export const handleCharacterSet = (nodes: CharacterSet[], pointer: number) => {
  switch (nodes[pointer].raw) {
    case '\\s': {
      return {
        pointer: pointer + 1,
        ir: {
          type: 'Whitespace',
          raw: '\\s',
          msg: `a whitespace character`,
          examples: ['\r', '\n', ' '],
        },
      }
    }
    case '\\S': {
      return {
        pointer: pointer + 1,
        ir: {
          type: 'Not WhitespaceChar',
          raw: '\\S',
          msg: `a non-whitespace character`,
          examples: ['.', 's', '2'],
        },
      }
    }
    case '\\d': {
      return {
        pointer: pointer + 1,
        ir: {
          type: 'Digit',
          raw: '\\d',
          msg: `a numeric character.`,
          examples: ['1', '2', '3'],
        },
      }
    }
    case '\\D': {
      return {
        pointer: pointer + 1,
        ir: {
          type: 'Not Digit',
          raw: '\\D',
          msg: `a non-numeric character.`,
          examples: ['.', 's', ' '],
        },
      }
    }
    case '\\w': {
      return {
        pointer: pointer + 1,
        ir: {
          type: 'Word',
          raw: '\\w',
          msg: `a alphanumeric character. Including the underline.`,
          examples: ['a', 'S', '_', '1'],
        },
      }
    }
    case '\\W': {
      return {
        pointer: pointer + 1,
        ir: {
          type: 'Not Word',
          raw: '\\W',
          msg: `a character not in (a-z, A-Z, 0-9, _)`,
          examples: ['.', ',', ' '],
        },
      }
    }
    case '.': {
      return {
        pointer: pointer + 1,
        ir: {
          type: 'Dot',
          raw: '.',
          msg: `any character except line breaks.`,
          examples: ['h', 'i', ' ', '0', '1', '2', '_', '-', '!', '?'],
        },
      }
    }
    default: {
      throw new Error('unknown CharacterSet')
    }
  }
}

//have a try

// const ast = getLiteral(/\w\s\dwsd\W\S\D./)
// showAST(ast)
// console.log(handleCharacterSet(ast[0].elements as CharacterSet[], 0))
//done
