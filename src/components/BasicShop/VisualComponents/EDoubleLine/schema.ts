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
      { sessions: 'sessions-1', visits: 89, type: 'Current Month' },
      { sessions: 'sessions-1', visits: 87, type: 'Last Month' },
      { sessions: 'sessions-2', visits: 148, type: 'Current Month' },
      { sessions: 'sessions-2', visits: 140, type: 'Last Month' },
      { sessions: 'sessions-3', visits: 128, type: 'Current Month' },
      { sessions: 'sessions-3', visits: 144, type: 'Last Month' },
      { sessions: 'sessions-4', visits: 104, type: 'Current Month' },
      { sessions: 'sessions-4', visits: 138, type: 'Last Month' },
      { sessions: 'sessions-5', visits: 102, type: 'Current Month' },
      { sessions: 'sessions-5', visits: 114, type: 'Last Month' },
      { sessions: 'sessions-6', visits: 89, type: 'Current Month' },
      { sessions: 'sessions-6', visits: 107, type: 'Last Month' },
      { sessions: 'sessions-7', visits: 93, type: 'Current Month' },
      { sessions: 'sessions-7', visits: 102, type: 'Last Month' },
      { sessions: 'sessions-8', visits: 116, type: 'Current Month' },
      { sessions: 'sessions-8', visits: 89, type: 'Last Month' },
      { sessions: 'sessions-9', visits: 159, type: 'Current Month' },
      { sessions: 'sessions-9', visits: 80, type: 'Last Month' },
      { sessions: 'sessions-10', visits: 164, type: 'Current Month' },
      { sessions: 'sessions-10', visits: 151, type: 'Last Month' },
      { sessions: 'sessions-11', visits: 139, type: 'Current Month' },
      { sessions: 'sessions-11', visits: 134, type: 'Last Month' },
      { sessions: 'sessions-12', visits: 130, type: 'Current Month' },
      { sessions: 'sessions-12', visits: 129, type: 'Last Month' },
      { sessions: 'sessions-13', visits: 115, type: 'Current Month' },
      { sessions: 'sessions-13', visits: 111, type: 'Last Month' },
      { sessions: 'sessions-14', visits: 128, type: 'Current Month' },
      { sessions: 'sessions-14', visits: 95, type: 'Last Month' },
      { sessions: 'sessions-15', visits: 117, type: 'Current Month' },
      { sessions: 'sessions-15', visits: 108, type: 'Last Month' },
      { sessions: 'sessions-16', visits: 111, type: 'Current Month' },
      { sessions: 'sessions-16', visits: 82, type: 'Last Month' },
      { sessions: 'sessions-17', visits: 161, type: 'Current Month' },
      { sessions: 'sessions-17', visits: 92, type: 'Last Month' },
      { sessions: 'sessions-18', visits: 134, type: 'Current Month' },
      { sessions: 'sessions-18', visits: 132, type: 'Last Month' },
      { sessions: 'sessions-19', visits: 124, type: 'Current Month' },
      { sessions: 'sessions-19', visits: 104, type: 'Last Month' },
      { sessions: 'sessions-20', visits: 105, type: 'Current Month' },
      { sessions: 'sessions-20', visits: 125, type: 'Last Month' },
      { sessions: 'sessions-21', visits: 111, type: 'Current Month' },
      { sessions: 'sessions-21', visits: 131, type: 'Last Month' },
      { sessions: 'sessions-22', visits: 119, type: 'Current Month' },
      { sessions: 'sessions-22', visits: 112, type: 'Last Month' },
      { sessions: 'sessions-23', visits: 104, type: 'Current Month' },
      { sessions: 'sessions-23', visits: 117, type: 'Last Month' },
      { sessions: 'sessions-24', visits: 100, type: 'Current Month' },
      { sessions: 'sessions-24', visits: 104, type: 'Last Month' },
      { sessions: 'sessions-25', visits: 90, type: 'Current Month' },
      { sessions: 'sessions-25', visits: 90, type: 'Last Month' },
      { sessions: 'sessions-26', visits: 93, type: 'Current Month' },
      { sessions: 'sessions-26', visits: 93, type: 'Last Month' },
      { sessions: 'sessions-27', visits: 62, type: 'Current Month' },
      { sessions: 'sessions-27', visits: 89, type: 'Last Month' },
      { sessions: 'sessions-28', visits: 53, type: 'Current Month' },
      { sessions: 'sessions-28', visits: 61, type: 'Last Month' },
      { sessions: 'sessions-29', visits: 59, type: 'Current Month' },
      { sessions: 'sessions-29', visits: 48, type: 'Last Month' },
      { sessions: 'sessions-30', visits: 53, type: 'Current Month' },
      { sessions: 'sessions-30', visits: 51, type: 'Last Month' },
    ]`,
  },
};

export default EDoubleLine;
