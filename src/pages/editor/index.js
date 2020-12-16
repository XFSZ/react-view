import React, { useState, useEffect } from 'react';
import { userViewData } from '@/layouts';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import axios from 'axios';
import Container from './Container';

import styles from './index.less';

import localForage from 'localforage';

function BasicLayout(props) {
  const [loading, setLoading] = React.useState(true);
  // setLoading(true)
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/api/getdata');
      localForage.setItem('userData', JSON.stringify(result.data));
      const previewdata = result.data.map(item => ({
        ...item,
        point: { ...item.point, isDraggable: false, static: true, isResizable: false },
      }));
      localForage.setItem('userPreviewData', JSON.stringify(previewdata)).then(setLoading(false));
      // setLoading(false);
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
