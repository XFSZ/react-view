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

const EHorizontalBar: IEChartSchema = {
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
    title: '横向柱图',
    size: 14,
    color: 'rgba(0,0,0,1)',
    paddingTop: 10,
    clickParams: '[{}]',
    api: '',
    apiParams: '',
    timer: 0,
    yField: 'year',
    xField: 'value',
    seriesField: 'country',
    dataSet: `[
      {
        country: 'Asia',
        year: '1750',
        value: 502,
      },
      {
        country: 'Asia',
        year: '1800',
        value: 635,
      },
      {
        country: 'Asia',
        year: '1850',
        value: 809,
      },
      {
        country: 'Asia',
        year: '1900',
        value: 947,
      },
      {
        country: 'Asia',
        year: '1950',
        value: 1402,
      },
      {
        country: 'Asia',
        year: '1999',
        value: 3634,
      },
      {
        country: 'Asia',
        year: '2050',
        value: 5268,
      },
      {
        country: 'Africa',
        year: '1750',
        value: 106,
      },
      {
        country: 'Africa',
        year: '1800',
        value: 107,
      },
      {
        country: 'Africa',
        year: '1850',
        value: 111,
      },
      {
        country: 'Africa',
        year: '1900',
        value: 133,
      },
      {
        country: 'Africa',
        year: '1950',
        value: 221,
      },
      {
        country: 'Africa',
        year: '1999',
        value: 767,
      },
      {
        country: 'Africa',
        year: '2050',
        value: 1766,
      },
      {
        country: 'Europe',
        year: '1750',
        value: 163,
      },
      {
        country: 'Europe',
        year: '1800',
        value: 203,
      },
      {
        country: 'Europe',
        year: '1850',
        value: 276,
      },
      {
        country: 'Europe',
        year: '1900',
        value: 408,
      },
      {
        country: 'Europe',
        year: '1950',
        value: 547,
      },
      {
        country: 'Europe',
        year: '1999',
        value: 729,
      },
      {
        country: 'Europe',
        year: '2050',
        value: 628,
      },
    ]`,
  },
};

export default EHorizontalBar;
