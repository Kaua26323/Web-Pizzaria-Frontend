"use client"

import { FiRefreshCcw } from "react-icons/fi";
import style from "./style.module.scss";
import { OrderProps } from "@/types/order.type";
import { useRouter } from "next/navigation";
import { ModalOrder } from "../modalOrder";
import { useContext } from "react";
import { OrderContext } from "@/providers/order";
import { toast } from "sonner";

interface OrderListProsp{
  orders: OrderProps[];
}

export function Orders({orders}:OrderListProsp){
  const {isOpen, onRequestOpen } = useContext(OrderContext);
  const router = useRouter();

  function handleRefresh(){
    router.refresh();
    toast.success("Pedidos atualizados!");
  }

  async function handleOpenModal(id: string){
    await onRequestOpen(id);
  }

  return(
    <>
      <main className={style.container}>

        <section className={style.containerHeader}>
          <h1> Últimos pedidos </h1>

          <button onClick={handleRefresh}>
            <FiRefreshCcw  size={25} color="3fffa3"/>


          </button>
        </section>

        <section  className={style.listOrder}>
          {orders && orders.map((order) => (
            <button
              key={order.id}
              className={style.orderItem}
              onClick={() => handleOpenModal(order.id)}
            >
              <div className={style.tag}></div>

              <span>Mesa {order.table}</span>
            </button>
          ))}
        </section>

        {orders.length === 0 && (
          <h1>
            Você ainda não tem nenhum pedido...
          </h1>
        )}
      </main>
      {isOpen && <ModalOrder/>}
    </>
  )
}