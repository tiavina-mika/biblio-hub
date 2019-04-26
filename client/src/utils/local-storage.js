const suffix = process.env.REACT_APP_ENV === 'production'
  ? ''
  : `-${process.env.REACT_APP_ENV}`;

export const resetStorage = () => {
  localStorage.removeItem(`biblio${suffix}-authenticated`);
  localStorage.removeItem(`biblio${suffix}-id`);
  localStorage.removeItem(`biblio${suffix}-email`);
  localStorage.removeItem(`biblio${suffix}-isAdmin`);
  localStorage.removeItem(`biblio${suffix}-token`);
};

export const setStorage = (values = {}) => {
  Object.keys(values).forEach((key) => {
    localStorage.setItem(`biblio${suffix}-${key}`, values[key]);
  });
};

export const getStorage = (key) => {
  return localStorage.getItem(`biblio${suffix}-${key}`);
};

