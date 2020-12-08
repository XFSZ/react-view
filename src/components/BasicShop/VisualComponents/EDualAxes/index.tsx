import React, { memo, useEffect, useRef, useState } from 'react';
// import { uuid } from 'utils/tool';
import EChartImg from '@/assets/EBarLine.png';
import axios from 'axios';
import styles from './index.less';
import { IEChartConfig } from './schema';
import { Dispatch } from 'umi';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';
import DataSet from '@antv/data-set';
import { DualAxes } from '@antv/g2plot';

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

const EDualAxes = (props: XEChartProps & { dispatch: Dispatch }) => {
  const {
    isTpl,
    // data,
    color,
    size,
    paddingTop,
    title,
    api,
    timer,
    clickParams,
    dispatch,
    barData,
    lineData,
    xField,
    yFieldBar,
    yFieldLine,
    seriesFieldBar,
    seriesFieldLine,
    apiParams,
  } = props;
  //const chartRef = useRef(null);
  //const container = useRef<HTMLDivElement>(null)

  const container = useRef(null);
  //`(${})`
  const barDataArr = eval('(' + barData + ')');
  const lineDataArr = eval('(' + lineData + ')');
  const [option, setOption] = useState({
    data: [barDataArr, lineDataArr],
    xField: `${xField}`,
    yField: [`${yFieldBar}`, `${yFieldLine}`],
    legend: { position: 'right' },
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: `${seriesFieldBar}`,
        columnWidthRatio: 0.4,
      },
      {
        geometry: 'line',
        seriesField: `${seriesFieldLine}`,
        // lineStyle: ({ name }) => {
        //   if (name === 'a') {
        //     return {
        //       lineDash: [1, 4],
        //       opacity: 1,
        //     };
        //   }
        //   return {
        //     opacity: 0.5,
        //   };
        // },
      },
    ],
  });
  useEffect(() => {
    if (!isTpl) {
      const chart = new DualAxes(container.current || '', option);
      chart.render();
      // background:{fill:'#1a212b'},
      // width:500,

      if (timer >= 1) {
        //      console.log('timer : ', timer);
        if (api !== '') {
          //        console.log('api : ', api);
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
              console.log('test : ', response.data[yFieldBar]);
            });
          }, timer * 1000);
          return () => clearInterval(timerInterval);
        }
      } else {
        //      console.log('timer : ', timer);

        return;
      }
    }
  }, [
    isTpl,
    option,
    api,
    apiParams,
    timer,
    clickParams,
    dispatch,
    barData,
    lineData,
    xField,
    yFieldBar,
    yFieldLine,
    seriesFieldBar,
    seriesFieldLine,
  ]);
  //}, [data, isTpl, option, api, apiParams, timer, clickParams, dispatch, yAxis, seriesA, seriesB]);
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
}))(memo(EDualAxes));
