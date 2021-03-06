# 思路

1. 组件 可定制
2. 组件 可以开放

# 问题

1. gridstack 如何加入 echarts 图表 echarts 需要一个 id (
   倒不如说 gridstack 怎么才能 使用自己开发的组件 这个组件 规则是什么 目前按照官方的情况我可以写进 html 中 vue 中使用 v-html echarts 组件直接使用项目中的 )  
   ps:现在又有一个问题了 script 标签报错

2. echarts 的组件函数如何开放出来 使得可以访问 gridstack 有 change 事件 可以 利用这个进行 echarts 的自动缩放 且 id 不会重复

# 一些开源组件

https://interactjs.io/docs/

https://github.com/SortableJS/Vue.Draggable

https://github.com/atlassian/react-beautiful-dnd

https://github.com/react-dnd/react-dnd

https://juejin.im/post/6844903470760214536

https://ftp.mozilla.org/pub/firefox/releases/51.0/win64/zh-CN/

https://github.com/MrXujiang/h5-Dooring

https://juejin.cn/post/6908502083075325959

# 当前项目 待解决的问题

1. 如何加入自己的组件
2. 页面布局如何保存 ---> 目前没有 页面保存逻辑 需自己开发 目前的页面中不存在 组件位置信息 需要自己 进行 开发
3. 怎样添加 **layer** **_层级_** 逻辑
4. 怎样处理 **外接数据的** 逻辑
5. 是否能够离线运行 目前看完全可以
6. 目前不能有空余地方 不能随意拖拽
7. 目前自带的图表工具是 antv 的 f2
8. 悬停
9. 与地图交互
10. 下探到最后一层进行跳转
11. 下探

# 问题

Q：空的 curPoint 无法保存值 但是可以自定义
A:
解决办法 首先 能够 初始化 页面布局 赋值 curPoint 和 pstate (ps: pstate 无法赋值)
当点击空元素是将 curPoint 赋值为页面元素

Q：元素的显隐如何控制 使用 visibility:hidden; visible;

Q： layer 层级解决  
A:层级概念 使用 z-index  
每个 元素 都有一个层级 输入框 直接更改 层级 nice 那图层的显隐 如何设置  
可以多一个 图层控制面板 用图层控制面板搞定 这个图层面板 可以放在 页面宽高控制里面  
控制面板怎样设计 控制面板 得能够新加 layer 图层 并且能够让新加的元素 放在上面  
每一个元素上得有一个 z-index 值 控制他在某一个层级上  
设计一个 公共变量 z-index 当 图层控制面板上的 变量改变时 比如 显隐 就 利用 for 循环将其在此 z-index 中的所有元素修改为 显示/隐藏  
面板的配置信息 如下 [{z-index:999,visibility:hidden;},{z-index:998,visibility:visible;}]  
元素信息 {id:'999999',z-index:999}
利用 pointData.map 每个元素的 z-index 并利用 style 控制其所在层级 及其显隐 {z-index:999,visibility:hidden;}

Q：怎样让 echarts 等外接插件也可以控制其显隐呢  
A：这个貌似不用现在想这个事情 毕竟都是写死在代码里的 不是 还是得控制  
可以把 这个层级改为 全局公共变量 echarts 可以直接调用该变量  
也就是说 echarts 图表的面板上多一个 代码控制 开放出一个配置信息
当 echarts 图表被点击的时候做什么  
又遇到一个坑 QAQ 😭 怎样才能 将其触发的事件 做成全局呢  
echarts 的 onclick 怎么才能 变成 所有的呢 就是 react 能够读到并执行 包括文本之类的  
每一个元素的 id 全部都暴露在自己的面板中可以 方面其他元素调用

问题罗列 第一 被点击要能够改变其他 元素的值

只能通过

```js
dispatch({
  type: "editorModal/modPointData",
  payload: { ...curPointData, point: newItem, status: "inToCanvas" },
});
```

- 重绘大小

- 第二 echarts 怎样添加 这个功能
  echarts 轴被点击 之后怎样 传递事件

```js
chart.on("click"); // 中添加
dispatch({
  type: "editorModal/modPointData",
  payload: { ...curPointData, point: newItem, status: "inToCanvas" },
});
```

