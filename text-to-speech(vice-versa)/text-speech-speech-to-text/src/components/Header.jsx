import React from 'react'
import RestartAltIcon from '@mui/icons-material/RestartAlt';


export default function Header() {
    return (
        <div className="relative group cursor-pointer hover:scale-110 transition-all duration-300" >
            <RestartAltIcon />

            <span class="absolute top-full left-2 -translate-x-1/2 mt-2 hidden group-hover:inline-block px-2 py-1 text-xs text-white bg-black rounded shadow-md whitespace-nowrap z-50">
                Refresh
            </span>
        </div>


    )
}
