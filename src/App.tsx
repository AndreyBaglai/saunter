import React from 'react';
import 'antd/dist/antd.css';

import Header from 'components/Header/Header';
import Main from 'components/Main/Main';
import FormModal from 'components/Form/FormModal';

import styles from 'App.module.scss';

const App = () => {
  return (
    <div className={`container-fluid ${styles.app}`}>
      <Header />
      <Main />
      <FormModal />
    </div>
  );
};

export default App;
