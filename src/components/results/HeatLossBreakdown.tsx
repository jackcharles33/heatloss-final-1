import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface HeatLossBreakdownProps {
  breakdown: {
    walls: number;
    windows: number;
    floor: number;
    roof: number;
  };
}

export function HeatLossBreakdown({ breakdown }: HeatLossBreakdownProps) {
  const data = [
    { name: 'Walls', value: breakdown.walls },
    { name: 'Windows', value: breakdown.windows },
    { name: 'Floor', value: breakdown.floor },
    { name: 'Roof', value: breakdown.roof }
  ];

  const COLORS = ['#d85c9c', '#9c5cd8', '#5c9cd8', '#5cd89c'];

  return (
    <Box sx={{ 
      backgroundColor: '#301c34',
      borderRadius: '24px',
      padding: '24px',
      width: '100%'
    }}>
      <Typography
        sx={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#d8b4fe',
          textAlign: 'center',
          mb: 3
        }}
      >
        Heat Loss Breakdown
      </Typography>
      
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#211934',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span style={{ color: '#fff' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}