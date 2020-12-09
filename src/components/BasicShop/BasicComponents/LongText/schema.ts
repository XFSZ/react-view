import {
  IColorConfigType,
  INumberConfigType,
  ISelectConfigType,
  ITextAreaConfigType,
  ITextConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TSelectDefaultType,
  TTextAreaDefaultType,
  TTextDefaultType,
} from '@/components/PanelComponents/FormEditor/types';
export type TLongTextSelectKeyType = 'left' | 'center' | 'right';

export type TLongTextEditData = Array<
  | ITextAreaConfigType
  | IColorConfigType
  | INumberConfigType
  | ISelectConfigType<TLongTextSelectKeyType>
  | ITextConfigType
>;
export interface ILongTextConfig {
  id: TTextDefaultType;
  zIndex: TNumberDefaultType;
  text: TTextAreaDefaultType;
  color: TColorDefaultType;
  fontSize: TNumberDefaultType;
  indent: TNumberDefaultType;
  lineHeight: TNumberDefaultType;
  fontWeight: TNumberDefaultType;
  textAlign: TSelectDefaultType<TLongTextSelectKeyType>;
}

export interface ILongTextSchema {
  editData: TLongTextEditData;
  config: ILongTextConfig;
}

const LongText: ILongTextSchema = {
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
      type: 'TextArea',
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
      key: 'indent',
      name: '首行缩进',
      type: 'Number',
      range: [0, 100],
    },
    {
      key: 'textAlign',
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
      step: 0.1,
    },
  ],
  config: {
    fontWeight: 400,
    id: '999',
    zIndex: 2,
    text:
      '我是长文本有一段故事 富强，民主，文明，和谐；自由，平等，公正，法制，爱国，敬业，诚信，友善',
    color: 'rgba(60,60,60,1)',
    fontSize: 14,
    indent: 20,
    lineHeight: 1.8,
    textAlign: 'left',
  },
};

export default LongText;
