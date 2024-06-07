import React from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import toast from "react-hot-toast";
import { TiDelete } from "react-icons/ti";

const AddGuideProfileModal = ({
  heading,
  data,
  setData,
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleAddData = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const details = form.details.value;
    setData([...data, { title, details }]);
    form.reset();
  };

  const handleSingleDataDelete = (title) => {
    console.log(title);
    const remainingData = data.filter(
      (singleData) => singleData.title !== title
    );
    setData(remainingData);
  };

  return (
    <>
      <Transition appear show={isModalOpen}>
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
                    className="text-3xl font-medium text-black"
                  >
                    Add {heading}
                  </DialogTitle>

                  {/* -----------main works starts ---------- */}
                  <form onSubmit={handleAddData} className="flex flex-col">
                    <div>
                      <p>{heading} Title</p>
                      <input
                        type="text"
                        name="title"
                        className="h-12 border border-black mb-4 px-4 py-2 w-full"
                        required
                      />
                    </div>
                    <div>
                      <p>{heading} Details</p>
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
                      Add {data.length > 0 && "More"}
                    </button>
                  </form>
                  {/*------------ Main work ends -------------- */}
                  <div>
                    {data &&
                      data.map((singleData, index) => {
                        return (
                          <div
                            key={index}
                            className="relative overflow-hidden bg-gray-300 rounded-full p-4 mt-2"
                          >
                            <h1 className="font-bold border-b border-black">
                              Title : {singleData.title}
                            </h1>

                            <p> Details: {singleData.details}</p>
                            <button
                              onClick={() =>
                                handleSingleDataDelete(singleData.title)
                              }
                              className="absolute bg-black text-white  p-1 rounded-xl right-3 top-2"
                            >
                              <TiDelete className="text-xl" />
                            </button>
                          </div>
                        );
                      })}
                  </div>
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={() => {
                        if (data.length < 1) {
                          return toast.error("Add At Least 1 Data");
                        }
                        setIsModalOpen(false);
                      }}
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
};

export default AddGuideProfileModal;
