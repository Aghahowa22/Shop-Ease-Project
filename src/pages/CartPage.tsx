import { ShoppingCart } from "lucide-react";
import CartItemRow from "../components/cart/CartItemRow";
import CartSummary from "../components/cart/CartSummary";
import EmptyState from "../components/ui/EmptyState";
import { useCart } from "../hooks/useCart";

function CartPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingCart}
        title="Your cart is empty"
        description="Add something you like and it will show up here."
        actionLabel="Browse products"
        onAction={() => window.location.assign("/products")}
      />
    );
  }

  return (
    <section>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Your cart
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start">
        <ul className="divide-y divide-slate-200 border-y border-slate-200">
          {items.map((item) => (
            <CartItemRow key={item.product.id} item={item} />
          ))}
        </ul>

        <CartSummary />
      </div>
    </section>
  );
}

export default CartPage;
