// Generate mock trading data
export const generateMockPriceData = (basePrice: number, count: number = 50) => {
  const data = [];
  let price = basePrice;
  const now = new Date();

  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000); // 1 minute intervals
    const change = (Math.random() - 0.5) * basePrice * 0.02; // ±2% change
    price = Math.max(price + change, basePrice * 0.5); // Don't go below 50% of base
    
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      price: parseFloat(price.toFixed(6)),
    });
  }

  return data;
};

// Calculate RSI
export const calculateRSI = (prices: number[], period: number = 14): number => {
  if (prices.length < period + 1) return 50;

  let gains = 0;
  let losses = 0;

  // Calculate initial average gain and loss
  for (let i = 1; i <= period; i++) {
    const change = prices[i] - prices[i - 1];
    if (change >= 0) {
      gains += change;
    } else {
      losses -= change;
    }
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  // Calculate subsequent values using smoothed averages
  for (let i = period + 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    if (change >= 0) {
      avgGain = (avgGain * (period - 1) + change) / period;
      avgLoss = (avgLoss * (period - 1)) / period;
    } else {
      avgGain = (avgGain * (period - 1)) / period;
      avgLoss = (avgLoss * (period - 1) - change) / period;
    }
  }

  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
};

export const generateRSIData = (priceData: { time: string; price: number }[]) => {
  const prices = priceData.map(d => d.price);
  
  return priceData.map((point, index) => {
    const relevantPrices = prices.slice(Math.max(0, index - 20), index + 1);
    const rsi = calculateRSI(relevantPrices);
    
    return {
      time: point.time,
      rsi: parseFloat(rsi.toFixed(2)),
    };
  });
};

// Token base prices
export const TOKEN_BASE_PRICES: Record<string, number> = {
  "0x1a2b3c": 0.00045,
  "0x4d5e6f": 0.00032,
  "0x7g8h9i": 0.00078,
  "0xj1k2l3": 0.00056,
  "0xm4n5o6": 0.00021,
};
