import { useState } from 'react';

import { Button, Checkbox, Loader, Switch, Select } from '../components';

import styles from './App.module.scss';

const App = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);
  const [selectValue, setSelectValue] = useState(null);

  return (
    <div className={styles['app']}>
      <div className={styles['app__content']}>
        <Button>
          BUTTON
        </Button>

        <Loader />

        <Checkbox value={isChecked} onChange={setIsChecked} label="Check box" />

        <Switch value={isSwitched} onChange={setIsSwitched} label="Switch" />

        <div style={{ width: '200px' }}>
          <Select
            id="select"
            value={selectValue}
            onChange={setSelectValue}
            placeholder="Select"
            options={[{ key: 'option1', label: 'Option 1' }, { key: 'option2', label: 'Option 2', disabled: true }, { key: 'option3', label: 'Option 3' }, { key: 'option4', label: 'Option 4' }, { key: 'option5', label: 'Option 5' }]}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
