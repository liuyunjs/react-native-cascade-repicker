import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { PickerViewCustom } from 'react-native-repicker';
import type { PickerViewCustomProps } from 'react-native-repicker/dist/PickerViewCustom';
import { useReactionState } from '@liuyunjs/hooks/lib/useReactionState';

export type Item = {
  value: string | number;
  label: string | number;
  children?: (Item | string | number)[];
};

type CascadePickerViewInternalProps = Omit<
  PickerViewCustomProps,
  'data' | 'onSelected' | 'onChange' | 'selected'
> & {
  onSelected: (index: number, selected: number) => void;
  selected: number[];
  data: (Item | string | number)[];
  index: number;
};

export type CascadePickerViewProps = Omit<
  PickerViewCustomProps,
  'data' | 'onSelected' | 'onChange' | 'selected'
> & {
  onSelected?: (selected: number[]) => void;
  selected?: number[];
  data: Item[];
};

const CascadePickerViewInternal: React.FC<CascadePickerViewInternalProps> = ({
  onSelected,
  selected,
  index,
  data,
  ...rest
}) => {
  const currentSelected = selected[index] || 0;

  const selectedItem = data[currentSelected];

  if (selectedItem == null) {
    return null;
  }

  const handleSelected = (selectedIndex: number) => {
    onSelected(index, selectedIndex);
  };

  return (
    <>
      <View style={styles.item}>
        <PickerViewCustom
          {...rest}
          data={data}
          onSelected={handleSelected}
          selected={currentSelected}
        />
      </View>
      {typeof selectedItem === 'object' && !!selectedItem.children && (
        <CascadePickerViewInternal
          {...rest}
          data={selectedItem.children}
          onSelected={onSelected}
          selected={selected}
          index={index + 1}
        />
      )}
    </>
  );
};

export const CascadePickerView: React.FC<CascadePickerViewProps> = ({
  onSelected,
  selected: selectedProp,
  ...rest
}) => {
  const [selected, setSelected] = useReactionState(selectedProp!);

  const handleSelected = (index: number, selectedIndex: number) => {
    const len = selected.length;
    const newSelected: number[] = new Array(Math.max(index + 1, len)).fill(0);

    for (let i = 0; i < Math.min(len, index); i++) {
      newSelected[i] = selected[i];
    }
    newSelected[index] = selectedIndex;
    setSelected(newSelected);
    onSelected?.(newSelected);
  };

  return (
    <View style={styles.container}>
      <CascadePickerViewInternal
        {...rest}
        selected={selected}
        onSelected={handleSelected}
        index={0}
      />
    </View>
  );
};

CascadePickerView.defaultProps = {
  selected: [],
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
  },
});
