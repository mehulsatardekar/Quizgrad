const options:object= {weekday:'long', year:'numeric', month:'long', day:'numeric'};

const convertDateToMonthAndYear= (formatType:string, date:string|undefined)=>{
    if(typeof date === 'string'){
        const dateFormat = new Date(date);
        return dateFormat.toLocaleDateString("en-US", options);
    }
    return 'undefined date found'
}

export {convertDateToMonthAndYear};