import React, { memo } from 'react';
import styles from './index.less';
import { Dispatch } from 'umi';
import { ITextConfig } from './schema';
import logo from '@/assets/12-文本.png';
import { StateWithHistory } from 'redux-undo';
import { connect } from 'dva';
import onClick from '@/components/PanelComponents/FormEditor/onClickFunc';

const Text = memo((props: ITextConfig & { isTpl: boolean; dispatch: Dispatch }) => {
  const { align, text, fontSize, color, lineHeight, isTpl, clickParams, dispatch } = props;

  return (
    <>
      {isTpl ? (
        <div>
          <img src={logo} alt=""></img>
        </div>
      ) : (
        <div
          className={styles.textWrap}
          onClick={() => onClick(clickParams, dispatch)}
          style={{ color, textAlign: align, fontSize, lineHeight }}
        >
          {text}
        </div>
      )}
    </>
  );
});

export default connect((state: StateWithHistory<any>) => ({
  pstate: state.present.editorModal,
  cstate: state.present.editorPcModal,
}))(Text);
//export default Text;
