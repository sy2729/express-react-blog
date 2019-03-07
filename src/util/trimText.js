export default (text, num)=> {
  if(typeof text !== 'string') text = text.toString();
  var end = text.length > num ? '...' : '';
  return text.slice(0, num || 30) + end
}