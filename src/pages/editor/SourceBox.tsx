import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import GridLayout, { ItemCallback } from 'react-grid-layout';
import { connect } from 'dva';
import DynamicEngine from 'components/DynamicEngine';
import styles from './index.less';
import { uuid } from '@/utils/tool';
import { Dispatch } from 'umi';
import { StateWithHistory } from 'redux-undo';
import { Menu, Item, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import { dooringContext } from '@/layouts';

interface SourceBoxProps {
  pstate: {
    pointData: { id: string; item: any; point: any; isMenu?: any; visibility: string }[];
    curPoint: any;
  };
  cstate: { pointData: { id: string; item: any; point: any }[]; curPoint: any };
  scaleNum: number;
  panelData: { id: string; item: any; point: any; isMenu?: any };
  canvasId: string;
  allType: string[];
  dispatch: Dispatch;
  dragState: { x: number; y: number };
  setDragState: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
}

const SourceBox = memo((props: SourceBoxProps) => {
  const {
    pstate,
    scaleNum,
    canvasId,
    allType,
    dispatch,
    dragState,
    setDragState,
    cstate,
    panelData,
  } = props;
  const context = useContext(dooringContext);
  let pointData = pstate ? pstate.pointData : [];

  const cpointData = cstate ? cstate.pointData : [];
  const [canvasRect, setCanvasRect] = useState<number[]>([]);
  const [isShowTip, setIsShowTip] = useState(true);
  const [viewData, setViewData] = useState<any[]>([]);
  // const [clonePointData, setPointData] = useState(pointData);
  // const [isMenu, setIsMenu] = useState(false);
  const [{ isOver }, drop] = useDrop({
    accept: allType,
    drop: (item: { h: number; type: string; x: number; config: { id: string } }, monitor) => {
      let parentDiv = document.getElementById(canvasId),
        pointRect = parentDiv!.getBoundingClientRect(),
        top = pointRect.top,
        pointEnd = monitor.getSourceClientOffset(),
        y = pointEnd!.y < top ? 0 : pointEnd!.y - top,
        col = 24, // 网格列数
        cellHeight = 2,
        w = item.type === 'Icon' ? 3 : col;
      w = 600;
      let h = item.h;
      // 转换成网格规则的坐标和大小
      let gridY = Math.ceil(y / cellHeight);
      //  let gridY = pointEnd!.y;
      const uid = uuid(6, 10);
      let itemNew = { ...item, config: { ...item.config, id: uid } };
      if (context.theme === 'h5') {
        dispatch({
          type: 'editorModal/addPointData',
          payload: {
            id: uid,
            item: itemNew,
            point: { i: `x-${pointData.length}`, x: 0, y: gridY, w, h: h, isBounded: true },
            status: 'inToCanvas',
          },
        });
      } else {
        dispatch({
          type: 'editorPcModal/addPointData',
          payload: {
            id: uuid(6, 10),
            item,
            point: {
              i: `x-${cpointData.length}`,
              x: item.x || 0,
              y: gridY,
              w,
              h: item.h,
              isBounded: true,
            },
            status: 'inToCanvas',
          },
        });
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      item: monitor.getItem(),
    }),
  });

  const dragStop: ItemCallback = useMemo(() => {
    // console.log('dragStop');

    return (layout, oldItem, newItem, placeholder, e, element) => {
      const curPointData = pointData.filter(item => item.id === newItem.i)[0];
      dispatch({
        type: 'editorModal/modPointData',
        payload: { ...curPointData, point: newItem, status: 'inToCanvas' },
      });
    };
  }, [context.theme, cpointData, dispatch, pointData]);

  const onDragStart: ItemCallback = useMemo(() => {
    return (layout, oldItem, newItem, placeholder, e, element) => {
      const curPointData = pointData.filter(item => item.id === newItem.i)[0];
      dispatch({
        type: 'editorModal/modPointData',
        payload: { ...curPointData, status: 'inToCanvas' },
      });
    };
  }, [dispatch, pointData]);

  const onResizeStop: ItemCallback = useMemo(() => {
    return (layout, oldItem, newItem, placeholder, e, element) => {
      const curPointData = pointData.filter(item => item.id === newItem.i)[0];
      dispatch({
        type: 'editorModal/modPointData',
        payload: { ...curPointData, point: newItem, status: 'inToCanvas' },
      });
    };
  }, [dispatch, pointData]);

  const initSelect: any = (data: any = []) => {
    return (
      data &&
      data.map((itemData: any) => ({
        ...itemData,
        isMenu: false,
      }))
    );
  };

  const handleContextMenuDel = useCallback(() => {
    if (pstate.curPoint) {
      dispatch({
        type: 'editorModal/delPointData',
        payload: { id: pstate.curPoint.id },
      });
    }
  }, [dispatch, pstate.curPoint]);

  const handleContextMenuCopy = useCallback(() => {
    if (pstate.curPoint) {
      dispatch({
        type: 'editorModal/copyPointData',
        payload: { id: pstate.curPoint.id },
      });
    }
  }, [dispatch, pstate.curPoint]);

  const onConTextClick = useCallback(
    (type: string) => {
      if (type === 'del') {
        handleContextMenuDel();
      } else if (type === 'copy') {
        handleContextMenuCopy();
      }
    },
    [handleContextMenuCopy, handleContextMenuDel],
  );

  const MyAwesomeMenu = useCallback(
    () => (
      <Menu id="menu_id">
        <Item onClick={() => onConTextClick('copy')}>复制</Item>
        <Item onClick={() => onConTextClick('del')}>删除</Item>
      </Menu>
    ),
    [onConTextClick],
  );
  //h5 Rect
  useEffect(() => {
    let { width, height } = document.getElementById(canvasId)!.getBoundingClientRect();
    setCanvasRect([width, height]);
  }, [canvasId]);

  useEffect(() => {
    let timer = window.setTimeout(() => {
      setIsShowTip(false);
    }, 3000);
    return () => {
      window.clearTimeout(timer);
    };
  }, []);
  const opacity = isOver ? 0.7 : 1;
  const [panelWidth, setPanelWidth] = useState('1920px');
  const [panelHeight, setPanelHeight] = useState('1080px');
  // const [backgroundColor,setBackgroundColor] = useState('#eee')

  useEffect(() => {
    try {
      if (panelData.id && panelData.id === '0') {
        setPanelWidth(panelData.item.config.width + 'px');
        setPanelHeight(panelData.item.config.height + 'px');
        setCanvasRect([panelData.item.config.width, panelData.item.config.height]);
      }
    } catch (e) {
      console.log(e);
    }
  }, [panelWidth, panelHeight, panelData]);

  // 将在同一个 层级的item 放到 一个数组里面
  //useCallback

  useEffect(() => {
    let newArr: any[] = [];
    // setViewData(Array<any[]>());
    pstate.pointData[0].item.config.layerList.map((layoutval: { zIndex: number }) => {
      let filterData: any = pstate.pointData.filter(value => {
        return value.item.config.zIndex === layoutval.zIndex;
      });
      if (filterData.length > 0) {
        // a.push(b);
        let viewDatasignle = {
          id: `vd${layoutval.zIndex}`,
          zIndex: layoutval.zIndex,
          data: filterData,
        };
        newArr.push(viewDatasignle);
      }
    });
    setViewData(newArr);
  }, [pstate.pointData]);

  // 组件是否可见渲染
  const renderval = useCallback(
    (value: { id: string; item: any; point: any; isMenu?: any; visibility: string }) => {
      if (pstate.pointData[0].item.config.layerList && value.id !== '0') {
        for (let i = 0; i < pstate.pointData[0].item.config.layerList.length; i++) {
          const va = pstate.pointData[0].item.config.layerList[i];
          if (va.zIndex === value.item.config.zIndex) {
            return va.visibility;
          }
        }
      }
      return 0;
    },
    [],
  );
  const render = useMemo(() => {
    return (
      <Draggable
        position={dragState}
        handle=".js_box"
        onStop={(e: DraggableEvent, data: DraggableData) => {
          setDragState({ x: data.x, y: data.y });
        }}
      >
        <div
          className={styles.canvasBox}
          style={{ width: '0px', height: '0px', backgroundColor: 'gray' }}
        >
          <MenuProvider id="menu_id">
            <div
              style={{
                transform: `scale(${scaleNum})`,
                position: 'relative',
                width: '100%',
                height: '100%',
              }}
            >
              <div
                id={canvasId}
                className={styles.canvas}
                style={{
                  opacity,
                  width: panelWidth,
                  height: panelHeight,
                  //  width :panelWidth,height:panelHeight
                }}
                ref={drop}
              >
                {viewData.length > 0
                  ? viewData.map((layoutval: { id: string; zIndex: number; data: any }) => (
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
                          width={canvasRect[0] || 0}
                          //  rowHeight={canvasRect[1] || 2}
                          transformScale={scaleNum}
                          margin={[0, 0]}
                          onDragStop={dragStop}
                          onDragStart={onDragStart}
                          onResizeStop={onResizeStop}
                        >
                          {layoutval.data.map((value: any) =>
                            value.id !== '0' && value.item.config.zIndex === layoutval.zIndex ? (
                              <div
                                className={value.isMenu ? styles.selected : styles.dragItem}
                                key={value.id}
                                data-grid={value.point}
                                style={{
                                  visibility: renderval(value) === 1 ? 'visible' : 'hidden',
                                  marginTop: '-4px',
                                }}
                              >
                                <DynamicEngine {...value.item} isTpl={false} />
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
          </MenuProvider>
        </div>
      </Draggable>
    );
  }, [
    canvasId,
    canvasRect,
    dragState,
    dragStop,
    drop,
    viewData,
    //  isShowTip,
    onDragStart,
    onResizeStop,
    opacity,
    //   pointData,
    scaleNum,
    setDragState,
    panelWidth,
    panelHeight,
    renderval,
  ]);

  return (
    <>
      {render}
      <MyAwesomeMenu />
    </>
  );
});

export default connect((state: StateWithHistory<any>) => ({
  pstate: state.present.editorModal,
  cstate: state.present.editorPcModal,
}))(SourceBox);
