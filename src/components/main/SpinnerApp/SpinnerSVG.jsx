import React from 'react'

function SpinnerSVGComponent({ color, style, className }) {

    if (!color) color = '#463AF3'

    return (
        <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            color={color}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={style}
            className={className}
        >
            <defs>
                <linearGradient id="spinner-secondHalf">
                    <stop offset="0%" stopOpacity="0" stopColor="currentColor" />
                    <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
                </linearGradient>
                <linearGradient id="spinner-firstHalf">
                    <stop offset="0%" stopOpacity="1" stopColor="currentColor" />
                    <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
                </linearGradient>
            </defs>

            <g strokeWidth="10">
                <path stroke="url(#spinner-secondHalf)" d="M 4 100 A 96 96 0 0 1 196 100" />
                <path stroke="url(#spinner-firstHalf)" d="M 196 100 A 96 96 0 0 1 4 100" />

                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    d="M 4 100 A 96 96 0 0 1 4 98"
                />
            </g>

            <animateTransform
                from="0 0 0"
                to="360 0 0"
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1000ms"
            />
        </svg>
    )
}

export const SpinnerSVG = SpinnerSVGComponent