> - 把柱子的值 id 传给 payload
> - 首先 echarts 的面板中 暴露一个 id 的参数 然后 写一个 get 函数 获取到这个组件配置
> - echarts 面板中写 这个 id 对应组件的对应 属性 比如 config.text 改编成另一个值
> - 想要改一堆 id 或许用到函数柯里化了 哈哈哈哈哈哈哈 🤣(天道好轮回) for 循环 id 然后做也行
> - echarts 的 api 请求 还没做呢 。。。。🤢🤮😭

> - 写成 json 格式的 text string 然后 JSON.parse 成 json

```js
// const { isTpl, data, color, size, paddingTop, title,chartparams } = props;
// 面板中的 json 字符串 得做成弹窗式的 点击完 确定再执行 因为面板中的修改是实时的 容易崩溃
echarts.config.chartparams:
    [
      {id:'id',...item.config},
      {id:'id',...item.config}
   ]
// echarts 中的配置
      chart.on('click', function (params) {
        for(let i =0;i<config.chartparams.length;i++){
            const userData = localStorage.getItem('userData') || '[]';
            for(let j=0;j<userData.length;j++){
                  if (j.id===config.chartparams[i].id ){
                        const modifyData = j;
                        const keys =  Object.keys(config.chartparams[i]); //获取所有修改的值
                        keys.map(val=>{
                              modifyData.config[val] = config.chartparams[i].config[val]
                        })
                        dispatch({
                                    type: 'editorModal/modPointData',
                                    payload: { modifyData, point: newItem, status: 'inToCanvas' },
                              });
                   }
            }
            // if(config.chartparams[i].id==='0'){
            //       const modifyData = userData[0]
            //        modifyData.layerList =  config.chartparams[0].layerList
            //    dispatch({
            //       type: 'editorModal/modPointData',
            //       payload: { modifyData, point: newItem, status: 'inToCanvas' },
            //       });

            // }else{
            //       for(let j=0;j<userData.length;j++){
            //             if (j.id===config.chartparams[i].id && config.chartparams[i].id!=='0'){
            //                   const modifyData = j;
            //                  const keys =  Object.keys(config.chartparams[i]); //获取所有修改的值
            //                   keys.map(val=>{
            //                    modifyData.config[val] = config.chartparams[i].config.val
            //                   })

            //    dispatch({
            //               type: 'editorModal/modPointData',
            //               payload: { modifyData, point: newItem, status: 'inToCanvas' },
            //             });
            //             }
            //       }


            // }



        }


      //   if(params.componentType === "xAxis"){

      //       console.log("单击了"+params.value+"x轴标签");
      //   }else{
      //       console.log("单击了"+params.name+"柱状图");
      //   }
    });

```

> - api 请求问题 echarts 柱子被点击之后 api 如何拼接 还有 get 和 post 的问题
> - 如何将 请求回来的数据 进行二次处理

> - Q： 换句话说 得多一个 数据处理 请求回来的数据放在哪里 处理逻辑 放在哪里。。。。
> - A：api 请求回来的值 先传给 config 然后 有一个 中间值 用来处理逻辑 再赋给 data 谁赋给 X 轴 谁 赋给 Y 轴 好头疼

> - Q： echarts 定时器 api 赋值

> - A： 当 定时器 为 0 的时候 就是不存在 定时器  
>    当 api 为 '' 的时候 不执行 api  
>    赋值问题 如何给 echarts 这个 图表赋值 接口如何开放 柱状图 有 X Y 但是其他的不存在啊 头疼 单独写吧。。。。  
>    定时器 启动和关闭 如何影响 api api 接收的值 如何影响 echarts  
>   数字如何改变 通过 echarts 初始化 还是通过 自身携带 api 这两个貌似都可以  
>   echarts 的更新只能通过 请求 api 改变  
>   每个组件有两个 功能 一个是 通过 api 改变 自身 一个是 通过 点击改变其他的 组件  
>   api 的 prams 可以被组件动态编辑 {}

