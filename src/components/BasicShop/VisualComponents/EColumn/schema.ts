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
  xField: TTextDefaultType;
  yField: TTextDefaultType;
  seriesField: TTextDefaultType;
}

export interface IEChartSchema {
  editData: TEChartEditData;
  config: IEChartConfig;
}

const EColumn: IEChartSchema = {
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
    title: '分组柱状图',
    size: 14,
    color: 'rgba(0,0,0,1)',
    paddingTop: 10,
    clickParams: '[{}]',
    api: '',
    apiParams: '',
    xField: 'months',
    yField: 'averageFainfall',
    seriesField: 'name',
    timer: 0,
    dataSet: `[
      {
        name: 'London',
        months: 'Jan.',
        averageFainfall: 18.9,
      },
      {
        name: 'London',
        months: 'Feb.',
        averageFainfall: 28.8,
      },
      {
        name: 'London',
        months: 'Mar.',
        averageFainfall: 39.3,
      },
      {
        name: 'London',
        months: 'Apr.',
        averageFainfall: 81.4,
      },
      {
        name: 'London',
        months: 'May',
        averageFainfall: 47,
      },
      {
        name: 'London',
        months: 'Jun.',
        averageFainfall: 20.3,
      },
      {
        name: 'London',
        months: 'Jul.',
        averageFainfall: 24,
      },
      {
        name: 'London',
        months: 'Aug.',
        averageFainfall: 35.6,
      },
      {
        name: 'Berlin',
        months: 'Jan.',
        averageFainfall: 12.4,
      },
      {
        name: 'Berlin',
        months: 'Feb.',
        averageFainfall: 23.2,
      },
      {
        name: 'Berlin',
        months: 'Mar.',
        averageFainfall: 34.5,
      },
      {
        name: 'Berlin',
        months: 'Apr.',
        averageFainfall: 99.7,
      },
      {
        name: 'Berlin',
        months: 'May',
        averageFainfall: 52.6,
      },
      {
        name: 'Berlin',
        months: 'Jun.',
        averageFainfall: 35.5,
      },
      {
        name: 'Berlin',
        months: 'Jul.',
        averageFainfall: 37.4,
      },
      {
        name: 'Berlin',
        months: 'Aug.',
        averageFainfall: 42.4,
      },
    ]`,
  },
};

export default EColumn;
