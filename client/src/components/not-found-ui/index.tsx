import { NotFoundUi } from './not-found-ui';

export const PageNotFound = () => {
  return (
    <NotFoundUi>
      Oops! The page you're looking for couldn't be found.
    </NotFoundUi>
  );
};

export function ProductNotFound() {
  return (
    <NotFoundUi>
      Oops! The product you're looking for couldn't be found.
    </NotFoundUi>
  );
}