```js
const {
  isTpl,
  data,
  color,
  size,
  paddingTop,
  title,
  api,
  timer,
  clickParams,
} = props;
if (timer === 0) {
  axios.get(`${api}`).then(function (response) {
    console.log("response : ", response);
  });
} else {
  setInterval(() => {
    axios.get(`${api}`).then(function (response) {
      console.log("response : ", response);
    });
    chart.setOption(option);
    chart.resize();
  }, config.timer);
}
```

```js
// const { isTpl, data, color, size, paddingTop, title,chartparams,id，api，timer } = props;

axios.get(`${api}`).then(function (response) {
  console.log("response : ", response);
});

// 添加 时间函数
setInterval(() => {
  console.log("这是一个定时器");
  axios.get(`${api}`).then(function (response) {
    console.log("response : ", response);
  });
  chart.setOption(option);
  chart.resize();
}, config.timer);
```

---

# 第一阶段

---

# 功能列表

> ✅ 面板 + 图层 已加 已实现  
> ✅ 可拖拽 已实现  
> ✅ 可放大缩小 移动 已实现  
> ✅ 基础组件之间传值 已实现  
> ✅ 修改 echarts data 数据 已实现  
> ✅ api 数据请求 已实现 https://zhuanlan.zhihu.com/p/96030406 https://www.jianshu.com/p/5cb3a84dd40b 定时请求问题 以后可能用的到  
> ✅ 定时刷新问题。。。。 setInterval 已实现  
> ✅ **位置逻辑等信息 保存后台功能 已实现** pm2 nodejs(ver.12) nodemon  
> ✅ 图表组件 (没有第三方 只能写死在系统中) 已添加完成

> ✅ 图表组件 兼容性工作 正在进行中

> ❌ 下探 未实现 修改 echarts api

# Task Plan List

999. ❕ 放弃治疗 😂😇😥 开始使用 G2 - plot
1000. ✅ echarts 宽高 问题 ????? 🤣🤣🤣🤣 忘了是啥问题了 反正都切成 G2 了 无所谓了
1001. ✅ 布局记录混乱问题
1002. ✅ 数值更新问题 需要添加 request
1003. ✅ 将 zIndex 放在 元素的 style 中
1004. ✅ 元素大小也要被记录 放在 config 中
1005. ✅ 元素位置 也要被添加进去 放在 config 中
1006. ✅ preview 要增加 居中功能
1007. ✅ 初始化 时 限定宽度
1008. ✅ 页面逻辑要变 变为只有两个按钮 一个是修改按钮 一个是展示按钮
1009. ✅ echarts 拖动时 无刷新重绘问题
1010. ✅ 背景图片后台 直接静态文件不使用数据库 然后 直接 api 调用就行了嘻嘻 (●'◡'●)
1011. ✅ 背景图片要添加 api 访问
1012. ✅ 添加页面初始化等待 用来请求后台的值 然后 刷新页面为已保存页面
1013. ✅ 预览页面逻辑 还是没有分层 需要添加成 和 创建页面一样的逻辑
1014. ✅ grid layout 貌似只能 一格一格的 需要减小 格子的大小 距离问题适配 😥 修改 格子 个数 cols={9999} 修改初始 w 修改为 w=600
1015. ✅ 预览 preview 页面的 展示问题 目前总是的 多出一点 可能因为 栅格的原因 有时候会有未知元素在下面排布 所以导致的拉长 ，可能是之前 瞎拖拽 导致的
1016. 💹 😥 💨💦💤💥 编辑界面 可以跳转 但是 预览页面有问题 因为修改无法 反馈给 预览页面 解决办法 这个 有两个 一个是按着 拖拽的地方直接拷贝 另外一个逻辑就是这个 预览页面单独有一个 store 首先实现 单独 store 在 click 函数中添加判断 修改那个？ 貌似现在不用 以后可能 需要
1017. 💹 图表 开放 各轴 api 适配 图表
1018. 💹 还是得 添加一个 data 字段 用来 动态 改变数据 阿西吧啊 现在还是不能加 逻辑太混乱 但要是不加 无法修改 其他图表的值 另外修改 其他组件的 api 后 其他组件也未必会直接执行 因为有时间 setInterval 的问题 开就开吧 没办法了 冲突就冲突吧 双值的怎么办 开两个 哎西吧噢
1019. ✅ 抽离 url 使得 打包之前 不用挨个修改 url

