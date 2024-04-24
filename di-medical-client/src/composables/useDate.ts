export const useDate = () => {
  const getCurrentDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate
  }

  const getFormattedDate = (date: string) => {
    const currentDate = new Date(date);

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
  }

  return {
    getCurrentDate,
    getFormattedDate
  }
}
