
// 数字加逗号
export const formatNumber = (num = 0) => {
    return num.toString().replace(/\d+/, function (n) {
        return n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    });
};

// 数字缩写编号
export const abbreviateNumber = (number) => {
    const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
    const tier = Math.log10(Math.abs(number)) / 3 | 0;
    if (tier == 0) return number;
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = number / scale;
    return scaled.toFixed(1) + suffix;
}
