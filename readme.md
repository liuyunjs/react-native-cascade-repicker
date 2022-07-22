# react-native-cascade-repicker
基于 react-native-repicker 封装的级联选择器


## 示例
```typescript jsx
import React from 'react';
import { SafeAreaView, StatusBar, Button, useColorScheme } from 'react-native';
import {
  CascadePickerView,
  CascadePicker,
  resolveSelected,
} from 'react-native-cascade-repicker';
import area from 'react-native-cascade-repicker/area.json';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [selected, setSelected] = React.useState<number[]>([]);
  console.log(selected, resolveSelected(area, selected));
  return (
    <SafeAreaView style={{ backgroundColor: '#foo', flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CascadePickerView
        onSelected={setSelected}
        selected={selected}
        data={area}
      />
      <Button
        onPress={() => {
          CascadePicker.show({
            title: '请选择地区',
            data: area,
            selected,
            onSelected(sel: number[]) {
              setSelected(sel);
              console.log('modality', sel, resolveSelected(area, sel));
            },
            indicatorColor: '#ccc',
          });
        }}
        title="show"
      />
    </SafeAreaView>
  );
};
```
