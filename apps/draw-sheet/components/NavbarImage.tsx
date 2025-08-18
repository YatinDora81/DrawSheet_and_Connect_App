import React from 'react'
import { svg_string } from '../utils/mockdata'
import { useAvatar } from '../hooks/useAvatars';

function NavbarImage({ name, svg }: { name?: string, svg?: string }) {
    const { avatars } = useAvatar()
    if (!svg || (avatars && avatars.length === 0)) {
        return <div className={`hover:bg-zinc-800 flex items-center justify-center cursor-pointer h-[3rem] aspect-square transition-colors duration- group rounded-xl `} style={{ padding: '0.4rem' }}>
            {/* {<div className="h-full w-full group-hover:border flex items-center justify-center  group-hover:border-zinc-300 font-mono  rounded-full aspect-square">{name}</div>} */}
            {<div
                dangerouslySetInnerHTML={{ __html: svg_string }}
                className='h-full border border-zinc-800 rounded-full aspect-square'
            />}
        </div>
    }

    const num = parseInt(svg as string) % 18;
    return (
        <div className={`hover:bg-zinc-800 flex items-center justify-center cursor-pointer h-[3rem] aspect-square transition-colors duration- group rounded-xl `} style={{ padding: '0.4rem' }}>
            {<div
                dangerouslySetInnerHTML={{ __html: avatars[num] }}
                className='h-full border border-zinc-800 rounded-full aspect-square'
            />}
        </div>

    )
}

export default NavbarImage