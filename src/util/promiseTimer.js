export default (time)=> {
  return new Promise((res, rej)=> {
    setTimeout(res, time)
  })
}