// date format to mm/dd/yyyy
/**
 *  date format to mm/dd/yyyy
 * @param {string} date date to format, defaults to today
 * @returns {string} date in mm/dd/yyyy format
 */
export const dateFormat = (date) => {
    const d = date ? new Date(date) : new Date();
    return d.toLocaleDateString('en-US');
}

export const dateToISO = (date) => {
    const d = date ? new Date(date) : new Date();
    return d.toISOString().substring(0,10);
}

/**
 * Return the current time of the day: hh:mm
 * @returns {string} hh:mm
 */
export const getCurrentTime = () => {
    const today = new Date();
    return today.getHours() + ":" + today.getMinutes();
}