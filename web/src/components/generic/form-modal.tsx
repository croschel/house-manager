import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC } from "react";
import { Button } from "../ui/button";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  description: string;
  buttonLabel: string;
}

export const FormModal: FC<Props> = ({
  children,
  isOpen,
  setIsOpen,
  title,
  description,
  buttonLabel,
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
        {children}
        <DialogFooter className="mt-8">
          <Button variant="secondary" type="submit">
            {buttonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
