

export const dateFormat = ( date:Date ):string => {
    
    const longDate = new Date(date)
        .toLocaleDateString('es-ES',{
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC' // Establece la zona horaria a UTC
        })
    
    return longDate.substring(0,1).toUpperCase() + longDate.substring(1)
}
