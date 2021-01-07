// 判断某年是不是闰年
export function isRunNian(year) {
    return year % 400 == 0 || (year % 100 != 0 && year % 4 == 0);
};

// 计算某年某月多少天
export function getMonthDays(year, month) {
    let days = [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
    if (days == -1) {
        days = isRunNian(year) ? 29 : 28;
    }
    return days;
};

// 计算年视图的十年
export function getDecYears(year) {
    let temp = (year + "").replace(/\d$/, '0') - 1,
        years = [];
    for (let i = 1; i <= 10; i++) {
        years.push(temp + i);
    }
    return years;
};

// 当月视图前置天
export function getPreDayArray(year, month) {

    // 前置补充的天数
    let preDays = new Date(year + "/" + month + "/01").getDay();

    // 上个月多少天
    let preMonthDays = month == 1 ? getMonthDays(year - 1, 12) : getMonthDays(year, month - 1);

    let temp = [];
    for (let i = 0; i < preDays; i++) {
        temp.unshift({
            num:preMonthDays - i,
            type:"nouse"
        });
    }

    return temp;
}

// 当月视图后置天
export function getNextDayArray(year, month) {
    let preDays = new Date(year + "/" + month + "/01").getDay();

    // 后置补充的天数
    let nextDays = 42 - preDays - getMonthDays(year, month);

    let temp = [];
    for (let i = 1; i <= nextDays; i++) {
        temp.push({
            num:i,
            type:'nouse'
        });
    }

    return temp;
}
