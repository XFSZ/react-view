import {
  IDataListConfigType,
  INumberConfigType,
  IRadioConfigType,
  ISwitchConfigType,
  TDataListDefaultType,
  TRadioDefaultType,
  TSwitchDefaultType,
} from '@/components/PanelComponents/FormEditor/types';
import { baseConfig, baseDefault, ICommonBaseType } from '../../common';

export type CarouselDirectionKeyType = 'down' | 'left';

export type TCarouselEditData = Array<
  | INumberConfigType
  | IRadioConfigType<CarouselDirectionKeyType>
  | ISwitchConfigType
  | IDataListConfigType
>;
export interface ICarouselConfig extends ICommonBaseType {
  direction: TRadioDefaultType<CarouselDirectionKeyType>;
  swipeable: TSwitchDefaultType;
  autoPlay: TSwitchDefaultType;
  imgList: TDataListDefaultType;
}

export interface ICarouselSchema {
  editData: TCarouselEditData;
  config: ICarouselConfig;
}

const Carousel: ICarouselSchema = {
  editData: [
    ...baseConfig,

    {
      key: 'direction',
      name: '方向',
      type: 'Radio',
      range: [
        {
          key: 'down',
          text: '从上到下',
        },
        {
          key: 'left',
          text: '从左到右',
        },
      ],
    },
    {
      key: 'swipeable',
      name: '是否可拖拽',
      type: 'Switch',
    },
    {
      key: 'autoPlay',
      name: '是否自动播放',
      type: 'Switch',
    },
    {
      key: 'imgList',
      name: '图片列表',
      type: 'DataList',
    },
  ],
  config: {
    direction: 'left',
    swipeable: false,
    autoPlay: false,
    imgList: [
      {
        id: '1',
        title: '趣谈小课1',
        desc: '致力于打造优质小课程',
        link: 'xxxxx',
        imgUrl: [
          {
            uid: '001',
            name: 'image.png',
            status: 'done',
            url: 'https://pic4.zhimg.com/80/v2-8a98e1d0ef8e75fd882a7c92a021c142_720w.jpg?source=1940ef5c',
          },
        ],
      },
      {
        id: '2',
        title: '趣谈小课1',
        desc: '致力于打造优质小课程',
        link: 'xxxxx',
        imgUrl: [
          {
            uid: '001',
            name: 'image.png',
            status: 'done',
            url: 'https://pic4.zhimg.com/80/v2-8a98e1d0ef8e75fd882a7c92a021c142_720w.jpg?source=1940ef5c',
          },
        ],
      },
    ],
    ...baseDefault,
  },
};
export default Carousel;
