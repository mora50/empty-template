const colors = {
  primary: "#2474FA",
};

module.exports = {
  important: true,
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        top: "0px -5px 15px 0px rgba(0,0,0,0.27)",
      },

      textColor: (theme) => theme("colors"),
      textColor: {
        primary: colors.primary,
      },

      borderColor: (theme) => ({
        ...theme("colors"),
        primary: colors.primary,
      }),
    },
  },
  variants: {},
  plugins: [],
};
