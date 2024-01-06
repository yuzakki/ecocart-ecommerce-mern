import { AspectRatio } from '@components/ui/aspect-ratio';

interface BannerProps {
  children?: React.ReactNode;
  title?: string;
  banner: string;
}

export default function Banner({ children, banner, title }: BannerProps) {
  return (
    <div className="flex justify-between mt-2 overflow-hidden rounded-sm bg-slate-100">
      <BannerContent children={children} title={title} />
      <BannerImage banner={banner} />
    </div>
  );
}

function BannerContent({
  children,
  title,
}: {
  children?: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="flex flex-col items-start py-8 pl-6 pr-4 sm:pl-8 lg:pl-10 basis-full lg:basis-1/2 justify-evenly">
      {children || !title ? (
        children
      ) : (
        <div className="space-y-5 md:space-y-4">
          <h1 className="text-2xl font-black capitalize xl:text-4xl">
            {title}
          </h1>

          <p className="text-sm font-normal tracking-wide sm:w-[80%] lg:w-full md:text-base">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque
            facere in sed illum deserunt eum. Consequuntur amet soluta est
            ratione rerum
          </p>
        </div>
      )}
    </div>
  );
}

function BannerImage({ banner }: { banner: string }) {
  return (
    <div className="hidden basis-1/2 lg:block">
      <AspectRatio ratio={6 / 3}>
        <img src={banner} alt="Banner" className="object-cover w-full h-full" />
      </AspectRatio>
    </div>
  );
}
