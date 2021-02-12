import { Transition } from "@headlessui/react";

interface Props {
  onClose: () => void;
}

export const BackdropModal = ({ onClose }: Props) => {
  return (
    <div>
      <Transition.Child
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="absolute inset-0 bg-black z-0 back-blur bg-opacity-50 transition-opacity"
          // Close the sidebar when clicking on the backdrop
          onClick={onClose}
        />
      </Transition.Child>
    </div>
  );
};

export default BackdropModal;
