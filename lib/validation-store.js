const { create } = require("zustand");

const useValidationStore = create((set) => ({
  image: "",
  title: "",
  desc: "",
  tags: "",
  category: "",
  content: "",

  setValidImage: (value) => set({ image: value }),
  setCategoryValid: (value) => set({ category: value }),
  setTagsValidation: (value) => set({ tags: value }),
  setTitleValidation: (value) => set({ title: value }),
  setDescValidation: (value) => set({ desc: value }),
  setContentValidation: (value) => set({ content: value }),
}));

export default useValidationStore;
