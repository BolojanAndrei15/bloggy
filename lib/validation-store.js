const { create } = require("zustand");

const useValidationStore = create((set) => ({
  image: {
    filePath: "",
    fileName: "",
    fileSize: "",
    imageType: "",
  },
  title: "",
  desc: "",
  tags: "",
  category: "",
  content: "",

  setValidImage: (value) => set({ image: value }),
  setCategoryValid: (value) => set({ categoryValid: value }),
  setTagsValidation: (value) => set({ tagsValid: value }),
  setTitleValidation: (value) => set({ titleValid: value }),
  setDescValidation: (value) => set({ descValid: value }),
  setContentValidation: (value) => set({ content: value }),
}));

export default useValidationStore;
