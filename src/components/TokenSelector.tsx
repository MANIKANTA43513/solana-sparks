import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Token {
  address: string;
  symbol: string;
  name: string;
}

export const TOKENS: Token[] = [
  { address: "0x1a2b3c", symbol: "PUMP", name: "Pump Token" },
  { address: "0x4d5e6f", symbol: "MOON", name: "Moon Coin" },
  { address: "0x7g8h9i", symbol: "DOGE", name: "Doge Token" },
  { address: "0xj1k2l3", symbol: "PEPE", name: "Pepe Coin" },
  { address: "0xm4n5o6", symbol: "SHIB", name: "Shiba Token" },
];

interface TokenSelectorProps {
  selectedToken: string;
  onTokenChange: (token: string) => void;
}

export const TokenSelector = ({ selectedToken, onTokenChange }: TokenSelectorProps) => {
  return (
    <Select value={selectedToken} onValueChange={onTokenChange}>
      <SelectTrigger className="w-[240px] bg-card border-border">
        <SelectValue placeholder="Select a token" />
      </SelectTrigger>
      <SelectContent>
        {TOKENS.map((token) => (
          <SelectItem key={token.address} value={token.address}>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{token.symbol}</span>
              <span className="text-muted-foreground text-sm">{token.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
