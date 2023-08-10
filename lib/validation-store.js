const { create } = require("zustand");

const useValidationStore = create((set) => ({
  imageValid: "",
  categoryValid: "",
  tagsValid: "",
  titleValid: "",
  descValid: "",
  selectedCategory: "",

  setValidImage: (value) => set({ imageValid: value }),
  setCategoryValid: (value) => set({ categoryValid: value }),
  setTagsValidation: (value) => set({ tagsValid: value }),
  setTitleValidation: (value) => set({ titleValid: value }),
  setDescValidation: (value) => set({ descValid: value }),
  setSelectedCategory: (value) => set({ selectedCategory: value }),
}));

export default useValidationStore;
