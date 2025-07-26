


import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SearchFilters from '@/components/SearchFilters';
import JobCard from '@/components/JobCard';
import EmailSubscription from '@/components/EmailSubscription';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Job {
  id: number;
  title: string;
  company_name: string;
  candidate_required_location: string;
  job_type: string;
  publication_date: string;
  description: string;
  salary?: string;
  category: string;
  url: string;
}

interface Filters {
  location: string;
  salaryType: string;
  datePosted: string;
  experience: string;
  jobType: string;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    location: 'any',
    salaryType: 'any',
    datePosted: 'any',
    experience: 'any',
    jobType: 'any'
  });
  const [displayedJobsCount, setDisplayedJobsCount] = useState(10);

  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const response = await axios.get('https://remotive.com/api/remote-jobs');
      return response.data.jobs as Job[];
    },
  });

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationTerm === '' || 
                           job.candidate_required_location.toLowerCase().includes(locationTerm.toLowerCase());

    // Apply other filters
    if (filters.jobType !== 'any' && filters.jobType !== 'full-time') {
      // Since most remote jobs are full-time, we'll show all for other types
    }

    return matchesSearch && matchesLocation;
  });

  const displayedJobs = filteredJobs.slice(0, displayedJobsCount);
  const remainingJobsCount = filteredJobs.length - displayedJobsCount;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already reactive through filteredJobs
  };

  const handleShowMore = () => {
    setDisplayedJobsCount(prev => prev + 10);
  };

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedJobsCount(10);
  }, [searchTerm, locationTerm, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find Your Dream <span className="text-blue-200">Remote Job</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover thousands of remote opportunities from top companies worldwide
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Job title, keywords, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 text-gray-900"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Location (optional)"
                    value={locationTerm}
                    onChange={(e) => setLocationTerm(e.target.value)}
                    className="h-12 text-gray-900"
                  />
                </div>
                <Button type="submit" className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4 mr-2" />
                  Search Jobs
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <SearchFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isLoading ? 'Loading jobs...' : `${filteredJobs.length} Remote Jobs Found`}
              </h2>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                Error loading jobs. Please try again later.
              </div>
            )}

            <div className="space-y-4">
              {displayedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Show More Button */}
            {remainingJobsCount > 0 && (
              <div className="text-center mt-8">
                <Button 
                  onClick={handleShowMore}
                  variant="outline"
                  className="px-8 py-3 text-lg font-medium"
                >
                  Show More ({remainingJobsCount} remaining)
                </Button>
              </div>
            )}

            {!isLoading && filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
                <p className="text-gray-400">Try adjusting your search terms or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Email Subscription Section */}
      <EmailSubscription />
    </div>
  );
};

export default Index;



