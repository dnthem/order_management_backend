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
