import React, { memo, useEffect, useRef, useState } from 'react';
// import { uuid } from 'utils/tool';
import EChartImg from '@/assets/ERadar.png';
import axios from 'axios';
import styles from './index.less';
import { IEChartConfig } from './schema';
import { Dispatch } from 'umi';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';
import DataSet from '@antv/data-set';
import { Radar, RadarOptions } from '@antv/g2plot';
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

// const dataset = [
//   { item: 'Design', a: 70, b: 30 },
//   { item: 'Development', a: 60, b: 70 },
//   { item: 'Marketing', a: 50, b: 60 },
//   { item: 'Users', a: 40, b: 50 },
//   { item: 'Test', a: 60, b: 70 },
//   { item: 'Language', a: 70, b: 50 },
//   { item: 'Technology', a: 50, b: 40 },
//   { item: 'Support', a: 30, b: 40 },
//   { item: 'Sales', a: 60, b: 40 },
//   { item: 'UX', a: 50, b: 60 },
// ];

const ERadar = (props: XEChartProps & { dispatch: Dispatch }) => {
  const {
    isTpl,
    //  data,
    color,
    size,
    paddingTop,
    title,
    api,
    timer,
    clickParams,
    dispatch,
    dataSet,
    xField,
    seriesFieldA,
    seriesFieldB,
    apiParams,
  } = props;
  //const chartRef = useRef(null);
  //const container = useRef<HTMLDivElement>(null)

  const container = useRef(null);
  const { DataView } = DataSet;
  const dataset = eval(`(${dataSet})`);
  const dv = new DataView().source(dataset);
  dv.transform({
    type: 'fold',
    fields: [`${seriesFieldA}`, `${seriesFieldB}`], // 展开字段集
    key: 'user', // key字段
    value: 'score', // value字段
  });
  const [option, setOption] = useState({
    autoFit: true,
    data: dv.rows,
    xField: `${xField}`,
    yField: 'score',
    seriesField: 'user',
    legend: { position: 'right' },
    // meta: {
    //   score: {
    //     alias: '分数',
    //     min: 0,
    //     max: 80,
    //   },
    // },
    xAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    },
    yAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null,
          },
        },
      },
    },
    // 开启辅助点
    // point: {
    //   size: 2,
    // },
  });
  useEffect(() => {
    if (!isTpl) {
      const chart = new Radar(container.current || '', option as RadarOptions);
      chart.render();
      // background:{fill:'#1a212b'},
      // width:500,

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
              console.log('test : ', response.data[xField]);
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
    xField,
    seriesFieldA,
    seriesFieldB,
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
}))(memo(ERadar));

// export default memo(EChart);