1020. ❌ 通过 echarts onclick 获取 prams 赋值 修改 config 中的 api prams 再想想吧 还是有瑕疵 万一不是 onclick 的值 而是对应的 code 这种多了一层 转换的怎么办
1021. ❌ echarts 的赋值问题 各个轴都是 response 的哪个字段 （ 解决深层相同 key 赋值 ） 有数组有对象 所以 。。。。 哎西吧 object(key) 循环检测 指定 key 貌似解决了

1022. ❌ 默认有一个 1 层级 且 1 层级 始终显示 不然各种 放不上去 。。。。 😥

```js
// 点击 装备保障综合态势  11 12 图层隐藏
[
  {
    id: "0",
    config: {
      layerList: [
        { zIndex: 2, visibility: 1, desc: "默认层级", id: "0" },
        { zIndex: 3, visibility: 1, desc: "新增项描述", id: "32842647" },
        { zIndex: 11, visibility: 0, desc: "子背景板", id: "61365059" },
        { zIndex: 12, visibility: 0, desc: "子内容", id: "99817402" },
      ],
    },
  },
][
  // 点击飞数质量  11 12 图层显示
  {
    id: "0",
    config: {
      layerList: [
        { zIndex: 2, visibility: 1, desc: "默认层级", id: "0" },
        { zIndex: 3, visibility: 1, desc: "新增项描述", id: "32842647" },
        { zIndex: 11, visibility: 1, desc: "子背景板", id: "61365059" },
        { zIndex: 12, visibility: 1, desc: "子内容", id: "99817402" },
      ],
    },
  }
];
```

https://g2.antv.vision/zh/docs/manual/getting-started  
https://github.com/liuyuqin1991/react-echarts

```js
// preview click test

[{ id: "554385", config: { text: "成功了" } }];
```

> - ## 传值问题
> - 开放 data api 用来 动态改变值 周二完成 ✅
> - 改变颜色 周三完成 ✅
> - 画出整个页面 周四完成 ✅
> - 打包测试 放到后台 周四 周五完成 ✅

