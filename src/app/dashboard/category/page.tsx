import { api } from "@/services/api";
import { FormButton } from "../components/formButton";
import style from "./style.module.scss";
import { getCookieServer } from "@/lib/cookieServer";
import { redirect } from "next/navigation";

export default function Category(){

  async function handleRegisterCategory(formData: FormData){
    "use server"

    const name = formData.get("name");
    if(name === "") return;

    const data = {
      name: name,
    }

    const token = await getCookieServer();

    try {
      await api.post("/category", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

    } catch(err){
      console.log(err);
      throw new Error("Something went wrong");
    }
    
    redirect("/dashboard");
  }

  return(
    <main className={style.container}>
      <h1>Nova Categoria</h1>

      <form className={style.form} action={handleRegisterCategory}>
        <input
          type="text"
          name="name"
          placeholder="Nome da categoria, ex: Pizzas"
          required
          className={style.input}
        />

        <FormButton
          name="Acessar"
          bgColor="var(--green-900)"
        />
      </form>
    </main>
  )
}