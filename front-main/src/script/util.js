


function formatISODateToReadable(isoDateString) {
  const date = new Date(isoDateString);

  // Get the date components
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Assemble the readable date
  const readableDate = `${day}/${month}/${year} ${hours}:${minutes}`;

  return readableDate;
}


export { formatISODateToReadable };