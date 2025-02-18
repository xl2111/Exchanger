"use strict"
import {type, preloader} from "./preloader.js"
import {fetchExchangeRates, isRatesOutdated, getRates, convertCurrency} from './exchange.js';

document.addEventListener("DOMContentLoaded", () => {
	let curr = document.getElementById("currs");
	let currSecond = document.getElementById("currs-second");

	let currImg = document.getElementById("curr-img")
	let currImgSecond = document.getElementById("curr-img-second")

	let fastBtn = document.getElementById("fast")
	let hundredBtn = document.getElementById("100")
	let fiveHundredBtn = document.getElementById("500")
	let thousandBtn = document.getElementById("1000")
	let backBtn = document.getElementById("back")
	let themeBtn = document.getElementById("theme")
	
	const amountInput = document.querySelector(".basic__value");
	const fromCurrencySelect = curr
	const toCurrencySelect = currSecond
	const convertButton = document.querySelector(".basic__convert-btn");
	const changeButton = document.getElementById("change")
	const resultDisplay = document.getElementById("s_value")
	const console = document.getElementById("console")

	fastBtn.addEventListener("click", () => {
		fastBtn.style.display = "none"
	})

	hundredBtn.addEventListener("click", () => {
		if (fromCurrencySelect.value === "disabled selected") {
			console.textContent = "Будьласка оберіть валюту!"
			setTimeout(() => {
				console.textContent = "";
			}, 3000)
			return;
	} else if (toCurrencySelect.value === "disabled selected") {
		console.textContent = "Будьласка оберіть валюту!"
			setTimeout(() => {
				console.textContent = "";
			}, 3000)
			return;
	}
		amountInput.value = "100"
		convertButton.click()
	})

	fiveHundredBtn.addEventListener("click", () => {
		if (fromCurrencySelect.value === "disabled selected") {
			console.textContent = "Будьласка оберіть валюту!"
			setTimeout(() => {
				console.textContent = "";
			}, 3000)
			return;
	} else if (toCurrencySelect.value === "disabled selected") {
		console.textContent = "Будьласка оберіть валюту!"
			setTimeout(() => {
				console.textContent = "";
			}, 3000)
			return;
	}
		amountInput.value = "500"
		convertButton.click()
	})

	thousandBtn.addEventListener("click", () => {
		if (fromCurrencySelect.value === "disabled selected") {
			console.textContent = "Будьласка оберіть валюту!"
			setTimeout(() => {
				console.textContent = "";
			}, 3000)
			return;
	} else if (toCurrencySelect.value === "disabled selected") {
		console.textContent = "Будьласка оберіть валюту!"
			setTimeout(() => {
				console.textContent = "";
			}, 3000)
			return;
	}
		amountInput.value = "1000"
		convertButton.click()
	})

	backBtn.addEventListener("click", () => {
		fastBtn.style.display = "flex"
		amountInput.value = ""
		resultDisplay.textContent = ""
	})

	changeButton.addEventListener("click", async () => {
		const from = fromCurrencySelect.value;
		const to = toCurrencySelect.value;

		fromCurrencySelect.value = to;
		toCurrencySelect.value = from;
		convertButton.click()
	})

	themeBtn.addEventListener("click", () => {
		const root = document.documentElement;
		const isDark = root.style.getPropertyValue("--bg") === "#3B3A4A";
		const themeBtnImg = document.getElementById("theme-img")

		if (isDark) {
			root.style.setProperty('--color', '#403D39');
			root.style.setProperty('--border', '#2F2926');
			root.style.setProperty('--bg', '#e5e8e1');
			root.style.setProperty('--light', '#d5d6d2');
			root.style.setProperty('--app', '#b1a99e');
			themeBtnImg.setAttribute("src", "./imgs/dark.png")

		} else {
			root.style.setProperty('--color', '#F5F9F8');
			root.style.setProperty('--border', '#A1A2AB');
			root.style.setProperty('--bg', '#3B3A4A');
			root.style.setProperty('--light', '#252330');
			root.style.setProperty('--app', '#595168');
			themeBtnImg.setAttribute("src", "./imgs/light.png")
		}
	})

	convertButton.addEventListener("click", async () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    // Перевіряємо введені дані
    if (isNaN(amount) || amount <= 0) {
        console.textContent = "Будьласка введіть коректну суму!"
				setTimeout(() => {
					console.textContent = "";
				}, 3000)
        return;
    }
    if (fromCurrency === "disabled selected") {
				console.textContent = "Будьласка оберіть валюту!"
				setTimeout(() => {
					console.textContent = "";
				}, 3000)
        return;
    } else if (toCurrency === "disabled selected") {
			console.textContent = "Будьласка оберіть валюту!"
				setTimeout(() => {
					console.textContent = "";
				}, 3000)
        return;
		}

    // Викликаємо функцію конвертації
    const convertedAmount = await convertCurrency(amount, fromCurrency, toCurrency);

    // Виводимо результат
    if (convertedAmount !== null) {
        resultDisplay.textContent = `${convertedAmount}`;
    } else {
        console.textContent = "Помилка конвертації!";
				setTimeout(() => {
					console.textContent = "";
				}, 3000)
    }
});

	curr.addEventListener("change", () => {
		let value = curr.value
		
		if (value == "USD") {
			currImg.setAttribute("src", "imgs/currency/usd.png")
		} else if (value == "UAH") {
			currImg.setAttribute("src", "imgs/currency/uah.png")
		} else if (value == "EUR") {
			currImg.setAttribute("src", "imgs/currency/eur.png")
		} else if (value == "PLN") {
			currImg.setAttribute("src", "imgs/currency/pln.png")
		} else if (value == "ILS") {
			currImg.setAttribute("src", "imgs/currency/ils.png")
		}
	})

	currSecond.addEventListener("change", () => {
		let value = currSecond.value
		
		if (value == "USD") {
			currImgSecond.setAttribute("src", "imgs/currency/usd.png")
		} else if (value == "UAH") {
			currImgSecond.setAttribute("src", "imgs/currency/uah.png")
		} else if (value == "EUR") {
			currImgSecond.setAttribute("src", "imgs/currency/eur.png")
		} else if (value == "PLN") {
			currImgSecond.setAttribute("src", "imgs/currency/pln.png")
		} else if (value == "ILS") {
			currImgSecond.setAttribute("src", "imgs/currency/ils.png")
		}
	})
	type()
	preloader()
})

