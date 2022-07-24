/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, Button, useColorScheme } from 'react-native';
import {
  CascadePickerView,
  CascadePicker,
  resolveIndexesToValues,
  resolveValuesToIndexes,
} from './library/main';
import area from './area.json';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [selected, setSelected] = React.useState<number[]>([]);
  console.log(
    selected,
    resolveIndexesToValues(area, selected),
    resolveValuesToIndexes(area, []),
  );
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
              console.log('modality', sel, resolveIndexesToValues(area, sel));
            },
            indicatorColor: '#ccc',
          });
        }}
        title="show"
      />
    </SafeAreaView>
  );
};

export default App;
