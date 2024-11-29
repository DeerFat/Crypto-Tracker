const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd,cad&include_24hr_change=true`;

// bitcoin 
// bitcoin 
// bitcoin 

async function fetchBitcoinData() {
    try {
        const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to Retrieve Data');
        const data = await response.json();

    const priceUsd = data.bitcoin.usd.toFixed(2);
    const priceCad = data.bitcoin.cad.toFixed(2); 
    const change = data.bitcoin.usd_24h_change.toFixed(2);

        document.getElementById('btcprice-usd').textContent = `USD: $${priceUsd}`;
        document.getElementById('btcprice-cad').textContent = `CAD: $${priceCad}`;
        document.getElementById('btcchange').textContent = `24h Change: ${change}%`;
        document.getElementById('btcchange').style.color = change >= 0 ? 'green' : 'red';

    const currentTime = new Date().toLocaleString();
    document.getElementById('btclast-updated').textContent = `Last updated: ${currentTime}`;

    } catch (error) {
        document.getElementById('btcprice-usd').textContent = 'Too Many API Requests/Failed to Retrieve Data';
        document.getElementById('btcprice-cad').textContent = '';
        document.getElementById('btcchange').textContent = '';
        console.error(error.message);
    }
}

fetchBitcoinData();

setInterval(fetchBitcoinData, 600000);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btcrefresh-button').addEventListener('click', async (event) => {
        const button = event.target;
        
        button.disabled = true;
        button.textContent = 'Wait 15 Seconds';

        document.getElementById('btcprice-usd').textContent = 'Loading USD...';
        document.getElementById('btcprice-cad').textContent = 'Loading CAD...';
        document.getElementById('btcchange').textContent = 'Loading...';

        await new Promise(resolve => setTimeout(resolve, 500));

        fetchBitcoinData();

        setTimeout(() => {
            button.disabled = false;
            button.textContent = 'Refresh Now';
        }, 15000);
    });
});

// ethereum 
// ethereum 
// ethereum 

async function fetchEthereumData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to Retrieve Data');
        const data = await response.json();

        if (data.ethereum) {
            const priceUsd = data.ethereum.usd.toFixed(2);
            const priceCad = data.ethereum.cad.toFixed(2); 
            const change = data.ethereum.usd_24h_change.toFixed(2);

            document.getElementById('ethprice-usd').textContent = `USD: $${priceUsd}`;
            document.getElementById('ethprice-cad').textContent = `CAD: $${priceCad}`;
            document.getElementById('ethchange').textContent = `24h Change: ${change}%`;
            document.getElementById('ethchange').style.color = change >= 0 ? 'green' : 'red';

            const currentTime = new Date().toLocaleString();
            document.getElementById('ethlast-updated').textContent = `Last updated: ${currentTime}`;
        } else {
            throw new Error('Ethereum data is missing');
        }

    } catch (error) {
        document.getElementById('ethprice-usd').textContent = 'Too Many API Requests/Failed to Retrieve Data';
        document.getElementById('ethprice-cad').textContent = '';
        document.getElementById('ethchange').textContent = '';
        console.error(error.message);
    }
}

fetchEthereumData();
setInterval(fetchEthereumData, 600000);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ethrefresh-button').addEventListener('click', async (event) => {
        const button = event.target;
        
        button.disabled = true;
        button.textContent = 'Wait 15 Seconds';

        document.getElementById('ethprice-usd').textContent = 'Loading USD...';
        document.getElementById('ethprice-cad').textContent = 'Loading CAD...';
        document.getElementById('ethchange').textContent = 'Loading...';

        await new Promise(resolve => setTimeout(resolve, 500));

        fetchEthereumData();

        setTimeout(() => {
            button.disabled = false;
            button.textContent = 'Refresh Now';
        }, 15000);
    });
});
