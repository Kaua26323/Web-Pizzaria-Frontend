import { getCookieServer } from "@/lib/cookieServer";
import { Orders } from "./components/orders";
import { api } from "@/services/api";
import { OrderProps } from "@/types/order.type";

async function getOrders(): Promise<OrderProps[] | []>{
  try{
    const token = await getCookieServer();

    const response = await api("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    console.log(response.data);
    return response.data || [];


  }catch(err){
    console.log(err);
    return [];
  }
}

export default async function Dashboard(){
  const orders =  await getOrders();
  
  return(
    <>
      <Orders orders={orders}/>
    </>
  )
}