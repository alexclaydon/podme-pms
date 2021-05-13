module.exports = {
  important: true,
  purge: false,
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
