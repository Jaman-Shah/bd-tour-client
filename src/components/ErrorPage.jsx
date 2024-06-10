import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-24 h-24 text-red-500 mb-8"
      >
        <path
          d="M256 0C114.842 0 0 114.842 0 256s114.842 256 256 256 256-114.842 256-256S397.158 0 256 0zm0 472c-119.103 0-216-96.897-216-216 0-119.103 96.897-216 216-216 119.103 0 216 96.897 216 216 0 119.103-96.897 216-216 216z"
          fill="#FF4E4E"
        />

        <path
          d="M279.423 148.573c-6.562-6.562-17.201-6.562-23.764 0L256 170.324l-16.659-21.751c-6.563-6.562-17.202-6.562-23.764 0-6.562 6.562-6.562 17.202 0 23.764l21.751 28.431c6.561 6.561 17.202 6.561 23.763 0l21.751-28.431c6.563-6.561 6.563-17.201 0-23.764zM256 328c-8.837 0-16 7.163-16 16v48c0 8.837 7.163 16 16 16s16-7.163 16-16v-48c0-8.837-7.163-16-16-16zM256 240c-8.837 0-16 7.163-16 16v72c0 8.837 7.163 16 16 16s16-7.163 16-16v-72c0-8.837-7.163-16-16-16z"
          fill="#FFF"
        />
      </svg>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">404</h2>
      <p className="text-lg text-gray-600 text-center">
        The Page you are requested is not found
      </p>
    </div>
  );
};

export default ErrorPage;
