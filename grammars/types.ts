import { Alternative, CharacterClass, CharacterSet, Element } from 'regexpp/ast'
import { panic } from './util'

export type NodeType =
  | 'RegExpLiteral'
  | 'Pattern'
  | 'Alternative'
  | 'Flags'
  | ElementType

export type ElementType =
  | 'Assertion'
  | 'Quantifier'
  | 'Group'
  | 'CapturingGroup'
  | 'CharacterClass'
  | 'CharacterSet'
  | 'Character'
  | 'Backreference'

export type QuantifiableElementType =
  | 'Group'
  | 'CapturingGroup'
  | 'CharacterClass'
  | 'CharacterSet'
  | 'Character'
  | 'Backreference'
  | 'Assertion'

export type CharacterClassElementType =
  | 'CharacterSet'
  | 'Character'
  | 'CharacterClassRange'

export type HandlerMap = {
  [key in NodeType]?: Handler
}

// export type HandlerMap = {
//   Character: (
//     nodes: any[],
//     index: number
//   ) => {
//     pointer: number
//     ir: IRNode
//   }
//   CharacterClass: (
//     elements: CharacterClass[],
//     index: number
//   ) => {
//     pointer: number
//     ir: IRNode
//   }
//   CharacterSet: (
//     elements: CharacterSet[],
//     index: number
//   ) => {
//     pointer: number
//     ir: IRNode
//   }
// }

export type Handler = (
  nodes: any[],
  pointer: number
) => {
  pointer: number
  ir: IRNode
}

export type IRNode = {
  type: string
  val?: string
  children?: IRNode[]
  raw?: string
  negate?: boolean
  name?: string
  msg?: string
}
