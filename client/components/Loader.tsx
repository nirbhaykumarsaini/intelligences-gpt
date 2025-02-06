// components/Loader.js

export default function Loader() {
    return (
      <div className="flex justify-center items-center">
        <div className="relative">
          <div className="w-8 h-8 border-4 border-dashed border-gray-200 rounded-full animate-spin border-t-4 border-t-indigo-500"></div>
          <span className="absolute inset-0 flex justify-center items-center text-lg text-indigo-500"></span>
        </div>
      </div>
    );
  }
  