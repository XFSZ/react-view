import {
  IColorConfigType,
  INumberConfigType,
  ITextConfigType,
  ILayerDataListConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TTextDefaultType,
  TLayerDataListDefaultType,
} from '@/components/PanelComponents/FormEditor/types';

export type TPanelEditData = Array<
  ITextConfigType | IColorConfigType | INumberConfigType | ILayerDataListConfigType
>;
export interface IPanelConfig {
  text: TTextDefaultType;
  color: TColorDefaultType;
  width: TNumberDefaultType;
  height: TNumberDefaultType;
  layerList: TLayerDataListDefaultType;
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
    {
      key: 'layerList',
      name: '层级',
      type: 'LayerList',
      cropRate: 2,
    },
  ],
  config: {
    text: '页面1',
    color: 'rgba(60,60,60,1)',
    width: 1366,
    height: 768,
    layerList: [
      {
        id: '0',
        zIndex: 2,
        visibility: 1,
        desc: '默认层级',
      },
    ],
  },
};
export default Panel;
