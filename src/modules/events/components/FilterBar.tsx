"use client";

import { useEvents } from '@/modules/events/context';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Category, NigerianStates } from '@/modules/events/model';
import { Button } from '@/components/ui/Button';

const FilterBar = () => {
  const { filters, setFilters } = useEvents();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ [e.target.name]: e.target.value });
  };

  const handleLocationChange = (value: string) => {
    setFilters({ location: value === 'all' ? '' : value });
  };

  const handleCategoryChange = (value: string) => {
    setFilters({ category: value === 'all' ? '' : (value as Category) });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      category: '',
      dateFrom: '',
      dateTo: '',
    });
  };

  return (
    <div className="p-6 bg-card border rounded-lg mb-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <label htmlFor="search" className="text-sm font-medium mb-1">Search</label>
          <Input
            id="search"
            name="search"
            placeholder="Search by event title..."
            value={filters.search || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="location" className="text-sm font-medium mb-1">Location</label>
          <Select onValueChange={handleLocationChange} value={filters.location || 'all'}>
            <SelectTrigger id="location">
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
        </div>
        <div>
          <label htmlFor="category" className="text-sm font-medium mb-1">Category</label>
          <Select onValueChange={handleCategoryChange} value={filters.category || 'all'}>
            <SelectTrigger id="category">
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
        </div>
        <div className="flex items-end">
          <Button onClick={clearFilters} variant="outline" className="w-full">
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;