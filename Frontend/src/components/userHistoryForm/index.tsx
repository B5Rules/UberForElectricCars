import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import * as yup from 'yup';
import { TextAreaField } from 'components/form/TextArea';
import NavigationButtons from 'components/formContainer/NavigationButtons';
import { useNavigate } from 'react-router-dom';
import mapValues from 'lodash/mapValues';
import { UserHistoryType } from 'types/user-history';
import useStore from 'store';
import getQuestions from 'services/api/questions';
import type { QuestionType } from 'types/departments';

import styles from './UserHistoryForm.module.css';

const isRequired = 'Camp obligatoriu';

/**
 * Don't change here. This is to have some data before we fetch from backend!
 */
const emptyQuestions: Array<QuestionType> = [
  {
    id: 1,
    name: 'Loading...',
    type: 'input',
  },
  {
    id: 2,
    name: 'Loading...',
    type: 'input',
  },
  {
    id: 3,
    name: 'Loading...',
    type: 'input',
  },
  {
    id: 4,
    name: 'Loading...',
    type: 'input',
  },
];

const UserHistoryForm = () => {
  const navigate = useNavigate();
  const setUserHistory = useStore((state) => state.setUserHistory);
  const userHistory = useStore((state) => state.userHistory);
  const setStepper = useStore((state) => state.setStepper);
  const INITIAL_VALUES: UserHistoryType = {};

  const [questions, setQuestion] = useState<Array<QuestionType>>(emptyQuestions);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data: response } = await getQuestions('PERSONAL');
        setQuestion(response);
      } catch (error: any) {
        // TODO: show toast
        console.error(error.message);
      }
    };
    fetchQuestions();
  }, []);
  const validationSchema = yup.object();

  useEffect(() => {
    questions.forEach(({ id }) => {
      INITIAL_VALUES[`id${id}`] = '';
    });
    // eslint-disable-next-line no-console
    console.log(questions);
    // eslint-disable-next-line no-console
    console.log(INITIAL_VALUES);
    // validationSchema = yup.lazy((obj) => yup.object(
    //   mapValues(obj, () => object({
    //     a: yup.string(),
    //     b: yup.number(),
    //   })),
    // ));
  }, [questions]);
  // eslint-disable-next-line no-console
  console.log('Validation', validationSchema);
  return (
    <div className={styles.container}>
      <Formik
        initialValues={userHistory || INITIAL_VALUES}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // eslint-disable-next-line no-console
          console.log('submit');
          setUserHistory(values);
          setStepper(2);
          navigate('/department');
        }}
      >
        <Form className={styles.center}>
          <div className={cx(styles.center, styles.inputContainer)}>
            {questions.map((question: QuestionType) => (
              <TextAreaField
                className={styles.input}
                label={question.name}
                name={`id${question.id}`}
                key={`id${question.id}`}
              />
            ))}
          </div>
          <NavigationButtons
            isNextButton
            isPrevButton
            onClickPrev={() => { setStepper(0); navigate('/'); }}
          />
        </Form>
      </Formik>
    </div>
  );
};
export default UserHistoryForm;
