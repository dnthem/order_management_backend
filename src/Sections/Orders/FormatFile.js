function convertReadable (content) {
    const totalItemSold = content.Quantities.reduce((acc,curr) => acc + curr, 0);
    const allItems = content.ItemNames.reduce((acc,curr) => acc + ', ' + curr, '');
    const total = content.Totals.reduce((acc,curr) => acc + curr, 0);
    const res = `
        \n/////////////////////// Readable Content //////////////////\n
        Order Date: ${content.Date} \n
        Total items sold: ${totalItemSold}\n
        All items sold today: ${allItems}\n
        Total: $${total} \n
    `;
    return JSON.stringify(content) + res;
}

export default convertReadable