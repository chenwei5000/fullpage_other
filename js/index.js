window.onload = function() {
  document.addEventListener('mousewheel', wheel)
}

let scrollActive = true
let timer = null
function wheel(e) {
  const changeScroll = () => {
    const sd = e.wheelDelta || -e.detail
    if (sd > 0) {
      console.log('向上滚动')
    } else {
      console.log('往下边划拉了')
    }
  }
  immediate(changeScroll, 500)
}
// 防抖动
function immediate(func, wait) {
  if (scrollActive) {
    func()
  }
  scrollActive = false
  clearTimeout(timer)
  timer = setTimeout(() => {
    scrollActive = true
    console.log('解开封印')
  }, wait)
}
