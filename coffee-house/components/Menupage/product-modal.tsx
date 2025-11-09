"use client";
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import { useGetProductById } from "@/lib/hooks/useProducts";
import { Loader } from "../ui/loader";
import Image from "next/image";
import { useIsLogged } from "@/lib/utils";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/cartDispatcher";
import { CartItem } from "@/lib/api/products";

interface ProductModalProps {
  modalId: number;
  setOpenModal: (open: boolean) => void;
}



export default function ProductModal({
  modalId,
  setOpenModal,
}: ProductModalProps) {
  const isLogin = useIsLogged();
  const { data: productData, isLoading, isError } = useGetProductById(modalId);

  const product = productData?.data;


  const getDefaultSize = () => {
    if (product?.sizes) {
      const sizeKeys = Object.keys(product.sizes);
      return sizeKeys.length > 0 ? sizeKeys[0] : "";
    }
    return "";
  };

  const [selectedSize, setSelectedSize] = useState<string>(getDefaultSize);
  const [selectedAdditives, setSelectedAdditives] = useState<number[]>([]);


  const calculatePrices = useCallback(() => {
    if (!product || !selectedSize) return { basePrice: 0, totalPrice: 0 };

    const size = product.sizes[selectedSize];
    const sizePrice = parseFloat(size.price);
    const finalSizePrice =
      isLogin && size.discountPrice
        ? parseFloat(size.discountPrice)
        : sizePrice;

    let additivesBasePrice = 0;
    let additivesFinalPrice = 0;

    product.additives.forEach((additive, index) => {
      if (selectedAdditives.includes(index)) {
        const additiveBasePrice = parseFloat(additive.price);
        const additiveFinalPrice =
          isLogin && additive.discountPrice
            ? parseFloat(additive.discountPrice)
            : additiveBasePrice;

        additivesBasePrice += additiveBasePrice;
        additivesFinalPrice += additiveFinalPrice;
      }
    });

    return {
      basePrice: sizePrice + additivesBasePrice,
      totalPrice: finalSizePrice + additivesFinalPrice,
    };
  }, [product, selectedSize, selectedAdditives, isLogin]);

 
  const { basePrice, totalPrice } = calculatePrices();

  const handleAdditiveToggle = (index: number) => {
    setSelectedAdditives((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const getDisplayPrice = (price: string, discountPrice?: string | null) => {
    const displayPrice = isLogin && discountPrice ? discountPrice : price;

    return {
      price: displayPrice,
      hasDiscount: isLogin && !!discountPrice,
      originalPrice: price,
    };
  };

  const addToCart = () => {
    if (!product) return;
     if (!selectedSize) {
       toast.error("Please select a size before adding to cart!");
       return;
     }

    const size = product.sizes[selectedSize];
    const selectedAdditiveNames = product.additives
      .filter((_, index) => selectedAdditives.includes(index))
      .map((additive) => additive.name);

    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      category: product.category,
      additives: selectedAdditiveNames,
      count: 1,
      img: `/images/${product.id}.jpg`,
      sizeKey: selectedSize,
      sizeLabel: size.size,
      unitBasePrice: basePrice,
      unitFinalPrice: totalPrice,
    };

    addItemToCart(cartItem);
    setOpenModal(false);
    toast.success("Product added to cart!");
  };


  if (isLoading) {
    return (
      <div className="min-h-90">
        <Loader />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-90 flex justify-center items-center">
        <p className="text-destructive text-lg mb-4 w-full text-center">
          Fail to load product. Try again.
        </p>
      </div>
    );
  }

  const sizeOptions = product.sizes
    ? Object.entries(product.sizes).map(([key, value]) => ({
        key,
        ...value,
      }))
    : [];

  
 

  return (
    <div className="max-h-[90vh] overflow-y-auto">
      <motion.div
        className="w-full max-w-4xl mx-auto p-4"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-8">
          <div className="lg:w-2/5">
            <div className="relative hidden lg:block">
              <Image
                src={`/images/${product.id}.jpg`}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-auto max-h-[400px] object-cover rounded-2xl border border-ring"
              />
            </div>
          </div>

         
          <div className="lg:w-3/5">
            <div className="mb-6">
              <h1 className="font-bold text-3xl text-primary mb-3">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {product.description}
              </p>
            </div>

            {sizeOptions.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-xl text-primary mb-4">
                  Size
                </h3>
                <div className="flex flex-wrap gap-3">
                  {sizeOptions.map((size) => {
                    const priceInfo = getDisplayPrice(
                      size.price,
                      size.discountPrice
                    );
                    return (
                      <button
                        key={size.key}
                        onClick={() => setSelectedSize(size.key)}
                        className={`flex-1 min-w-[120px] px-4 py-3 cursor-pointer rounded-xl border-2 transition-all ${
                          selectedSize === size.key
                            ? "border-foreground dark:border-primary bg-foreground/10  text-primary"
                            : "border-ring hover:border-foreground/50 dark:hover:border-primary/50 text-muted-foreground"
                        }`}
                      >
                        <div className="font-medium text-lg">{size.size}</div>
                        <div
                          className={`text-md font-semibold ${
                            priceInfo.hasDiscount
                              ? "text-green-600 dark:text-green-400"
                              : "text-primary"
                          }`}
                        >
                          ${priceInfo.price}
                        </div>
                        {priceInfo.hasDiscount && (
                          <div className="text-sm text-muted-foreground line-through">
                            ${priceInfo.originalPrice}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

         
            {product.additives && product.additives.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-xl text-primary mb-4">
                  Additives
                </h3>
                <div className="flex flex-wrap gap-3 ">
                  {product.additives.map((additive, index) => {
                    const priceInfo = getDisplayPrice(
                      additive.price,
                      additive.discountPrice
                    );
                    const isSelected = selectedAdditives.includes(index);

                    return (
                      <button
                        key={index}
                        onClick={() => handleAdditiveToggle(index)}
                        className={`flex flex-col items-center justify-start p-3 rounded-xl border-2 transition-all min-w-[100px] cursor-pointer flex-1 ${
                          isSelected
                            ? "border-foreground dark:border-primary bg-foreground/10 text-primary"
                            : "border-ring  hover:border-foreground/50 dark:hover:border-primary/50 text-muted-foreground"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center dark:text-white  justify-center mb-2 transition-colors ${
                            isSelected
                              ? "bg-foreground border-foreground text-primary-foreground dark:border-primary"
                              : " border-ring "
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-lg mb-1">
                            {additive.name}
                          </div>
                          <div className="flex flex-col items-center">
                            <span
                              className={`text-md font-medium ${
                                priceInfo.hasDiscount
                                  ? "text-green-600 dark:text-green-400 "
                                  : "text-muted-foreground dark:text-primary"
                              }`}
                            >
                              +${priceInfo.price}
                            </span>
                            {priceInfo.hasDiscount && (
                              <span className="text-sm text-muted-foreground dark:text-primary line-through">
                                +${priceInfo.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

           
            <div className="border-t border-muted dark:border-primary pt-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-2xl text-primary">Total:</span>
                <div className="text-right">
                  {isLogin && basePrice !== totalPrice ? (
                    <div className="flex gap-2 items-center">
                      <span className="font-bold text-2xl text-primary">
                        ${totalPrice.toFixed(2)}
                      </span>
                      <div className="text-xl text-muted-foreground line-through">
                        ${basePrice.toFixed(2)}
                      </div>
                    </div>
                  ) : (
                    <span className="font-bold text-2xl text-primary">
                      ${totalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addToCart}
                className="w-full py-4 bg-foreground cursor-pointer dark:border-primary/50 text-secondary rounded-xl font-semibold text-lg hover:bg-foreground/90 transition-colors flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
