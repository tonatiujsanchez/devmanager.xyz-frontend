import { useDispatch } from 'react-redux'

import { useUi } from '../../hooks'
import { IAppDispatch } from '../../store/store'
import { startHideSearcher } from '../../store/ui'

import { Modal, ProjectSearchContent } from '..'




export const ProjectSearch = () => {

     
    const dispatch:IAppDispatch = useDispatch()
    const { showSearcher } = useUi()    

    const onCloseModal = () => {
        dispatch( startHideSearcher() )
    }

    

    return (

        <Modal
            isOpen={showSearcher}
            closeModal={onCloseModal}
            classPosition="flex items-start justify-center pt-36"
        >
            <ProjectSearchContent
                onCloseModal={ onCloseModal }
            />
        </Modal>
    )
}