```js
// 点击柱状图
[
  {
    id: "475589",
    config: {
      text: "18",
    },
  },
  {
    id: "684257",
    config: {
      text: "199",
    },
  },
  {
    id: "743685",
    config: {
      text: "89",
    },
  },
  {
    id: "254269",
    config: {
      dataSet: `[
      {
        country: '在队完好数',
        year: 'j20',
        value: 50,
      },
      {
        country: '在队完好数',
        year: 'j10',
        value: 35,
      },
      {
        country: '在队完好数',
        year: 'j10c',
        value: 9,
      },
      {
        country: '在队完好数',
        year: 'j5',
        value: 97,
      },
      {
        country: '在队完好数',
        year: 'j6',
        value: 102,
      },
      {
        country: '在队完好数',
        year: '其他',
        value: 64,
      },
      {
        country: '在厂大修数',
        year: 'j20',
        value: 6,
      },
      {
        country: '在厂大修数',
        year: 'j10',
        value: 17,
      },
      {
        country: '在厂大修数',
        year: 'j10c',
        value: 11,
      },
      {
        country: '在厂大修数',
        year: 'j5',
        value: 13,
      },
      {
        country: '在厂大修数',
        year: 'j6',
        value: 21,
      },
      {
        country: '在厂大修数',
        year: '其他',
        value: 77,
      },
     ]`,
    },
  },
  {
    id: "586791",
    config: {
      dataSet: ` [
      { sessions: '10.01', visits: 20, type: '完好数' },
      { sessions: '10.01', visits: 50, type: '大修数' },
      { sessions: '10.02', visits: 100, type: '完好数' },
      { sessions: '10.02', visits: 200, type: '大修数' },
      { sessions: '10.03', visits: 50, type: '完好数' },
      { sessions: '10.03', visits: 20, type: '大修数' },
      { sessions: '10.04', visits: 60, type: '完好数' },
      { sessions: '10.04', visits: 30, type: '大修数' },
      { sessions: '10.05', visits: 70, type: '完好数' },
      { sessions: '10.05', visits: 48, type: '大修数' },
      { sessions: '10.06', visits: 70, type: '完好数' },
      { sessions: '10.06', visits: 37, type: '大修数' },
      { sessions: '10.07', visits: 78, type: '完好数' },
      { sessions: '10.07', visits: 38, type: '大修数' },
      { sessions: '10.08', visits: 79, type: '完好数' },
      { sessions: '10.08', visits: 39, type: '大修数' },
      { sessions: '10.09', visits: 75, type: '完好数' },
      { sessions: '10.09', visits: 35, type: '大修数' },
      { sessions: '10.10', visits: 70, type: '完好数' },
      { sessions: '10.10', visits: 40, type: '大修数' },
      { sessions: '10.11', visits: 70, type: '完好数' },
      { sessions: '10.11', visits: 40, type: '大修数' },
      { sessions: '10.12', visits: 70, type: '完好数' },
      { sessions: '10.12', visits: 40, type: '大修数' },
      { sessions: '10.13', visits: 80, type: '完好数' },
      { sessions: '10.13', visits: 30, type: '大修数' },
      { sessions: '10.14', visits: 80, type: '完好数' },
      { sessions: '10.14', visits: 30, type: '大修数' },
      { sessions: '10.15', visits: 85, type: '完好数' },
      { sessions: '10.15', visits: 45, type: '大修数' },
      { sessions: '10.16', visits: 80, type: '完好数' },
      { sessions: '10.16', visits: 30, type: '大修数' },
      { sessions: '10.17', visits: 86, type: '完好数' },
      { sessions: '10.17', visits: 36, type: '大修数' },
      { sessions: '10.18', visits: 83, type: '完好数' },
      { sessions: '10.18', visits: 43, type: '大修数' },
      { sessions: '10.19', visits: 80, type: '完好数' },
      { sessions: '10.19', visits: 40, type: '大修数' },
    ]`,
    },
  },
]

// 点击飞机数质量

[
  {
    id: "475589",
    config: {
      text: "157",
    },
  },
  {
    id: "684257",
    config: {
      text: "1324",
    },
  },
  {
    id: "743685",
    config: {
      text: "132",
    },
  },
  {
    id: "254269",
    config: {
   dataSet: `[
      {
        country: '在队完好数',
        year: '歼强机',
        value: 502,
      },
      {
        country: '在队完好数',
        year: '轰炸机',
        value: 635,
      },
      {
        country: '在队完好数',
        year: '运输机',
        value: 809,
      },
      {
        country: '在队完好数',
        year: '无人机',
        value: 947,
      },
      {
        country: '在队完好数',
        year: '特种机',
        value: 1402,
      },
      {
        country: '在队完好数',
        year: '其他',
        value: 3634,
      },
      {
        country: '在厂大修数',
        year: '歼强机',
        value: 106,
      },
      {
        country: '在厂大修数',
        year: '轰炸机',
        value: 107,
      },
      {
        country: '在厂大修数',
        year: '运输机',
        value: 111,
      },
      {
        country: '在厂大修数',
        year: '无人机',
        value: 133,
      },
      {
        country: '在厂大修数',
        year: '特种机',
        value: 221,
      },
      {
        country: '在厂大修数',
        year: '其他',
        value: 767,
      },
     ]`,
    },
  },
  {
    id: "586791",
    config: {
         dataSet: ` [
      { sessions: '10.01', visits: 620, type: '完好数' },
      { sessions: '10.01', visits: 350, type: '大修数' },
      { sessions: '10.02', visits: 600, type: '完好数' },
      { sessions: '10.02', visits: 300, type: '大修数' },
      { sessions: '10.03', visits: 750, type: '完好数' },
      { sessions: '10.03', visits: 320, type: '大修数' },
      { sessions: '10.04', visits: 630, type: '完好数' },
      { sessions: '10.04', visits: 360, type: '大修数' },
      { sessions: '10.05', visits: 780, type: '完好数' },
      { sessions: '10.05', visits: 408, type: '大修数' },
      { sessions: '10.06', visits: 770, type: '完好数' },
      { sessions: '10.06', visits: 387, type: '大修数' },
      { sessions: '10.07', visits: 768, type: '完好数' },
      { sessions: '10.07', visits: 388, type: '大修数' },
      { sessions: '10.08', visits: 769, type: '完好数' },
      { sessions: '10.08', visits: 399, type: '大修数' },
      { sessions: '10.09', visits: 765, type: '完好数' },
      { sessions: '10.09', visits: 385, type: '大修数' },
      { sessions: '10.10', visits: 760, type: '完好数' },
      { sessions: '10.10', visits: 450, type: '大修数' },
      { sessions: '10.11', visits: 730, type: '完好数' },
      { sessions: '10.11', visits: 470, type: '大修数' },
      { sessions: '10.12', visits: 700, type: '完好数' },
      { sessions: '10.12', visits: 460, type: '大修数' },
      { sessions: '10.13', visits: 800, type: '完好数' },
      { sessions: '10.13', visits: 320, type: '大修数' },
      { sessions: '10.14', visits: 830, type: '完好数' },
      { sessions: '10.14', visits: 350, type: '大修数' },
      { sessions: '10.15', visits: 825, type: '完好数' },
      { sessions: '10.15', visits: 415, type: '大修数' },
      { sessions: '10.16', visits: 810, type: '完好数' },
      { sessions: '10.16', visits: 330, type: '大修数' },
      { sessions: '10.17', visits: 826, type: '完好数' },
      { sessions: '10.17', visits: 346, type: '大修数' },
      { sessions: '10.18', visits: 833, type: '完好数' },
      { sessions: '10.18', visits: 443, type: '大修数' },
      { sessions: '10.19', visits: 880, type: '完好数' },
      { sessions: '10.19', visits: 490, type: '大修数' },
    ]`,
    },
  },
]
```

