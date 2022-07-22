import { darkly } from 'rn-darkly';
import { withPicker } from 'react-native-repicker';
import { CascadePickerView as CascadePickerViewInternal } from './CascadePickerView';
export { resolveSelected } from './resolveSelected';
export type { CascadePickerViewProps } from './CascadePickerView';

export const CascadePickerView = darkly(
  CascadePickerViewInternal,
  'overlayColor',
  'indicatorColor',
  'itemColor',
);

export const CascadePicker = withPicker(CascadePickerViewInternal);

export { CascadePickerViewInternal };
