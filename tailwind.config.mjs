/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#FF3333',
					hover: '#FF4D4D',
					dark: '#CC2929',
					light: 'rgba(255, 51, 51, 0.15)',
				},
				background: {
					dark: '#1a1a1a',
					darker: '#222222',
				}
			},
			fontFamily: {
				'plus-jakarta': ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
				'outfit': ['Outfit', 'system-ui', 'sans-serif'],
				'inter': ['Inter', 'system-ui', 'sans-serif'],
				'space-grotesk': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			boxShadow: {
				'2xl': '20px 20px 60px rgba(0, 0, 0, 0.5), 1px 1px 0px 1px rgba(255, 51, 51, 0.3)',
			}
		},
	},
	plugins: [],
}
