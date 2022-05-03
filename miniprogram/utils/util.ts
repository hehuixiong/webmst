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