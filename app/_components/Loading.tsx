import Image from 'next/image';

const Loading = ({ loadingMessage }: { loadingMessage: string }) => {
  return (
    <div className="p-10 flex justify-center items-center w-[100%] h-[100%]">
      <Image
        src="/loading.gif"
        alt="Loader image"
        height={300}
        width={300}
        className="w-[200px] h-[200px]"
      />
      <h2 className="font-bold text-2xl">{loadingMessage}</h2>
    </div>
  );
};

export default Loading;
