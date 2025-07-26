
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Filters {
  location: string;
  salaryType: string;
  datePosted: string;
  experience: string;
  jobType: string;
}

interface SearchFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const SearchFilters = ({ filters, onFiltersChange }: SearchFiltersProps) => {
  const updateFilter = (key: keyof Filters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      location: 'any',
      salaryType: 'any',
      datePosted: 'any',
      experience: 'any',
      jobType: 'any'
    });
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Filters
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location */}
        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-3 block">Location</Label>
          <RadioGroup value={filters.location} onValueChange={(value) => updateFilter('location', value)}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="location-any" />
                <Label htmlFor="location-any">Anywhere</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="us" id="location-us" />
                <Label htmlFor="location-us">United States</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="europe" id="location-europe" />
                <Label htmlFor="location-europe">Europe</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="worldwide" id="location-worldwide" />
                <Label htmlFor="location-worldwide">Worldwide</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Salary Type */}
        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-3 block">Salary Type</Label>
          <RadioGroup value={filters.salaryType} onValueChange={(value) => updateFilter('salaryType', value)}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="salary-any" />
                <Label htmlFor="salary-any">Any</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hourly" id="salary-hourly" />
                <Label htmlFor="salary-hourly">Hourly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="salary-monthly" />
                <Label htmlFor="salary-monthly">Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="salary-yearly" />
                <Label htmlFor="salary-yearly">Yearly</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Experience Level */}
        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-3 block">Experience</Label>
          <RadioGroup value={filters.experience} onValueChange={(value) => updateFilter('experience', value)}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="exp-any" />
                <Label htmlFor="exp-any">Any</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intern" id="exp-intern" />
                <Label htmlFor="exp-intern">Internship</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="entry" id="exp-entry" />
                <Label htmlFor="exp-entry">Entry Level</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mid" id="exp-mid" />
                <Label htmlFor="exp-mid">Mid Level</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="senior" id="exp-senior" />
                <Label htmlFor="exp-senior">Senior</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Job Type */}
        <div>
          <Label className="text-sm font-semibold text-gray-700 mb-3 block">Job Type</Label>
          <RadioGroup value={filters.jobType} onValueChange={(value) => updateFilter('jobType', value)}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="type-any" />
                <Label htmlFor="type-any">Any</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full-time" id="type-full" />
                <Label htmlFor="type-full">Full-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="part-time" id="type-part" />
                <Label htmlFor="type-part">Part-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="contract" id="type-contract" />
                <Label htmlFor="type-contract">Contract</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
