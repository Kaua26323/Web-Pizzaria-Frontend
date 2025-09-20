"use client"
import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";
import { OrderProps } from "@/types/order.type";
import { ProductProps } from "@/types/product.type";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react"
import { toast } from "sonner";

export interface OrderItemProps {
  id:         string;
  amount:     number;
  created_at: Date;
  updated_at: Date;
  order_id:   string;
  product_id: string;
  product:    ProductProps;
  order:      OrderProps;

}

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  orders: OrderItemProps[];
  finishOrder: (order_id: string) => Promise<void>;
};

type OrderProviderProps = {
  children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps){
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderItemProps[]>([]);
  const router = useRouter();

  async function onRequestOpen(order_id: string){

    const token = await getCookieClient();
    try{
      const response = await api("/order/details", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        
        params: {
          order_id: order_id,
        }
      });

      setOrders(response.data);
      setIsOpen(true);

    }catch(err){
      console.log(err);
      toast.error("Algo deu errado! tente recaregue a pagina");
    }
  }

  function onRequestClose(){
    setIsOpen(false);
  }

  async function finishOrder(order_id: string) {
    const token = await getCookieClient();

    try{
      await api.patch("/order/finished", { order_id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      toast.success("Pedido concluido!");
      router.refresh();
      setIsOpen(false);

    }catch(err){
      console.error(err)
      toast.error("Algo deu errado...Tente novamente");
    }
  }

  return(
    <OrderContext.Provider
      value={{isOpen, onRequestClose, onRequestOpen, orders, finishOrder}}
    >
      {children}
    </OrderContext.Provider>
  )
}

