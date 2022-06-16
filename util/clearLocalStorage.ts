import LocalStorage from "../core/localStorage";

export const clearLocalStorage = () => {
  LocalStorage.removeItem("booktez-token");
  LocalStorage.removeItem("booktez-nickname");
  LocalStorage.removeItem("booktez-email");
};
