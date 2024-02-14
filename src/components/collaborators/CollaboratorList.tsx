import { FC } from 'react'

import { IUser } from '../../interfaces'
import { CollaboratorItem } from '..'



interface Props {
    collaborators: IUser[]
    creator?: IUser
}
export const CollaboratorList:FC<Props> = ({ collaborators, creator }) => {
    

    if(collaborators.length === 0){
        return (
            <p className="text-center text-slate-400">No hay colaboradores en este proyecto</p>
        )
    }

    return (
        <div className="flex flex-col sm:flex-row gap-4 content-start flex-wrap min-h-[16rem]">
            {
                creator && (
                    <CollaboratorItem 
                        collaborator={ creator }
                        isCreator
                    />
                )
            }
            {
                collaborators.map( collaborator => (
                    <CollaboratorItem 
                        key={ collaborator._id } 
                        collaborator={ collaborator } 
                    />
                ))
            }
        </div>
    )
}