7-11 这周 封版完成两个 可演示 页面
14-18 下周 测试当前系统 稳定性 并去南京部署
21-25 下下周 完善 图表 功能面板功能
28-31 下下下周 完善 图表 功能面板功能 测试稳定性

> - ## 布局混乱问题 ✅
> - 布局混乱是因为 react-grid-layout 使用的是 gird 布局所以才有问题 解决的换 基本组件 关于位置信息的 都要重写了 。。。。 问题是还不知道 能不能重写 成功 🤢🤮😭🙂

> - ## 层级问题 ✅
> - 首先 初始状态下就得有 一个层级
> - 其次 首先进行 map pointData 的层级 然后创建多个 GridLayout 在多个层级上 不知道能不能成功.... 目前来看可以  
>   那么逻辑就变成了 首先进行 map 层级 然后创建 多个 grid grid 在渲染的时候 map 判断每个 元素 所在层级 可选则 的渲染 只渲染相同 层级的

> - ## 后台功能 ✅
> - 后台只能保存当前唯一 的一个大屏
> - 那后台是 sqllite3 还是 json 文件呢。。。。 还是 sqllite3 吧
> - 后台保存字段 userData 其他貌似不用保存 图片上传之类的 emmmmm 之后再加吧
>   https://blog.windisco.com/json-string-into-sqlite3/ > https://blog.csdn.net/qq_38081746/article/details/90673681  
>   Database：新建并打开 sqlite3 数据库文件  
>   close：关闭数据库  
>   run：执行单条语句以创建/更改表格或插入/更新数据  
>   get：查询一条数据  
>   exec：执行多条语句以创建/更改表格或插入/更新数据  
>   all：查询多条数据  
>   each：查询多条数据并对每条数据执行回调

目前只有柱状图 能够被点击

文字加粗

字体 微软雅黑

---

# 第二阶段

---

# bug

> - 清空时 初始层丢失 留到以后做
> - 底部超出 问题 还是修改失败了 global css root 下添加 overflow 还是不行 。。。。 在 preview 下添加 position:relative overflow 成功 ✅
> - ❗ 复制元素时 无法修改 id ✅
> - 拖拽 无法修改 高度 。。。。。 preventCollision 问题 自己给自己挖了一个坑 日了狗了 ✅   正确配置： compactType={null}  verticalCompact={false} （可不配）  preventCollision={true}


