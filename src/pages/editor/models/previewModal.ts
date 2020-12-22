import { uuid } from '@/utils/tool';
import localForage from 'localforage';
localForage.setDriver(localForage.INDEXEDDB);

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
      console.log(pointData);
      overSave('userPreviewData', pointData);
      return {
        ...state,
        pointData,
        curPoint: payload,
      };
    },
    batchModifyPointData(state: any, { payload }: any) {
      console.log(payload);
      //   console.log(state)
      overSave('userPreviewData', payload);
      return {
        ...state,
        pointData: payload,
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
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {});
    },
  },
};
