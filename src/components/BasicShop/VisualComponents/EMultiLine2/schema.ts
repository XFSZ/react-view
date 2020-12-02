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
  data: TTableDefaultType;
  api: TTextDefaultType;
  apiParams: TTextAreaDefaultType;
  timer: TNumberDefaultType;
  clickParams: TTextAreaDefaultType;
  yAxis: TTextDefaultType;
  seriesA: TTextDefaultType;
  seriesB: TTextDefaultType;
}

export interface IEChartSchema {
  editData: TEChartEditData;
  config: IEChartConfig;
}

const EMultiLine2: IEChartSchema = {
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
      key: 'data',
      name: '数据源',
      type: 'Table',
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
  ],
  config: {
    id: '999',
    zIndex: 2,
    title: '折线图2',
    size: 14,
    color: 'rgba(0,0,0,1)',
    paddingTop: 10,
    data: [
      {
        name: 'A',
        value: 20,
      },
      {
        name: 'B',
        value: 60,
      },
      {
        name: 'C',
        value: 20,
      },
      {
        name: 'D',
        value: 80,
      },
    ],
    clickParams: '[{}]',
    api: '',
    apiParams: '',
    yAxis: '',
    seriesA: '',
    seriesB: '',
    timer: 0,
  },
};

export default EMultiLine2;