### bug 修改
> - 底部超出 问题 
> - 复制元素时 无法修改 id 
> - 拖拽 无法修改 高度 
> - 缩放问题 缩放之后不能进行拖拽 

### 优化
> - 网页储存 太多的话会超出 4M 不能 localStorage 了 改为 indexdb
> - url 通过 代理进行抽离
> - 一次性dispatch 而不是逐个 dispatch 
> - 减少到了 grid 中的无用 DIV 也减少了 无用层级 优化效果提升明显  

### 功能添加
> - SourceBox 需要添加有一个 滚动条 用来控制 显示区域
> - 图片的数据库  解决图片迁移不方便 的问题

### 下周 
> - 测试 地图放进 大屏系统中
> - 可以把动作开出来 一个是可以选择组件 反正可以看到 id 可以进一步封装
> - 地图底图制作
> - 在地图中添加 打点

# 新计划

> - 火狐 51 卡顿问题 是否需要多个页面 拼合 G2 可能为 G2 优化问题 这下就 任重而道远了 ✅
> - 可以把动作开出来 一个是可以选择组件 反正可以看到 id 可以进一步封装 ❌
> - 太多的话会超出 4M 不能 localStorage 了 改为 indexdb ✅ https://github.com/localForage/localForage https://github.com/pouchdb/pouchdb
> - 还是需要一个 图片的数据库 不然 迁移不方便 之前的 图片链接 打包后 无法 修改 ✅
> - 缩放问题 缩放之后不能进行拖拽 ✅
> - url 通过 代理进行抽离 ✅
> - 测试 地图放进去 https://github.com/mokrayaGISka/react-openlayers-lesson1 https://github.com/terrestris/react-geo https://github.com/allenhwkim/react-openlayers  https://supermapwebgis.gitbooks.io/modern-web-gis-in-action/content/kai-fa-zhi-nan/for-openlayers/shu-ju-ke-shi-hua/mapv.html https://iclient.supermap.io/ (这真的是 人外有人天外有天) https://osmbuildings.org/ https://github.com/OSMBuildings/OSMBuildings  https://iclient.supermap.io/examples/component/examples.html  ❌  
> - SourceBox 需要添加有一个 滚动条 用来控制 显示区域 ✅
> - 一次性dispatch 而不是逐个 dispatch  可能是因为一个dispatch就会引起一次重绘  一次性直接 搞定就不会有 太多的 重绘 ✅
## **一些参考资料**

https://www.bookstack.cn/read/es6-3rd/spilt.7.docs-async.md  
https://bit.dev/  
https://github.com/MostlyAdequate/mostly-adequate-guide

## 火狐 51 卡顿 localStorage 问题

虽说 要改为 localForage 使用 indexdb ，但是目前来看 这一个页面 就用了 188kb 的储存空间 并且 userdata 加上 previewdata 这就 500kb 了 但是远没有超过 4M  
火狐 51 依然卡顿 这就说明 不是 储存问题导致的 而是 应为内存中的东西太多了导致的 大概率是 G2 导致的 所以 火狐 51 的优化还是得在 G2 上下功夫  
目前的卡顿程度指数级上升 。。。。  
也有可能是因为重绘次数太多的原因   
大概率需要多页面了 但是多页面有个问题 如何传值啊  
如果要是 多个页面的话 需不需要推到重做啊
展示大屏改成数组 添加多个数据库 新建一个页面就添加一个数据库
到时候取值 有多少个数据就展示多少个然后可以直接点进去展示 ，但是制作呢
还要一个处理逻辑就是 页面上显示 可以选择多个页面 哎西吧  
就是 主页上 只有一个 制作大屏 制作大屏内部可以 选择 究竟 更改那个 大屏页面
有许多个 展示大屏 或者这样 再写一个页面 这个页面上显示多个 展示大屏

卡顿的原因也有可能是 东西太多了 每一层都有同样多的 元素 这个不行
先进行 根据层级分组 然后再进行渲染  ok 顺滑异常 哈哈哈 🤣🤣🤣 此路通畅


### 分组方式

