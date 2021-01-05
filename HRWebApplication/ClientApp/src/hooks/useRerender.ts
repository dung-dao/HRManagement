import React from 'react';

export function useRerender() {
  const [, forceRerender] = React.useReducer((x) => ++x, 0);
  return forceRerender;
}
