
const useCurrencyService = () => {
    const _url = 'https://www.cbr-xml-daily.ru/latest.js';

    const getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${_url}, status: ${res.status}`);
        }

        return await res.json();
    }

    const getAllCurrency = async () => {
        const data = await getResource(_url);
        return data.rates;
    }

    return {
        getAllCurrency
    }

}

export default useCurrencyService;