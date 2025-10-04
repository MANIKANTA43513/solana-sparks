import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card } from "@/components/ui/card";

interface PriceDataPoint {
  time: string;
  price: number;
}

interface PriceChartProps {
  data: PriceDataPoint[];
  tokenSymbol: string;
}

export const PriceChart = ({ data, tokenSymbol }: PriceChartProps) => {
  const isPositive = data.length >= 2 && data[data.length - 1].price >= data[0].price;

  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{tokenSymbol} Price (SOL)</h3>
        <p className="text-sm text-muted-foreground">Real-time price movement</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))',
            }}
            labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositive ? 'hsl(var(--chart-green))' : 'hsl(var(--chart-red))'}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: isPositive ? 'hsl(var(--chart-green))' : 'hsl(var(--chart-red))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
