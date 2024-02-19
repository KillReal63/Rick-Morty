import { FC, PropsWithChildren, useEffect } from "react";
import ModalOverlay from "./ModalOverlay";
import { createPortal } from "react-dom";

type Props = {
  onClose: (open: boolean) => void;
  open: boolean;
};

const Modal: FC<PropsWithChildren<Props>> = ({ open, onClose, children }) => {
  useEffect(() => {
    const closeByEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [open, onClose]);

  return createPortal(
    <>
      <ModalOverlay onClick={() => onClose(false)} />
      <div className="w-[600px] h-auto fixed left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] bg-modal z-[1000]">
        {children}
      </div>
      ;
    </>,
    document.body
  );
};

export default Modal;
