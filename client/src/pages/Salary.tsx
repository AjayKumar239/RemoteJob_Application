
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, BarChart3 } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company_name: string;
  salary?: string;
  category: string;
}

const Salary = () => {
  const [searchRole, setSearchRole] = useState('');

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const response = await axios.get('https://remotive.com/api/remote-jobs');
      return response.data.jobs as Job[];
    },
  });

  // Process salary data from jobs
  const processedSalaryData = jobs
    .filter(job => job.salary && job.salary.includes('$'))
    .map(job => ({
      title: job.title,
      company: job.company_name,
      salary: job.salary,
      category: job.category
    }));

  const filteredSalaryData = processedSalaryData.filter(job =>
    searchRole === '' || job.title.toLowerCase().includes(searchRole.toLowerCase())
  );

  // Get unique categories with salary info
  const categorySalaries = jobs.reduce((acc, job) => {
    if (job.salary && job.category) {
      if (!acc[job.category]) {
        acc[job.category] = [];
      }
      acc[job.category].push(job.salary);
    }
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <DollarSign className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Remote Job Salary Estimates
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Discover salary ranges for remote positions across different roles
            </p>
            
            {/* Search for Role */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-lg">
                <Input
                  type="text"
                  placeholder="Search for a specific role (e.g., Developer, Designer)..."
                  value={searchRole}
                  onChange={(e) => setSearchRole(e.target.value)}
                  className="h-12 text-gray-900"
                />
                <Button className="h-12 px-8 bg-green-600 hover:bg-green-700">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Search Salaries
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs with Salary</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{processedSalaryData.length}</div>
              <p className="text-xs text-muted-foreground">
                From {jobs.length} total jobs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories with Salary Data</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(categorySalaries).length}</div>
              <p className="text-xs text-muted-foreground">
                Different job categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Search Results</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredSalaryData.length}</div>
              <p className="text-xs text-muted-foreground">
                Matching your search
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Salary Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Individual Job Salaries */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {searchRole ? `Salaries for "${searchRole}"` : 'Recent Job Salaries'}
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredSalaryData.slice(0, 20).map((job, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                        <Badge variant="outline" className="mt-2">
                          {job.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-green-600">{job.salary}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Category Overview */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Salary by Category</h2>
            <div className="space-y-4">
              {Object.entries(categorySalaries).slice(0, 10).map(([category, salaries]) => (
                <Card key={category} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">{category}</h3>
                        <p className="text-sm text-gray-600">{salaries.length} jobs with salary data</p>
                      </div>
                      <Badge variant="secondary">
                        {salaries.length} positions
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading salary data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Salary;
