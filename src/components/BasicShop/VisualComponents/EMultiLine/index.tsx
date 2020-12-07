import React, { memo, useEffect, useRef, useState } from 'react';
// import { uuid } from 'utils/tool';
import EChartImg from '@/assets/ELine.png';
import axios from 'axios';
import styles from './index.less';
import { IEChartConfig } from './schema';
import { Dispatch } from 'umi';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';
import DataSet from '@antv/data-set';
import { Line } from '@antv/g2plot';

//import onClick from '@/components/PanelComponents/FormEditor/onClickFunc';
interface XEChartProps extends IEChartConfig {
  isTpl: boolean;
}
const dataset = [
  {
    year: '2011',
    value: 3134,
    category: 'Liquid fuel',
  },
  {
    year: '2011',
    value: 4055,
    category: 'Solid fuel',
  },
  {
    year: '2011',
    value: 1756,
    category: 'Gas fuel',
  },
  {
    year: '2011',
    value: 494,
    category: 'Cement production',
  },
  {
    year: '2011',
    value: 64,
    category: 'Gas flarinl',
  },
  {
    year: '2012',
    value: 3200,
    category: 'Liquid fuel',
  },
  {
    year: '2012',
    value: 4106,
    category: 'Solid fuel',
  },
  {
    year: '2012',
    value: 1783,
    category: 'Gas fuel',
  },
  {
    year: '2012',
    value: 519,
    category: 'Cement production',
  },
  {
    year: '2012',
    value: 65,
    category: 'Gas flarinl',
  },
  {
    year: '2013',
    value: 3220,
    category: 'Liquid fuel',
  },
  {
    year: '2013',
    value: 4126,
    category: 'Solid fuel',
  },
  {
    year: '2013',
    value: 1806,
    category: 'Gas fuel',
  },
  {
    year: '2013',
    value: 554,
    category: 'Cement production',
  },
  {
    year: '2013',
    value: 68,
    category: 'Gas flarinl',
  },
  {
    year: '2014',
    value: 3280,
    category: 'Liquid fuel',
  },
  {
    year: '2014',
    value: 4117,
    category: 'Solid fuel',
  },
  {
    year: '2014',
    value: 1823,
    category: 'Gas fuel',
  },
  {
    year: '2014',
    value: 568,
    category: 'Cement production',
  },
  {
    year: '2014',
    value: 68,
    category: 'Gas flarinl',
  },
];

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

const EMultiLine = (props: XEChartProps & { dispatch: Dispatch }) => {
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

  const [option, setOption] = useState({
    data: dataset,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: v => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`),
      },
    },
    color: ['#1979C9', '#D62A0D', '#FAA219'],
  });
  useEffect(() => {
    if (!isTpl) {
      const chart = new Line(container.current || '', option);
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
        <div ref={container} style={{ height: '200px' }}></div>
      )}
    </div>
  );
};

export default connect((state: StateWithHistory<any>) => ({
  pstate: state.present.editorModal,
  cstate: state.present.editorPcModal,
}))(memo(EMultiLine));

// export default memo(EChart);
