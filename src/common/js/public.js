
// 日期格式化 使用方法：dateFormat("YYYY-mm-dd HH:MM:SS", date)
export function dateFormat(fmt, date) {
  let ret;
  const opt = {
    // 年
    "Y+": date.getFullYear().toString(),
    // 月
    "m+": (date.getMonth() + 1).toString(),
    // 日    
    "d+": date.getDate().toString(),
    // 时            
    "H+": date.getHours().toString(),
    // 分          
    "M+": date.getMinutes().toString(),
    // 秒       
    "S+": date.getSeconds().toString()
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

