import { useSelector } from "react-redux"

import { IRootState } from "../store/store"
import { IDataState } from "../store/data"

export const useData = () => {

    const data:IDataState = useSelector(( state: IRootState ) => state.data)

    return data
}
