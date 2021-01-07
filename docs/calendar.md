# hai2007-calendar:日历

```html
<!-- lang表示语言，默认zh-cn表示中文简体，还可以 en:英文 -->
<hai2007-calendar ref='calendar' lang='zh-cn|en'></hai2007-calendar>
```

然后，在```js```里面使用这个日历：

```js
this.$refs.calendar.open([year,month,day], data => {
    // data是你选择的日期
});
```

[<< 返回首页](../README.md)
