import { Suspense } from "react";

const lazyLoaded = (WrappedComponent) => {
  function LazyLoaded(props) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  }

  return LazyLoaded;
};

export default lazyLoaded;
