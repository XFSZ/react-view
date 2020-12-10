import React, {
  CSSProperties,
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import GridLayout from 'react-grid-layout';
import DynamicEngine from 'components/DynamicEngine';
import domtoimage from 'dom-to-image';
import req from '@/utils/req';
import axios from 'axios';
import styles from './index.less';
import { useGetScrollBarWidth } from '@/utils/tool';
import { LocationDescriptorObject } from 'history-with-query';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';
const isMac = navigator.platform.indexOf('Mac') === 0;

interface PreviewPageProps {
  location: LocationDescriptorObject;
  pstate: {
    pointData: { id: string; item: any; point: any; isMenu?: any; visibility: string }[];
  };
}

//const PreviewPage = memo((props: PreviewPageProps) => {
const PreviewPage = memo((props: PreviewPageProps) => {
  const { pstate } = props;
  //console.log(pstate);
  const [loading, setLoading] = useState(true);
  // useLayoutEffect(() => {
  //   console.log('sws')
  //   if(!pstate.pointData){
  //     console.log('ss')
  //    const fetchData = async () => {
  //      const result = await axios('http://192.168.1.5:3000/getdata');
  //      const previewdata = result.data.map(item => ({
  //        ...item,
  //        point: { ...item.point, isDraggable: false, static: true, isResizable: false },
  //      }));
  //      localStorage.setItem('userPreviewData', JSON.stringify(previewdata));

  //    };
  //    fetchData();
  //   }
  // }, [])
  useEffect(() => {
    console.log('sws');
    if (pstate.pointData.length < 1) {
      console.log('ss');
      const fetchData = async () => {
        const result = await axios('http://192.168.1.5:3000/getdata');
        const previewdata = result.data.map(item => ({
          ...item,
          point: { ...item.point, isDraggable: false, static: true, isResizable: false },
        }));
        localStorage.setItem('userPreviewData', JSON.stringify(previewdata));
        setLoading(false);
        window.location.reload();
      };
      fetchData();
    }
    setLoading(false);
  }, []);
  let pointData: any = pstate.pointData || [];

  console.log(pointData);

  // const [pageData, setPageData] = useState(() => {
  //   let pageConfigStr = localStorage.getItem('pageConfig');
  //   let pageConfig;

  //   try {
  //     pageConfig = JSON.parse(pageConfigStr!) || {};
  //   } catch (err) {
  //     pageConfig = {};
  //   }
  //   return pageConfig;
  // });

  // useEffect(() => {
  //   const { tid, gf } = props.location.query!;
  //   if (!gf && parent.window.location.pathname === '/preview') {
  //     req
  //       .get<any, any>('/', { params: { tid } })
  //       .then(res => {
  //         const { pageConfig, tpl } = res || { pageConfig: {}, tpl: [] };
  //         // 设置标题
  //         document.title = pageConfig.title || '';
  //         // 设置数据源
  //         // setPointData(
  //         //   tpl.map(item => ({
  //         //     ...item,
  //         //     point: { ...item.point, isDraggable: false, isResizable: false },
  //         //   })),
  //         // );

  //         setPageData(pageConfig);
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       });
  //     return;
  //   }

  //   setTimeout(() => {
  //     generateImg((url: string) => {
  //       parent.window.getFaceUrl(url);
  //     });
  //   }, 3000);
  // }, [props.location.query]);

  const ref = useRef<HTMLDivElement>(null);
  const refImgDom = useRef<HTMLDivElement>(null);

  // const generateImg = (cb: any) => {
  //   domtoimage
  //     .toBlob(refImgDom.current, {
  //       bgcolor: '#fff',
  //     })
  //     .then(function(blob: Blob) {
  //       const reader = new FileReader();
  //       reader.onload = function(e) {
  //         cb && cb(e?.target?.result);
  //       };
  //       reader.readAsDataURL(blob);
  //     })
  //     .catch(function(error: any) {
  //       console.error('oops, something went wrong!', error);
  //     });
  // };
  function renderval(value: {
    id: string;
    item: any;
    point: any;
    isMenu?: any;
    visibility: string;
  }) {
    if (pointData[0].item.config.layerList && value.id !== '0') {
      for (let i = 0; i < pointData[0].item.config.layerList.length; i++) {
        const va = pointData[0].item.config.layerList[i];
        if (va.zIndex === value.item.config.zIndex) {
          return va.visibility;
        }
      }
    }
    return 0;
  }
  return loading ? (
    <div>loading...</div>
  ) : (
    <div
      ref={ref}
      style={{
        display: 'flex',
        margin: 0,
        position: 'relative',
        overflow: 'hidden',
        //overflow: 'auto',
        //  overflow: 'hidden',
        // height:'100vh',
        // height: document.body.clientHeight,
        //  width: document.body.clientWidth,
        // overflow: 'auto',
        width: pointData[0].item.config.width,
        height: pointData[0].item.config.height,
      }}
    >
      <div ref={refImgDom}>
        {pointData.length > 0
          ? pointData[0].item.config.layerList.map((layoutval: { id: string; zIndex: number }) => (
              <div
                key={layoutval.id}
                style={{ position: 'absolute', zIndex: layoutval.zIndex, marginTop: '-2px' }}
              >
                <GridLayout
                  key={`dd${layoutval.id}`}
                  className={styles.layout}
                  cols={9999}
                  rowHeight={2}
                  compactType={null}
                  width={pointData[0].item.config.width}
                  margin={[0, 0]}
                >
                  {pointData.map((value: any) =>
                    value.id !== '0' && value.item.config.zIndex === layoutval.zIndex ? (
                      <div
                        className={styles.dragItem}
                        key={value.id}
                        data-grid={value.point}
                        style={{
                          visibility: renderval(value) === 1 ? 'visible' : 'hidden',
                          marginTop: '-4px',
                        }}
                      >
                        <DynamicEngine {...value.item} />
                      </div>
                    ) : (
                      <div key={`dc${value.id}`}></div>
                    ),
                  )}
                </GridLayout>
              </div>
            ))
          : null}
      </div>
    </div>
  );
});

export default connect((state: StateWithHistory<any>) => ({
  pstate: state.present.previewModal,
}))(PreviewPage);
