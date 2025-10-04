import { useState, useEffect } from "react";
import { TokenSelector, TOKENS } from "@/components/TokenSelector";
import { PriceChart } from "@/components/PriceChart";
import { RSIChart } from "@/components/RSIChart";
import { CurrentValues } from "@/components/CurrentValues";
import { generateMockPriceData, generateRSIData, TOKEN_BASE_PRICES } from "@/utils/mockData";
import { BarChart3 } from "lucide-react";

const Index = () => {
  const [selectedToken, setSelectedToken] = useState(TOKENS[0].address);
  const [priceData, setPriceData] = useState<Array<{ time: string; price: number }>>([]);
  const [rsiData, setRsiData] = useState<Array<{ time: string; rsi: number }>>([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentRSI, setCurrentRSI] = useState(0);
  const [priceChange, setPriceChange] = useState(0);

  // Initialize data when token changes
  useEffect(() => {
    const basePrice = TOKEN_BASE_PRICES[selectedToken];
    const initialPriceData = generateMockPriceData(basePrice, 50);
    const initialRSIData = generateRSIData(initialPriceData);

    setPriceData(initialPriceData);
    setRsiData(initialRSIData);
    setCurrentPrice(initialPriceData[initialPriceData.length - 1].price);
    setCurrentRSI(initialRSIData[initialRSIData.length - 1].rsi);

    // Calculate 24h change
    const change = ((initialPriceData[initialPriceData.length - 1].price - initialPriceData[0].price) / initialPriceData[0].price) * 100;
    setPriceChange(change);
  }, [selectedToken]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceData((prevData) => {
        const basePrice = TOKEN_BASE_PRICES[selectedToken];
        const lastPrice = prevData[prevData.length - 1].price;
        const change = (Math.random() - 0.5) * basePrice * 0.02;
        const newPrice = Math.max(lastPrice + change, basePrice * 0.5);
        const now = new Date();
        const newTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        const newData = [...prevData.slice(1), { time: newTime, price: parseFloat(newPrice.toFixed(6)) }];
        setCurrentPrice(newPrice);

        // Calculate price change
        const newChange = ((newData[newData.length - 1].price - newData[0].price) / newData[0].price) * 100;
        setPriceChange(newChange);

        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedToken]);

  // Update RSI when price data changes
  useEffect(() => {
    if (priceData.length > 0) {
      const newRSIData = generateRSIData(priceData);
      setRsiData(newRSIData);
      setCurrentRSI(newRSIData[newRSIData.length - 1].rsi);
    }
  }, [priceData]);

  const selectedTokenInfo = TOKENS.find(t => t.address === selectedToken);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <BarChart3 className="text-primary" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Trading Analytics</h1>
              <p className="text-muted-foreground">Real-time RSI & Price Tracking</p>
            </div>
          </div>
          <TokenSelector selectedToken={selectedToken} onTokenChange={setSelectedToken} />
        </div>

        {/* Current Values */}
        <CurrentValues
          price={currentPrice}
          rsi={currentRSI}
          priceChange={priceChange}
          tokenSymbol={selectedTokenInfo?.symbol || ""}
        />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PriceChart data={priceData} tokenSymbol={selectedTokenInfo?.symbol || ""} />
          <RSIChart data={rsiData} tokenSymbol={selectedTokenInfo?.symbol || ""} />
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-muted-foreground border-t border-border pt-6">
          <p>📊 Simulated real-time data for demonstration | RSI calculated using 14-period moving average</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
