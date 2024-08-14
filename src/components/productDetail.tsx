import React from 'react';
import { useMemo } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

// Define the type for our data
type PriceDataPoint = {
  id: number;
  final_price: number;
  scraped_at: string;
  date: Date;
};

const chartConfig = {
  date: {
    label: 'Date',
  },
  final_price: {
    label: 'Price',
  },
} satisfies ChartConfig;

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export default function LineStepChart({
  data,
  timeRange,
  setTimeRange,
}: {
  data: PriceDataPoint[];
  timeRange: string;
  setTimeRange: (value: string) => void;
}) {
  const filteredData = useMemo(() => {
    return data.filter((item: any) => {
      const date = new Date(item.scraped_at);
      const now = new Date();
      let daysToSubtract = 10;
      if (timeRange === 'all') return true;
      if (timeRange === '20d') {
        daysToSubtract = 20;
      }
      now.setDate(now.getDate() - daysToSubtract);
      return date > now;
    });
  }, [data, timeRange]);
  console.log(1);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Price History</CardTitle>
        <CardDescription>En RD$</CardDescription>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="10d" className="rounded-lg">
              15 dias
            </SelectItem>
            <SelectItem value="20d" className="rounded-lg">
              1 mes
            </SelectItem>
            <SelectItem value="all" className="rounded-lg">
              Todos
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full min-h-[200px] ">
          <LineChart accessibilityLayer data={filteredData}>
            <CartesianGrid strokeOpacity={0.3} />
            <XAxis
              dataKey="date"
              tickMargin={8}
              tickFormatter={formatDate}
              interval="preserveStartEnd"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <YAxis width={50} />
            <Line
              dataKey="final_price"
              type="step"
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
