import SheetClient from "../../../components/SheetClient"

export default async function SingleSheet({params} : {params : Promise<{slug  : string }>}){
    
    const sheetId = (await params).slug
    
    return <div className=" bg-[#1A1A1F] h-[100vh] overflow-hidden text-white ">
        <SheetClient />
    </div>
}