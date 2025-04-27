import React from "react";
import { CuboidIcon as Cube, FileSpreadsheet, Search } from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white hover:bg-neutral-100 p-3 rounded-lg">
            <Cube className="w-8 h-8 text-black" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-medium text-whtie text-xl">Blography</h1>
            <p className="text-neutral-400 text-sm">
              Write it down. Remember it forever.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-2 bg-[#262626] p-4 border border-[#404040] rounded-md w-[250px] cursor-pointer">
            <FileSpreadsheet className="text-white" />
            <p className="text-neutral-200 text-sm">New Document</p>
          </div>
          <div className="flex flex-col gap-2 bg-[#262626] p-4 border border-[#404040] rounded-md w-[250px] cursor-pointer">
            <Search className="text-white" />
            <p className="text-neutral-200 text-sm">Search</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
