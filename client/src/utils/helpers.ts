export const formateDate = (date: Date) => {
  let formattedDate = new Date(date).toLocaleString();

  return formattedDate;
};
