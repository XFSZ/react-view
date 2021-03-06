import DataSet from '@antv/data-set';
import { Chart, registerInteraction } from '@antv/g2';
import React, { memo, useEffect, useRef, useState } from 'react';
import EChartImg from '@/assets/EPie.png';
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
    { name: '狮子', type: '火象星座狮子', value: 11 },
    { name: '白羊', type: '火象星座白羊', value: 10 },
    { name: '射手', type: '火象星座射手', value: 10 },
    { name: '水瓶', type: '风向星座水瓶', value: 14 },
    { name: '双子', type: '风向星座双子', value: 7 },
    { name: '天平', type: '风向星座天平', value: 7 },
    { name: '摩羯', type: '土象星座摩羯', value: 14 },
    { name: '金牛', type: '土象星座金牛', value: 3 },
    { name: '处女', type: '土象星座处女', value: 3 },
    { name: '天蝎', type: '水象星座天蝎', value: 11 },
    { name: '巨蟹', type: '水象星座巨蟹', value: 5 },
    { name: '双鱼', type: '水象星座双鱼', value: 5 },
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
    //火象星座狮子: 'l(90) 0:#5B8FF9 0.75:rgba(91,143,249,0.25) 1:rgba(255,255,255,0.2)',
    火象星座狮子: '#1890ff',
    火象星座白羊: '#1890ff',
    火象星座射手: '#1890ff',
    风向星座水瓶: '#13c2c2',
    风向星座双子: '#13c2c2',
    风向星座天平: '#13c2c2',
    土象星座摩羯: '#ffc53d',
    土象星座金牛: '#ffc53d',
    土象星座处女: '#ffc53d',
    水象星座天蝎: '#73d13d',
    水象星座巨蟹: '#73d13d',
    水象星座双鱼: '#73d13d',
  };
  const colorMapB = {
    //火象星座: '#1890ff',
    火象星座狮子: 'l(90) 0:#5B8FF9 0.75:rgba(91,143,249,0.25) 1:rgba(255,255,255,0.2)',
    //  火象星座狮子: '#1890ff',
    火象星座白羊: 'l(90) 0:#5B8FF9 0.75:rgba(91,143,249,0.25) 1:rgba(255,255,255,0.2)',
    火象星座射手: 'l(90) 0:#5B8FF9 0.75:rgba(91,143,249,0.25) 1:rgba(255,255,255,0.2)',
    风向星座水瓶: 'l(90) 0:#5B8FF9 0.75:rgba(91,143,249,0.25) 1:rgba(255,255,255,0.2)',
    风向星座双子: 'l(90) 0:#5B8FF9 0.75:rgba(91,143,249,0.25) 1:rgba(255,255,255,0.2)',
    风向星座天平: 'l(90) 0:#5B8FF9 0.75:rgba(91,143,249,0.25) 1:rgba(255,255,255,0.2)',
    土象星座摩羯: 'l(90) 0:#5B8FF9 0.75:rgba(91,143,249,0.25) 1:rgba(255,255,255,0.2)',
    土象星座金牛: 'l(90) 0:#5B8FF9 0.75:rgba(91,143,249,0.25) 1:rgba(255,255,255,0.2)',
    土象星座处女: 'l(90) 0:#5B8FF9 0.75:rgba(91,143,249,0.25) 1:rgba(255,255,255,0.2)',
    水象星座天蝎: 'l(90) 0:#5B8FF9 0.75:rgba(91,143,249,0.25) 1:rgba(255,255,255,0.2)',
    水象星座巨蟹: 'l(90) 0:#5B8FF9 0.75:rgba(91,143,249,0.25) 1:rgba(255,255,255,0.2)',
    水象星座双鱼: 'l(90) 0:#5B8FF9 0.75:rgba(91,143,249,0.25) 1:rgba(255,255,255,0.2)',
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
        .color('type', val => colorMapB[val])
        .style({
          stroke: 'white',
          lineWidth: 1,
        });
      // .label('type', {
      //   offset: -5,
      //   style: {
      //     fill: 'white',
      //     shadowBlur: 2,
      //     shadowColor: 'rgba(0, 0, 0, .45)',
      //   },
      // });

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
        });
      // .label('name', {
      //   offset: -10,
      //   style: {
      //     fill: 'white',
      //     shadowBlur: 2,
      //     shadowColor: 'rgba(0, 0, 0, .45)',
      //   },
      // });

      chart.interaction('element-active');
      registerInteraction('element-highlight-by-x', {
        start: [{ trigger: 'element:mouseenter', action: 'element-highlight-by-x:highlight' }],
        end: [{ trigger: 'element:mouseleave', action: 'element-highlight-by-x:reset' }],
      });
      registerInteraction('axis-label-highlight', {
        start: [
          {
            trigger: 'axis-label:mouseenter',
            action: ['list-highlight:highlight', 'element-highlight:highlight'],
          },
        ],
        end: [
          {
            trigger: 'axis-label:mouseleave',
            action: ['list-highlight:reset', 'element-highlight:reset'],
          },
        ],
      });
      registerInteraction('element-active', {
        start: [{ trigger: 'element:mouseenter', action: 'element-active:active' }],
        end: [{ trigger: 'element:mouseleave', action: 'element-active:reset' }],
      });
      chart.render();
      //  chart.interaction('element-highlight-by-x')
      //  chart.interaction('axis-label-highlight')
      //  chart.interaction('element-active')
      chart.interaction('element-highlight');

      registerInteraction('element-highlight', {
        start: [{ trigger: 'element:mouseenter', action: 'element-highlight:highlight' }],
        end: [{ trigger: 'element:mouseleave', action: 'element-highlight:reset' }],
      });
    }
  }, [data, isTpl]);
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
}))(memo(EPie));

// export default memo(EChart);
