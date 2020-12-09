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
  //  data: TTableDefaultType;
  api: TTextDefaultType;
  apiParams: TTextAreaDefaultType;
  timer: TNumberDefaultType;
  clickParams: TTextAreaDefaultType;
  dataSet: TTextAreaDefaultType;
  xField: TTextDefaultType;
  yField: TTextDefaultType;
  seriesField: TTextDefaultType;
}

export interface IEChartSchema {
  editData: TEChartEditData;
  config: IEChartConfig;
}

const EDoubleLine: IEChartSchema = {
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
      key: 'yField',
      name: 'yField',
      type: 'Text',
    },
    {
      key: 'seriesField',
      name: 'seriesField',
      type: 'Text',
    },
    {
      key: 'dataSet',
      name: 'dataSet',
      type: 'TextArea',
    },
  ],
  config: {
    id: '999',
    zIndex: 2,
    title: '双曲线',
    size: 14,
    color: 'rgba(0,0,0,1)',
    paddingTop: 10,
    clickParams: '[{}]',
    api: '',
    apiParams: '',
    xField: 'sessions',
    yField: 'visits',
    seriesField: 'type',
    timer: 0,
    dataSet: ` [
      { sessions: '10.01', visits: 620, type: '完好数' },
      { sessions: '10.01', visits: 350, type: '大修数' },
      { sessions: '10.02', visits: 600, type: '完好数' },
      { sessions: '10.02', visits: 300, type: '大修数' },
      { sessions: '10.03', visits: 750, type: '完好数' },
      { sessions: '10.03', visits: 320, type: '大修数' },
      { sessions: '10.04', visits: 630, type: '完好数' },
      { sessions: '10.04', visits: 360, type: '大修数' },
      { sessions: '10.05', visits: 780, type: '完好数' },
      { sessions: '10.05', visits: 408, type: '大修数' },
      { sessions: '10.06', visits: 770, type: '完好数' },
      { sessions: '10.06', visits: 387, type: '大修数' },
      { sessions: '10.07', visits: 768, type: '完好数' },
      { sessions: '10.07', visits: 388, type: '大修数' },
      { sessions: '10.08', visits: 769, type: '完好数' },
      { sessions: '10.08', visits: 399, type: '大修数' },
      { sessions: '10.09', visits: 765, type: '完好数' },
      { sessions: '10.09', visits: 385, type: '大修数' },
      { sessions: '10.10', visits: 760, type: '完好数' },
      { sessions: '10.10', visits: 450, type: '大修数' },
      { sessions: '10.11', visits: 730, type: '完好数' },
      { sessions: '10.11', visits: 470, type: '大修数' },
      { sessions: '10.12', visits: 700, type: '完好数' },
      { sessions: '10.12', visits: 460, type: '大修数' },
      { sessions: '10.13', visits: 800, type: '完好数' },
      { sessions: '10.13', visits: 320, type: '大修数' },
      { sessions: '10.14', visits: 830, type: '完好数' },
      { sessions: '10.14', visits: 350, type: '大修数' },
      { sessions: '10.15', visits: 825, type: '完好数' },
      { sessions: '10.15', visits: 415, type: '大修数' },
      { sessions: '10.16', visits: 810, type: '完好数' },
      { sessions: '10.16', visits: 330, type: '大修数' },
      { sessions: '10.17', visits: 826, type: '完好数' },
      { sessions: '10.17', visits: 346, type: '大修数' },
      { sessions: '10.18', visits: 833, type: '完好数' },
      { sessions: '10.18', visits: 443, type: '大修数' },
      { sessions: '10.19', visits: 880, type: '完好数' },
      { sessions: '10.19', visits: 490, type: '大修数' },
     
    ]`,
  },
};

export default EDoubleLine;
