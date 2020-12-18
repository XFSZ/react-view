import { uuid } from '@/utils/tool';
//const pointData = localStorage.getItem('userData') || '[]';

import localForage from 'localforage';
localForage.setDriver(localForage.INDEXEDDB);

function overSave(name, data) {
  localForage.setItem(name, JSON.stringify(data));
  const previewdata = data.map(item => ({
    ...item,
    point: { ...item.point, isDraggable: false, static: true, isResizable: false },
  }));
  localForage.setItem('userPreviewData', JSON.stringify(previewdata));
}

export default {
  namespace: 'editorModal',
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
    addPointData(state, { payload }) {
      let pointData = [...state.pointData, payload];

      overSave('userData', pointData);
      return {
        ...state,
        pointData,
        curPoint: payload,
      };
    },
    modPointData(state, { payload }) {
      const { id } = payload;

      const pointData = state.pointData.map(item => {
        if (item.id === id) {
          return payload;
        }
        return { ...item };
      });
      overSave('userData', pointData);
      return {
        ...state,
        pointData,
        curPoint: payload,
      };
    },
    importTplData(state, { payload }) {
      overSave('userData', payload);
      return {
        ...state,
        pointData: payload,
        curPoint: null,
      };
    },
    copyPointData(state, { payload }) {
      const { id } = payload;
      if (id !== '0') {
        const pointData = [];
        state.pointData.forEach(item => {
          pointData.push({ ...item });
          if (item.id === id) {
            let uid = uuid(6, 10);
            pointData.push({
              ...item,
              id: uid,
              item: { ...item.item, config: { ...item.item.config, id: uid } },
            });
          }
        });
        overSave('userData', pointData);

        return {
          ...state,
          pointData,
        };
      }
    },
    nullPointData(state) {
      const pointData = state.pointData;
      return {
        ...state,
        pointData,
        curPoint: state.pointData[0],
      };
    },
    delPointData(state, { payload }) {
      const { id } = payload;
      if (id !== '0') {
        const pointData = state.pointData.filter(item => item.id !== id);
        overSave('userData', pointData);
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
    clearAll(state) {
      overSave('userData', []);
      return {
        ...state,
        pointData: [],
        curPoint: null,
      };
    },
  },
  effects: {
    *queryData(_, { call, put, select }) {
      const puzzle = yield localForage.getItem('userData');
      yield put({ type: 'initState', payload: JSON.parse(puzzle) });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {});
    },
  },
};
