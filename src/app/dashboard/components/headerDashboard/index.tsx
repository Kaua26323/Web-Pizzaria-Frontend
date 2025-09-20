"use client"

import Image from "next/image";
import style from "./style.module.scss";
import logoImg from "@/app/assets/logo.svg";
import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export function HeaderDashboard(){
  const router = useRouter();

  async function handleLogout(){
    deleteCookie("session", {path: "/"});
    toast.success("Logout realizado com sucesso!");
    router.replace("/");
  }

  return(    
    <header className={style.headerContainer}>
      <div className={style.headerContent}>
        <Link href={"/dashboard"}>
          <Image alt="Logo da Pizzaria"
            src={logoImg}
            width={190}
            height={60}
            quality={100}
            priority
          />
        
        </Link>

        <nav className={style.navArea}>
          <Link href={"/dashboard/category"}>
            Categorias
          </Link>

          <Link href={"/dashboard/product"}>
            Produtos
          </Link>

          <form action={handleLogout}>
            <button type="submit">
              <IoLogOutOutline size={25} color="currentColor"/>
            </button>
          </form>
        </nav>
      </div>
    </header>
    )
}