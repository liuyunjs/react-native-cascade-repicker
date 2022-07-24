import type { Item } from './CascadePickerView';

const resolveIndexesToValuesInternal = (
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
        return resolveIndexesToValuesInternal(
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

export const resolveIndexesToValues = (data: Item[], selected: number[]) =>
  resolveIndexesToValuesInternal(data, selected);

const resolveValuesToIndexesInternal = (
  data: (Item | string | number)[],
  values: (string | number)[],
  indexes: number[] = [],
): number[] => {
  const currValue = values.length
    ? values[0]
    : typeof data[0] === 'object'
    ? data[0].value
    : data[0];

  const selectedIndex = data.findIndex(
    (item) => item === currValue || (item as Item).value === currValue,
  );
  if (selectedIndex !== -1) {
    indexes.push(selectedIndex);
    const selectedItem = data[selectedIndex];
    if (typeof selectedItem === 'object' && selectedItem.children) {
      return resolveValuesToIndexesInternal(
        selectedItem.children,
        values.slice(1),
        indexes,
      );
    }
  }
  return indexes;
};

export const resolveValuesToIndexes = (
  data: Item[],
  values: (string | number)[],
) => resolveValuesToIndexesInternal(data, values);
