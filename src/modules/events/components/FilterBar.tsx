"use client";

import { useEvents } from '@/modules/events/context';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Category, NigerianStates } from '@/modules/events/model';

const FilterBar = () => {
  const { filters, setFilters } = useEvents();

  const handleLocationChange = (value: string) => {
    setFilters({ location: value === 'all' ? '' : value });
  };

  const handleCategoryChange = (value: string) => {
    setFilters({ category: value === 'all' ? '' : (value as Category) });
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ dateFrom: e.target.value });
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ dateTo: e.target.value });
  };

  return (
    <div className="p-4 bg-card border rounded-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search by event title..."
          className="md:col-span-1"
        />
        <Select onValueChange={handleLocationChange} value={filters.location || 'all'}>
          <SelectTrigger>
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {NigerianStates.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={handleCategoryChange} value={filters.category || 'all'}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.values(Category).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-col">
          <label htmlFor="dateFrom" className="text-sm font-medium mb-1">From Date</label>
          <Input id="dateFrom" type="date" value={filters.dateFrom} onChange={handleDateFromChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="dateTo" className="text-sm font-medium mb-1">To Date</label>
          <Input id="dateTo" type="date" value={filters.dateTo} onChange={handleDateToChange} />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;