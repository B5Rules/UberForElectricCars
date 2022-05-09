import { useEffect } from 'react';

const withTopScroll = (WrappedComponent: React.FC) => () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <WrappedComponent />;
};

export default withTopScroll;
