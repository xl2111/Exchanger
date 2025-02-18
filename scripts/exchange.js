const apiKey = "eb2b70855fffd50dd8ed8a51703765df";
const url = `https://api.currencylayer.com/live?access_key=${apiKey}&currencies=EUR,UAH,PLN,ILS,USD&source=USD&format=1`;

export async function fetchExchangeRates() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.success) {
            throw new Error("Не вдалося отримати курси валют");
        }

        const rates = data.quotes;
        localStorage.setItem("exchangeRates", JSON.stringify(rates));
        localStorage.setItem("lastUpdate", Date.now());

        return rates;
    } catch (error) {
        console.error("Помилка завантаження курсів:", error);
        return null;
    }
}

export function isRatesOutdated() {
    const lastUpdate = localStorage.getItem("lastUpdate");
    return !lastUpdate || (Date.now() - Number(lastUpdate) > 60 * 60 * 1000); // 1 година
}

export async function getRates() {
    if (isRatesOutdated()) {
        return await fetchExchangeRates();
    } else {
        return JSON.parse(localStorage.getItem("exchangeRates"));
    }
}

export async function convertCurrency(amount, fromCurrency, toCurrency) {
    const rates = await getRates(); // Отримання актуальних курсів валют

    if (!rates) {
        console.error("Немає інформації про курси валют.");
        return null;
    }

    // Обробка випадку, коли валюта — це USD
    const fromRate = fromCurrency === "USD" ? 1 : rates[`USD${fromCurrency}`];
    const toRate = toCurrency === "USD" ? 1 : rates[`USD${toCurrency}`];

    if (!fromRate || !toRate) {
        console.error("Неправильний код валюти.");
        return null;
    }

    const amountInUSD = amount / fromRate; // Конвертуємо суму у долари США
    const convertedAmount = amountInUSD * toRate; // Конвертуємо з USD у цільову валюту

    return convertedAmount.toFixed(2); // Повертаємо округлене значення
}