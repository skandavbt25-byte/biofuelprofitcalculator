document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Input values
    const feedstock = document.getElementById('feedstock').value;
    const method = document.getElementById('method').value;
    const energy = parseFloat(document.getElementById('energy').value);
    const feedstockCost = parseFloat(document.getElementById('feedstockCost').value);
    const marketPrice = parseFloat(document.getElementById('marketPrice').value);
    const currency = document.getElementById('currency').value;

    // Base cost factors per feedstock (example values per gallon)
    const feedstockYield = {
        corn: 2.8,       // gallons per ton
        algae: 7,        // gallons per ton
        switchgrass: 1.2 // gallons per ton
    };

    // Processing cost factor ($ per gallon)
    const processCost = {
        fermentation: 0.5,
        transesterification: 0.8
    };

    // Energy cost ($ per kWh, example)
    const energyCostPerKWh = 0.1;

    // Calculate production cost per gallon
    const feedstockCostPerGallon = feedstockCost / feedstockYield[feedstock];
    const energyCostPerGallon = energy * energyCostPerKWh;
    const processingCost = processCost[method];

    let productionCostUSD = feedstockCostPerGallon + energyCostPerGallon + processingCost;
    
    // Convert to selected currency (example rates)
    const currencyRates = {
        USD: 1,
        EUR: 0.93,
        INR: 83,
        GBP: 0.81
    };

    const productionCost = productionCostUSD * currencyRates[currency];
    const profit = (marketPrice * currencyRates[currency]) - productionCost;

    // Display result
    document.getElementById('result').innerHTML = `
        Estimated Production Cost: <strong>${productionCost.toFixed(2)} ${currency}</strong><br>
        Potential Profit per Gallon: <strong>${profit.toFixed(2)} ${currency}</strong>
    `;
});
