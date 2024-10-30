import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { Button } from '../ui/button';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  description: string;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit: () => void;
}

export const ConfirmationModal: FC<Props> = ({
  isOpen,
  setIsOpen,
  title,
  description,
  submitLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onSubmit
}) => {
  const handleSubmmit = () => {
    setIsOpen(false);
    onSubmit();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={isOpen}>
      <DialogContent className="sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle className="text-zinc-200 text-lg font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-sm font-normal">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-8">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {cancelLabel}
          </Button>
          <Button variant="secondary" onClick={handleSubmmit}>
            {submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
