export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export const handleTime = (date: string) => {
  if (!date) {
    return ''
  }
  const dateArr = date.split(' ')
  return dateArr[0]
}

export const numFormat = (num: any) => {
  if (num >= 10000) {
    num = (Math.round(num / 1000) / 10).toFixed(1) + 'w'
  } else if (num >= 1000) {
    num = (Math.round(num / 100) / 10).toFixed(1) + 'k'
  }
  return num
}

export const checkNum = function(e: any) {
	let val = e.detail.value.replace(/(^\s*)|(\s*$)/g, "")
	if (!val) {
		return ''
	}
	var reg = /[^\d.]/g
	// 只能是数字和小数点，不能是其他输入
	val = val.replace(reg, "")
	// // 保证第一位只能是数字，不能是点
	val = val.replace(/^\./g, "");
	// // 小数只能出现1位
	val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	// // 小数点后面保留2位
	val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
	console.log(val);
	return val
}