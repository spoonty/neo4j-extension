export const getCurrentDateTime = () => {
  const currentDate = new Date()

  const year = currentDate.getFullYear()
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2) // Добавляем ноль перед числом, если оно меньше 10
  const day = ('0' + currentDate.getDate()).slice(-2)
  const hours = ('0' + currentDate.getHours()).slice(-2)
  const minutes = ('0' + currentDate.getMinutes()).slice(-2)
  const seconds = ('0' + currentDate.getSeconds()).slice(-2)

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`
}
