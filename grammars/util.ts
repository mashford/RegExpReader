import { AST } from 'regexpp'
import util from 'util'

export const panic = (data: any) => {
  let str = new Error().stack?.toString()
  let Regexp = /\w+\.(js|ts):\d+:\d+/g
  // console.log(str.split('\n')[2].split('/').reverse()[0].slice(0,-1))
  console.log(
    `${Regexp.exec(str ?? '')![0]}:  ${util.inspect(data, {
      showHidden: true,
      depth: null,
      colors: true,
    })}`
  )
  // console.log(/\w+\.(js|ts):\d+:\d+/g.exec('empty.js:7:1'))
}

// type ASTobj = Partial<
//   Pick<
//     AST.RegExpLiteral,
//     'type' | 'start' | 'end' | 'raw' | 'pattern' | 'alternatives'
//   >
// >
// export const printAST = (literal: AST.RegExpLiteral | undefined) => {
//   const pattenObj: ASTobj = {}
//   if (!literal) return pattenObj
//   for (let key of Object.keys(literal ?? {})) {
//     switch (key) {
//       case 'parent': {
//         break
//       }
//       case 'type': {
//         pattenObj['type'] = literal[key]
//       }
//       case 'raw': {
//         pattenObj['raw'] = literal[key]
//       }
//       case 'pattern': {
//         pattenObj['pattern'] = literal[key]
//       }
//       case 'type': {
//         pattenObj['type'] = literal[key]
//       }
//     }
//   }
// }

const travel = (node: any): any => {
  if (!node) {
    return;
  }
  if (Array.isArray(node)) {
    return node.map((val) => travel(val));
  }
  const newNode: any = {};
  for (let key of Object.keys(node)) {
    switch (key) {
      case 'element': {
        newNode[key] = travel(node[key]);
        break;
      }
      case 'elements': {
        newNode[key] =
          Array.isArray(node[key]) &&
          node[key].map((element: any) => travel(element));
        break;
      }
      case 'raw': {
        newNode[key] = node[key];
        break;
      }
      case 'alternatives': {
        newNode[key] = travel(node[key]);
        break;
      }
      case 'type': {
        newNode[key] = node[key];
        break;
      }
      default: {
        if (
          typeof node[key] === 'number' ||
          typeof node[key] === 'string' ||
          typeof node[key] === 'boolean'
        ) {
          newNode[key] = node[key];
        }
        break;
      }
      // default: {
      //   if (key !== 'parent') newNode[key] = node[key];
      //   break;
      // }
    }
  }
  return newNode;
};

export const showAST = (alternatives: any, layer = 1) =>
  panic({ data: travel(alternatives), layers: layer + 1 });

import { parseRegExpLiteral, RegExpParser } from 'regexpp';
import { Alternative } from 'regexpp/ast';

export const getLiteral = (
  source: string | RegExp,
  options?: RegExpParser.Options | undefined
): Alternative[] => {
  return parseRegExpLiteral(source, options).pattern.alternatives;
};

export const safelyParseRegExp = (source: string | RegExp, options?: RegExpParser.Options) =>{
try{
  return parseRegExpLiteral(source, options)
} catch(e) {
  return undefined
}
}

