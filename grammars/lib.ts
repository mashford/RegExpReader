import {
    AST,
    RegExpParser,
    RegExpValidator,
    parseRegExpLiteral,
    validateRegExpLiteral,
    visitRegExpAST
} from "regexpp"

export const safelyParseRegExp = (source: string | RegExp, options?: RegExpParser.Options) =>{
  try{
    return parseRegExpLiteral(source, options)
  } catch(e) {
    return undefined
  }
}

