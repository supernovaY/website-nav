const $siteList = $('.siteList') // 声明$siteList将为要插的节点
const $lastLi = $siteList.find('li.last')// 通过数组find函数找到li的last属性并声明$lastLi
const $iconDelete = $('use.icon-delete')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)// 解析JSON字符串，构造数组
// 用哈希表存储网站
const hashMap = xObject || [
    { logo: 'C', url:'https://blog.csdn.net/JankoY?spm=1011.2124.3001.5343'},
    { logo: 'I', url:'https://www.iconfont.cn/'},
    { logo: 'F', url:'https://figma.com/'}
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') // 删除链接/后面的内容
}

const render = () => { // 通过调用函数的方式，调用数据结构增删列表
$siteList.find('li:not(.last)').remove()
hashMap.forEach((node,index)=>{// 遍历节点和下标
    const $li = $(`<li>
        <div class="site">
            <div class="logo">${node.logo[0]}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
            <svg class="icon">
            <use class="icon-delete" xlink:href="#icon-shanchu"></use>
            </svg></div>
        </div>
        </a>
    </li>`).insertBefore($lastLi)
    $li.on('click', ()=>{
        window.open(node.url)
    })
    $li.on('click', '.close', (e)=>{
        e.stopPropagation()
        hashMap.splice(index, 1)
    render()
    })
})
}

render()

$('.addButton').on('click', () =>{
    let url = window.prompt('请输入将要添加的网址：')
    if(url.indexOf('http')!==0) {
        url = 'https://' + url
    }
    hashMap.push({//push：往数组最后插入新下标
        logo: simplifyUrl(url)[0].toUpperCase(), 
        url: url})
render()
})

$('.addButton').hover(function(){
      $( $iconDelete ).hide;
    }, function(){
      $( $iconDelete ).show;
    }
)

window.onbeforeunload = () => {//在页面载入时加载localStorage（浏览器缓存—从而加载数据）
    const string = JSON.stringify(hashMap)//将一个JavaScript 对象或值转换为JSON 字符串
    window.localStorage.setItem('x', string)//setItem:接受一个键名和值作为参数，将会把键名添加到存储中，如果键名已存在，则更新其对应的值。
}