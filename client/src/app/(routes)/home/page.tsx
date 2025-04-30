import { getDocuments } from "@/services/server-document";
import { CuboidIcon as Cube, FileSpreadsheet, Search } from "lucide-react";
import { NewDoc } from "./_components/new-doc";

const HomePage = async () => {
  const documents = await getDocuments();

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white hover:bg-neutral-100 p-3 rounded-lg">
            <Cube className="w-8 h-8 text-black" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-medium text-white text-xl">Blography</h1>
            <p className="text-neutral-400 text-sm">
              Write it down. Remember it forever.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <NewDoc />
          <div className="flex flex-col gap-2 bg-[#262626] p-4 border border-[#404040] rounded-md w-[160px] md:w-[280px] cursor-pointer">
            <Search className="max-md:size-4 text-white" />
            <p className="text-neutral-200 text-sm">Search</p>
          </div>
        </div>
        <div className="flex flex-col">
          {Array.isArray(documents) &&
            documents.length > 0 &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            documents.slice(0, 5)?.map((document: any, i: number) => (
              <div
                key={document._id}
                className={`flex justify-between items-end p-4 border border-[#404040] ${i == 4 ? "!border-b rounded-b-md" : ""} w-full cursor-pointer ${i === 0 ? "rounded-t-md" : ""} ${
                  i === 4 || i === documents.length - 1
                    ? i === 4 && documents.length > 5
                      ? "border-b"
                      : documents.length === 1
                        ? "rounded-md"
                        : i === documents.length - 1
                          ? "rounded-b-md"
                          : ""
                    : "border-b-0"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="flex justify-center items-center bg-blue-500/5 mt-1 border border-border/40 rounded-sm w-8 h-8 text-blue-500 shrink-0">
                    <FileSpreadsheet className="text-[#2b7fff" size={16} />
                  </div>
                  <h1 className="text-white text-base">{document?.title}</h1>
                </div>
                <p className="text-neutral-400 text-sm">
                  {new Date(document?.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
