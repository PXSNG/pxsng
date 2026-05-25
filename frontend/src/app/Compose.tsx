import { ComponentType, ReactNode } from 'react';

interface ComposeProps {
  components: ComponentType<{ children: ReactNode }>[];
  children: ReactNode;
}

const Compose = ({ components, children }: ComposeProps) => {
  return (
    <>
      {components.reduceRight(
        (acc, Component) => (
          <Component>{acc}</Component>
        ),
        children,
      )}
    </>
  );
};

export default Compose;
