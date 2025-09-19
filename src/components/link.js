export function navigateTo(to) {
  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event("pushstate"));
}

export default function Link({ to, title }) {
  function onClick(event) {
    event.preventDefault();
    window.history.pushState({}, "", to);
    window.dispatchEvent(new Event("pushstate"));
  }

  return `<a href="${to}" onclick="(${onClick.toString()})(event)">${title}</a>`;
}