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
import styles from './preindex.less';
import { useGetScrollBarWidth } from '@/utils/tool';
import { LocationDescriptorObject } from 'history-with-query';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';
import localForage from 'localforage';
const isMac = navigator.platform.indexOf('Mac') === 0;
localForage.setDriver(localForage.INDEXEDDB);
interface PreviewPageProps {
  location: LocationDescriptorObject;
  dispatch?: any;
  pstate: {
    pointData: { id: string; item: any; point: any; isMenu?: any; visibility: string }[];
  };
}

const PreviewPage = memo((props: PreviewPageProps) => {
  const { pstate, dispatch } = props;
  const [loading, setLoading] = useState(true);
  const [viewData, setViewData] = useState<any[]>([]);
  useEffect(() => {
    if (pstate.pointData.length < 1) {
      const fetchData = async () => {
        const result = await axios('/api/getdata');
        localForage.setItem('userData', JSON.stringify(result.data)).then(() => {
          const previewdata = result.data.map((item: any) => ({
            ...item,
            point: { ...item.point, isDraggable: false, static: true, isResizable: false },
          }));
          localForage.setItem('userPreviewData', JSON.stringify(previewdata)).then(() => {
            console.log('1', pstate.pointData);
            if (pstate.pointData.length === 0) {
              dispatch({
                type: 'previewModal/queryData',
              });
              dispatch({
                type: 'editorModal/queryData',
              });
            }
            setLoading(false);
          });
        });
        // window.location.reload();
      };
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);
  let pointData: any = pstate.pointData || [];
  useEffect(() => {
    let newarr: any[] = [];
    try {
      pstate.pointData[0].item.config.layerList.map((layoutval: { zIndex: number }) => {
        let filterData: any = pstate.pointData.filter(value => {
          return value.item.config.zIndex === layoutval.zIndex;
        });
        if (filterData.length > 0) {
          let viewDatasignle = {
            id: `vd${layoutval.zIndex}`,
            zIndex: layoutval.zIndex,
            data: filterData,
          };
          newarr.push(viewDatasignle);
        }
      });
      setViewData(newarr);
    } catch (e) {
      console.log(e);
    }
  }, [pstate.pointData]);
  let fireFoxHeight: any = document.body.clientHeight;
  let fireFoxWidth: any = document.body.clientWidth;
  try {
    fireFoxWidth = pointData[0].item.config.width;
    fireFoxHeight = pointData[0].item.config.height - 1;
  } catch (e) {}

  const ref = useRef<HTMLDivElement>(null);
  const refImgDom = useRef<HTMLDivElement>(null);

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
        // display: 'flex',
        margin: 0,
        padding: 0,
        position: 'relative',
        overflow: 'hidden',
        // height:'100vh',
        // height: document.body.clientHeight,
        //  width: document.body.clientWidth,
        // overflow: 'auto',
        width: fireFoxWidth,
        height: fireFoxHeight,
      }}
    >
      <div ref={refImgDom}>
        {viewData.length > 0
          ? viewData.map((layoutval: { id: string; zIndex: number; data: any }) => (
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
                  {layoutval.data.map((value: any) =>
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
