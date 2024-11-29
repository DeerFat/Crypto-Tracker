const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,dogecoin&vs_currencies=usd,cad&include_24hr_change=true`;

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

// dogecoin 
// dogecoin 
// dogecoin 

async function fetchDogecoinData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to Retrieve Data');
        const data = await response.json();

        if (data.dogecoin) {
            const priceUsd = data.dogecoin.usd.toFixed(2);
            const priceCad = data.dogecoin.cad.toFixed(2); 
            const change = data.dogecoin.usd_24h_change.toFixed(2);

            document.getElementById('dgprice-usd').textContent = `USD: $${priceUsd}`;
            document.getElementById('dgprice-cad').textContent = `CAD: $${priceCad}`;
            document.getElementById('dgchange').textContent = `24h Change: ${change}%`;
            document.getElementById('dgchange').style.color = change >= 0 ? 'green' : 'red';

            const currentTime = new Date().toLocaleString();
            document.getElementById('dglast-updated').textContent = `Last updated: ${currentTime}`;
        } else {
            throw new Error('dogecoin data is missing');
        }

    } catch (error) {
        document.getElementById('dgprice-usd').textContent = 'Too Many API Requests/Failed to Retrieve Data';
        document.getElementById('dgprice-cad').textContent = '';
        document.getElementById('dgchange').textContent = '';
        console.error(error.message);
    }
}

fetchDogecoinData();
setInterval(fetchDogecoinData, 600000);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('dgrefresh-button').addEventListener('click', async (event) => {
        const button = event.target;
        
        button.disabled = true;
        button.textContent = 'Wait 15 Seconds';

        document.getElementById('dgprice-usd').textContent = 'Loading USD...';
        document.getElementById('dgprice-cad').textContent = 'Loading CAD...';
        document.getElementById('dgchange').textContent = 'Loading...';

        await new Promise(resolve => setTimeout(resolve, 500));

        fetchDogecoinData();

        setTimeout(() => {
            button.disabled = false;
            button.textContent = 'Refresh Now';
        }, 15000);
    });
});

// IMAGES
// IMAGES 
// IMAGES 


const coinInfoUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin`;

async function fetchCoinImages() {
    try {
        const response = await fetch(coinInfoUrl);
        if (!response.ok) throw new Error('Failed to Retrieve Coin Image Data');
        const coinInfoData = await response.json();

        // Set images for both Bitcoin and Ethereum
        document.getElementById('btc-coin-image').src = coinInfoData[0].image;
        document.getElementById('eth-coin-image').src = coinInfoData[1].image;
        document.getElementById('dg-coin-image').src = coinInfoData[2].image;
    } catch (error) {
        console.error('Error fetching coin images:', error.message);
    }
}

fetchCoinImages();