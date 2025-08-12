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
function calcTotalAmount(packaging, coloring, tools, packagingPercent, coloringPercent, toolsPercent, rent, amount) {
    const totalPercent =
        (coloring ? coloringPercent : 0) +
        (tools ? toolsPercent : 0);

    const priceWithoutPacking = amount * (1 + totalPercent / 100)

    return (priceWithoutPacking * (1 + (packaging ? packagingPercent : 0) / 100)) + rent
}
function calculatePercent(amount, percent) {
    return formatNumber(amount * (percent / 100))
}
function calcPackingPercent(amount, percent) {
    return amount * (1 + percent / 100)
}

export { formatNumber, roundUpToNearestFive, totalPrice, addPercentage, calcTotalAmount, calculatePercent, calcPackingPercent }