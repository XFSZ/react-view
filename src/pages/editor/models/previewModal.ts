/*
 * @Description:
 * @Version: 2.0
 * @Autor: dragon
 * @Date: 2020-09-24 10:11:24
 * @LastEditors: dragon
 * @LastEditTime: 2020-10-08 16:12:26
 */
import { uuid } from '@/utils/tool';
import localForage from 'localforage';
localForage.setDriver(localForage.INDEXEDDB);
// localForage.config({
//   driver: localForage.INDEXEDDB,
//   name: 'userPreviewData'
// });

// const pointData = localStorage.getItem('userPreviewData') || '[]';
//const pointData =  localForage.getItem('userPreviewData').then( result =>{ return result as unknown as string}) ? '[]' : '[]';

// function overSave(name: string, data: any) {
//   localStorage.setItem(name, JSON.stringify(data));
// }
function overSave(name: string, data: any) {
  localForage.setItem(name, JSON.stringify(data));
}
export default {
  namespace: 'previewModal',
  state: {
    pointData: [],
    curPoint: null,
  },
  reducers: {
    initState(state, { payload }) {
      return {
        ...state,
        pointData: payload,
      };
    },
    addPointData(state: any, { payload }: any) {
      let pointData = [...state.pointData, payload];

      overSave('userPreviewData', pointData);
      return {
        ...state,
        pointData,
        curPoint: payload,
      };
    },
    modPointData(state: any, { payload }: any) {
      const { id } = payload;
      const pointData = state.pointData.map((item: any) => {
        if (item.id === id) {
          return payload;
        }
        return { ...item };
      });
      overSave('userPreviewData', pointData);
      return {
        ...state,
        pointData,
        curPoint: payload,
      };
    },
    importTplData(state: any, { payload }: any) {
      overSave('userPreviewData', payload);
      return {
        ...state,
        pointData: payload,
        curPoint: null,
      };
    },
    copyPointData(state: any, { payload }: any) {
      const { id } = payload;
      const pointData: any[] = [];
      state.pointData.forEach((item: any) => {
        pointData.push({ ...item });
        if (item.id === id) {
          pointData.push({ ...item, id: uuid(6, 10) });
        }
      });
      overSave('userPreviewData', pointData);

      return {
        ...state,
        pointData,
      };
    },
    nullPointData(state: any) {
      const pointData = state.pointData;
      return {
        ...state,
        pointData,
        curPoint: state.pointData[0],
      };
    },
    delPointData(state: any, { payload }: any) {
      const { id } = payload;
      if (id !== '0') {
        const pointData = state.pointData.filter((item: any) => item.id !== id);
        overSave('userPreviewData', pointData);
        return {
          ...state,
          pointData,
          curPoint: state.pointData[0],
        };
      }
      return {
        ...state,
        pointData: state.pointData,
        curPoint: state.pointData[0],
      };
    },
    clearAll(state: any) {
      overSave('userPreviewData', []);
      return {
        ...state,
        pointData: [],
        curPoint: null,
      };
    },
  },
  effects: {
    *queryData(_: any, { call, put, select }) {
      const puzzle = yield localForage.getItem('userPreviewData');
      yield put({ type: 'initState', payload: JSON.parse(puzzle) });
      //  yield console.log(puzzle);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {});
    },
  },
};
