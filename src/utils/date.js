const ONE_DAY = 86400000; // 24 * 60 * 60 * 1000;

/**
 * 解析 YYYY-MM-DD HH:mm:ss 格式的时间字符串
 */
export function parse(str) {
  const [date, time] = str.split(' ');
  const [year, month, day] = date.split('-').map(i => parseInt(i, 10));
  const [hour, min, sec] = time.split(':').map(i => parseInt(i, 10));
  const ins = new Date();
  ins.setFullYear(year, month - 1, day);
  ins.setHours(hour, min, sec);
  return ins;
}
/**
 *返回date2比date1大了几天（不是十分准确，可能有1天的偏差）
 *@param {Date} startDate 开始时间
 *@param {Date} endDate 结束时间
 *@returns {Number}
 */
export function getDaysPass(startDate, endDate) {
  const t = endDate.getTime() - startDate.getTime(); // 相差毫秒
  let day = Math.round(t / 1000 / 60 / 60 / 24);
  if (day === 0 || day === 1) {
    day = startDate.getDate() === endDate.getDate() ? 0 : 1;
  }
  return day;
}

/**
 *格式化时间文本
 *@param {Date} date 时间对象
 *@param {String} format 格式化的文本格式
 *@param {Date} [zone] 时区
 *@returns {String} 格式化后的文本
 * @example
 * MZ.date.format('现在是YYYY年MM月dd日 hh点mm分ss秒，星期w',new Date());
 *  Y 表示年份
 *  M 大写M表示月份
 *  D 表示几号
 *  h 表示小时
 *  m 表示分
 *  s 表示秒
 *  w 表示星期几
 */
export function format(date, format = 'YYYY-MM-DD HH:mm:ss', zone = null) {
  if (zone && typeof zone === 'number') {
    // 得到1970年一月一日到现在的秒数
    const len = date.getTime();
    // 本地时间与GMT时间的时间偏移差
    const offset = date.getTimezoneOffset() * 60000;
    const utcTime = len + offset;
    date = new Date(utcTime + 3600000 * zone);
  }

  const o = {
    'M+': date.getMonth() + 1, // month
    'D+': date.getDate(), // day
    'H+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds(), // millisecond
    w: '日一二三四五六'.charAt(date.getDay()),
  };

  format = format.replace(/Y{4}/, date.getFullYear()).replace(/Y{2}/, date.getFullYear().toString().substring(2));

  let k, reg;
  for (k in o) {
    reg = new RegExp(k);

    /* eslint no-use-before-define:0 */
    format = format.replace(reg, match);
  }

  function match(m) {
    return m.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length);
  }

  return format;
}

/**
 * 获得距离指定日期 n 天的日期对象
 * @param {Date} date - 指定日期对象
 * @param {Number} n - 距离指定日期的天数
 * @returns {Date}
 * @example
 * //获取明天的日期对象:
 * MZ.date.getDateByDays(new Date(), 1);
 *
 */
export function getDateByDays(date, n) {
  if (!date) {
    date = new Date();
  }

  return new Date(date.getTime() + n * ONE_DAY);
}

/**
 * 判断日期是否是今天之前
 * @param date
 */
export function isLastDay(date) {
  const today = this.format(new Date(), 'YYYY-MM-DD');
  const compareDay = this.format(date, 'YYYY-MM-DD');
  return today > compareDay;
}
// 变成 2021/07/01 00:00:00 格式 可进行new Data()
export function dataInit(date,time='00:00:00'){
  let DateTime = `${date} ${time}`;
  DateTime = DateTime.substring(0,19);
  DateTime = DateTime.replace(/-/g,'/'); //必须把日期'-'转为'/'
  return DateTime;
}

/**
 *
 * @param {Date} date 日期
 * @param {Number} days 要增加的天数
 */
export function addDays(date, days) {
  return this.addTime(date, ONE_DAY * days);
}

/**
 *
 * @param {Date} date 日期
 * @param {Number} time 毫秒数
 */
export function addTime(date, time) {
  return new Date(date.getTime() + time);
}

export function getMaxWeek() {
  const now = new Date();
  const nowTime = now.getTime();
  const nowDay = now.getDay();
  //   这里为什么nowDay不用减1，因为北京时间需要-8小时，而日期选择器默认选择一天的0：0：0这个时间，所以不需要减1
  const maxTime = nowTime - (nowTime % ONE_DAY) - nowDay * ONE_DAY - 1;
  return maxTime;
}

