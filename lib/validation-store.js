const { create } = require("zustand");

const useValidationStore = create((set) => ({
  imageValid: "",
  categoryValid: "",
  tagsValid: "",
  titleValid: "",
  descValid: "",

  setValidImage: (value) => set({ imageValid: value }),
  setCategoryValid: (value) => set({ categoryValid: value }),
  setTagsValidation: (value) => set({ tagsValid: value }),
  setTitleValidation: (value) => set({ titleValid: value }),
  setDescValidation: (value) => set({ descValid: value }),
}));

export default useValidationStore;
