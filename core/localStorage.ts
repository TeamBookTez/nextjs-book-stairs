class LocalStorage {
  constructor() {}

  static setItem(key: string, item: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, item);
    }
  }

  static getItem(key: string) {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key) as string;
    }

    return "";
  }

  static removeItem(key: string) {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  }

  static setUserSession(token: string, nickname: string, email: string) {
    this.setItem("booktez-token", token);
    this.setItem("booktez-nickname", nickname);
    this.setItem("booktez-email", email);
  }

  static clearUserSession() {
    this.removeItem("booktez-token");
    this.removeItem("booktez-nickname");
    this.removeItem("booktez-email");
  }
}

export default LocalStorage;
