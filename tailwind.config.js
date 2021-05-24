module.exports = {
  important: true,
  purge: {
    enabled: process.env.NODE_ENV === "production" ? true : false,
    content: [
      "./app/javascript/**/*.js",
      "./app/javascript/**/**/*.js",
      "./app/javascript/**/**/**/*.js",
      "./app/javascript/**/*.jsx",
      "./app/javascript/**/**/*.jsx",
      "./app/javascript/**/**/**/*.jsx",
      "./app/views/**/**/*.slim",
      "./app/views/**/**/*/*.slim",
    ],
    defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  },
  theme: {
    extend: {
      spacing: {
        "1.5": "0.375rem",
        "18": "4.5rem",
        "120": "30rem",
        "144": "36rem",
      },
      screens: {
        'sm': '768px',
        'md': '991px',
      }
    }
  },
  variants: {
    borderRadius: ['first', 'last'],
    borderWidth: ['first', 'last']
  }
};
