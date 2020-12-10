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

          try {
            dispatch({
              type: 'editorModal/modPointData',
              payload: {
                id: modifyData.id,
                item: modifyData.item,
                point: modifyData.point,
                status: 'inToCanvas',
              },
            });
          } catch (e) {}
          try {
            // const previewdata = modifyData.map(item => ({
            //   ...item,
            //   point: { ...item.point, isDraggable: false, static: true, isResizable: false },
            // }));

            const previewdata = {
              point: { ...modifyData.point, isDraggable: false, static: true, isResizable: false },
            };
            //    console.log("previewdata : ",previewdata)
            dispatch({
              type: 'previewModal/modPointData',
              payload: {
                id: modifyData.id,
                item: modifyData.item,
                point: previewdata,
                status: 'inToCanvas',
              },
            });
          } catch (e) {}
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export default onClick;
