import React, { useState, useEffect } from 'react';
import { userViewData } from '@/layouts';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import axios from 'axios';
import Container from './Container';

import styles from './index.less';

function BasicLayout(props) {
  const [userProps, setUserProps] = useState('');
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:3000/getdata');
      // console.log('response : ', result.data);
      setUserProps(result.data);
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
        {/* <userViewData.Provider value={userProps}> */}
        <Container {...props} />
        {/* </userViewData.Provider> */}
      </DndProvider>
    </div>
  );

  // return (
  //   <div className={styles.layout}>
  //     <DndProvider backend={HTML5Backend}>
  //       {/* <Container {...props} userdata={userdata} /> */}
  //       <Container {...userprops} />
  //     </DndProvider>
  //   </div>
  // );
}

export default BasicLayout;
