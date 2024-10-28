import '@testing-library/jest-dom'; // Import jest-dom matchers
import { fireEvent, render, screen } from '@testing-library/react';
import React, { ReactElement, ReactNode, useState } from 'react';
import { LoaderProvider, useLoading } from '../src';

describe('useLoading', () => {
  test('renders element passed in', () => {
    const TestComponent = () => {
      const [loading, setLoading] = useState(false);
      const { containerProps, indicatorEl } = useLoading({
        loading,
        indicator: <p>loader</p>,
      });
      return (
        <div>
          <button onClick={() => setLoading(!loading)}>Toggle Loading</button>
          <div {...containerProps}>{indicatorEl}</div>
        </div>
      );
    };

    render(<TestComponent />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Toggle Loading');
    expect(screen.queryByText('loader')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Toggle Loading');
    expect(screen.getByText('loader')).toBeInTheDocument();
  });

  test('renders element from context if no element passed in', () => {
    const WrapperComponent = ({ children }: { children: ReactNode }) => (
      <LoaderProvider indicator={<span>context loader</span>}>
        {children}
      </LoaderProvider>
    );

    const TestComponent = ({ indicator }: { indicator?: ReactElement }) => {
      const { indicatorEl } = useLoading({
        loading: true,
        indicator,
      });
      return <>{indicatorEl}</>;
    };

    render(
      <WrapperComponent>
        <TestComponent />
      </WrapperComponent>
    );

    expect(screen.getByText('context loader')).toBeInTheDocument();

    render(
      <WrapperComponent>
        <TestComponent indicator={<p>custom loader</p>} />
      </WrapperComponent>
    );

    expect(screen.getByText('custom loader')).toBeInTheDocument();
  });
});
