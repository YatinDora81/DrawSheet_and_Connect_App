import Link from 'next/link';
import React from 'react'
import { FiSmartphone } from 'react-icons/fi';
import { MdOutlineMonitor } from 'react-icons/md';

function SheetMobileView() {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-zinc-950 p-6">
            <div className="text-center w-[90%] space-y-6 max-w-md">
                {/* Icons */}
                <div className="flex justify-center space-x-4 mb-6">
                    <FiSmartphone className="w-12 h-12 text-zinc-400" />
                    <div className="text-2xl text-zinc-400">→</div>
                    <MdOutlineMonitor className="w-12 h-12 text-blue-500" />
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-white">
                    Desktop Required
                </h1>

                {/* Description */}
                <p className="text-zinc-400 leading-relaxed">
                    Please use a laptop or desktop computer to access the drawing canvas.
                    The drawing experience is optimized for larger screens and precision input.
                </p>

                {/* Info Box */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 h-[10vh] text-lg flex justify-center items-center text-zinc-300">
                    Switch to a desktop or laptop to start creating your masterpiece!
                </div>

                {/* Action Button */}
                <div className="flex justify-center" style={{marginTop : "15px"}}>
                    <Link
                        href="/sheets"
                        className="w-40 h-[2.8rem] flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        Back To Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SheetMobileView;
