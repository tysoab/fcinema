export const cinemaDate = (day)=>{
    const dt = new Date();
    const no_of_days = day;

    dt.setDate(dt.getDate() + no_of_days)
    
    return new Intl.DateTimeFormat(navigator.language,{
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }).format(dt);
};