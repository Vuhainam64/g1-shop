import { Link } from "react-router-dom";
import Search from "./Search";
import { useSelector } from "react-redux";

function ProductLists() {
  const products = useSelector((state) => state.products?.products);
  return (
    <div className="bg-white">
      <div className="mx-auto px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <Search />

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products &&
            products.map((product) => (
              <Link
                to={`/shop/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="w-full overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover object-center w-full h-auto group-hover:opacity-75"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${product.price}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductLists;
