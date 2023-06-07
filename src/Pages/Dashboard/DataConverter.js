
/**
 * This functions returns an object that can be passed to Chart js to create a Bar chart
 * It tells that chart to display 'number' items what have the most count
 * @param {indexDBRef} db database object reference to retreive data
 * @param {Number} number number of data need to display
 * @returns {object} {labels, data, max - Count, maxTick}
 */
function dataConverterMenu(data, number = 7) {
    const NUMBERS_TO_DISPLAY = data.length < number ? data.length : number;
    const sortedData = data.sort((a,b) =>  b.Count - a.Count).slice(0, NUMBERS_TO_DISPLAY);
    const res = {};
    res.labels = sortedData.map(e => e.Title);
    res.data = sortedData.map(e => e.Count);
    return res;
}


function getTotalItemSold(data) {
    return data.reduce((acc, curr) => acc + curr.Count, 0);
}


function getIncomeTrending(data) {
    if (data[0]?.Date !== new Date().toLocaleDateString('us-en')) return -Infinity;
    const currentDate = data[0]?.Total??0;
    const previousDate = data[1]?.Total??1;
    const res = ((currentDate - previousDate) / currentDate) * 100;
    return res.toFixed(2);
}

function incomeChartConverter(data) {
    return {
        data : data?.map((eachDay) => eachDay?.Total??0).reverse(),
        labels: data?.map((eachDay) => eachDay?.Date??0).reverse(),
    }
}

export {
    incomeChartConverter,
    dataConverterMenu,
    getTotalItemSold,
    getIncomeTrending,
}