import { useSelector } from "react-redux"

import { IRootState } from "../store/store"
import { IUiState } from "../store/ui"



export const useUi = () => {

    const dataUI: IUiState = useSelector(( state: IRootState ) => state.ui)

    return dataUI
}
