export const storage = {
  getItem: <T>(key: string): T | undefined => {
    const item = localStorage.getItem(key);

    try {
      return item ? (JSON.parse(item) as T) : undefined;
    } catch {
      return undefined;
    }
  },
  setItem: (key: string, value: unknown) => {
    const item = JSON.stringify(value);

    localStorage.setItem(key, item);
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
  getAllKeys: (): string[] => {
    const keys = [];

    for (let step = 0; step < localStorage.length; step++) {
      keys.push(localStorage.key(step) as string);
    }

    return keys;
  },
  removeAll: () => {
    localStorage.clear();
  },
};
