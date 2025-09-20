import { api } from "@/services/api";
import style from "./page.module.scss";
import logoImg from "@/app/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { IoPizzaOutline } from "react-icons/io5";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home(){

  async function handleLogin(formData: FormData){
    "use server"

    const email = formData.get("email") as string;
    const password = formData.get("password");

    if(!email.trim() || !password){
      return
    }

    try{
      const response = await api.post("/session", {
        email,
        password
      });

      if(!response.data.token){
        return;
      }
      
      const expressTime: number = 60 * 60 * 24 * 30 * 1000; //30 dias 
      const cookieStore = await cookies(); 
      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })

    }catch(err){
      console.log(err);
      return;
    }

    redirect("/dashboard");
  }

  return(
    <>
      <div className={style.containerCenter}>
        <Image src={logoImg}
          alt="Logo da pizzaria"
        />

        <section className={style.loginArea}>
          <form action={handleLogin}>
            <input type="email"
              name="email"
              placeholder="Digite seu e-mail"
              required
              className={style.input}
            />

            <input type="password"
              name="password"
              placeholder="*********"
              required
              className={style.input}
            />

            <button type="submit"> 
              <span>Acessar</span> <IoPizzaOutline size={30}/>
            </button>
          </form>
          <h2 className={style.text}>Não possui conta? <Link href={"/signup"}>Cadastre-se</Link></h2>
        </section>
      </div>
    </>
  )
}