import { FC, useEffect } from "react"

import { useQuill } from "react-quilljs"
import "quill/dist/quill.snow.css"

const modules = {
    toolbar: '#toolbar',
};

const formats = [
    'bold', 'italic', 'underline', 'strike',
    'align',
    'list', 'list',
    'link', "code", "clean"
];


interface Props {
    placeholder: string
    content?   : string
    onChangeContent: (content: string) => void
    height?    :string
}

export const TextEditor: FC<Props> = ({ placeholder, content, onChangeContent, height }) => {
    
    const { quill, quillRef } = useQuill({ modules, formats, placeholder })
    
    useEffect(()=>{
        if(content){
            if (quill) {
                quill.clipboard.dangerouslyPasteHTML(content)
            }
        }
    },[quill])

    useEffect(()=>{
        if(quill){
            quill.on('text-change', ()=>{
                if(quill.getText().trim() === ''){
                    onChangeContent('')
                }else {
                    onChangeContent(quill.root.innerHTML)
                } 
            })
        }
    },[quill])

    return (
        <div className={`editor-container rounded-md ${ height ? height :'h-52' } pb-12 hover:outline hover:outline-2 hover:outline-slate-950`}>
            <div id="toolbar">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />

                <select className="ql-align" defaultValue={""} onChange={e => e.persist()}>
                    <option value="" />
                    <option value="center" />
                    <option value="right" />
                    <option value="justify" />
                </select>

                <button className="ql-list" value="bullet" />
                <button className="ql-list" value="ordered" />

                <button className="ql-link" />
                <button className="ql-code" />

                <button className="ql-clean bx bx-eraser"></button>
            </div>
            <div ref={quillRef} className="text-base"/>
        </div>
    )
}
