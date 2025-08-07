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
function addPercentage (amount, percent) { 
    return amount * (1 + percent / 100); 
}

export { formatNumber, roundUpToNearestFive, totalPrice, addPercentage }