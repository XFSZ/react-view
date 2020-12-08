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
import { Column, ColumnOptions } from '@antv/g2plot';

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

const EColumn = (props: XEChartProps & { dispatch: Dispatch }) => {
  const {
    isTpl,
    //   data,
    color,
    size,
    paddingTop,
    title,
    api,
    apiParams,
    timer,
    clickParams,
    dispatch,
    dataSet,
    xField,
    yField,
    seriesField,
  } = props;
  //const chartRef = useRef(null);
  //const container = useRef<HTMLDivElement>(null)

  const container = useRef(null);
  const dataset = eval(`(${dataSet})`);
  const [option, setOption] = useState({
    data: dataset,
    isGroup: true,
    xField: `${xField}`,
    yField: `${yField}`,
    seriesField: `${seriesField}`,
    /** 设置颜色 */
    //color: ['#1ca9e6', '#f88c24'],
    /** 设置间距 */
    // marginRatio: 0.1,
    legend: false,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle', // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        { type: 'interval-adjust-position' },
        // 数据标签防遮挡
        { type: 'interval-hide-overlap' },
        // 数据标签文颜色自动调整
        { type: 'adjust-color' },
      ],
    },
  });
  useEffect(() => {
    if (!isTpl) {
      const chart = new Column(container.current || '', option as ColumnOptions);
      chart.render();
      // background:{fill:'#1a212b'},
      // width:500,

      if (timer >= 1) {
        // console.log('timer : ', timer);
        if (api !== '') {
          //  console.log('api : ', api);
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
              console.log('test : ', response.data[yField]);
            });
          }, timer * 1000);
          return () => clearInterval(timerInterval);
        }
      } else {
        //  console.log('timer : ', timer);

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
    dataSet,
    xField,
    yField,
    seriesField,
  ]);
  return (
    <div className={styles.chartWrap}>
      <div className={styles.chartTitle} style={{ color, fontSize: size, paddingTop }}>
        {title}
      </div>
      {isTpl ? (
        <img src={EChartImg} alt="chart" />
      ) : (
        <div ref={container} style={{ height: '200px' }}></div>
      )}
    </div>
  );
};

export default connect((state: StateWithHistory<any>) => ({
  pstate: state.present.editorModal,
  cstate: state.present.editorPcModal,
}))(memo(EColumn));

// export default memo(EChart);
