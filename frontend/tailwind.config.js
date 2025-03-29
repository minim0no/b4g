/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            spacing: {
                30: "7.5rem",
                50: "12.5rem",
                60: "15rem", // Adds a spacing value of 60, equivalent to 15rem
                70: "17.5rem",
                80: "20rem",
                90: "22.5rem",
                100: "25rem",
                110: "27.5rem",
                120: "30rem",
            },
            fontFamily: {
                mont: ["Montserrat", "sans-serif"],
            },
            fontWeight: {
                light: 300,
                normal: 400,
                medium: 500,
                semibold: 600,
                bold: 700,
            },
            colors: {
                navy: "#005174",
                lightBlue: "#C5EDFF",
                spaceBlack: "#121111",
                hackBeige: "#D9D0B2",
                hackRed: "#902300",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-5%)" },
                },
                sheep: {
                    "0%, 100%": { transform: "translateY(0) rotate(-12deg)" },
                    "50%": { transform: "translateY(-5%) rotate(-12deg)" },
                },
                meteor: {
                    "0%": {
                        transform: "rotate(215deg) translateX(0)",
                        opacity: 1,
                    },
                    "70%": { opacity: 1 },
                    "100%": {
                        transform: "rotate(215deg) translateX(-500px)",
                        opacity: 0,
                    },
                },
            },
            animation: {
                float: "float 2s ease-in-out infinite",
                bubble: "float 3s ease-in-out infinite",
                pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                sheep: "sheep 3s ease-in-out infinite",
                meteor: "meteor 5s linear infinite",
            },
        },
    },
    plugins: [],
};
