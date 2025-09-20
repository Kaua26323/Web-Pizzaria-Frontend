"use client"
import { BsCloudUpload } from "react-icons/bs";
import style from "./style.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { FormButton } from "@/app/dashboard/components/formButton";
import { CategoryProps } from "@/types/category.type";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FormProductsProps {
  categories: CategoryProps[];
}

export function ProductForm({ categories }:FormProductsProps){
  const router = useRouter();
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>("");

  function handleFile(e: ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files[0]){
      const image = e.target.files[0];

      if(image.type !== "image/jpeg" && image.type !== "image/png"){
        toast.warning("Formato de imagem invalido!");
        return
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  }

  async function handleRegisterProduct(formData: FormData){
    const category_id = formData.get("category");   
    const name = formData.get("name");    
    const price = formData.get("price");   
    const description = formData.get("description"); 

    if(!category_id || !name || !price || !description || !image){
      toast.warning("Valores invalidos...")
      return;
    }

    const data = new FormData();

    data.append("category_id", category_id);
    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("file", image);


    const token = await getCookieClient();

    try{
      await api.post("/create-product", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("Produto criado com sucesso!");
      router.push("/dashboard");

    }catch(err){
      console.log(err);
      toast.error("Algo deu errado, tente novamente mais tarde");
      return;
    }

  }

  return(
    <main className={style.container}>
      <h1>Novo Produto</h1>

      <form action={handleRegisterProduct} className={style.form}>
        <label className={style.imageLabel}>
          <span>
            <BsCloudUpload size={50} color="FFF"/>
          </span>

          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFile}
            required
          />
          {previewImage && (
            <Image
              alt="Imagem de preview"
              src={previewImage}
              className={style.previewImage}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>

        <select name="category">
          {categories.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Digite o nome do produto..."
          className={style.input}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Preço do produto..."
          className={style.input}
          required
        />

        <textarea
          name="description"
          className={style.input}
          placeholder="Digite a descrição do produto..."
          required
        >
        </textarea>
        
        <FormButton 
          name="Cadastrar Produto"
          bgColor="var(--green-900)"

        />
      </form>
    </main>
  )
}