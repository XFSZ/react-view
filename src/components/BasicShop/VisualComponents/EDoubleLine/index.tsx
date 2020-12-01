import * as echarts from 'echarts';
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

const EDoubleLine = (props: XEChartProps & { dispatch: Dispatch }) => {
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
    backgroundColor: '#1a212b',
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLine: {
        onZero: false,
        lineStyle: {
          color: '#585c65',
          width: 1,
        },
      },
      axisLabel: {
        color: '#959FAB',
        fontSize: 12,
        fontWeight: 400,
        fontFamily: 'Microsoft YaHei',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#373b46'],
          type: 'dashed',
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(55,59,70,0.3)', 'rgba(200,200,200,0)'],
        },
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      axisLine: {
        onZero: false,
        lineStyle: {
          color: '#585c65',
          width: 1,
        },
      },
      axisLabel: {
        color: '#959FAB',
        fontSize: 10,
        fontWeight: 400,
        fontFamily: 'Microsoft YaHei',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#373b46'],
        },
      },
      scale: true,
    },
    series: [
      {
        data: [],
        type: 'line',
        areaStyle: {},
        name: '',
        smooth: true,
        itemStyle: {
          normal: {
            opacity: false,
            color: '#054899',
            borderColor: '#575dff',
            lineStyle: {
              color: '#054899',
              width: 1,
            },
            areaStyle: {
              opacity: 0.3,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#054899',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0,0,0,0)',
                  },
                ],
                globalCoord: false,
              },
            },
          },
        },
      },
      {
        data: [],
        type: 'line',
        areaStyle: {},
        name: '',
        smooth: true,
        itemStyle: {
          normal: {
            opacity: false,
            color: '#F5AD47',
            borderColor: '#575dff',
            lineStyle: {
              color: '#F5AD47',
              width: 1,
            },
            areaStyle: {
              opacity: 0.3,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#F5AD47',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0,0,0,0)',
                  },
                ],
                globalCoord: false,
              },
            },
          },
        },
      },
    ],
    legend: {
      right: '5%',
      top: 'middle',
      orient: 'vertical',
      icon: 'rect',
      borderRadius: 0,
      borderColor: '#5470fa',
      //"data": [],
      textStyle: {
        fontFamily: 'Microsoft YaHei',
        fontSize: 14,
        color: '#dadde2',
      },
      show: true,
      itemWidth: 25,
      itemHeight: 14,
    },
    tooltip: {
      trigger: 'axis',
      transitionDuration: 0,
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    grid: {
      top: '4%',
      left: '1%',
      bottom: '3%',
      right: '25%',
      containLabel: true,
    },
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
        //  onClick(clickParams, dispatch);
        // setOption({
        //   ...option,
        //   yAxis: {
        //     ...option.yAxis,
        //     data: ['啊哈', '公平', '公平', '公平', '好的', '周六', '周日'],
        //   },
        //   series: [
        //     { ...option.series[0], data: [32, 30, 30, 33, 39, 33, 32] },
        //     { ...option.series[1], data: [12, 13, 10, 13, 90, 23, 21] },
        //   ],
        // });
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
              // setOption({
              //   ...option,
              //   yAxis: {
              //     ...option.yAxis,
              //     data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
              //   },
              //   series: [
              //     { ...option.series[0], data: [32, 30, 30, 33, 39, 33, 32] },
              //     { ...option.series[1], data: [12, 13, 10, 13, 90, 23, 21] },
              //   ],
              // });
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
      {isTpl ? (
        <img src={EChartImg} alt="dooring chart" />
      ) : (
        <div ref={container} style={{ height: 200 }}></div>
      )}
    </div>
  );
};

export default connect((state: StateWithHistory<any>) => ({
  pstate: state.present.editorModal,
  cstate: state.present.editorPcModal,
}))(memo(EDoubleLine));

// export default memo(EChart);
