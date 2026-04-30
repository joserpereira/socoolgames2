module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./public/index.html"    
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16A34A',
        secondary: '#F4C542',
        darkgreen: '#5E9C2E',
        dark: '#2E2E2E'
      }
    }
  },
  safelist: [
    // 'grid-cols-1','grid-cols-2','grid-cols-3','grid-cols-4','grid-cols-5','grid-cols-6',
    //          'md:grid-cols-1','md:grid-cols-2','md:grid-cols-3','md:grid-cols-4','md:grid-cols-5','md:grid-cols-6',
    //          'sm:grid-cols-1','sm:grid-cols-2','sm:grid-cols-3','sm:grid-cols-4','sm:grid-cols-5','sm:grid-cols-6',
    //          'col-span-1', 'col-span-2', 'col-span-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6',
    //         'bg-secondary',
          { pattern: /.*/ } 
        ],
            
  plugins: [],
}