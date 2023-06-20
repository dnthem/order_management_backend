// main file for utils
import { phoneFormat, getLast4Digits } from './phoneFormat';
import { dateFormat, dateToISO, getCurrentTime, convertISOToUSA, convertUSAtoISO } from './dateFormat';
import { orderFormater } from './orderFormat';
import { downloadOrderFormat } from './downloadOrderFormat';
import { getRandomColor } from './randomColor';
import fetchAPI from './fetchAPI';
import { 
    convertAPItoCustomer, 
    convertAPItoIncome,  
    convertAPItoIncomeUpToDate,
    convertAPItoMenu,
    convertCustomerToAPI,
    convertIncomeToAPI,
    convertIncomeUpToDateToAPI,
    convertMenuToAPI,
    covertToAPI,
    convertFromAPI,
} from './apiDataConverter';
// export all utils here
export {
    phoneFormat,
    dateFormat,
    dateToISO,
    convertISOToUSA,
    convertUSAtoISO,
    getCurrentTime,
    orderFormater,
    downloadOrderFormat,
    getRandomColor,
    getLast4Digits,
    fetchAPI,
    convertAPItoCustomer, 
    convertAPItoIncome,  
    convertAPItoIncomeUpToDate,
    convertAPItoMenu,
    convertCustomerToAPI,
    convertIncomeToAPI,
    convertIncomeUpToDateToAPI,
    convertMenuToAPI,
    covertToAPI,
    convertFromAPI,
};