



export const setSessionToken = async(token:string, remindme:boolean) => {
    
    if( remindme ){
        localStorage.setItem('uptask_session', token)
    }else {
        sessionStorage.setItem('uptask_session', token)
    }

    localStorage.setItem('uptask_remindme', String(remindme))
}