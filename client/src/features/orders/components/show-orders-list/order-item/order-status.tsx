export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'text-orange-500';
    case 'delivered':
      return 'text-green-500';
    case 'processing':
      return 'text-blue-500';
    default:
      return 'text-gray-500';
  }
};

export function OrderStatus({ status }: { status: string }) {
  return (
    <div className={'flex justify-between md:justify-evenly md:flex-col'}>
      <h1 className="text-lg font-semibold text-green-400">Status</h1>
      <h1 className={getStatusColor(status)}>{status}</h1>
    </div>
  );
}
