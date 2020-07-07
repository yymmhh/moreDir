# 微信小程序地区4级选择器

 适用于原生微信小程序和ui-app微信小程序<br />![github_more_dir_1.png](https://cxt.cdn.wlphp.cn/github_more_dir_1.png)<br />![github_more_dir_2.png](https://cxt.cdn.wlphp.cn/github_more_dir_2.png
)<br />使用:<br />需要接口返回地区数据然后在存入 Storage中<br />![WX20200707-113827@2x.png](https://cxt.cdn.wlphp.cn/github_more_dir_3.png)<br />
<br />先引入
```json
{

  "navigationBarTitleText": "发布职位",
  "usingComponents": {
    "more_dir": "../../../components/more_dir/more_dir"
  }
}
```

<br />wxml文件中
```html
<more_dir id="more_dir" DirString="{{aixDistrictValue}}" isNull="{{aixDistrictValue==null}}" A_Style="{{aixDistrictValue==null ? 'color:#c7c7c7' : ''}}" NullText="请选择地区"  bind:callSave="SetDir"></more_dir>
```
js文件中定义保存回调
```javascript

 SetDir(e){
    console.log(e)
  },
```
js中定义一个地区数据
```javascript
aixDistrictValue:"10.108.1146.1235"
```


