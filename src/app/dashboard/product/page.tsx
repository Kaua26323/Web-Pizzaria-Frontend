import { getCookieServer } from "@/lib/cookieServer";
import { ProductForm } from "./components/productForm";
import { api } from "@/services/api";

export default async function Product(){

  const token = await getCookieServer();

  try{
    const response = await api.get("/categoryInfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return(
        <>
          <ProductForm categories={response.data}/>  
        </>
    )

  }catch(err){
    console.log(err);
    throw new Error("Algo deu errado!");
  }
}