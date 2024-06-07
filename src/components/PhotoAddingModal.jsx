import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";
import { photoUpload } from "../api/utils/photoUpload";
import toast from "react-hot-toast";
import ActionLoader from "./shared/ActionLoader";

export default function PhotoAddingModal({
  loading,
  setLoading,
  isPhotoModalOpen,
  setIsPhotoModalOpen,
  photoUrls,
  setPhotoUrls,
}) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [imageAddresses, setImageAddresses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.files[0];
    setImageAddresses([...imageAddresses, image]);

    try {
      setLoading(true);
      const image_url = await photoUpload(image);
      if (imageAddresses.includes(image)) {
        setLoading(false);
        return toast.error("Same Image not allowed");
      }
      setPhotoUrls([...photoUrls, image_url]);
      setLoading(false);
      setErrorMessage(null);
    } catch (error) {
      console.error("Image upload error:", error);
      setErrorMessage("Error uploading image. Please try again.");
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (photoUrls.length < 4) {
      return toast.error("Add More than 4 photos");
    }
    setIsPhotoModalOpen(false);
  };
  return (
    <>
      <Transition appear show={isPhotoModalOpen}>
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
                    Add Photos
                  </DialogTitle>

                  {/* -----------main works starts ---------- */}

                  <div>
                    <div className="w-1/2 mx-auto">
                      {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                      )}
                      <form onSubmit={handleSubmit} className="flex flex-col">
                        <input type="file" name="image" accept="image/*" />
                        <button className="border p-2 mt-2 rounded-full">
                          {loading ? <ActionLoader /> : "Upload"}
                        </button>
                      </form>
                    </div>
                    <div className=" grid grid-cols-8 ">
                      {photoUrls &&
                        photoUrls.map((url) => {
                          return (
                            <img
                              key={url}
                              src={url}
                              className="h-12 w-12"
                              alt="Uploaded Image"
                            />
                          );
                        })}
                    </div>
                  </div>

                  {/*------------ Main work ends -------------- */}
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={closeModal}
                    >
                      OK
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
