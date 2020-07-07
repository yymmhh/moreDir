# 微信小程序地区4级选择器

 适用于原生微信小程序和ui-app微信小程序<br />![github_more_dir_1.png](https://cdn.nlark.com/yuque/0/2020/png/963099/1594092412363-2cfde722-23cd-4f23-8417-924aa5839c30.png#align=left&display=inline&height=1444&margin=%5Bobject%20Object%5D&name=github_more_dir_1.png&originHeight=1444&originWidth=852&size=107649&status=done&style=none&width=852)<br />![github_more_dir_2.png](https://cdn.nlark.com/yuque/0/2020/png/963099/1594092473095-22d46336-7beb-490e-be5a-f6fc23b17666.png#align=left&display=inline&height=1452&margin=%5Bobject%20Object%5D&name=github_more_dir_2.png&originHeight=1452&originWidth=882&size=92523&status=done&style=none&width=882)<br />使用:<br />需要接口返回地区数据然后在存入 Storage中<br />![WX20200707-113827@2x.png](https://cdn.nlark.com/yuque/0/2020/png/963099/1594093118194-4f0f0926-cd4a-412d-b8d9-5aebeb334e30.png#align=left&display=inline&height=910&margin=%5Bobject%20Object%5D&name=WX20200707-113827%402x.png&originHeight=910&originWidth=2006&size=168497&status=done&style=none&width=2006)<br />
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


