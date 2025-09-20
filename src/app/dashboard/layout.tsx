import { Metadata } from "next";
import { HeaderDashboard } from "./components/headerDashboard";
import { OrderProvider } from "@/providers/order";

export const metadata: Metadata = {
    title: "Pizzaria - Dashboard",
    description: "Gerenciamento de pedidos.",
    keywords: ["Dashboard Pizzas", "Sujeito Pizza Dashboard"]
}

export default function DashboardLayout({children}: {children: React.ReactNode}){
    
    
    return(
        <>
          <HeaderDashboard/>
          <OrderProvider>
            {children}
          </OrderProvider>
        </>
               
    )
    
}