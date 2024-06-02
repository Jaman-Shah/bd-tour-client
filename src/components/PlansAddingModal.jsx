import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";

export default function PlansAddingModal({
  plans,
  setPlans,
  isPlanModalOpen,
  setIsPlanModalOpen,
}) {
  const handlePlanSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const details = form.details.value;
    const plan = { title, details };
    setPlans([...plans, plan]);
    form.reset();
    console.log(title, details);
  };

  const closeModal = () => {
    setIsPlanModalOpen(false);
  };
  return (
    <>
      <Transition appear show={isPlanModalOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
          __demoMode
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-blue-500 p-6 backdrop-blur-2xl">
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-black"
                  >
                    Add Plans {`${plans.length}`}
                  </DialogTitle>

                  {/* -----------main works starts ---------- */}
                  <form onSubmit={handlePlanSubmit} className="flex flex-col">
                    <div>
                      <p>Plan Title</p>
                      <input
                        type="text"
                        name="title"
                        className="h-12 border border-black mb-4 px-4 py-2 w-full"
                        required
                      />
                    </div>
                    <div>
                      <p>Plan Details</p>
                      <textarea
                        name="details"
                        type="text"
                        className="h-12 border border-black mb-4 px-4 py-2 w-full"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="rounded-full border border-black p-2"
                    >
                      Add
                    </button>
                  </form>
                  {/*------------ Main work ends -------------- */}
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={closeModal}
                    >
                      Ok
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
