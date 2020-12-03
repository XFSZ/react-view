import { Dispatch } from 'umi';

const onClick = (clickParams: string, dispatch: Dispatch) => {
  try {
    let clickParamsStrData = '[{}]';
    if (clickParams !== '') {
      //  clickParamsStrData = JSON.stringify(clickParams);
      const clickParamsStrDatatoJson = eval('(' + clickParams + ')');
      clickParamsStrData = JSON.stringify(clickParamsStrDatatoJson);
    }
    console.log('origin : ', clickParamsStrData);
    const clickParamsData = JSON.parse(clickParamsStrData);
    console.log('parse : ', clickParamsData);
    const userData = localStorage.getItem('userData') || '[]';
    const userDataJson = JSON.parse(userData);
    for (let i = 0; i < clickParamsData.length; i++) {
      console.log(' 1 ');
      for (let j = 0; j < userDataJson.length; j++) {
        console.log(' 2 ');
        if (userDataJson[j].id === clickParamsData[i].id) {
          console.log(' 3 ');
          const modifyData = userDataJson[j];
          if (!clickParamsData[i].config) {
            console.log(' 4 ');
            continue;
          }

          const keys = Object.keys(clickParamsData[i].config); //获取所有修改的值
          keys.map(val => (modifyData.item.config[val] = clickParamsData[i].config[val]));
          console.log('modifyData : ', modifyData);
          dispatch({
            type: 'editorModal/modPointData',
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
