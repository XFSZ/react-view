import React, { memo, useEffect, useRef, useState } from 'react';
// import { uuid } from 'utils/tool';
import EChartImg from '@/assets/EBar.png';
import axios from 'axios';
import styles from './index.less';
import { IEChartConfig } from './schema';
import { Dispatch } from 'umi';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';
import DataSet from '@antv/data-set';
import { Bar, BarOptions } from '@antv/g2plot';

//import onClick from '@/components/PanelComponents/FormEditor/onClickFunc';
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

const EHorizontalBar = (props: XEChartProps & { dispatch: Dispatch }) => {
  const {
    isTpl,
    //   data,
    color,
    size,
    paddingTop,
    title,
    api,
    timer,
    clickParams,
    dispatch,
    apiParams,
    dataSet,
    yField,
    xField,
    seriesField,
  } = props;
  //const chartRef = useRef(null);
  //const container = useRef<HTMLDivElement>(null)

  const container = useRef(null);
  const dataset = eval(`(${dataSet})`);
  const [option, setOption] = useState({
    data: dataset,
    xField: `${xField}`,
    yField: `${yField}`,
    seriesField: `${seriesField}`,
    isPercent: true,
    isStack: true,
    legend: false,
    barWidthRatio: 0.2,

    /** 自定义颜色 */
    // color: ['#2582a1', '#f88c24', '#c52125', '#87f4d0'],
    xAxis: {
      // 格式化 x 轴标签加单位，自定义 labal 样式
      line: {
        lineWidth: 1,
        stroke: 'gray',
        opacity: 1,
      },
      // tickLine:null,
      tickLine: {
        stroke: 'gray',
        lineWidth: 1,
        opacity: 1,
      },
      grid: {
        line: {
          style: {
            lineWidth: 0,
          },
        },
      },
      label: {
        formatter: v => {
          return v * 100 + '%';
        },
      },
    },
    yAxis: {
      tickLine: null,
      // grid: {
      //   line: {
      //     style: {
      //       lineWidth: 0.5,
      //     },
      //   },
      // },
      // line: {
      //   style: {
      //     lineWidth: 0.5,
      //   },
      // },
    },
    // label: {
    //   position: 'middle',
    //   content: item => {
    //     return (item.value * 100).toFixed(2)  ;
    //   },
    //   style: {
    //     fill: '#fff',
    //   },
    // },
  });
  useEffect(() => {
    if (!isTpl) {
      const chart = new Bar(container.current || '', option as BarOptions);
      chart.render();
      chart.on('element:click', (e: any) => {
        console.log(e);
      });
      if (timer >= 1) {
        if (api !== '') {
          let params = {};
          if (apiParams !== '') {
            params = JSON.parse(apiParams);
          }
          const timerInterval = setInterval(() => {
            axios.get(api, { params }).then(function(response) {
              console.log('response : ', response);
              // console.log('test : ', response.data[yField]);
              //setOption({...option,data:response.data})
            });
          }, timer * 1000);
          return () => clearInterval(timerInterval);
        }
      } else {
        return;
      }
    }
  }, [
    dataSet,
    isTpl,
    option,
    api,
    apiParams,
    timer,
    clickParams,
    dispatch,
    yField,
    xField,
    seriesField,
  ]);
  return (
    <div className={styles.chartWrap}>
      <div className={styles.chartTitle} style={{ color, fontSize: size, paddingTop }}>
        {title}
      </div>
      {isTpl ? (
        <img src={EChartImg} alt="dooring chart" />
      ) : (
        <div ref={container} style={{ height: '200px' }}></div>
      )}
    </div>
  );
};

export default connect((state: StateWithHistory<any>) => ({
  pstate: state.present.editorModal,
  cstate: state.present.editorPcModal,
}))(memo(EHorizontalBar));
