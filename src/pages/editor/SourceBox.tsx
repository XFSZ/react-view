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
  //console.log('all : ', pstate);
  const cpointData = cstate ? cstate.pointData : [];
  const [canvasRect, setCanvasRect] = useState<number[]>([]);
  const [isShowTip, setIsShowTip] = useState(true);
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

      // 转换成网格规则的坐标和大小
      let gridY = Math.ceil(y / cellHeight);
      if (context.theme === 'h5') {
        const uid = uuid(6, 10);
        item.config.id = uid;
        dispatch({
          type: 'editorModal/addPointData',
          payload: {
            id: uid,
            item,
            point: { i: `x-${pointData.length}`, x: 0, y: gridY, w, h: item.h, isBounded: true },
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
    return (layout, oldItem, newItem, placeholder, e, element) => {
      const curPointData = pointData.filter(item => item.id === newItem.i)[0];
      console.log('curPointData : ', curPointData);
      dispatch({
        type: 'editorModal/modPointData',
        payload: { ...curPointData, point: newItem, status: 'inToCanvas' },
      });
      // if (context.theme === 'h5') {
      //   const curPointData = pointData.filter(item => item.id === newItem.i)[0];
      //   dispatch({
      //     type: 'editorModal/modPointData',
      //     payload: { ...curPointData, point: newItem, status: 'inToCanvas' },
      //   });
      // } else {
      //   const curPointData = cpointData.filter(item => item.id === newItem.i)[0];
      //   dispatch({
      //     type: 'editorPcModal/modPointData',
      //     payload: { ...curPointData, point: newItem, status: 'inToCanvas' },
      //   });
      // }
    };
  }, [context.theme, cpointData, dispatch, pointData]);

  const onDragStart: ItemCallback = useMemo(() => {
    return (layout, oldItem, newItem, placeholder, e, element) => {
      const curPointData = pointData.filter(item => item.id === newItem.i)[0];
      dispatch({
        type: 'editorModal/modPointData',
        payload: { ...curPointData, status: 'inToCanvas' },
      });
      // if (context.theme === 'h5') {
      //   const curPointData = pointData.filter(item => item.id === newItem.i)[0];
      //   dispatch({
      //     type: 'editorModal/modPointData',
      //     payload: { ...curPointData, status: 'inToCanvas' },
      //   });
      // } else {
      //   const curPointData = cpointData.filter(item => item.id === newItem.i)[0];
      //   dispatch({
      //     type: 'editorPcModal/modPointData',
      //     payload: { ...curPointData, status: 'inToCanvas' },
      //   });
      // }
    };
  }, [dispatch, pointData]);

  const onResizeStop: ItemCallback = useMemo(() => {
    return (layout, oldItem, newItem, placeholder, e, element) => {
      const curPointData = pointData.filter(item => item.id === newItem.i)[0];
      dispatch({
        type: 'editorModal/modPointData',
        payload: { ...curPointData, point: newItem, status: 'inToCanvas' },
      });
      // if (context.theme === 'h5') {
      //   const curPointData = pointData.filter(item => item.id === newItem.i)[0];
      //   dispatch({
      //     type: 'editorModal/modPointData',
      //     payload: { ...curPointData, point: newItem, status: 'inToCanvas' },
      //   });
      // } else {
      //   const curPointData = cpointData.filter(item => item.id === newItem.i)[0];
      //   dispatch({
      //     type: 'editorPcModal/modPointData',
      //     payload: { ...curPointData, point: newItem, status: 'inToCanvas' },
      //   });
      // }
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

  const handleContextMenuDel = () => {
    if (pstate.curPoint) {
      dispatch({
        type: 'editorModal/delPointData',
        payload: { id: pstate.curPoint.id },
      });
    }
  };

  const handleContextMenuCopy = () => {
    if (pstate.curPoint) {
      dispatch({
        type: 'editorModal/copyPointData',
        payload: { id: pstate.curPoint.id },
      });
    }
  };

  const onConTextClick = (type: string) => {
    if (type === 'del') {
      handleContextMenuDel();
    } else if (type === 'copy') {
      handleContextMenuCopy();
    }
  };

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

  function renderval(value: {
    id: string;
    item: any;
    point: any;
    isMenu?: any;
    visibility: string;
  }) {
    if (pstate.pointData[0].item.config.layerList && value.id !== '0') {
      for (let i = 0; i < pstate.pointData[0].item.config.layerList.length; i++) {
        const va = pstate.pointData[0].item.config.layerList[i];
        if (va.zIndex === value.item.config.zIndex) {
          return va.visibility;
        }
      }
    }
    return 0;
  }

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
          style={{ width: panelWidth, height: panelHeight, backgroundColor: 'red' }}
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
                {pointData.length > 0 ? (
                  <GridLayout
                    className={styles.layout}
                    cols={24}
                    rowHeight={2}
                    width={canvasRect[0] || 0}
                    margin={[0, 0]}
                    onDragStop={dragStop}
                    onDragStart={onDragStart}
                    onResizeStop={onResizeStop}
                  >
                    {pointData.map(value => (
                      <div
                        className={value.isMenu ? styles.selected : styles.dragItem}
                        key={value.id}
                        data-grid={value.point}
                        style={{ visibility: renderval(value) === 1 ? 'visible' : 'hidden' }}
                      >
                        <DynamicEngine {...value.item} isTpl={false} />
                      </div>
                    ))}
                    {/* {pointData.map(value => (
                      <div
                        className={value.isMenu ? styles.selected : styles.dragItem}
                        key={value.id}
                        data-grid={value.point}
                      >
                        <DynamicEngine {...value.item} isTpl={false} />
                      </div>
                    ))} */}
                  </GridLayout>
                ) : null}
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
    isShowTip,
    onDragStart,
    onResizeStop,
    opacity,
    pointData,
    scaleNum,
    setDragState,
    panelWidth,
    panelHeight,
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
