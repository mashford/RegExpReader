
import {
    Alternative,
    CharacterClass,
    CharacterSet,
    Element,
  } from 'regexpp/ast';
  import { panic } from "./util"
  
  export type elementType =
    | 'Assertion'
    | 'Quantifier'
    | 'Group'
    | 'CapturingGroup'
    | 'CharacterClass'
    | 'CharacterSet'
    | 'Character'
    | 'Backreference';
  
  // export type HandlerMap = {
  //   [key in elementType]?: (
  //     nodes: Element[],
  //     index: number
  //   ) => {
  //     pointer: number;
  //     val: IRNode;
  //   };
  // };
  
  export type HandlerMap = {
    Character: (
      nodes: any[],
      index: number
    ) => {
      pointer: number;
      ir: IRNode;
    };
    CharacterClass: (
      elements: CharacterClass[],
      index: number
    ) => {
      pointer: number;
      ir: IRNode;
    };
    CharacterSet: (
      elements: CharacterSet[],
      index: number
    ) => {
      pointer: number;
      ir: IRNode;
    };
  };
  
  export type IRNode = {
    type: string;
    val?: string;
    children?: IRNode[];
    raw?: string;
    negate?: boolean;
    msg?: string;
  };