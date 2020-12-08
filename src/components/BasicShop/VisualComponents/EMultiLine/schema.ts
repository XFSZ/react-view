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
  dataSet: TTextAreaDefaultType;
  yField: TTextDefaultType;
  xField: TTextDefaultType;
  seriesField: TTextDefaultType;
}

export interface IEChartSchema {
  editData: TEChartEditData;
  config: IEChartConfig;
}

const EMultiLine: IEChartSchema = {
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
      key: 'yField',
      name: 'yField',
      type: 'Text',
    },
    {
      key: 'xField',
      name: 'xField',
      type: 'Text',
    },
    {
      key: 'seriesField',
      name: 'seriesField',
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
    title: '折线图',
    size: 14,
    color: 'rgba(0,0,0,1)',
    paddingTop: 10,

    clickParams: '[{}]',
    api: '',
    apiParams: '',
    yField: 'value',
    xField: 'year',
    seriesField: 'category',
    timer: 0,
    dataSet: `[
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
    ]`,
  },
};

export default EMultiLine;
