import {
  IColorConfigType,
  IDataListConfigType,
  IMutiTextConfigType,
  INumberConfigType,
  ITextConfigType,
  TColorDefaultType,
  TDataListDefaultType,
  TMutiTextDefaultType,
  TNumberDefaultType,
  TTextDefaultType,
} from '@/components/PanelComponents/FormEditor/types';

export type TTabEditData = Array<
  IMutiTextConfigType | IColorConfigType | INumberConfigType | IDataListConfigType | ITextConfigType
>;
export interface ITabConfig {
  id: TTextDefaultType;
  zIndex: TNumberDefaultType;
  tabs: TMutiTextDefaultType;
  color: TColorDefaultType;
  activeColor: TColorDefaultType;
  fontSize: TNumberDefaultType;
  imgSize: TNumberDefaultType;
  sourceData: TDataListDefaultType;
}

export interface ITabSchema {
  editData: TTabEditData;
  config: ITabConfig;
}

const Tab: ITabSchema = {
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
      key: 'tabs',
      name: '项目类别',
      type: 'MutiText',
    },
    {
      key: 'activeColor',
      name: '激活颜色',
      type: 'Color',
    },
    {
      key: 'color',
      name: '文字颜色',
      type: 'Color',
    },
    {
      key: 'fontSize',
      name: '文字大小',
      type: 'Number',
    },
    {
      key: 'imgSize',
      name: '图片大小',
      type: 'Number',
    },
    {
      key: 'sourceData',
      name: '数据源',
      type: 'DataList',
      cropRate: 0,
    },
  ],
  config: {
    id: '999',
    zIndex: 2,
    tabs: ['类别一', '类别二'],
    color: 'rgba(153,153,153,1)',
    activeColor: 'rgba(0,102,204,1)',
    fontSize: 16,
    imgSize: 100,
    sourceData: [
      {
        id: '1',
        title: '趣谈小课1',
        desc: '致力于打造优质小课程',
        link: 'xxxxx',
        type: 0,
        imgUrl: [
          {
            uid: '001',
            name: 'image.png',
            status: 'done',
            url:
              'https://pic4.zhimg.com/80/v2-8a98e1d0ef8e75fd882a7c92a021c142_720w.jpg?source=1940ef5c',
          },
        ],
      },
      {
        id: '2',
        title: '趣谈小课2',
        desc: '致力于打造优质小课程',
        link: 'xxxxx',
        type: 0,
        imgUrl: [
          {
            uid: '001',
            name: 'image.png',
            status: 'done',
            url:
              'https://pic4.zhimg.com/80/v2-8a98e1d0ef8e75fd882a7c92a021c142_720w.jpg?source=1940ef5c',
          },
        ],
      },
      {
        id: '3',
        title: '趣谈小课3',
        desc: '致力于打造优质小课程',
        link: 'xxxxx',
        type: 1,
        imgUrl: [
          {
            uid: '001',
            name: 'image.png',
            status: 'done',
            url:
              'https://pic4.zhimg.com/80/v2-8a98e1d0ef8e75fd882a7c92a021c142_720w.jpg?source=1940ef5c',
          },
        ],
      },
    ],
  },
};

export default Tab;
