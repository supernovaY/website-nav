import { defineStore } from 'pinia';

export const useStore = defineStore('counter', {
    state: () => ({
        // 是否选中筛选
        isPick: false,
        // 当前搜索引擎
        searchAddress: "https://www.baidu.com/s?wd=",
        // 当前搜索引擎图片
        searchAddressImg: "#icon-baidu-circle-fill",
        // 是否打开切换搜索引擎
        isDropDown: false,
        searchAddressList: [
                {
                    "name": "百度",
                    "img": "#icon-baidu-circle-fill",
                    "address": "https://www.baidu.com/s?wd=",
                    "isSelect": true
                },
                {
                    "name": "github",
                    "img": "#icon-github",
                    "address": "https://github.com/search?type=repositories&q=",
                    "isSelect": false
                },
                {
                    "name": "cdn",
                    "img": "#icon-cdn",
                    "address": "https://www.bootcdn.cn/",
                    "isSelect": false
                },
                {
                    "name": "知乎",
                    "img": "#icon-zhihu",
                    "address": "https://www.zhihu.com/search?type=content&q=",
                    "isSelect": false
                },
                {
                    "name": "google",
                    "img": "#icon-google",
                    "address": "https://www.google.com/search?q=",
                    "isSelect": false
                },
                {
                    "name": "iconfont",
                    "img": "#icon-icon",
                    "address": "https://www.iconfont.cn/search/index?searchType=icon&q=",
                    "isSelect": false
                },
                {
                    "name": "bilibili",
                    "img": "#icon-bilibili-line",
                    "address": "https://search.bilibili.com/all?keyword=",
                    "isSelect": false
                }
            ]
    }),
    actions: {
        changePick(value) {
            this.isPick = value;
        },
        isOpenDropDown(value) {
            console.log(typeof value, 111);
            this.isDropDown = typeof value != 'undefined' ? value : !this.isDropDown;
        },
        changeSearchAddress(index) {
            this.searchAddressList.map((item,itemIndex)=>{
                if(index === itemIndex){
                    this.searchAddressList[itemIndex].isSelect = true;
                    this.searchAddress = item.address;
                    this.searchAddressImg = item.img;
                    return
                }
                this.searchAddressList[itemIndex].isSelect = false;

            })
        },
    },
});