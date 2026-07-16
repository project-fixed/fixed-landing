import React from 'react';

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
  paddingTop?: string;
}

export const SecondaryPageLayout: React.FC<Props> = ({
  title,
  description,
  children,
  paddingTop = 'pt-28',
}) => {
  return (
    <section
      className={`container mx-auto flex w-full flex-col items-center justify-center px-4 ${paddingTop} pb-16 sm:px-6 lg:px-8`}
    >
      <div className="mx-auto mb-12 w-full max-w-[700px] text-center">
        <h1 className="mb-6 text-5xl leading-tight font-extrabold text-white">
          {title}
        </h1>
        <p className="text-text-muted mx-auto max-w-[600px] text-base leading-relaxed">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
};
