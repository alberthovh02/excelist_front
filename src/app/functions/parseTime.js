const parseDate = (date) => {
  const data = Date.parse(date);
  const parsedData = new Date(data).toString();
  const parsed = parsedData.split('GMT')[0];
  return parsed
}

export default parseDate
