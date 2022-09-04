import morgan from 'morgan';

const customMorgan = morgan((tokens, req, res) => {
    let timestamp = new Date();
    let timeZoneOffsetHrs = -(timestamp.getTimezoneOffset() / 60);
    let month = timestamp.getMonth()<10 ? `0${timestamp.getMonth()+1}` : `${timestamp.getMonth()+1}`;
    let day = timestamp.getDate()<10 ? `0${timestamp.getDate()}` : `${timestamp.getDate()}`;
    let hours = timestamp.getHours()<10 ? `0${timestamp.getHours()}` : `${timestamp.getHours()}`;
    let minutes = timestamp.getMinutes()<10 ? `0${timestamp.getMinutes()}` : `${timestamp.getMinutes()}`;
    let seconds = timestamp.getSeconds()<10 ? `0${timestamp.getSeconds()}` : `${timestamp.getSeconds()}`;
    let timezoneOffsetHrs_corrected;
    if(Math.abs(timeZoneOffsetHrs)<10){
        if(timeZoneOffsetHrs < 0){
            timezoneOffsetHrs_corrected = `-0${Math.abs(timeZoneOffsetHrs)}`;
        }else{
            timezoneOffsetHrs_corrected = `0${Math.abs(timeZoneOffsetHrs)}`;
        }
    }

    return [
        `[${timestamp.getFullYear()}:${month}:${day} ${hours}:${minutes}:${seconds} T${timezoneOffsetHrs_corrected}:00]`, 
        ' : : ',
        tokens.method(req, res),
        ' : : ',         
        tokens.status(req, res),
        ' : : ',
        tokens.url(req, res),
        ' : : ',
        tokens['remote-addr'](req, res),
        ' : : ',
        'from ' + tokens.referrer(req, res),
        ' : : ',
        tokens['response-time'](req, res) + ' ms',
    ].join('');
});

export default customMorgan;