export function getLocalStorage() {
  return JSON.parse(localStorage.getItem('storage')) || {};
}

export function setLocalStorage(options) {
  let storage = JSON.parse(localStorage.getItem('storage')) || {};
  for (let key in options) {
    storage[key] = options[key];
  }
  localStorage.setItem('storage', JSON.stringify(storage));
}

export function removeLocalStorage(array) {
  let storage = JSON.parse(localStorage.getItem('storage')) || {};
  array.forEach(arr => {
    delete storage[arr];
  });
  localStorage.setItem('storage', JSON.stringify(storage));
}