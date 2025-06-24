
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from 'lucide-react';

interface ExpertiseSelectorProps {
  expertise: string[];
  onChange: (expertise: string[]) => void;
  placeholder?: string;
  title?: string;
}

const ExpertiseSelector: React.FC<ExpertiseSelectorProps> = ({
  expertise,
  onChange,
  placeholder = "e.g., React, JavaScript, UI Design",
  title = "Expertise"
}) => {
  const [inputValue, setInputValue] = useState('');

  const addExpertise = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !expertise.includes(trimmed)) {
      onChange([...expertise, trimmed]);
      setInputValue('');
    }
  };

  const removeExpertise = (index: number) => {
    onChange(expertise.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addExpertise();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            onKeyPress={handleKeyPress}
          />
          <Button type="button" onClick={addExpertise} size="icon">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {expertise.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {expertise.map((item, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {item}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0"
                  onClick={() => removeExpertise(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpertiseSelector;
