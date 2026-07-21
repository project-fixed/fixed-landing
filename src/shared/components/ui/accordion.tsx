/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

import { cn } from '@/lib/utils';
import { Plus, Minus } from 'lucide-react';

function Accordion({ className, ...props }: any) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn('flex w-full flex-col', className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b border-white/5 py-1', className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group/accordion-trigger relative flex flex-1 cursor-pointer items-center justify-between py-5 text-left font-mono text-sm font-semibold text-white/50 transition-colors duration-200 outline-none hover:text-white aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-expanded:text-white md:text-base',
          className,
        )}
        {...props}
      >
        <span className="flex items-center gap-3">
          <span className="group-aria-expanded/accordion-trigger:text-primary-light font-mono text-xs text-white/20 transition-colors duration-200 select-none group-hover:text-white/45">
            &gt;
          </span>
          <span>{children}</span>
        </span>
        <Plus
          data-slot="accordion-trigger-icon"
          className="pointer-events-none size-4 shrink-0 text-white/20 transition-transform duration-200 group-hover:text-white/45 group-aria-expanded/accordion-trigger:hidden"
        />
        <Minus
          data-slot="accordion-trigger-icon"
          className="text-primary-light pointer-events-none hidden size-4 shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:inline"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="data-open:animate-accordion-down data-closed:animate-accordion-up overflow-hidden text-sm"
      {...props}
    >
      <div
        className={cn(
          'text-body h-(--accordion-panel-height) pt-1 pr-6 pb-6 pl-6 font-sans text-sm leading-relaxed transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0',
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
