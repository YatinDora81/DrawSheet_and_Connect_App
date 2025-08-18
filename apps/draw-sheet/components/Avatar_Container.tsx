"use client"
import { useAvatar } from '../hooks/useAvatars'

function Avatar_Container() {
    
    const {avatars , updateAvatar} = useAvatar()


    if (!avatars?.length) {
        return <div className="text-sm text-gray-500">Loading avatars...</div>
    }

    return (
        <div className='flex justify-start items-start flex-wrap gap-3'>
            {
                avatars.map((svg : string, i : number) => (
                    <div key={i} onClick={()=>updateAvatar(i)} className='hover:bg-zinc-800 cursor-pointer transition-colors duration- rounded-xl' style={{ padding: '0.4rem' }}>
                        <div
                            dangerouslySetInnerHTML={{ __html: svg }}
                            className='h-[3.3rem] border border-zinc-800 rounded-full aspect-square'
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default Avatar_Container
