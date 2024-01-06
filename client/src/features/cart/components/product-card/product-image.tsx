interface IProductImage {
  title: string;
  price: number;
  image: string;
}

export const ProductImage = ({ title, price, image }: IProductImage) => (
  <div className="flex justify-center space-x-3 daa ">
    <img className="rounded-md w-28 h-28" src={image} />

    <div className="flex flex-col justify-around">
      <h2 className="text-xl font-bold max-w-[200px]">{title}</h2>
      <h2 className="text-lg font-medium">{price} $</h2>
    </div>
  </div>
);
