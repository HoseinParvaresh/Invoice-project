function formatNumber(num) {
    return new Intl.NumberFormat('en-US', { style: "decimal" }).format(num);
}
function roundUpToNearestFive(num) {
    return Math.ceil(num / 5) * 5;
}
function totalPrice(rows) {
    const totalAmount = rows.reduce((sum, row) => sum + Number(row.amount), 0);
    return totalAmount
}
function addPercentage(amount, percent) {
    return formatNumber(amount * (1 + percent / 100))
}
function calcTotalAmount(packaging, coloring, tools, packagingPercent, coloringPercent, toolsPercent, rent ,amount) {
    const totalPercent =
        (packaging ? packagingPercent : 0) +
        (coloring ? coloringPercent : 0) +
        (tools ? toolsPercent : 0);

        console.log(totalPercent);
        

    return (amount * (1 + totalPercent / 100)) + rent
}

export { formatNumber, roundUpToNearestFive, totalPrice, addPercentage, calcTotalAmount }