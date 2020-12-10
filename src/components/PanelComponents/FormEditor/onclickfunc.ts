import { Dispatch } from 'umi';

const onClick = (clickParams: string, dispatch: Dispatch) => {
  try {
    let clickParamsStrData = '[{}]';
    if (clickParams !== '') {
      const clickParamsStrDatatoJson = eval('(' + clickParams + ')');
      clickParamsStrData = JSON.stringify(clickParamsStrDatatoJson);
    }
    const clickParamsData = JSON.parse(clickParamsStrData);
    const userData = localStorage.getItem('userData') || '[]';
    const userDataJson = JSON.parse(userData);
    for (let i = 0; i < clickParamsData.length; i++) {
      for (let j = 0; j < userDataJson.length; j++) {
        if (userDataJson[j].id === clickParamsData[i].id) {
          const modifyData = userDataJson[j];
          if (!clickParamsData[i].config) {
            continue;
          }
          const keys = Object.keys(clickParamsData[i].config); //获取所有修改的值
          keys.map(val => (modifyData.item.config[val] = clickParamsData[i].config[val]));
          dispatch({
            type: 'editorModal/modPointData',
            payload: {
              id: modifyData.id,
              item: modifyData.item,
              point: modifyData.point,
              status: 'inToCanvas',
            },
          });
          dispatch({
            type: 'previewModal/modPointData',
            payload: {
              id: modifyData.id,
              item: modifyData.item,
              point: modifyData.point,
              status: 'inToCanvas',
            },
          });
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export default onClick;
