import React, { useState, useEffect } from 'react';
import { userViewData } from '@/layouts';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import axios from 'axios';
import Container from './Container';

import styles from './index.less';

// const viewerData = [
//   {
//     id: '0',
//     item: {
//       type: 'Panel',
//       config: {
//         text: '页面1',
//         color: 'rgba(60,60,60,1)',
//         width: 1366,
//         height: 768,
//         layerList: [{ id: '0', zIndex: 2, visibility: 1, desc: '默认层级' }],
//       },
//       h: '0px',
//       editableEl: [
//         { key: 'text', name: '名称', type: 'Text' },
//         { key: 'color', name: '背景颜色', type: 'Color' },
//         { key: 'width', name: '宽', type: 'Number' },
//         { key: 'height', name: '高', type: 'Number' },
//         { key: 'layerList', name: '层级', type: 'LayerList', cropRate: 2 },
//       ],
//       category: 'basePanel',
//       x: 0,
//       w: '0px',
//     },
//     point: { i: 'x-0', x: 0, y: 0, w: 1, h: 1, isBounded: true },
//     status: 'initCanvas',
//   },
// ];
// localStorage.setItem('userData', JSON.stringify(viewerData));

function BasicLayout(props) {
  // const [userProps, setUserProps] = useState('');
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://192.168.1.5:3000/getdata');
      // console.log('response : ', result.data);
      // setUserProps(result.data);
      localStorage.setItem('userData', JSON.stringify(result.data));
      setLoading(false);
    };
    fetchData();
  }, []);

  return loading ? (
    <div>loading...</div>
  ) : (
    <div className={styles.layout}>
      <DndProvider backend={HTML5Backend}>
        <Container {...props} />
      </DndProvider>
    </div>
  );
}

export default BasicLayout;
