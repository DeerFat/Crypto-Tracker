const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,cad&include_24hr_change=true`;

    async function fetchBitcoinData() {
    try {
        const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to Retrieve Data');
        const data = await response.json();

    const priceUsd = data.bitcoin.usd.toFixed(2);
    const priceCad = data.bitcoin.cad.toFixed(2); 
    const change = data.bitcoin.usd_24h_change.toFixed(2);

        document.getElementById('price-usd').textContent = `USD: $${priceUsd}`;
        document.getElementById('price-cad').textContent = `CAD: $${priceCad}`;
        document.getElementById('change').textContent = `24h Change: ${change}%`;
        document.getElementById('change').style.color = change >= 0 ? 'green' : 'red';

    const currentTime = new Date().toLocaleString();
    document.getElementById('last-updated').textContent = `Last updated: ${currentTime}`;

    } catch (error) {
        document.getElementById('price-usd').textContent = 'Too Many API Requests/Failed to Retrieve Data';
        document.getElementById('price-cad').textContent = '';
        document.getElementById('change').textContent = '';
        console.error(error.message);
        }
    }

fetchBitcoinData();

setInterval(fetchBitcoinData, 600000);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('refresh-button').addEventListener('click', async (event) => {
        const button = event.target;
        
        button.disabled = true;
        button.textContent = 'Wait 15 Seconds';

        document.getElementById('price-usd').textContent = 'Loading USD...';
        document.getElementById('price-cad').textContent = 'Loading CAD...';
        document.getElementById('change').textContent = 'Loading...';

        await new Promise(resolve => setTimeout(resolve, 500));

        fetchBitcoinData();

        setTimeout(() => {
            button.disabled = false;
            button.textContent = 'Refresh Now';
        }, 15000);
    });
});