import { Dispatch } from 'umi';
import localForage from 'localforage';
const onClick = (clickParams: string, dispatch: Dispatch) => {
  try {
    let clickParamsStrData = '[{}]';
    if (clickParams !== '') {
      const clickParamsStrDatatoJson = eval('(' + clickParams + ')');
      clickParamsStrData = JSON.stringify(clickParamsStrDatatoJson);
    }
    const clickParamsData = JSON.parse(clickParamsStrData);
    // const userData = localStorage.getItem('userData') || '[]';
    localForage.getItem('userData').then(value => {
      const userData = value || '[]';
      const userDataJson = JSON.parse(userData as string);
      //  const previewDatas = [];
      for (let i = 0; i < clickParamsData.length; i++) {
        for (let j = 0; j < userDataJson.length; j++) {
          if (userDataJson[j].id === clickParamsData[i].id) {
            if (!clickParamsData[i].config) {
              continue;
            }
            //获取并修改 所有修改的值
            Object.keys(clickParamsData[i].config).map(
              val => (userDataJson[j].item.config[val] = clickParamsData[i].config[val]),
            );
            // previewDatas.push(userDataJson[j])
          }
        }
      }
      try {
        dispatch({
          type: 'editorModal/batchModifyPointData',
          payload: userDataJson,
        });
      } catch (e) {
        console.warn(e);
      }
      try {
        // console.log(previewDatas)
        const previewdata = userDataJson.map((item: any) => ({
          ...item,
          point: { ...item.point, isDraggable: false, static: true, isResizable: false },
        }));
        dispatch({
          type: 'previewModal/batchModifyPointData',
          payload: previewdata,
        });
      } catch (e) {
        console.warn(e);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export default onClick;
