const text = "Welcome\nExchanger app"
let i = 0

function type() {
	if (i < text.length) {
		document.getElementById("text").innerHTML += text[i]
		i++
		setTimeout(type, 100)
	}
}

type()