export function getWeekNumber(src) {
  const date = new Date(src.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  const week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
  // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

export function formatDate(date) {　　　
　 var myyear = date.getFullYear();　　
　 var mymonth = date.getMonth()+1;　　
　 var myweekday = date.getDate();　　　
　　　　
　 if(mymonth < 10){　　
　　　 mymonth = "0" + mymonth;　　
　 }　　　
　 if(myweekday < 10){　　
　　　 myweekday = "0" + myweekday;　　
　 }　　
　 return (myyear+"-"+mymonth + "-" + myweekday);　　　
}　　　
　　
//获得某月的天数　　
export function getMonthDays(paraYear,paraMonth){　　
　 var monthStartDate = new Date(paraYear, paraMonth, 1);　　　
　 var monthEndDate = new Date(paraYear, paraMonth + 1, 1);　　　
　 var　 days　 =　 (monthEndDate　 -　 monthStartDate)/(1000　 *　 60　 *　 60　 *　 24);　　　
　 return　 days;　　　
}　　　
　　
//获得某周的开始日期　　
export function getWeekStartDate(paraYear,paraMonth,paraDay,paraDayOfWeek) {　　　
　 var weekStartDate = new Date(paraYear, paraMonth, paraDay + 1 - paraDayOfWeek);　　　
　 return formatDate(weekStartDate);　　
}　　　
　　
//获得某周的结束日期　　
export function getWeekEndDate(paraYear,paraMonth,paraDay,paraDayOfWeek) {　　　
　 var weekEndDate = new Date(paraYear, paraMonth, paraDay + (7 - paraDayOfWeek));　　　
　 return formatDate(weekEndDate);　　
}　　　
　　
//获得某月的开始日期　　
export function getMonthStartDate(paraYear,paraMonth) {　　
　 var monthStartDate = new Date(paraYear, paraMonth, 1);　　　
　 return formatDate(monthStartDate);　　
}　　
　　
//获得某月的结束日期　　
export function getMonthEndDate(paraYear,paraMonth) {
　 var monthEndDate = new Date(paraYear,paraMonth, getMonthDays(paraYear,paraMonth));　　　
　 return formatDate(monthEndDate);　　
}　　

//获得上月开始时间　
export function getLastMonthStartDate(paraYear, lastMonth){　
　 var lastMonthStartDate = new Date(paraYear, lastMonth, 1);　
　 return formatDate(lastMonthStartDate);　　
}　

//获得上月结束时间　
export function getLastMonthEndDate(paraYear, lastMonth){　
　 var lastMonthEndDate = new Date(paraYear, lastMonth, getMonthDays(lastMonth));　
　 return formatDate(lastMonthEndDate);　　
}　
　　
//获得某季度的开始日期　　
export function getQuarterStartDate(paraYear,paraSeason){　　
　 switch (paraSeason) {　　
　　　 case '1' : return paraYear+"-01-01";
　　　 case '2' : return paraYear+"-04-01";
　　　 case '3' : return paraYear+"-07-01";
　　　 case '4' : return paraYear+"-10-01";
　 }
}　　
　　
//获得某季度的结束日期　　
export function getQuarterEndDate(paraYear,paraSeason){　　
　 switch (paraSeason) {　　
　 case '1' : return paraYear+"-03-31";
　 case '2' : return paraYear+"-06-30";
　 case '3' : return paraYear+"-09-30";
　 case '4' : return paraYear+"-12-31";
　 }　
}

//获取某年某周的开始日期
export function getBeginDateOfWeek(paraYear, weekIndex){
　 var firstDay = GetFirstWeekBegDay(paraYear);
　 //7*24*3600000 是一星期的时间毫秒数,(JS中的日期精确到毫秒)
　 var time=(weekIndex-1)*7*24*3600000;
　 var beginDay = firstDay;
　 //为日期对象 date 重新设置成时间 time
　 beginDay.setTime(firstDay.valueOf()+time);
　 return formatDate(beginDay);
}

//获取某年某周的结束日期
export function getEndDateOfWeek(paraYear, weekIndex){
　 var firstDay = GetFirstWeekBegDay(paraYear);
　 //7*24*3600000 是一星期的时间毫秒数,(JS中的日期精确到毫秒)
　 var time=(weekIndex-1)*7*24*3600000;
　 var weekTime = 6*24*3600000;
　 var endDay = firstDay;
　 //为日期对象 date 重新设置成时间 time
　 endDay.setTime(firstDay.valueOf()+weekTime+time);
　 return formatDate(endDay);
}

//获取日期为某年的第几周
export function GetWeekIndex(dateobj) {
　 let firstDay = GetFirstWeekBegDay(dateobj.getFullYear());
　 if (dateobj < firstDay) {
　　 firstDay = GetFirstWeekBegDay(dateobj.getFullYear() - 1);
　 }
　 let d = Math.floor((dateobj.valueOf() - firstDay.valueOf()) / 86400000);
　 return Math.floor(d / 7) + 1;　
}

//获取某年的第一天
export function GetFirstWeekBegDay(year) {
　 var tempdate = new Date(year, 0, 1);
　 var temp = tempdate.getDay();
　 if (temp == 1){
　　　 return tempdate;
　 }
　 temp = temp == 0 ? 7 : temp;
　 tempdate = tempdate.setDate(tempdate.getDate() + (8 - temp));
　 return new Date(tempdate);　
}
