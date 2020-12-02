import * as echarts from 'echarts';
//import ReactEcharts from "echarts-for-react";
import React, { memo, useEffect, useRef, useState } from 'react';
// import { uuid } from 'utils/tool';
import EChartImg from '@/assets/xiao.png';
import axios from 'axios';
import styles from './index.less';
import { IEChartConfig } from './schema';
import { Dispatch } from 'umi';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';
import onClick from '@/components/PanelComponents/FormEditor/onClickFunc';
interface XEChartProps extends IEChartConfig {
  isTpl: boolean;
}

// const onClick = (clickParams: string, dispatch: Dispatch) => {
//   try {
//     let clickParamsStrData = '[{}]';
//     if (clickParams !== '') {
//       clickParamsStrData = clickParams;
//     }
//     const clickParamsData = JSON.parse(clickParamsStrData);
//     const userData = localStorage.getItem('userData') || '[]';
//     const userDataJson = JSON.parse(userData);
//     for (let i = 0; i < clickParamsData.length; i++) {
//       for (let j = 0; j < userDataJson.length; j++) {
//         if (userDataJson[j].id === clickParamsData[i].id) {
//           const modifyData = userDataJson[j];
//           if (!clickParamsData[i].config) {
//             continue;
//           }
//           const keys = Object.keys(clickParamsData[i].config); //获取所有修改的值
//           keys.map(val => (modifyData.item.config[val] = clickParamsData[i].config[val]));
//           dispatch({
//             type: 'editorModal/modPointData',
//             payload: {
//               id: modifyData.id,
//               item: modifyData.item,
//               point: modifyData.point,
//               status: 'inToCanvas',
//             },
//           });
//         }
//       }
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };

const EChart = (props: XEChartProps & { dispatch: Dispatch }) => {
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
    dispatch,
    yAxis,
    seriesA,
    seriesB,
    apiParams,
  } = props;
  //const chartRef = useRef(null);
  //const container = useRef<HTMLDivElement>(null)
  let barData1 = {
    xdata1: [320, 302, 301, 334, 390, 330, 320],
    xdata2: [120, 132, 101, 134, 90, 230, 210],
    ydata: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  };

  const container = useRef(null);

  const [option, setOption] = useState({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },

    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        textStyle: {
          fontFamily: 'OPPOSans',
          color: 'rgba(170,170,170,1)',
        },
      },
      splitLine: {
        // 网格线
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        show: true,
        textStyle: {
          fontFamily: 'OPPOSans',
          color: 'rgba(170,170,170,1)',
          //color: '#ffffff',
          fontSize: 17,
        },
      },
      axisTick: {
        // y轴刻度线
        show: false,
      },
      data: barData1.ydata,
    },
    series: [
      {
        name: '完好数',
        type: 'bar',
        stack: '总量',

        barWidth: 8,
        itemStyle: {
          normal: { color: '#048ad3' },
        },

        data: barData1.xdata1,
      },
      {
        name: '大修数',
        type: 'bar',
        stack: '总量',
        barWidth: 8,

        itemStyle: {
          normal: { color: '#00c6b8' },
        },

        backgroundStyle: {
          // // 前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
          // color: {
          //   type: 'linear',
          //   x: 0,
          //   y: 0,
          //   x2: 0,
          //   y2: 1,
          //   colorStops: [
          //     {
          //       offset: 0,
          //       color: 'red', // 0% 处的颜色
          //     },
          //     {
          //       offset: 1,
          //       color: 'blue', // 100% 处的颜色
          //     },
          //   ],
          //   globalCoord: false, // 缺省为 false
          // },
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: 'rgba(172,172,172,1)' },
            { offset: 0.2, color: 'rgba(172,172,172,0.5)' },
            { offset: 1, color: 'rgba(0,0,0,0.5)' },
          ]),
        },
        data: barData1.xdata2,
      },
    ],
  });
  useEffect(() => {
    if (!isTpl) {
      const chart = echarts.init((container.current as unknown) as HTMLDivElement, {
        devicePixelRatio: window.devicePixelRatio,
      });
      chart.setOption(option);
      chart.on('click', function(params) {
        //onClick
        // if (params.componentType === 'xAxis') {
        //   console.log('单击了' + params.value + 'x轴标签');
        // } else {
        // }
        onClick(clickParams, dispatch);
        setOption({
          ...option,
          yAxis: {
            ...option.yAxis,
            data: ['啊哈', '公平', '公平', '公平', '好的', '周六', '周日'],
          },
          series: [
            { ...option.series[0], data: [32, 30, 30, 33, 39, 33, 32] },
            { ...option.series[1], data: [12, 13, 10, 13, 90, 23, 21] },
          ],
        });
        console.log('单击了' + params.name + '柱状图');
      });

      if (timer >= 1) {
        console.log('timer : ', timer);
        if (api !== '') {
          console.log('api : ', api);
          let params = {};
          if (apiParams !== '') {
            params = JSON.parse(apiParams);
          }
          const timerInterval = setInterval(() => {
            axios.get(api, { params }).then(function(response) {
              console.log('response : ', response);
              //const yAxis =   response.data[yAxis]
              // const seriesA = response.data[seriesA]
              // const seriesB =  response.data[seriesB]
              console.log('test : ', response.data[yAxis]);
              setOption({
                ...option,
                yAxis: {
                  ...option.yAxis,
                  data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                },
                series: [
                  { ...option.series[0], data: [32, 30, 30, 33, 39, 33, 32] },
                  { ...option.series[1], data: [12, 13, 10, 13, 90, 23, 21] },
                ],
              });
            });
          }, timer * 1000);
          return () => clearInterval(timerInterval);
        }
      } else {
        console.log('timer : ', timer);

        return;
        //  chart.setOption(option);
        //  chart.resize();
      }
    }
  }, [data, isTpl, option, api, apiParams, timer, clickParams, dispatch, yAxis, seriesA, seriesB]);
  return (
    <div className={styles.chartWrap}>
      <div className={styles.chartTitle} style={{ color, fontSize: size, paddingTop }}>
        {title}
      </div>
      {isTpl ? <img src={EChartImg} alt="dooring chart" /> : <div ref={container}></div>}
    </div>
  );
};

export default connect((state: StateWithHistory<any>) => ({
  pstate: state.present.editorModal,
  cstate: state.present.editorPcModal,
}))(memo(EChart));

// export default memo(EChart);
