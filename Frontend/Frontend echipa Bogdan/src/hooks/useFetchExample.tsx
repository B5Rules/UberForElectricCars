import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import getExample from 'services/api/example';

const useFetchExample = () => {
  const { values }: {values: any} = useFormikContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExample = async (dep: string) => {
      try {
        const { data: response } = await getExample();
        setLoading(false);
      } catch (error: any) {
        // TODO: show toast
        console.error(error.message);
      }
    };

      fetchExample(values.department);
  }, [values]);

  return { loading };
};

export default useFetchExample;
