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
  xField: TTextDefaultType;
  seriesFieldA: TTextDefaultType;
  seriesFieldB: TTextDefaultType;
  dataSet: TTextAreaDefaultType;
}

export interface IEChartSchema {
  editData: TEChartEditData;
  config: IEChartConfig;
}

const ERadar: IEChartSchema = {
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
      key: 'yAxis',
      name: 'yAxis',
      type: 'Text',
    },
    {
      key: 'seriesA',
      name: 'seriesA',
      type: 'Text',
    },
    {
      key: 'seriesB',
      name: 'seriesB',
      type: 'Text',
    },
    {
      key: 'timer',
      name: '定时器(单位s)',
      type: 'Number',
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
    title: '雷达图',
    size: 14,
    color: 'rgba(0,0,0,1)',
    paddingTop: 10,

    clickParams: '[{}]',
    api: '',
    apiParams: '',
    xField: 'item',
    seriesFieldA: 'a',
    seriesFieldB: 'b',
    timer: 0,
    dataSet: `[
      { item: 'Design', a: 70, b: 30 },
      { item: 'Development', a: 60, b: 70 },
      { item: 'Marketing', a: 50, b: 60 },
      { item: 'Users', a: 40, b: 50 },
      { item: 'Test', a: 60, b: 70 },
      { item: 'Language', a: 70, b: 50 },
      { item: 'Technology', a: 50, b: 40 },
      { item: 'Support', a: 30, b: 40 },
      { item: 'Sales', a: 60, b: 40 },
      { item: 'UX', a: 50, b: 60 },
    ]`,
  },
};

export default ERadar;
