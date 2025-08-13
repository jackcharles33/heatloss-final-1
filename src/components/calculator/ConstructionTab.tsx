import { Select } from '@/components/ui/select';
import { wallTypes, windowTypes, floorTypes, roofTypes } from '../../constants/buildingData';
import { CalculatorInputs } from '../../types/calculator';

interface ConstructionTabProps {
  inputs: CalculatorInputs;
  onInputChange: (name: string, value: string) => void;
}

export function ConstructionTab({ inputs, onInputChange }: ConstructionTabProps) {
  const wallOptions = Object.entries(wallTypes).map(([key, { name }]) => ({
    value: key,
    label: name
  }));

  const windowOptions = Object.entries(windowTypes).map(([key, { name }]) => ({
    value: key,
    label: name
  }));

  const floorOptions = Object.entries(floorTypes).map(([key, { name }]) => ({
    value: key,
    label: name
  }));

  const roofOptions = Object.entries(roofTypes).map(([key, { name }]) => ({
    value: key,
    label: name
  }));

  const handleChange = (name: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    onInputChange(name, e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Wall Construction</label>
        <Select 
          name="wallType"
          value={inputs.wallType}
          onChange={handleChange('wallType')}
          options={wallOptions}
          variant="wall"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Windows</label>
        <Select 
          name="windowType"
          value={inputs.windowType}
          onChange={handleChange('windowType')}
          options={windowOptions}
          variant="window"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Floor Construction</label>
        <Select 
          name="floorType"
          value={inputs.floorType}
          onChange={handleChange('floorType')}
          options={floorOptions}
          variant="floor"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Roof Construction</label>
        <Select 
          name="roofType"
          value={inputs.roofType}
          onChange={handleChange('roofType')}
          options={roofOptions}
          variant="roof"
        />
      </div>
    </div>
  );
}