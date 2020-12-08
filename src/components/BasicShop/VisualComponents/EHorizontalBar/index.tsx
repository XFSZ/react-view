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
// const dataset = [
//   {
//     country: 'Asia',
//     year: '1750',
//     value: 502,
//   },
//   {
//     country: 'Asia',
//     year: '1800',
//     value: 635,
//   },
//   {
//     country: 'Asia',
//     year: '1850',
//     value: 809,
//   },
//   {
//     country: 'Asia',
//     year: '1900',
//     value: 947,
//   },
//   {
//     country: 'Asia',
//     year: '1950',
//     value: 1402,
//   },
//   {
//     country: 'Asia',
//     year: '1999',
//     value: 3634,
//   },
//   {
//     country: 'Asia',
//     year: '2050',
//     value: 5268,
//   },
//   {
//     country: 'Africa',
//     year: '1750',
//     value: 106,
//   },
//   {
//     country: 'Africa',
//     year: '1800',
//     value: 107,
//   },
//   {
//     country: 'Africa',
//     year: '1850',
//     value: 111,
//   },
//   {
//     country: 'Africa',
//     year: '1900',
//     value: 133,
//   },
//   {
//     country: 'Africa',
//     year: '1950',
//     value: 221,
//   },
//   {
//     country: 'Africa',
//     year: '1999',
//     value: 767,
//   },
//   {
//     country: 'Africa',
//     year: '2050',
//     value: 1766,
//   },
//   {
//     country: 'Europe',
//     year: '1750',
//     value: 163,
//   },
//   {
//     country: 'Europe',
//     year: '1800',
//     value: 203,
//   },
//   {
//     country: 'Europe',
//     year: '1850',
//     value: 276,
//   },
//   {
//     country: 'Europe',
//     year: '1900',
//     value: 408,
//   },
//   {
//     country: 'Europe',
//     year: '1950',
//     value: 547,
//   },
//   {
//     country: 'Europe',
//     year: '1999',
//     value: 729,
//   },
//   {
//     country: 'Europe',
//     year: '2050',
//     value: 628,
//   },
// ];

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
    /** 自定义颜色 */
    // color: ['#2582a1', '#f88c24', '#c52125', '#87f4d0'],
    label: {
      position: 'middle',
      content: item => {
        return item.value.toFixed(2);
      },
      style: {
        fill: '#fff',
      },
    },
  });
  useEffect(() => {
    if (!isTpl) {
      const chart = new Bar(container.current || '', option as BarOptions);
      chart.render();
      if (timer >= 1) {
        if (api !== '') {
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
