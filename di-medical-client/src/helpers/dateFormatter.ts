export const formattedDate = (date: Date) => {
  const dateToParse = new Date(date)
  const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

  const dayOfWeek = weekdays[dateToParse.getDay()]
  const day = dateToParse.getDate()
  const month = months[dateToParse.getMonth()]
  const year = dateToParse.getFullYear()

  return `${dayOfWeek}, ${day} ${month} ${year}`
}
