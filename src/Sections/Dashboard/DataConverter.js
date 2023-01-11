import indexedDBController from "../../indexedDB/indexedDB";

const LAST_7_DAYS = 7,
      LAST_30_DAYS = 30;

async function dataConverterIncome(db, time = 0) {
    const data = await indexedDBController.getAllDataFromStore(db, 'Income');
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

async function dataConverterMenu(db, number = 7) {
    const data = await indexedDBController.getAllDataFromStore(db, 'Menu');
    const NUMBERS_TO_DISPLAY = number===0? 5:number===1? 10: data.length;
    const sortedData = data.sort((a,b) =>  b.Count - a.Count).slice(0, NUMBERS_TO_DISPLAY);
    const res = {};
    res.labels = sortedData.map(e => e.Title);
    res.data = sortedData.map(e => e.Count);
    res.max = Math.max(...res.data);
    res.maxTick = number;
    return res;
}

export {
    dataConverterIncome,
    dataConverterMenu
}