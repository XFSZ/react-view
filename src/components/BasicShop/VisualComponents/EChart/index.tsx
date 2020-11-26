import echarts from 'echarts';
import React, { memo, useEffect, useRef, useState } from 'react';
// import { uuid } from 'utils/tool';
import EChartImg from '@/assets/xiao.png';

import styles from './index.less';
import { IEChartConfig } from './schema';

interface XEChartProps extends IEChartConfig {
  isTpl: boolean;
}

const EChart = (props: XEChartProps) => {
  const { isTpl, data, color, size, paddingTop, title } = props;
  //const chartRef = useRef(null);
  //const container = useRef<HTMLDivElement>(null)
  const container = useRef(null);
  const [option, setOption] = useState({
    title: {
      text: 'ECharts 入门示例',
    },
    tooltip: {},
    legend: {
      data: ['销量'],
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
  useEffect(() => {
    if (!isTpl) {
      const chart = echarts.init((container.current as unknown) as HTMLDivElement, {
        devicePixelRatio: window.devicePixelRatio,
      });
      chart.setOption(option);
      //chart.onClick
    }
  }, [data, isTpl, option]);
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

export default memo(EChart);
