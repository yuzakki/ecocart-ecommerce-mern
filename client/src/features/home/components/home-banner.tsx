// Imports: Components
import Banner from '@components/banner';
import bannerImage from '@assets/images/banner_1.jpg';

// Imports: APIs | Utils
import { useGetCurrentUser } from '@features/authentication/hooks/use-auth';

export const HomeBanner = () => {
  const { data, isSuccess, isLoading } = useGetCurrentUser();

  return (
    <Banner banner={bannerImage}>
      <h1 className="text-lg font-black capitalize xl:text-3xl md:text-2xl">
        <span className="md:text-2xl text-base italic text-[#0cf]">
          EcoCart,{' '}
        </span>{' '}
        best shopping store
      </h1>

      <p className="mt-4 text-sm font-normal sm:w-[80%] lg:w-full tracking-wide md:text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum enim,
        voluptatum veniam consequuntur
      </p>

      {!isSuccess && isLoading && <span>Loading</span>}

      {data?.user && (
        <h1 className="mt-4 font-bold capitalize">
          Welcome, {data?.user?.name}
        </h1>
      )}
    </Banner>
  );
};
