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
  clickParams: TTextAreaDefaultType;
}

export interface IEChartSchema {
  editData: TEChartEditData;
  config: IEChartConfig;
}

const Chart: IEChartSchema = {
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
  ],
  config: {
    id: '999',
    zIndex: 2,
    title: '柱状图',
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
  },
};

export default Chart;
