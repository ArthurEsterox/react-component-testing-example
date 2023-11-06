import { useState } from 'react';

import { Button, Checkbox, Loader } from '../components';

import styles from './App.module.scss';

const App = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChangeChecked = (value: boolean) => {
    setIsChecked(value);
  };

  return (
    <div className={styles['app']}>
      <div className={styles['app__content']}>
        <Button>
          BUTTON
        </Button>

        <Loader />

        <Checkbox value={isChecked} onChange={handleChangeChecked} label="Check box" />
      </div>
    </div>
  );
};

export default App;
