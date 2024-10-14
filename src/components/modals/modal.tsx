import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface CustomModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export const CustomModal = (props: CustomModalProps) => {
  const { title, children, onSubmit, onClose, disabled = false } = props;

  return (
    <dialog id="my_modal_4" className="modal modal-open">
      <div className="modal-box w-6/12 max-w-5xl">
        <div className="flex justify-between items-center pb-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <IoClose onClick={onClose} className="text-2xl cursor-pointer hover:bg-neutral rounded-full" />
        </div>
        {children}
        <div className="modal-action">
          <button disabled={disabled} onClick={onSubmit} className="btn">
            Enregistrer
          </button>
        </div>
      </div>
    </dialog>
  );
};
