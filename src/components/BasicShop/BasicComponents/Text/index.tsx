import React, { memo, useEffect, useState } from 'react';
import styles from './index.less';
import { Dispatch } from 'umi';
import { ITextConfig } from './schema';
import logo from '@/assets/12-文本.png';
import { StateWithHistory } from 'redux-undo';
import { connect } from 'dva';
import axios from 'axios';
import onClick from '@/components/PanelComponents/FormEditor/onClickFunc';

const Text = memo((props: ITextConfig & { isTpl: boolean; dispatch: Dispatch }) => {
  const {
    align,
    text,
    fontSize,
    color,
    lineHeight,
    isTpl,
    clickParams,
    dispatch,
    api,
    apiParams,
    dataVal,
    timer,
  } = props;
  const [valText, setValText] = useState(text);
  useEffect(() => {
    if (!isTpl) {
      if (timer >= 1) {
        console.log('timer : ', timer);
        if (api !== '') {
          console.log('api : ', api);
          let params = {};
          if (apiParams !== '') {
            params = JSON.parse(apiParams);
          }
          const timerInterval = setInterval(() => {
            axios.get(api, { params }).then(function(response) {
              console.log('response : ', response.data);
              // setValText(response.data[dataVal])
            });
          }, timer * 1000);
          return () => clearInterval(timerInterval);
        }
      } else {
        console.log('timer : ', timer);
        return;
      }
    }
  }, [isTpl, api, apiParams, timer, clickParams, dispatch, dataVal]);
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
          {valText}
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
