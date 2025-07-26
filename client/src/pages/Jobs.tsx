import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import JobCard from '@/components/JobCard';
import SearchFilters from '@/components/SearchFilters';
import { Search, Filter } from 'lucide-react';
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

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
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
    retry: 3,
    retryDelay: 1000,
  });

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const displayedJobs = filteredJobs.slice(0, displayedJobsCount);
  const remainingJobsCount = filteredJobs.length - displayedJobsCount;

  const handleShowMore = () => {
    setDisplayedJobsCount(prev => prev + 10);
  };

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedJobsCount(10);
  }, [searchTerm, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Remote Jobs</h1>
          <p className="text-gray-600 mb-6">Browse through thousands of remote job opportunities</p>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search jobs by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12"
              />
            </div>
            <Button 
              variant="outline" 
              className="h-12 px-6"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-full lg:w-1/4">
              <SearchFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          )}

          {/* Job Listings */}
          <div className={showFilters ? "w-full lg:w-3/4" : "w-full"}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isLoading ? 'Loading jobs...' : `${filteredJobs.length} Jobs Found`}
              </h2>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                Failed to load jobs. Please check your internet connection and try again.
              </div>
            )}

            {!error && (
              <div className="space-y-4">
                {displayedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

            {/* Show More Button */}
            {!error && remainingJobsCount > 0 && (
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

            {!isLoading && !error && filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
                <p className="text-gray-400">Try adjusting your search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;




// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import JobCard from '@/components/JobCard';
// import SearchFilters from '@/components/SearchFilters';
// import { Search, Filter } from 'lucide-react';
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// interface Job {
//   id: number;
//   title: string;
//   company_name: string;
//   candidate_required_location: string;
//   job_type: string;
//   publication_date: string;
//   description: string;
//   salary?: string;
//   category: string;
//   url: string;
// }

// interface Filters {
//   location: string;
//   salaryType: string;
//   datePosted: string;
//   experience: string;
//   jobType: string;
// }

// const Jobs = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState<Filters>({
//     location: 'any',
//     salaryType: 'any',
//     datePosted: 'any',
//     experience: 'any',
//     jobType: 'any'
//   });

//   const { data: jobs = [], isLoading, error } = useQuery({
//     queryKey: ['jobs'],
//     queryFn: async () => {
//       const response = await axios.get('https://remotive.com/api/remote-jobs');
//       return response.data.jobs as Job[];
//     },
//   });

//   const filteredJobs = jobs.filter(job => {
//     const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          job.company_name.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">All Remote Jobs</h1>
//           <p className="text-gray-600 mb-6">Browse through thousands of remote job opportunities</p>
          
//           {/* Search Bar */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="flex-1">
//               <Input
//                 type="text"
//                 placeholder="Search jobs by title or company..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="h-12"
//               />
//             </div>
//             <Button 
//               variant="outline" 
//               className="h-12 px-6"
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               <Filter className="h-4 w-4 mr-2" />
//               Filters
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex gap-8">
//           {/* Filters Sidebar */}
//           {showFilters && (
//             <div className="w-full lg:w-1/4">
//               <SearchFilters filters={filters} onFiltersChange={setFilters} />
//             </div>
//           )}

//           {/* Job Listings */}
//           <div className={showFilters ? "w-full lg:w-3/4" : "w-full"}>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 {isLoading ? 'Loading jobs...' : `${filteredJobs.length} Jobs Found`}
//               </h2>
//             </div>

//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
//                 Error loading jobs. Please try again later.
//               </div>
//             )}

//             <div className="space-y-4">
//               {filteredJobs.map((job) => (
//                 <JobCard key={job.id} job={job} />
//               ))}
//             </div>

//             {!isLoading && filteredJobs.length === 0 && (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
//                 <p className="text-gray-400">Try adjusting your search terms.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jobs;
