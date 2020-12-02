import BasicSchema from './BasicComponents/schema';
import MediaSchema from './MediaComponents/schema';
import VisualSchema from './VisualComponents/schema';
import BasicPanelSchema from './BasicPanel/schema';

const schema = {
  ...BasicSchema,
  //  ...MediaSchema,
  ...VisualSchema,
  ...BasicPanelSchema,
};

export default schema;
