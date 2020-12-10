/*
 * @Description:
 * @Version: 2.0
 * @Autor: dragon
 * @Date: 2020-09-24 10:11:24
 * @LastEditors: dragon
 * @LastEditTime: 2020-10-08 16:12:26
 */
import { uuid } from '@/utils/tool';
const pointData = localStorage.getItem('userData') || '[]';
// interface PointDataItem {
//   id: string;
//   item: Record<string, any>;
//   point: Record<string, any>;
// }

function overSave(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
  const previewdata = data.map(item => ({
    ...item,
    point: { ...item.point, isDraggable: false, static: true, isResizable: false },
  }));
  localStorage.setItem('userPreviewData', JSON.stringify(previewdata));
}

export default {
  namespace: 'editorModal',
  state: {
    pointData: JSON.parse(pointData),
    curPoint: null,
  },
  reducers: {
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
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {});
    },
  },
};
