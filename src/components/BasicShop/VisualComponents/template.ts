// import Chart from './Chart/template';
// import Line from './Line/template';
// import Pie from './Pie/template';
// import Area from './Area/template';
// import XProgress from './XProgress/template';
import EChart from './EChart/template';
import EPie from './EPie/template';
const visualTemplate = [EChart, EPie];
// const visualTemplate = [Chart, Line, Pie, Area, XProgress, EChart];
const VisualTemplate = visualTemplate.map(v => {
  return { ...v, category: 'visual' };
});
export default VisualTemplate;
