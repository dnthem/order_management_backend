import indexedDBController from "../../indexedDB/indexedDB";

const NUMBERS_TO_DISPLAY = 5;

async function dataConverterIncome(db) {
    const data = await indexedDBController.getAllDataFromStore(db, 'Income');
    const sortedData = data.sort((a,b) =>  new Date(a.Date) - new Date(b.Date));
    const res = {};
    const maxLen = sortedData.length - NUMBERS_TO_DISPLAY<0 ? 0: sortedData.length;
    res.labels = sortedData.map(e => e.Date).slice(maxLen-NUMBERS_TO_DISPLAY);
    res.data = sortedData.map(e => e.Income).slice(maxLen-NUMBERS_TO_DISPLAY);
    res.max = Math.max(...res.data);


    return res;
}

async function dataConverterMenu(db) {
    const data = await indexedDBController.getAllDataFromStore(db, 'Menu');
    const res = {};
    res.labels = data.map(e => e.Title);
    res.data = data.map(e => e.Count);
    res.max = Math.max(...res.data);
    return res;
}

export {
    dataConverterIncome,
    dataConverterMenu
}