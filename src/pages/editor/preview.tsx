import React, { CSSProperties, memo, useEffect, useMemo, useRef, useState } from 'react';
import GridLayout from 'react-grid-layout';
import DynamicEngine from 'components/DynamicEngine';
import domtoimage from 'dom-to-image';
import req from '@/utils/req';
import styles from './index.less';
import { useGetScrollBarWidth } from '@/utils/tool';
import { LocationDescriptorObject } from 'history-with-query';

const isMac = navigator.platform.indexOf('Mac') === 0;

interface PreviewPageProps {
  location: LocationDescriptorObject;
}
interface PointDataItem {
  id: string;
  item: Record<string, any>;
  point: Record<string, any>;
}

const PreviewPage = memo((props: PreviewPageProps) => {
  const [pointData, setPointData] = useState(() => {
    let pointDataStr = localStorage.getItem('pointData');
    let points;

    try {
      points = JSON.parse(pointDataStr!) || [];
    } catch (err) {
      points = [];
    }
    return points.map((item: PointDataItem) => ({
      ...item,
      point: { ...item.point, isDraggable: false, isResizable: false },
    }));
  });

  const [pageData, setPageData] = useState(() => {
    let pageConfigStr = localStorage.getItem('pageConfig');
    let pageConfig;

    try {
      pageConfig = JSON.parse(pageConfigStr!) || {};
    } catch (err) {
      pageConfig = {};
    }
    return pageConfig;
  });

  const vw = window.innerWidth;

  useEffect(() => {
    const { tid, gf } = props.location.query!;
    if (!gf && parent.window.location.pathname === '/preview') {
      req
        .get<any, any>('/', { params: { tid } })
        .then(res => {
          const { pageConfig, tpl } = res || { pageConfig: {}, tpl: [] };
          // 设置标题
          document.title = pageConfig.title || '';
          // 设置数据源
          setPointData(
            tpl.map(item => ({
              ...item,
              point: { ...item.point, isDraggable: false, isResizable: false },
            })),
          );

          setPageData(pageConfig);
        })
        .catch(err => {
          console.error(err);
        });
      return;
    }

    setTimeout(() => {
      generateImg((url: string) => {
        parent.window.getFaceUrl(url);
      });
    }, 3000);
  }, [props.location.query]);

  const ref = useRef<HTMLDivElement>(null);
  const refImgDom = useRef<HTMLDivElement>(null);
  const width = useGetScrollBarWidth(ref);
  const pcStyle: CSSProperties = useMemo(() => {
    return {
      width: isMac ? 382 : 375 + width + 1, //小数会有偏差
      margin: '55px auto',
      height: '684px',
      overflow: 'auto',
      position: 'relative',
      transform: 'scale(0.7) translateY(-80px)',
      backgroundColor: pageData.bgColor,
    };
  }, [width]);

  const generateImg = (cb: any) => {
    domtoimage
      .toBlob(refImgDom.current, {
        bgcolor: '#fff',
      })
      .then(function(blob: Blob) {
        const reader = new FileReader();
        reader.onload = function(e) {
          cb && cb(e?.target?.result);
        };
        reader.readAsDataURL(blob);
      })
      .catch(function(error: any) {
        console.error('oops, something went wrong!', error);
      });
  };
  function renderval(value: {
    id: string;
    item: any;
    point: any;
    isMenu?: any;
    visibility: string;
  }) {
    // console.log("renderval : ",value)
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
  return (
    <>
      <div
        ref={ref}
        style={{
          display: 'flex',
          margin: 0,
          // height:'100vh',
          // height: document.body.clientHeight,
          //  width: document.body.clientWidth,
          // overflow: 'auto',
          width: pointData[0].item.config.width,
          height: pointData[0].item.config.height,
        }}
        // style={
        //   vw > 800
        //     ? pcStyle
        //     : { height: '100vh', overflow: 'auto', backgroundColor: pageData.bgColor }
        // }
      >
        <div ref={refImgDom}>
          {pointData.length > 0
            ? pointData[0].item.config.layerList.map(
                (layoutval: { id: string; zIndex: number }) => (
                  <div
                    key={layoutval.id}
                    style={{ position: 'absolute', zIndex: layoutval.zIndex }}
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
                      {pointData.map(value =>
                        value.id !== '0' && value.item.config.zIndex === layoutval.zIndex ? (
                          <div
                            className={styles.dragItem}
                            key={value.id}
                            data-grid={value.point}
                            style={{
                              visibility: renderval(value) === 1 ? 'visible' : 'hidden',
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
                ),
              )
            : null}
        </div>
      </div>
    </>
  );
});

export default PreviewPage;
