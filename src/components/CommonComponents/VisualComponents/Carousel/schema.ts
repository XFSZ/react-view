import {
  IDataListConfigType,
  IRadioConfigType,
  ISwitchConfigType,
  TDataListDefaultType,
  TRadioDefaultType,
  TSwitchDefaultType,
} from '@/components/PanelComponents/FormEditor/types';

export type CarouselDirectionKeyType = 'down' | 'left';

export type TCarouselEditData = Array<
  IRadioConfigType<CarouselDirectionKeyType> | ISwitchConfigType | IDataListConfigType
>;
export interface ICarouselConfig {
  direction: TRadioDefaultType<CarouselDirectionKeyType>;
  swipeable: TSwitchDefaultType;
  autoPlay: TSwitchDefaultType;
  imgList: TDataListDefaultType;
  tplImg: string;
}

export interface ICarouselSchema {
  editData: TCarouselEditData;
  config: ICarouselConfig;
}

const Carousel: ICarouselSchema = {
  editData: [
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
      cropRate:0,
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
    tplImg: 'http://io.nainor.com/uploads/carousal_17442e1420f.png',
  },
};
export default Carousel;
