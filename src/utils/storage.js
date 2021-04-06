export function setItem(key, item) {
  window.sessionStorage.setItem(key, item)
}

export function getItem(key) {
  return window.sessionStorage.getItem(key)
}

export function removeItem(key) {
  window.sessionStorage.removeItem(key)
}
