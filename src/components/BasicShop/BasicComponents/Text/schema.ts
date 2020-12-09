import {
  IColorConfigType,
  INumberConfigType,
  ISelectConfigType,
  ITextConfigType,
  ITextAreaConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TSelectDefaultType,
  TTextDefaultType,
  TTextAreaDefaultType,
} from '@/components/PanelComponents/FormEditor/types';

export type TTextSelectKeyType = 'left' | 'right' | 'center';
export type TTextEditData = Array<
  | ITextConfigType
  | IColorConfigType
  | INumberConfigType
  | ISelectConfigType<TTextSelectKeyType>
  | ITextAreaConfigType
>;
export interface ITextConfig {
  id: TTextDefaultType;
  zIndex: TNumberDefaultType;
  text: TTextDefaultType;
  color: TColorDefaultType;
  fontSize: TNumberDefaultType;
  align: TSelectDefaultType<TTextSelectKeyType>;
  lineHeight: TNumberDefaultType;
  fontWeight: TNumberDefaultType;
  clickParams: TTextAreaDefaultType;
  api: TTextDefaultType;
  apiParams: TTextAreaDefaultType;
  timer: TNumberDefaultType;
  dataVal: TTextDefaultType;
}

export interface ITextSchema {
  editData: TTextEditData;
  config: ITextConfig;
}
const Text: ITextSchema = {
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
      key: 'text',
      name: '文字',
      type: 'Text',
    },
    {
      key: 'color',
      name: '标题颜色',
      type: 'Color',
    },
    {
      key: 'fontSize',
      name: '字体大小',
      type: 'Number',
    },
    {
      key: 'fontWeight',
      name: '字体粗细',
      type: 'Number',
      range: [100, 900],
      step: 100,
    },
    {
      key: 'align',
      name: '对齐方式',
      type: 'Select',
      range: [
        {
          key: 'left',
          text: '左对齐',
        },
        {
          key: 'center',
          text: '居中对齐',
        },
        {
          key: 'right',
          text: '右对齐',
        },
      ],
    },
    {
      key: 'lineHeight',
      name: '行高',
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
      key: 'dataVal',
      name: 'api取值',
      type: 'Text',
    },
    {
      key: 'timer',
      name: '定时器(单位s)',
      type: 'Number',
    },
  ],
  config: {
    fontWeight: 400,
    id: '999',
    zIndex: 2,
    text: '我是文本',
    color: 'rgba(70,70,70,1)',
    fontSize: 18,
    align: 'center',
    lineHeight: 2,
    clickParams: '[{}]',
    api: '',
    apiParams: '',
    dataVal: '',
    timer: 0,
  },
};
export default Text;
