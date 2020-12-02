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
import DataSet from '@antv/data-set';
import { Area, AreaOptions } from '@antv/g2plot';
//import { Chart } from '@antv/g2';

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

  const container = useRef(null);
  let dataset = [
    { sessions: 'sessions-1', visits: 89, type: 'Current Month' },
    { sessions: 'sessions-1', visits: 87, type: 'Last Month' },
    { sessions: 'sessions-2', visits: 148, type: 'Current Month' },
    { sessions: 'sessions-2', visits: 140, type: 'Last Month' },
    { sessions: 'sessions-3', visits: 128, type: 'Current Month' },
    { sessions: 'sessions-3', visits: 144, type: 'Last Month' },
    { sessions: 'sessions-4', visits: 104, type: 'Current Month' },
    { sessions: 'sessions-4', visits: 138, type: 'Last Month' },
    { sessions: 'sessions-5', visits: 102, type: 'Current Month' },
    { sessions: 'sessions-5', visits: 114, type: 'Last Month' },
    { sessions: 'sessions-6', visits: 89, type: 'Current Month' },
    { sessions: 'sessions-6', visits: 107, type: 'Last Month' },
    { sessions: 'sessions-7', visits: 93, type: 'Current Month' },
    { sessions: 'sessions-7', visits: 102, type: 'Last Month' },
    { sessions: 'sessions-8', visits: 116, type: 'Current Month' },
    { sessions: 'sessions-8', visits: 89, type: 'Last Month' },
    { sessions: 'sessions-9', visits: 159, type: 'Current Month' },
    { sessions: 'sessions-9', visits: 80, type: 'Last Month' },
    { sessions: 'sessions-10', visits: 164, type: 'Current Month' },
    { sessions: 'sessions-10', visits: 151, type: 'Last Month' },
    { sessions: 'sessions-11', visits: 139, type: 'Current Month' },
    { sessions: 'sessions-11', visits: 134, type: 'Last Month' },
    { sessions: 'sessions-12', visits: 130, type: 'Current Month' },
    { sessions: 'sessions-12', visits: 129, type: 'Last Month' },
    { sessions: 'sessions-13', visits: 115, type: 'Current Month' },
    { sessions: 'sessions-13', visits: 111, type: 'Last Month' },
    { sessions: 'sessions-14', visits: 128, type: 'Current Month' },
    { sessions: 'sessions-14', visits: 95, type: 'Last Month' },
    { sessions: 'sessions-15', visits: 117, type: 'Current Month' },
    { sessions: 'sessions-15', visits: 108, type: 'Last Month' },
    { sessions: 'sessions-16', visits: 111, type: 'Current Month' },
    { sessions: 'sessions-16', visits: 82, type: 'Last Month' },
    { sessions: 'sessions-17', visits: 161, type: 'Current Month' },
    { sessions: 'sessions-17', visits: 92, type: 'Last Month' },
    { sessions: 'sessions-18', visits: 134, type: 'Current Month' },
    { sessions: 'sessions-18', visits: 132, type: 'Last Month' },
    { sessions: 'sessions-19', visits: 124, type: 'Current Month' },
    { sessions: 'sessions-19', visits: 104, type: 'Last Month' },
    { sessions: 'sessions-20', visits: 105, type: 'Current Month' },
    { sessions: 'sessions-20', visits: 125, type: 'Last Month' },
    { sessions: 'sessions-21', visits: 111, type: 'Current Month' },
    { sessions: 'sessions-21', visits: 131, type: 'Last Month' },
    { sessions: 'sessions-22', visits: 119, type: 'Current Month' },
    { sessions: 'sessions-22', visits: 112, type: 'Last Month' },
    { sessions: 'sessions-23', visits: 104, type: 'Current Month' },
    { sessions: 'sessions-23', visits: 117, type: 'Last Month' },
    { sessions: 'sessions-24', visits: 100, type: 'Current Month' },
    { sessions: 'sessions-24', visits: 104, type: 'Last Month' },
    { sessions: 'sessions-25', visits: 90, type: 'Current Month' },
    { sessions: 'sessions-25', visits: 90, type: 'Last Month' },
    { sessions: 'sessions-26', visits: 93, type: 'Current Month' },
    { sessions: 'sessions-26', visits: 93, type: 'Last Month' },
    { sessions: 'sessions-27', visits: 62, type: 'Current Month' },
    { sessions: 'sessions-27', visits: 89, type: 'Last Month' },
    { sessions: 'sessions-28', visits: 53, type: 'Current Month' },
    { sessions: 'sessions-28', visits: 61, type: 'Last Month' },
    { sessions: 'sessions-29', visits: 59, type: 'Current Month' },
    { sessions: 'sessions-29', visits: 48, type: 'Last Month' },
    { sessions: 'sessions-30', visits: 53, type: 'Current Month' },
    { sessions: 'sessions-30', visits: 51, type: 'Last Month' },
  ];
  const [option, setOption] = useState({
    // backgroundColor: '#1a212b',
    data: dataset,
    xField: 'sessions',
    yField: 'visits',
    seriesField: 'type',
    padding: 'auto',
    isStack: false,
    appendPadding: [0, 0, 30, 0],
    height: 200,
    tooltip: { shared: true },
    smooth: true,
    meta: {
      visits: {
        min: 30,
        max: 180,
        tickItnerval: 30,
      },
      sessions: {
        range: [0.05, 0.95],
      },
    },
    yAxis: {
      grid: { line: { style: { lineDash: [4, 2], stroke: '#ddd' } } },
      tickLine: { style: { stroke: '#ddd' } },
    },
    xAxis: false,
    areaStyle: ({ type }) => {
      return {
        fill:
          type === 'Current Month'
            ? 'l(90) 0:#5B8FF9 0.75:rgba(91,143,249,0.25) 1:rgba(255,255,255,0.2)'
            : 'l(90) 0:#61DDAA 0.75:rgba(97,221,170,0.25) 1:rgba(255,255,255,0.2)',
      };
    },
    color: ['#5B8FF9', '#61DDAA'],
    legend: { position: 'top' },
  });
  useEffect(() => {
    if (!isTpl) {
      const chart = new Area(container.current || '', option as AreaOptions);
      chart.render();
      // background:{fill:'#1a212b'},
      // width:500,

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
            });
          }, timer * 1000);
          return () => clearInterval(timerInterval);
        }
      } else {
        console.log('timer : ', timer);

        return;
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
