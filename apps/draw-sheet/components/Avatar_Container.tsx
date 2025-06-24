"use client"
import React, { useEffect, useState } from 'react'
import { GET_AVATARS_URL } from "@repo/config/URL"

function Avatar_Container() {
    const [avatars, setAvatars] = useState<string[]>([])

    useEffect(() => {
        const fetchAvatars = async () => {
            try {
                const res = await fetch(GET_AVATARS_URL);
                const data = await res.json();

                if (data.success && Array.isArray(data.data.avatar)) {
                    setAvatars(data.data.avatar); // `avatar` is string[]
                }
            } catch (err) {
                console.error("Error fetching avatars", err);
            }
        }

        fetchAvatars()
    }, [])

    if (!avatars.length) {
        return <div className="text-sm text-gray-500">Loading avatars...</div>
    }

    return (
        <div className='flex justify-start items-start flex-wrap gap-3'>
            {
                avatars.map((svg, i) => (
                    <div key={i} className='hover:bg-zinc-800 cursor-pointer transition-colors duration- rounded-xl' style={{ padding: '0.4rem' }}>
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
