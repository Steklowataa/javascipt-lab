export function getTodaysDate() {
    const today = new Date()
    const day = today.getDate()
    let hours = today.getHours()
    const minutes = today.getMinutes()


    const suffix = (day) => {
        if (day > 3 && day < 21) return 'th'; // For 4th to 20th
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const month = today.getMonth()
    const d = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];



    let name = d[month]

    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 


    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;

    // console.log(formattedTime)
    // console.log(name, day+suffix(day))

    return `${name} ${day}${suffix(day)}, ${formattedTime}`

}