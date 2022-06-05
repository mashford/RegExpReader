import { AST } from 'regexpp'
import util from 'util'

interface PanicProps {
  msg?: string
  data?: unknown
  layer?: number
}

export const panic = (panicProps: PanicProps) => {
  const { data, msg, layer = 2 } = panicProps
  const str = new Error().stack?.toString()
  const Regexp = /\w+\.(js|ts):\d+:\d+/g
  // console.log(str.split('\n')[2].split('/').reverse()[0].slice(0,-1))
  console.log(
    `%c${Regexp.exec(str?.split('\n')[layer] ?? '')?.[0]}: ${msg ?? ''}` +
      ` ${util.inspect(data, {
        showHidden: false,
        depth: null,
        colors: true,
      })}`,
    'color: green;'
  )
  // console.log(/\w+\.(js|ts):\d+:\d+/g.exec('empty.js:7:1'))
}

const pickFromAlternatives = (node: any): any => {
  if (!node) {
    return
  }
  if (Array.isArray(node)) {
    return node.map((val) => pickFromAlternatives(val))
  }
  const newNode: any = {}
  for (const key of Object.keys(node)) {
    switch (key) {
      case 'element': {
        newNode[key] = pickFromAlternatives(node[key])
        break
      }
      case 'elements': {
        newNode[key] =
          Array.isArray(node[key]) &&
          node[key].map((element: any) => pickFromAlternatives(element))
        break
      }
      case 'raw': {
        newNode[key] = node[key]
        break
      }
      case 'alternatives': {
        newNode[key] = pickFromAlternatives(node[key])
        break
      }
      case 'type': {
        newNode[key] = node[key]
        break
      }
      default: {
        if (
          typeof node[key] === 'number' ||
          typeof node[key] === 'string' ||
          typeof node[key] === 'boolean'
        ) {
          newNode[key] = node[key]
        }
        break
      }
      // default: {
      //   if (key !== 'parent') newNode[key] = node[key];
      //   break;
      // }
    }
  }
  return newNode
}

// print the RegExp AST
export const showAST = (alternatives: Alternative[], layer = 2) =>
  panic({ data: pickFromAlternatives(alternatives), layer: layer + 1 })

import { parseRegExpLiteral, RegExpParser } from 'regexpp'
import { Alternative } from 'regexpp/ast'

//get the literal part of regexp
export const getLiteral = (
  source: string | RegExp,
  options?: RegExpParser.Options | undefined
): Alternative[] => {
  return parseRegExpLiteral(source, options).pattern.alternatives
}

//get the flags part of regexp
export const getFlags = (
  source: string | RegExp,
  options?: RegExpParser.Options | undefined
): any => {
  return parseRegExpLiteral(source, options)
}

// parse regexp and catch errors
export const safelyParseRegExp = (
  source: string | RegExp,
  options?: RegExpParser.Options
) => {
  try {
    return parseRegExpLiteral(source, options)
  } catch (e) {
    return undefined
  }
}
