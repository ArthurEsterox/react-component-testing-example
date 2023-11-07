import { useState } from 'react';

import { Button, Checkbox, Loader, Switch } from '../components';

import styles from './App.module.scss';

const App = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);

  return (
    <div className={styles['app']}>
      <div className={styles['app__content']}>
        <Button>
          BUTTON
        </Button>

        <Loader />

        <Checkbox value={isChecked} onChange={setIsChecked} label="Check box" />

        <Switch value={isSwitched} onChange={setIsSwitched} label="Switch" />
      </div>
    </div>
  );
};

export default App;
