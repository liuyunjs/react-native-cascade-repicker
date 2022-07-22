import type { Item } from './CascadePickerView';

const resolveSelectedInternal = (
  data: (Item | string | number)[],
  selected: number[],
  values: (string | number)[] = [],
): (string | number)[] => {
  const currIndex = selected[0] || 0;

  const selectedItem = data[currIndex];
  if (selectedItem != null) {
    if (typeof selectedItem === 'object') {
      values.push(selectedItem.value);
      if (selectedItem.children) {
        return resolveSelectedInternal(
          selectedItem.children,
          selected.slice(1),
          values,
        );
      }
    } else {
      values.push(selectedItem);
    }
  }
  return values;
};

export const resolveSelected = (data: Item[], selected: number[]) =>
  resolveSelectedInternal(data, selected);
