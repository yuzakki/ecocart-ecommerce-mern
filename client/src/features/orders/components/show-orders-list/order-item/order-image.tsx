interface IOrderImage {
  imageUrl: string;
}

export function OrderImage({ imageUrl }: IOrderImage) {
  return <img src={imageUrl} className="w-24 h-24 rounded-sm" />;
}
