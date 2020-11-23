import Panel from './Panel/template';

const basicPanelTemplate = [Panel];
const BasicPanelTemplate = basicPanelTemplate.map(v => {
  return { ...v, category: 'basePanel' };
});

export default BasicPanelTemplate;