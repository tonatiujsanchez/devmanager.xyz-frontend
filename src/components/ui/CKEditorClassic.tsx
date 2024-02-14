import { FC, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'


const editorToolbar = [
    'undo', 'redo', '|', 'bold', 'italic', 'link', 'blockQuote', 'bulletedList', 'numberedList'
]

interface Props {
    value       : string
    onChanche   : (value: string) => void
    placeholder?: string
    height?     : string
}
export const CKEditorClassic: FC<Props> = ({ value, onChanche, placeholder='Contenido', height }) => {

    const [classesEditorContainer, setClassesEditorContainer] = useState<string>('')

    return (
        <div 
            className={ `editor-container rounded-lg overflow-hidden ${ height ? height :'h-52' } ${ classesEditorContainer }` }
        >
            <CKEditor
                editor={ ClassicEditor }
                data={ value }
                config={{
                    placeholder,
                    toolbar: editorToolbar,
                }}
                onChange={(_event, editor) => {
                    const data = editor.getData()
                    onChanche(data)
                }}
                onBlur={() => {
                    setClassesEditorContainer('')
                }}
                onFocus={() => {
                    setClassesEditorContainer('outline outline-2 outline-slate-950')
                }}
            />
        </div>
    )
}
