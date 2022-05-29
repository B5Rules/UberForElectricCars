import { Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ExampleComponent.module.css';

const ExampleComponent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Hello world</h1>
    </div>
  );
};
export default ExampleComponent;
