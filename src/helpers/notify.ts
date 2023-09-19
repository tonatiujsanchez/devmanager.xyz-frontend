import cogoToast from 'cogo-toast'

type typeNotify = 'success' | 'error'
export const showNotify = ( msg:string, type:typeNotify )=> {
    const { hide } = cogoToast[type](
        '', 
        {   
            position: 'top-center',
            heading: msg,
            onClick: () => {
                hide!()
            }
        },
    )
}
