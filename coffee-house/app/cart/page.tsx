"use client";
import { useCart } from "@/lib/hooks/useCart";
import Image from "next/image";
import { Trash2, Plus, Minus, ChevronLast, Trash } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useIsLogged } from "@/lib/utils";
import Link from "next/link";
import { useUser } from "@/lib/hooks/useGetUserFromLS";
import { useConfirmOrder } from "@/lib/hooks/useProducts";
import { AxiosError } from "axios";
import { ConfirmOrderRequest, SizeKey } from "@/lib/api/products";
import { Loader } from './../../components/ui/loader';

export default function CartPanel() {
  const {
    cart,
    isLoading,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    totalItems,
    totalPrice,
    totalBasePrice,
    hasItems,
  } = useCart();

  const {
    
    userAddress,
    userPaymentMethod,
   
  } = useUser();

  const { mutate: confirmOrder, isPending: isConfirming } = useConfirmOrder();

  const handleIncrease = (itemIndex: number) => {
    const item = cart[itemIndex];
    updateItemQuantity(
      item.productId,
      item.sizeKey,
      item.additives,
      item.count + 1
    );
  };

  const handleDecrease = (itemIndex: number) => {
    const item = cart[itemIndex];
    const next = item.count - 1;
    if (item.count === 1) {
      return;
    }
    if (next <= 0) {
      removeFromCart(item.productId, item.sizeKey, item.additives);
      toast?.success?.("Item removed");
    } else {
      updateItemQuantity(item.productId, item.sizeKey, item.additives, next);
    }
  };

  const handleRemove = (itemIndex: number) => {
    const item = cart[itemIndex];
    removeFromCart(item.productId, item.sizeKey, item.additives);
    toast?.success?.("Item removed from cart");
  };

  const handleClear = () => {
    clearCart();
    toast?.success?.("Cart cleared");
  };

  const handleCheckout = () => {
    if (!hasItems) {
      toast.error("Cart is empty");
      return;
    }

  
    const orderData: ConfirmOrderRequest = {
      items: cart.map((item) => ({
        productId: item.productId,
        size: item.sizeKey as SizeKey, 
        additives: item.additives,
        quantity: item.count,
      })),
      totalPrice: totalPrice,
    };

    confirmOrder(orderData, {
      onSuccess: (response) => {
        if (response.data?.message && response.data?.orderId){
           toast.success(
             `${response.data?.message}! We will contact you soon! Your orderID${response.data?.orderId}`
           );
        } else {
           toast.success("We will contact you soon!");
        }
         
        clearCart(); 
      },
      onError: (error: AxiosError<{ error?: string }>) => {
        const message =
          error?.response?.data?.error ||
          error?.message ||
          "Failed to place order. Please try again.";
        toast.error(message);
      },
    });
  };

  const isLogin = useIsLogged();

  if (isLoading) {
    return (
      <div className="p-6 w-full max-w-[760px] mx-auto">
       <Loader/>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary">Your cart</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            className="px-3 py-1 rounded-md flex items-center gap-1 cursor-pointer border border-destructive text-sm text-destructive hover:bg-destructive/10 transition"
            disabled={!hasItems}
            aria-disabled={!hasItems}
          >
            Clear <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground h-60">
          <p className="mb-2">Your cart is empty</p>
          <p className="text-sm">Add some items to see them here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item, idx) => (
            <div
              key={`${item.productId}-${item.sizeKey}-${idx}`}
              className="flex gap-4 items-start p-4 rounded-2xl border border-ring bg-background dark:border-muted-foreground "
            >
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted sm:flex items-center justify-center hidden">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold text-primary">
                      {item.name}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      {item.sizeLabel} ·{" "}
                      {item.additives.length
                        ? item.additives.join(", ")
                        : "No additives"}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-semibold text-primary">
                      ${(item.unitFinalPrice * item.count).toFixed(2)}
                    </div>
                    <div className="text-lg text-muted-foreground line-through">
                      ${(item.unitBasePrice * item.count).toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center  gap-2 rounded-lg border px-2 py-1 dark:text-primary">
                    <button
                      aria-label="Decrease"
                      onClick={() => handleDecrease(idx)}
                      className="p-1 rounded hover:bg-muted transition cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <>
                      <div className="w-10 text-center">{item.count}</div>
                      <button
                        aria-label="Increase"
                        onClick={() => handleIncrease(idx)}
                        className="p-1 rounded hover:bg-muted transition cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </>
                  </div>

                  <button
                    onClick={() => handleRemove(idx)}
                    className="ml-2 p-2 rounded-md cursor-pointer text-destructive hover:bg-destructive/10 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {isLogin && (
            <>
              <div className="flex items-center justify-between  mt-10 border-ring dark:border-muted-foreground">
                <div>
                  <div className="text-xl font-semibold text-primary">
                    Address:
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-semibold text-primary">
                    {userAddress}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-ring dark:border-muted-foreground">
                <div>
                  <div className="text-xl font-semibold text-primary">
                    Pay by:
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-semibold text-primary">
                    {userPaymentMethod === "card" ? "Card" : "Cash"}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex items-center justify-between py-4 border-t mt-5 border-ring dark:border-muted-foreground">
            <div>
              <div className="text-xl font-semibold text-primary">Items:</div>
              <div className="text-2xl font-semibold text-primary">
                {totalItems}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xl font-semibold text-primary">Total:</div>
              <div className="text-2xl font-bold flex text-primary gap-2 items-center justify-center">
                ${totalPrice.toFixed(2)}{" "}
                <span className="text-2xl text-muted-foreground/70 line-through">
                  {totalBasePrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          {isLogin ? (
            <div className="flex gap-3 items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-100 py-3 bg-foreground cursor-pointer dark:border-primary/50 text-secondary rounded-xl font-semibold text-lg hover:bg-foreground/90 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleCheckout}
                disabled={!hasItems || isConfirming}
              >
                {isConfirming ? (
                  <>
                    <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Checkout <ChevronLast />
                  </>
                )}
              </motion.button>
            </div>
          ) : (
            <div className="flex gap-3 items-center justify-center">
              <Link href={"/auth-user"}>
                {" "}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-100 py-3 bg-foreground cursor-pointer dark:border-primary/50 text-secondary rounded-xl font-semibold text-lg hover:bg-foreground/90 transition-colors flex items-center justify-center gap-3"
                >
                  Sign in / Register
                </motion.button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