```js
let a = [[{},{},],[],[]] 一个总的数组 用来map

useEffect (()=>{
  let a : any[] = [];
  pstate.pointData[0].item.config.layerList.map(
    (layoutval: { zIndex: number }) => {
     let b =  pstate.pointData.filter(value => {
           return value.item.config.zIndex === layoutval.zIndex
     })
     if(b.lenght>0){
      a.push(b);
     }

     }
  )
  console.log("a",a)
},[pstate.pointData])


```
### 结论
虽然减少到了 grid 中的无用 DIV 也减少了 无用层级 优化效果提升明显  但是 这个 意味着  页面不能存在太多元素  指定是需要 多页面了 
Container 的 移动总是会引起 SourceBox 的重绘 这个就很麻烦了 因为 Container 修改了 SourceBox 的位置信息 肯定是要引起重绘的 。。。。

**现在的问题已经转移到 点击执行动作上了**  一次性dispatch 而不是逐个 dispatch  可能是因为一个dispatch就会引起一次重绘  一次性直接 搞定就不会有 太多的 重绘

https://codesandbox.io/s/j3zrqpzkr5
https://codesandbox.io/s/71ly7qx83x?from-embed

## indexdb 问题 ✅

💫indexdb 是异步的 无法和 dva 合并 而且 umijs 目前不支持 top-level await  
💫 第一种方法 dva 不使用 indexdb 的值 而是用 内存中的 显然不合理 但是也是没办法  
💫 第二种方法 创建一个 公共变量 在 页面初始化的时候就将值 获取到 然后 再赋值 但是 export 永远都是要等的啊 哎西吧啊  
✅ 第三种方法 使用 dva 的 effects 加油 😎 成功 😎😁

## 图片上传 问题 ✅

第一步前端检验 上传文件后缀
第二步后端检验 上传文件后缀
控制面板 显示 一个是上传按钮 一个是当前图片的预览
处理逻辑 上传之后返回一个 路径值 然后直接显示 赋值给 api 不再显示 api emmmmmm
上传后的文字名称为 时间戳 需不需要 改变点什么 要是 文件太多的话 emmmm 应该不会 那就是 四位随机字符串加时间戳 可能需要加页面信息
路径在 static/upload 路径下面
后端还可能还有 nodejs 的 crypto 模块
后端处理逻辑

```js
const moment = require("moment");
console.log(moment());
const fs = require("fs");
const fileExtension = fileName
  .substring(fileName.lastIndexOf(".") + 1)
  .toLowerCase();
fs.wirteFileSync(
  randomString + moment().toString + "." + fileExtension,
  imgContentOrFile
);
```


## 地图 
https://blog.csdn.net/qq_29602347/article/details/103179648 openlayers 添加阴影  
https://blog.csdn.net/liyan_gis/article/details/79236192?utm_source=app  
https://jingyan.baidu.com/article/91f5db1b23869c1c7f05e30c.html  底图制作

https://ilocation.gitee.io/plot4ol3sample/

## 地图问题
### 问题一 
首先把 地图的ip 开出来不然没办法 迁移 跟图片似的
要不要 用nodejs后台做代理 https://blog.csdn.net/geol200709/article/details/106279257
### 问题二
地图是自己发布自己做的 一定是定制的  因为这东西谁都不会 开出来的只有 某个区域的地图而已
打点 也是 需要和后端沟通去做
地图上 显示 信息框 https://openlayers.org/en/latest/examples/popup.html

对外接口，支持对关键地标、区域进行标绘

对外接口是什么
关键地标区域 的标绘 是 怎样的逻辑    
进行的标绘 是否需要保存 等下次打开还有


### 修复一下 bug
右下角 工具栏  ✅
左侧菜单栏 缩回和展开 显示不正确 ✅
不能新增层级
显示太短因为 img设置的是80%  后面要修改为 整体设置为100%    width: 64%; transform: translate(20%,0%)

### 新增功能 
将地图放进大屏系统中 (还未成功兼容 大屏系统)



# 有趣的 SVG 项目

https://github.com/SVG-Edit/svgedit
https://github.com/danilowoz/react-content-loader
https://github.com/miukimiu/react-kawaii
https://github.com/react-icons/react-icons
https://github.com/gregberge/svgr
http://www.zuohaotu.com/svg/
https://github.com/projectstorm/react-diagrams
