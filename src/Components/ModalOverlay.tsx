import { HTMLProps } from "react";

const ModalOverlay = (props: HTMLProps<HTMLDivElement>) => {
  return <div className="fixed inset-0 bg-modal_overlay z-[999]" {...props} />;
};

export default ModalOverlay;
