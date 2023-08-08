const { create } = require("zustand");

const useValidationStore = create((set) => ({
  imageValid: "",
  categoryValid: "",

  setValidImage: (value) => set({ imageValid: value }),
  setCategoryValid: (value) => set({ categoryValid: value }),
}));

export default useValidationStore;
