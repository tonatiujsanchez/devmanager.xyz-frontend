

export const getSessionToken = ():{ token:string, remindme:boolean } => {
    
    const remindme = localStorage.getItem('uptask_remindme') || 'false'
    
    let token = ''
    
    if( JSON.parse(remindme) ){
        token = localStorage.getItem('uptask_session') || ''
    }else {
        token = sessionStorage.getItem('uptask_session') || ''
    }

    return {
        token,
        remindme: JSON.parse(remindme)
    }
}    

