import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-zinc-700 text-zinc-200 hover:bg-zinc-700/80',
        destructive: 'bg-destructive text-zinc-200 hover:bg-destructive/90',
        creation: 'bg-green-600 text-zinc-200 hover:bg-green-600/90',
        outline:
          'border border-zinc-600 bg-transparent text-zinc-200 hover:opacity-90 hover:text-zinc-200/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'border border-transparent hover:bg-trasparent hover:border hover:border-zinc-600',
        link: 'text-primary underline-offset-4 hover:underline',
        navMenu: 'text-zinc-200 underline-offset-4 hover:text-zinc-200/80',
        icon: 'bg-transparent text-zinc-200 hover:text-zinc-200/80 p-0 h-auto'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-auto w-auto'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
