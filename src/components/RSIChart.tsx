import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts";
import { Card } from "@/components/ui/card";

interface RSIDataPoint {
  time: string;
  rsi: number;
}

interface RSIChartProps {
  data: RSIDataPoint[];
  tokenSymbol: string;
}

export const RSIChart = ({ data, tokenSymbol }: RSIChartProps) => {
  const currentRSI = data.length > 0 ? data[data.length - 1].rsi : 50;
  const isOverbought = currentRSI > 70;
  const isOversold = currentRSI < 30;

  return (
    <Card className="p-6 bg-card border-border">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">RSI Indicator (14-period)</h3>
        <p className="text-sm text-muted-foreground">
          {isOverbought && <span className="text-destructive">⚠️ Overbought Zone</span>}
          {isOversold && <span className="text-success">📉 Oversold Zone</span>}
          {!isOverbought && !isOversold && <span>Neutral Zone</span>}
        </p>
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
            domain={[0, 100]}
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
          <ReferenceLine 
            y={70} 
            stroke="hsl(var(--chart-red))" 
            strokeDasharray="5 5" 
            label={{ value: 'Overbought (70)', fill: 'hsl(var(--chart-red))', position: 'right' }}
          />
          <ReferenceLine 
            y={30} 
            stroke="hsl(var(--chart-green))" 
            strokeDasharray="5 5" 
            label={{ value: 'Oversold (30)', fill: 'hsl(var(--chart-green))', position: 'right' }}
          />
          <Line
            type="monotone"
            dataKey="rsi"
            stroke="hsl(var(--chart-blue))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: 'hsl(var(--chart-blue))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
