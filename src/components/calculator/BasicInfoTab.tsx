import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { UKRegions } from '../../constants/buildingData';
import { CalculatorInputs } from '../../types/calculator';

interface BasicInfoTabProps {
  inputs: CalculatorInputs;
  onInputChange: (name: string, value: string) => void;
}

export function BasicInfoTab({ inputs, onInputChange }: BasicInfoTabProps) {
  const regionOptions = Object.entries(UKRegions).map(([key, { name }]) => ({
    value: key,
    label: name
  }));

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Region</label>
        <Select 
          name="region"
          value={inputs.region} 
          onChange={(e) => onInputChange('region', e.target.value)}
          options={regionOptions}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Postcode</label>
        <Input 
          placeholder="Enter postcode"
          value={inputs.postcode}
          onChange={e => onInputChange('postcode', e.target.value)}
        />
      </div>
    </div>
  );
}