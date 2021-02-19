import { Transition } from "@headlessui/react";
import { useEffect, useRef } from "react";

interface Props {
  onClose: () => void;
}

export const BackdropModal = ({ onClose }: Props) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (ref.current) {
      if (document) {
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
      }
    }

    return () => {
      onClose();
      document.getElementsByTagName("body")[0].style.removeProperty("overflow");
    };
  }, [onClose, ref]);

  return (
    <Transition.Child
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="absolute inset-0 z-0 bg-backdrop bg-opacity-50 min-h-full  "
        // Close the sidebar when clicking on the backdrop
        onClick={onClose}
        ref={ref}
      />
    </Transition.Child>
  );
};

export default BackdropModal;
