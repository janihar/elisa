/**
 * Get the current date
 * Format YYYY-mm-dd
 * Example 2020-02-19
 * dateFormat(new Date())
 * @param {date} today 
 */
export const dateFormat = (today) => {
  var date =
    today.getFullYear() +
    "-" +
    (today.getMonth() >= 10
      ? today.getMonth() + 1
      : "0" + (today.getMonth() + 1)) +
    "-" +
    today.getDate();

  return date.toString();
};
