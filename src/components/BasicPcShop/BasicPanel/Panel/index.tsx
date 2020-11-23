import React, { memo } from 'react';
import styles from './index.less';
import { IPanelConfig } from './schema';

const Panel = memo((props: IPanelConfig) => {
  const {  text,width , color, height } = props;
  return (
    <div className={styles.textWrap} style={{ color,  width, height }}>
      {text}
    </div>
  );
});
export default Panel;