import {
    IColorConfigType,
    INumberConfigType,
    ITextConfigType,
    TColorDefaultType,
    TNumberDefaultType,
    TTextDefaultType,
  } from '@/components/PanelComponents/FormEditor/types';
  
  export type TPanelEditData = Array<
    ITextConfigType | IColorConfigType | INumberConfigType 
  >;
  export interface IPanelConfig {
   
    text: TTextDefaultType;
    color: TColorDefaultType;
    width: TNumberDefaultType;
    height: TNumberDefaultType;
  }
  
  export interface IPanelSchema {
    editData: TPanelEditData;
    config: IPanelConfig;
  }
  const Panel: IPanelSchema = {
    editData: [
      {
        key: 'text',
        name: '名称',
        type: 'Text',
      },
      {
        key: 'color',
        name: '背景颜色',
        type: 'Color',
      },
      {
        key: 'width',
        name: '宽',
        type: 'Number',
      },
      {
        key: 'height',
        name: '高',
        type: 'Number',
      },
    ],
    config: {
      text: '页面1',
      color: 'rgba(60,60,60,1)',
      width: 1366,
      height: 768,
    },
  };
  export default Panel;
  