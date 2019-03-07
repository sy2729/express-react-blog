/* Code Snippet from */
/* https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript */

export default (string)=> {
  let d = new Date(string)
  return [d.getMonth()+1,
    d.getDate(),
    d.getFullYear()].join('/')+' '+
   [d.getHours(),
    d.getMinutes(),
    d.getSeconds()].join(':');
}