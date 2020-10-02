import { ReactNode } from 'react';

import { useLoaderContext } from './LoaderContext';

interface Props {
  loading?: boolean;
  indicator?: ReactNode;
}

export function useLoading({ loading = false, indicator }: Props) {
  const containerProps = {
    'aria-busy': loading,
    'aria-live': 'polite' as "off" | "assertive" | "polite" | undefined,
  };

  const loaderContext = useLoaderContext();
  const indicatorEl = indicator ?? loaderContext?.indicator;

  return {
    containerProps,
    indicatorEl: loading ? indicatorEl : null,
  }
}