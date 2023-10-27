import { Button, Loader } from '../components';

import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles['app']}>
      <div className={styles['app__content']}>
        <Button>
          BUTTON
        </Button>

        <Loader />
      </div>
    </div>
  );
};

export default App;
