import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export default function ModalDialog({
  openModal,
  setOpenModal,
  title,
  description,
  children,
  className,
}: Props) {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent
        aria-describedby={description ? undefined : ""}
        className={`sm:max-w-[425px] ${className ?? ""}`}
      >
        <DialogHeader>
          {title ? (
            <DialogTitle className="xl:text-2xl">{title}</DialogTitle>
          ) : (
            <VisuallyHidden>
              <DialogTitle>Dialog</DialogTitle>
            </VisuallyHidden>
          )}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
