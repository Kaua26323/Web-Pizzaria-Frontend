"use client"

import { useFormStatus } from "react-dom";
import style from "./style.module.scss"; 
import { FaSpinner } from "react-icons/fa";


interface ButtonProps {
    name: string;
    bgColor: string;
}

export function FormButton({name, bgColor}: ButtonProps){
  const { pending } = useFormStatus();
  //#8a8a8a
  
  return(
        <button
            type="submit"
            disabled={pending} 
            style={pending ? {backgroundColor: "var(--gray-100)"} : {backgroundColor: bgColor }}
            className={style.button}
        >
          { pending ? ( 
            <FaSpinner size={23} color="#FFF" className={style.spin}/>

          ): (
            <span>
              {name}
            </span>
          )}
        </button>
    )
}