var container, arrHeight, arrColor
window.onload = function() {
  // 设置盒子的高度值
  arrHeight = ['20%', '100%', '100%', '100%', '100%', '100%', '30%']
  arrColor = ['gray', 'skyblue', 'greenyellow', 'deeppink', '#ccc', '#248', '#000']
  //找到父盒子  设置高度和颜色
  container = document.getElementsByClassName('container')[0]
  for (var i = 0; i < container.children.length; i++) {
    container.children[i].style.height = arrHeight[i]
    container.children[i].style.backgroundColor = arrColor[i]
  }
  document.addEventListener('mousewheel', wheel)
}

let scrollActive = true
let timer = null
let index = -1

// 封装让盒子添加current功能
function addCurrent(e) {
  setTimeout(function() {
    for (var i = 0; i < container.children.length - 1; i++) {
      container.children[i].classList.remove('current')
    }
    container.children[e].classList.add('current')
  }, 500)
}

function wheel(e) {
  const changeScroll = () => {
    const sd = e.wheelDelta || -e.detail
    if (sd > 0) {
      index--

      var num = index + 1
      if (num > 0) {
        addCurrent(num)
      }

      if (index < 0) {
        // 如果是-1,就等于0 但是变成0了之后，再往下滚动就会变成1,页面就会跳帧 所以执行完就减减回去
        index = 0
        // 如果是第一屏了就保持不动
        container.style.transform = 'translateY(' + index + ')'
        index--
      } else {
        // 当前盒子的高度 * 索引 再加上头部盒子的高度
        var sum = -parseInt(arrHeight[index]) * index - parseInt(arrHeight[0])
        container.style.transform = 'translateY(' + sum + '%)'
      }
    } else {
      //鼠标向下滚动
      index++

      // 2.0给当前的页面添加current
      var current = index + 1
      if (current <= container.children.length - 2) {
        addCurrent(current)
      }

      //	1.0实现页面滚动
      if (index == 0) {
        // 当索引为头部，位移头部盒子高度
        container.style.transform = 'translateY(' + -parseInt(arrHeight[0]) + '%)'
      } else if (index >= container.children.length - 2) {
        // 如果是第5屏了，再只用多加一个底部盒子的高度就好了
        index = container.children.length - 2
        var footer =
          -parseInt(arrHeight[index]) * (index - 1) -
          parseInt(arrHeight[0]) -
          parseInt(arrHeight[container.children.length - 1])
        container.style.transform = 'translateY(' + footer + '%)'
      } else {
        // 当前盒子的高度 * 索引 再加上头部盒子的高度
        var sum = -parseInt(arrHeight[index]) * index - parseInt(arrHeight[0])
        container.style.transform = 'translateY(' + sum + '%)'
      }
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
