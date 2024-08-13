export const fakeApiRequest = async <T>(callback: () => T): Promise<T> => {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * (1000 - 250) + 250;

    if (Math.random() <= 0.1) {
      reject(new Error("10 percent chance of error"));
    }

    setTimeout(() => {
      resolve(callback());
    }, delay);
  });
};
