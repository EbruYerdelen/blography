import { getDocumentById } from "@/services/server-document";
import Image from "next/image";
import EditorWrapper from "./_components/editor-wrapper";

type Props = {
  params: Promise<{ id: string }>;
};

const Docs = async ({ params }: Props) => {
  const { id } = await params;
  const document = await getDocumentById(id);

  return (
    <div className="relative py-6">
      <Image
        src="/assets/images/light.webp"
        alt="Light"
        height={2048}
        width={2048}
        className="hidden md:block -top-20 right-0 left-0 z-0 absolute mx-auto w-screen max-w-screen h-screen max-h-screen pointer-events-none select-none"
      />
      <div className="flex flex-col gap-1 pl-[69px]">
        <h1 className="font-semibold text-white text-3xl">{document?.title ? document?.title : "Untitled Document"}</h1>
      </div>
      <EditorWrapper id={id} doc={document} />
    </div>
  );
};

export default Docs;
