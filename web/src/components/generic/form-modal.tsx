import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { FC } from 'react';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Conditional } from './conditional';
import { LoadingSpinner } from './spinner';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  description: string;
  buttonLabel: string;
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  isLoading?: boolean;
  submitDisabled?: boolean;
}

export const FormModal: FC<Props> = ({
  children,
  isOpen,
  setIsOpen,
  title,
  description,
  buttonLabel,
  form,
  onSubmit,
  isLoading = false,
  submitDisabled = false
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={isOpen}>
      <DialogContent className="sm:max-w-[720px]">
        <DialogHeader>
          <DialogTitle className="text-zinc-200 text-4xl font-normal">
            {title}
          </DialogTitle>
          <DialogDescription className="text-zinc-200 text-base font-normal">
            {description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            {children}
            <DialogFooter className="mt-8">
              <Button
                variant="secondary"
                type="submit"
                disabled={isLoading || submitDisabled}
                className={isLoading ? 'gap-1' : ''}
              >
                <Conditional condition={isLoading}>
                  <LoadingSpinner size={24} color="gray" />
                </Conditional>
                {buttonLabel}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
