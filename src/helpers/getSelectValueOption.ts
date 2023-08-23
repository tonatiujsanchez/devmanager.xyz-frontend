import { IOptionSelect } from "../interfaces"


export const getSelectValueOption = (options:IOptionSelect[], optionKey:string):string => {
    return options.find( option => option.key === optionKey )?.value || options[0].value
}