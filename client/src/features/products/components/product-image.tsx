// Imports: Libraries
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';

// Imports: APIs | Utils
import { IProduct } from '@utils/typings/product';

// Imports: Components
import { Skeleton } from '@components/ui/skeleton';

interface IProductImage {
  product: IProduct;
  isLoading: boolean;
}

export function ProductImage({ product, isLoading }: IProductImage) {
  const images = product
    ? product?.images?.map((image) => ({
        original: image,
        thumbnail: image,
        originalAlt: product?.title,
        thumbnailAlt: product?.title,
      }))
    : [];

  return (
    <section className="basis-1/2 ">
      {isLoading && <Skeleton className="w-4/5 h-full mx-auto" />}
      {!isLoading && (
        <ImageGallery
          items={images}
          slideDuration={350}
          showPlayButton={false}
          showFullscreenButton={false}
          showNav={false}
          lazyLoad={true}
          additionalClass="image-gallery"
        />
      )}
    </section>
  );
}
