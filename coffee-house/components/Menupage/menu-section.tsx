"use client";
import React, { useState } from "react";
import { Product } from "@/lib/api/products";
import { useIsLogged } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import ModalDialog from "../ui/ModalDialog";
import ProductModal from "./product-modal";

interface MenuSectionProps {
  products: Product[];
}

export default function MenuSection({ products }: MenuSectionProps) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalID, setOpenModalID] = useState<number | undefined>(undefined);
  const isLogin = useIsLogged();
 
  const handleOpen = (id: number) => {
    setOpenModal(true);
    setOpenModalID(id)
  }


  return (
    <>
      <div className="relative w-full max-w-[1360px] overflow-hidden mb-25 flex flex-col items-center pt-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              onClick={() => handleOpen(product.id)}
              className="group cursor-pointer border border-ring rounded-4xl bg-background hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-square h-fit">
                <Image
                  src={`/images/${product.id}.jpg`}
                  alt={product.name}
                  width={800}
                  height={600}
                  className="w-full h-fit aspect-square object-cover rounded-4xl border-b border-ring transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col items-center text-center w-full p-4 pt-3 grow">
                <span className="text-xl font-bold text-primary mb-2 line-clamp-1">
                  {product.name}
                </span>

                <span className="text-md text-primary mb-4 line-clamp-3">
                  {product.description}
                </span>

                <div className="flex items-center gap-2 mt-auto">
                  {product.discountPrice && isLogin ? (
                    <>
                      <span className="text-2xl font-bold text-primary">
                        ${product.discountPrice}
                      </span>
                      <span className="text-xl text-primary/80 font-semibold line-through">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      ${product.price}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-primary text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>

      <ModalDialog
        openModal={openModal}
        setOpenModal={setOpenModal}
        className="sm:max-w-4xl dark:bg-background text-primary border border-ring"
      >
        {openModalID && (
          <ProductModal modalId={openModalID} setOpenModal={setOpenModal} />
        )}
      </ModalDialog>
    </>
  );
}
