import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface CurrentValuesProps {
  price: number;
  rsi: number;
  priceChange: number;
  tokenSymbol: string;
}

export const CurrentValues = ({ price, rsi, priceChange, tokenSymbol }: CurrentValuesProps) => {
  const isPricePositive = priceChange >= 0;
  const isOverbought = rsi > 70;
  const isOversold = rsi < 30;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-6 bg-card border-border">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Current Price</p>
            <p className="text-3xl font-bold text-foreground">
              {price.toFixed(6)} <span className="text-lg text-muted-foreground">SOL</span>
            </p>
            <div className={`flex items-center gap-1 mt-2 ${isPricePositive ? 'text-success' : 'text-destructive'}`}>
              {isPricePositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="text-sm font-semibold">
                {isPricePositive ? '+' : ''}{priceChange.toFixed(2)}%
              </span>
              <span className="text-xs text-muted-foreground">24h</span>
            </div>
          </div>
          <div className="p-3 bg-primary/10 rounded-lg">
            <Activity className="text-primary" size={24} />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">RSI (14-period)</p>
            <p className="text-3xl font-bold text-foreground">
              {rsi.toFixed(2)}
            </p>
            <div className="mt-2">
              {isOverbought && (
                <span className="text-sm font-semibold text-destructive">Overbought</span>
              )}
              {isOversold && (
                <span className="text-sm font-semibold text-success">Oversold</span>
              )}
              {!isOverbought && !isOversold && (
                <span className="text-sm font-semibold text-chart-blue">Neutral</span>
              )}
            </div>
          </div>
          <div className={`p-3 rounded-lg ${
            isOverbought ? 'bg-destructive/10' : isOversold ? 'bg-success/10' : 'bg-chart-blue/10'
          }`}>
            <Activity className={
              isOverbought ? 'text-destructive' : isOversold ? 'text-success' : 'text-chart-blue'
            } size={24} />
          </div>
        </div>
      </Card>
    </div>
  );
};
