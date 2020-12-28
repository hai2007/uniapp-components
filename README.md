# uniapp-components
uni-app组件库

<p>
  <a href="https://hai2007.gitee.io/npm-downloads?interval=7&packages=uniapp-components"><img src="https://img.shields.io/npm/dm/uniapp-components.svg" alt="downloads"></a>
  <a href="https://packagephobia.now.sh/result?p=uniapp-components"><img src="https://packagephobia.now.sh/badge?p=uniapp-components" alt="install size"></a>
  <a href="https://www.jsdelivr.com/package/npm/uniapp-components"><img src="https://data.jsdelivr.com/v1/package/npm/uniapp-components/badge" alt="CDN"></a>
  <a href="https://www.npmjs.com/package/uniapp-components"><img src="https://img.shields.io/npm/v/uniapp-components.svg" alt="Version"></a>
  <a href="https://github.com/uniapp-components/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/uniapp-components.svg" alt="License"></a>
</p>

## 如何使用

首先，在你的```uni-app```项目中进行安装：

```bash
npm install --save uniapp-components
```

安装好了以后，需要在配置文件```pages.json```中添加如下代码：

```js
{
    "easycom":{
		"autoscan":true,
		"custom":{
			// 这里的引入是为了可以直接使用这个组件库中的东西
			"^hai2007-(.*)": "uniapp-components/libs/hai2007-$1/hai2007-$1.vue"
		}
    },

    // 其他内容
    "pages":[
        // ...
    ]
}
```

上面都操作完成以后，如果你准备使用本组件库的组件，直接在```.vue```文件中输入```<hai2007-```即可获得代码提示。

## 组件列表

所有内置的组件都在下面列出，请点击查阅对应文档：

- [复选框](./docs/checkbox.md)
- [单选框](./docs/radio.md)
- [开关](./docs/switch.md)
- [日历](./docs/datepicker.md)
- [时间](./docs/timepicker.md)
- [下拉](./docs/select.md)
- [轮播](./docs/swiper.md)

## 联系我们

- QQ: 2501482523
- Email: 2501482523@qq.com

开源协议
---------------------------------------
[MIT](https://github.com/hai2007/uniapp-components/blob/master/LICENSE)

Copyright (c) 2020 [hai2007](https://hai2007.gitee.io/sweethome/) 走一步，再走一步。
