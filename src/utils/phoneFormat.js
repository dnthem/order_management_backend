// format phone number to xxx-xxx-xxxx
/**
 * format phone number to xxx-xxx-xxxx
 * @param {string} phone phone number to format
 * @returns {string} phone number in xxx-xxx-xxxx format
 */
export const phoneFormat = (phone) => {
    if (phone.length === 10) {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else {
        return phone;
    }
}

// from input xxx-xxx-xxxx get last 4 digits
/**
 * from input xxx-xxx-xxxx get last 4 digits
 * @param {string} phone phone number to format
 * @returns {string} last 4 digits of phone number
 * */
export const getLast4Digits = (phone) => {
    // remove all non numeric characters
    phone = phone.replace(/\D/g, '');
    // get last 4 digits
    return phone.slice(-4);
}