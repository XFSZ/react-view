// import Chart from './Chart/template';
// import Line from './Line/template';
// import Pie from './Pie/template';
// import Area from './Area/template';
// import XProgress from './XProgress/template';
import EChart from './EChart/template';
import EPie from './EPie/template';
import EDoubleLine from './EDoubleLine/template';
import ESinglePie from './ESinglePie/template';
import ERadar from './ERadar/template';
import EMultiLine from './EMultiLine/template';
import EDualAxes from './EDualAxes/template';
import EColumn from './EColumn/template';
import EMultiLine2 from './EMultiLine2/template';
import EHorizontalBar from './EHorizontalBar/template';
const visualTemplate = [
  EChart,
  EPie,
  EDoubleLine,
  ESinglePie,
  ERadar,
  EMultiLine,
  EDualAxes,
  EColumn,
  EMultiLine2,
  EHorizontalBar,
];
// const visualTemplate = [Chart, Line, Pie, Area, XProgress, EChart];
const VisualTemplate = visualTemplate.map(v => {
  return { ...v, category: 'visual' };
});
export default VisualTemplate;
