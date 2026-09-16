import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
open: boolean;
title: string;
children: ReactNode;
onClose: () => void;
}

export default function Modal({
open,
title,
children,
onClose,
}: ModalProps) {
if (!open) {
return null;
}

return (
<div
className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
onMouseDown={(event) => {
if (event.target === event.currentTarget) {
onClose();
}
}}
>
<div
className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white shadow-2xl"
onMouseDown={(event) => {
event.stopPropagation();
}}
>
<div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-5">
<h2 className="text-xl font-bold text-slate-800">
{title}
</h2>

      <button
        type="button"
        onClick={onClose}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        aria-label="Fechar"
      >
        <X size={20} />
      </button>
    </div>

    <div className="p-6">
      {children}
    </div>
  </div>
</div>

);
}
