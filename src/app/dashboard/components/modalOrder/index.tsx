"use client"

import { FiX } from "react-icons/fi";
import style from "./style.module.scss";
import { use } from "react";
import { OrderContext } from "@/providers/order";
import { calculeteTotalOrder } from "@/lib/calculetePrices";



export function ModalOrder(){
  const { onRequestClose, orders, finishOrder }  = use(OrderContext);
  console.log(orders);

  async function handleFinishOrder(){
    await finishOrder(orders[0].order.id);
  }

  return(
    <dialog className={style.dialogContainer}>
      <section className={style.dialogContent}>
        <button
          className={style.dialogBack}
          onClick={onRequestClose}
        >
          <FiX size={30} color="red"/>
        </button>

        <article className={style.container}>
          <h2>Detalhes do pedido</h2>

          <span className={style.table}>
            Mesa - <b>{orders[0].order.table}</b>
          </span>
          
          {orders[0].order.name && (
            <span className={style.name}>
              Nome da mesa - <b>{orders[0].order.name}</b>
            </span>
          )}
          
          {orders.map((item) => (
            <section className={style.item} key={item.id}>
              <span>
                Qtd: {item.amount} - <b>{item.product.name}</b> - R$ {parseFloat(item.product.price) * item.amount}
              </span>
              <span className={style.description}>
                {item.product.description}
              </span>
            </section>
          ))}

          <h3 className={style.totalValue}>Valor total: R$ {calculeteTotalOrder(orders)}</h3>

          <button className={style.buttonOrder}
            onClick={() => handleFinishOrder()}
          >
            Concluir Pedido  
          </button>
        
        </article>
      </section>
    </dialog>
  )
}