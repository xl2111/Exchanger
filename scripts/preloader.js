export const text = "Welcome to\nExchanger App"
let i = 0;

export function type() {
	if (i < text.length) {
		let char = text[i] === "\n" ? "<br>" : text[i];
		document.getElementById("text").innerHTML += char
		i++
		setTimeout(type, 100)
	}
}

export function preloader() {
  setTimeout(() => {
    let preload = document.getElementById("preloader");
		preload.style.animation = "slideOn 1s ease-out"
		setTimeout(() => {
		preload.style.display = "none"
		}, 1000)
  }, 4000);  // Затримка 4 секунди перед зникненням
}

preloader()