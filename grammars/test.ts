import { safelyParseRegExp } from "./lib"
import { panic } from "./util"


const regExpObj = /abc/g

const regExpAST = safelyParseRegExp(regExpObj)

panic(regExpAST)