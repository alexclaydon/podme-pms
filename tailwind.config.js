module.exports = {
  important: true,
  purge: false,
  theme: {
    extend: {
      spacing: {
        "1.5": "0.375rem",
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
