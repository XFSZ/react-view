import {
  IColorConfigType,
  INumberConfigType,
  ITableConfigType,
  ITextConfigType,
  ITextAreaConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TTableDefaultType,
  TTextDefaultType,
  TTextAreaDefaultType,
} from '@/components/PanelComponents/FormEditor/types';

export type TEChartEditData = Array<
  ITextConfigType | INumberConfigType | IColorConfigType | ITableConfigType | ITextAreaConfigType
>;
export interface IEChartConfig {
  id: TTextDefaultType;
  zIndex: TNumberDefaultType;
  title: TTextDefaultType;
  size: TNumberDefaultType;
  color: TColorDefaultType;
  paddingTop: TNumberDefaultType;
  // data: TTableDefaultType;
  api: TTextDefaultType;
  apiParams: TTextAreaDefaultType;
  timer: TNumberDefaultType;
  clickParams: TTextAreaDefaultType;
  barData: TTextAreaDefaultType;
  lineData: TTextAreaDefaultType;
  xField: TTextDefaultType;
  yFieldBar: TTextDefaultType;
  yFieldLine: TTextDefaultType;
  seriesFieldBar: TTextDefaultType;
  seriesFieldLine: TTextDefaultType;
}

export interface IEChartSchema {
  editData: TEChartEditData;
  config: IEChartConfig;
}

const EDualAxes: IEChartSchema = {
  editData: [
    {
      key: 'id',
      name: 'id',
      type: 'Text',
    },
    {
      key: 'zIndex',
      name: '层级',
      type: 'Number',
    },
    {
      key: 'title',
      name: '标题',
      type: 'Text',
    },
    {
      key: 'size',
      name: '标题大小',
      type: 'Number',
    },
    {
      key: 'color',
      name: '标题颜色',
      type: 'Color',
    },
    {
      key: 'paddingTop',
      name: '上边距',
      type: 'Number',
    },
    {
      key: 'clickParams',
      name: '动作',
      type: 'TextArea',
    },
    {
      key: 'api',
      name: 'api接口',
      type: 'Text',
    },
    {
      key: 'apiParams',
      name: 'api参数',
      type: 'TextArea',
    },
    {
      key: 'timer',
      name: '定时器(单位s)',
      type: 'Number',
    },

    {
      key: 'xField',
      name: 'xField',
      type: 'Text',
    },
    {
      key: 'yFieldBar',
      name: 'yFieldBar',
      type: 'Text',
    },
    {
      key: 'yFieldLine',
      name: 'yFieldLine',
      type: 'Text',
    },
    {
      key: 'seriesFieldBar',
      name: 'seriesFieldBar',
      type: 'Text',
    },
    {
      key: 'seriesFieldLine',
      name: 'seriesFieldLine',
      type: 'Text',
    },
    {
      key: 'barData',
      name: 'barData',
      type: 'TextArea',
    },
    {
      key: 'lineData',
      name: 'lineData',
      type: 'TextArea',
    },
  ],
  config: {
    id: '999',
    zIndex: 2,
    title: '分组柱线图',
    size: 14,
    color: 'rgba(0,0,0,1)',
    paddingTop: 10,
    clickParams: '[{}]',
    api: '',
    apiParams: '',
    barData: `[
      { time: '2019-03', value: 350, type: 'uv' },
      { time: '2019-04', value: 900, type: 'uv' },
      { time: '2019-05', value: 300, type: 'uv' },
      { time: '2019-06', value: 450, type: 'uv' },
      { time: '2019-07', value: 470, type: 'uv' },
      { time: '2019-03', value: 220, type: 'bill' },
      { time: '2019-04', value: 300, type: 'bill' },
      { time: '2019-05', value: 250, type: 'bill' },
      { time: '2019-06', value: 220, type: 'bill' },
      { time: '2019-07', value: 362, type: 'bill' },
    ]`,
    lineData: `[
      { time: '2019-03', count: 800, name: 'a' },
      { time: '2019-04', count: 600, name: 'a' },
      { time: '2019-05', count: 400, name: 'a' },
      { time: '2019-06', count: 380, name: 'a' },
      { time: '2019-07', count: 220, name: 'a' },
      { time: '2019-03', count: 750, name: 'b' },
      { time: '2019-04', count: 650, name: 'b' },
      { time: '2019-05', count: 450, name: 'b' },
      { time: '2019-06', count: 400, name: 'b' },
      { time: '2019-07', count: 320, name: 'b' },
      { time: '2019-03', count: 900, name: 'c' },
      { time: '2019-04', count: 600, name: 'c' },
      { time: '2019-05', count: 450, name: 'c' },
      { time: '2019-06', count: 300, name: 'c' },
      { time: '2019-07', count: 200, name: 'c' },
    ]`,
    xField: 'time',
    yFieldBar: 'value',
    yFieldLine: 'count',
    seriesFieldBar: 'type',
    seriesFieldLine: 'name',
    timer: 0,
  },
};

export default EDualAxes;
