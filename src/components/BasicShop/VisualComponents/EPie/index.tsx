import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
import React, { memo, useEffect, useRef, useState } from 'react';
import EChartImg from '@/assets/xiao.png';
import axios from 'axios';
import styles from './index.less';
import { IEChartConfig } from './schema';
import { Dispatch } from 'umi';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';
// import onClick from '@/components/PanelComponents/FormEditor/onClickFunc';
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

const EPie = (props: XEChartProps & { dispatch: Dispatch }) => {
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
    // yAxis,
    // seriesA,
    // seriesB,
    apiParams,
  } = props;
  //const chartRef = useRef(null);
  const container = useRef<HTMLDivElement>(null);

  // const container = useRef<HTMLElement>(null);
  const dataset = [
    { name: '狮子', type: '火象星座', value: 11 },
    { name: '白羊', type: '火象星座', value: 10 },
    { name: '射手', type: '火象星座', value: 10 },
    { name: '水瓶', type: '风向星座', value: 14 },
    { name: '双子', type: '风向星座', value: 7 },
    { name: '天平', type: '风向星座', value: 7 },
    { name: '摩羯', type: '土象星座', value: 14 },
    { name: '金牛', type: '土象星座', value: 3 },
    { name: '处女', type: '土象星座', value: 3 },
    { name: '天蝎', type: '水象星座', value: 11 },
    { name: '巨蟹', type: '水象星座', value: 5 },
    { name: '双鱼', type: '水象星座', value: 5 },
  ];
  const ds = new DataSet();
  const dv = ds.createView();
  dv.source(dataset).transform({
    type: 'percent',
    field: 'value',
    dimension: 'type',
    as: 'percent',
  });

  const colorMap = {
    //火象星座: '#1890ff',
    火象星座: 'l(90) 0:#5B8FF9 0.75:rgba(91,143,249,0.25) 1:rgba(255,255,255,0.2)',
    风向星座: '#13c2c2',
    土象星座: '#ffc53d',
    水象星座: '#73d13d',
  };
  useEffect(() => {
    if (!isTpl) {
      const chart = new Chart(
        {
          container: container.current || '',
          autoFit: true,
          height: 200,
          // width:500,
        },

        // 指定分辨率
      );
      // const chart = new Chart({
      //   el: container.current || undefined,
      //   //container: container,
      //   autoFit: true,
      //   height: 500,
      // });
      chart.data(dv.rows);
      chart.legend(false);
      chart.coordinate('theta', {
        radius: 0.5,
        innerRadius: 0.3,
      });
      chart.tooltip({
        showMarkers: false,
      });
      chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('type', val => colorMap[val])
        .style({
          stroke: 'white',
          lineWidth: 1,
        })
        .label('type', {
          offset: -5,
          style: {
            fill: 'white',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
          },
        });

      const ds2 = new DataSet();
      const dv2 = ds2.createView();
      dv2.source(dataset).transform({
        type: 'percent',
        field: 'value',
        dimension: 'name',
        as: 'percent',
      });
      const outterView = chart.createView();
      outterView.data(dv2.rows);
      outterView.coordinate('theta', {
        innerRadius: 0.5 / 0.8,
        radius: 0.8,
      });
      outterView
        .interval()
        .adjust('stack')
        .position('percent')
        .color('type*name', (type, name) => colorMap[type])
        .style({
          stroke: 'white',
          lineWidth: 1,
        })
        .label('name', {
          offset: -10,
          style: {
            fill: 'white',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
          },
        });

      chart.interaction('element-active');

      chart.render();
    }
  }, [data, isTpl]);
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
}))(memo(EPie));

// export default memo(EChart);
