import SheetClient from "../../../components/SheetClient"

export default async function SheetsPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug

    return <div className=" w-full h-full  "><SheetClient /></div>
}