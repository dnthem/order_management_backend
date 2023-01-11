import indexedDBController from "../../indexedDB/indexedDB";

const LAST_7_DAYS = 7,
      LAST_30_DAYS = 30;

const INCOME_STORE = 'Income',
      MENU_STORE   = 'Menu',
      ORDERS_STORE = 'Orders';

/**
 * This functions returns an object that can be passed to Chart js to create an area chart
 * It tells that chart to display incomes in a range specified by time
 * @param {indexDBRef} db database object reference to retreive data
 * @param {Number} time input 0 - last 7 days, 1 - last 30 days, and 2 for all
 * @returns an object {maxTick - 7, array of labels, array of data, maximum data or Income}
 */
async function dataConverterIncome(db, time = 0) {
    const data = await indexedDBController.getAllDataFromStore(db, INCOME_STORE);
    const sortedData = data.sort((a,b) =>  new Date(a.Date) - new Date(b.Date));
    const res = {};
    const NUMBERS_TO_DISPLAY = time===0? LAST_7_DAYS: time===1?LAST_30_DAYS:sortedData.length;
    const maxLen = sortedData.length - NUMBERS_TO_DISPLAY<0 ? 0: sortedData.length;
    res.maxTick = 7;
    res.labels = sortedData.map(e => e.Date).slice(maxLen-NUMBERS_TO_DISPLAY);
    res.data = sortedData.map(e => e.Income).slice(maxLen-NUMBERS_TO_DISPLAY);
    res.max = Math.max(...res.data);
    return res;
}

/**
 * This functions returns an object that can be passed to Chart js to create an Bar chart
 * It tells that chart to display 'number' items what have the most count
 * @param {indexDBRef} db database object reference to retreive data
 * @param {Number} number number of data need to display
 * @returns {object} {labels, data, max - Count, maxTick}
 */
async function dataConverterMenu(db, number = 7) {
    const data = await indexedDBController.getAllDataFromStore(db, MENU_STORE);
    const NUMBERS_TO_DISPLAY = number===0? 5:number===1? 10: data.length;
    const sortedData = data.sort((a,b) =>  b.Count - a.Count).slice(0, NUMBERS_TO_DISPLAY);
    const res = {};
    res.labels = sortedData.map(e => e.Title);
    res.data = sortedData.map(e => e.Count);
    res.max = Math.max(...res.data);
    res.maxTick = number;
    return res;
}

async function getIncomeUpToDate(db) {
    const data = await indexedDBController.getAllDataFromStore(db, INCOME_STORE);
    return data.reduce((acc, curr) => acc + curr.Income, 0);
}

export {
    dataConverterIncome,
    dataConverterMenu
}