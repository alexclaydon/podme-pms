module.exports = {
  important: true,
  purge: false,
  theme: {
    extend: {
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
