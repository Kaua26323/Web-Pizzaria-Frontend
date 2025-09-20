import style from "../page.module.scss";
import Image from "next/image";
import logoImg from "../assets/logo.svg";
import { CiPizza } from "react-icons/ci";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default function Signup(){

    async function handleRegister(formData: FormData){
        "use server"

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if(!name.trim() || !email.trim() || !password){
            return
        }

        try{
            email.toLowerCase();
            await api.post("/users", {
                name,
                email,
                password,
            });

        }catch(err){
            console.log(err);
            return;
        }

        redirect("/");
    }

    return(
        <>
            <div className={style.containerCenter}>
                <Image src={logoImg}
                alt="Logo da pizzaria"
                />

                <section className={style.loginArea}>
                    <h1>Criando sua conta</h1>
                    <form action={handleRegister}>
                        <input type="text"
                            name="name"
                            placeholder="Digite seu nome..."
                            required
                            className={style.input}
                        />

                        <input type="email"
                            name="email"
                            placeholder="Digite seu e-mail..."
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
                            <span>Acessar</span> <CiPizza size={30}/>
                        </button>
                    </form>
                    <h2 className={style.text}>já possui uma conta? <Link href={"/"}>Faça o login</Link></h2>
                </section>
            </div>
        </>
    )
}