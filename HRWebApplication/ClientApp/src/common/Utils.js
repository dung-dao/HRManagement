const FORMAT_MONEY = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'vnd',
    minimumFractionDigits: 0
});

export function formatMoney(money) {
    return FORMAT_MONEY.format(money);
}

export function checkExtensionImg(file) {
    const validType = file.type === 'image/jpeg' || file.type === 'image/png';
    return validType;
}

export function checkSizeImg(file) {
    const validSize = file.size / 1024 / 1024 < 2;
    return validSize;
}