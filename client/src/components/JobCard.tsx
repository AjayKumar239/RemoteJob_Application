import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, Calendar, Building, BookmarkX, Bookmark, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const { user, savedJobs, saveJob, unsaveJob } = useAuth();
  const { toast } = useToast();
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const isSaved = savedJobs.some(savedJob => savedJob.jobId === job.id.toString());
  const isNewPost = new Date(job.publication_date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const handleSaveJob = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to save jobs.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isSaved) {
        await unsaveJob(job.id.toString());
        toast({
          title: "Job Removed",
          description: "Job removed from saved jobs.",
        });
      } else {
        await saveJob(job.id.toString(), job.title, job.company_name);
        toast({
          title: "Job Saved",
          description: "Job added to your saved jobs!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update saved jobs. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-blue-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                {job.title}
              </h3>
              {isNewPost && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  New Post
                </Badge>
              )}
            </div>
            <p className="text-lg text-gray-700 font-medium mb-3">{job.company_name}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.candidate_required_location || 'Remote'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                <span>{job.job_type || 'Full-time'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(job.publication_date)}</span>
              </div>
            </div>

            <div className="mb-4">
              <Badge variant="outline" className="mr-2 mb-2">
                {job.category}
              </Badge>
              {job.salary && (
                <Badge variant="outline" className="mr-2 mb-2 bg-blue-50 text-blue-700">
                  {job.salary}
                </Badge>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSaveJob}
            className="text-gray-500 hover:text-blue-600"
          >
            {isSaved ? (
              <BookmarkX className="h-5 w-5" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed">
            {showFullDescription 
              ? job.description.replace(/<[^>]*>/g, '') 
              : truncateDescription(job.description.replace(/<[^>]*>/g, ''), 200)
            }
          </p>
          {job.description.length > 200 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
            >
              {showFullDescription ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Apply Now
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;



// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { MapPin, Building, DollarSign, Calendar, Bookmark, BookmarkX } from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext';
// import { useToast } from "@/hooks/use-toast";

// interface Job {
//   id: string;
//   title: string;
//   company: string;
//   location: string;
//   salary?: string;
//   type: string;
//   posted: string;
//   description: string;
//   tags: string[];
// }

// interface JobCardProps {
//   job: Job;
// }

// const JobCard = ({ job }: JobCardProps) => {
//   const { user, savedJobs, saveJob, unsaveJob } = useAuth();
//   const { toast } = useToast();

//   const isSaved = savedJobs.some(savedJob => savedJob.jobId === job.id);

//   const handleSaveJob = async () => {
//     if (!user) {
//       toast({
//         title: "Login Required",
//         description: "Please log in to save jobs.",
//         variant: "destructive",
//       });
//       return;
//     }

//     try {
//       if (isSaved) {
//         await unsaveJob(job.id);
//         toast({
//           title: "Job Removed",
//           description: "Job removed from your saved list.",
//         });
//       } else {
//         await saveJob(job.id, job.title, job.company);
//         toast({
//           title: "Job Saved",
//           description: "Job added to your saved list.",
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to update saved jobs. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <Card className="h-full hover:shadow-lg transition-shadow">
//       <CardHeader>
//         <div className="flex justify-between items-start">
//           <div className="flex-1">
//             <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
//               {job.title}
//             </CardTitle>
//             <div className="flex items-center text-gray-600 mb-1">
//               <Building className="h-4 w-4 mr-2" />
//               <span className="font-medium">{job.company}</span>
//             </div>
//             <div className="flex items-center text-gray-600 mb-1">
//               <MapPin className="h-4 w-4 mr-2" />
//               <span>{job.location}</span>
//             </div>
//             {job.salary && (
//               <div className="flex items-center text-gray-600">
//                 <DollarSign className="h-4 w-4 mr-2" />
//                 <span>{job.salary}</span>
//               </div>
//             )}
//           </div>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={handleSaveJob}
//             className="text-gray-500 hover:text-blue-600"
//           >
//             {isSaved ? (
//               <BookmarkX className="h-5 w-5" />
//             ) : (
//               <Bookmark className="h-5 w-5" />
//             )}
//           </Button>
//         </div>
//       </CardHeader>

//       <CardContent>
//         <div className="flex items-center justify-between mb-3">
//           <Badge variant="secondary" className="bg-blue-100 text-blue-800">
//             {job.type}
//           </Badge>
//           <div className="flex items-center text-sm text-gray-500">
//             <Calendar className="h-4 w-4 mr-1" />
//             <span>{job.posted}</span>
//           </div>
//         </div>

//         <p className="text-gray-700 text-sm mb-4 line-clamp-3">
//           {job.description}
//         </p>

//         <div className="flex flex-wrap gap-2 mb-4">
//           {job.tags.slice(0, 3).map((tag, index) => (
//             <Badge
//               key={index}
//               variant="outline"
//               className="text-xs border-gray-300 text-gray-600"
//             >
//               {tag}
//             </Badge>
//           ))}
//           {job.tags.length > 3 && (
//             <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
//               +{job.tags.length - 3} more
//             </Badge>
//           )}
//         </div>

//         <Button className="w-full bg-blue-600 hover:bg-blue-700">
//           View Details
//         </Button>
//          {/* <Button asChild className="bg-blue-600 hover:bg-blue-700">
//               <a href={job.url} target="_blank" rel="noopener noreferrer">
//                 <ExternalLink className="h-4 w-4 mr-2" />
//                 Apply Now
//               </a>
//             </Button> */}
//             {/* <div className="flex justify-between items-center">
//           <div className="flex gap-2">
//             <Button asChild className="bg-blue-600 hover:bg-blue-700">
//               <a href={job.url} target="_blank" rel="noopener noreferrer">
//                 <ExternalLink className="h-4 w-4 mr-2" />
//                 Apply Now
//               </a>
//             </Button>
//           </div>
//         </div> */}
//       </CardContent>
//     </Card>
//   );
// };

// export default JobCard;

// // import { useState } from 'react';
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Badge } from "@/components/ui/badge";
// // import { useAuth } from '@/contexts/AuthContext';
// // import { MapPin, Calendar, Briefcase, Heart, ExternalLink } from 'lucide-react';
// // import { useToast } from "@/hooks/use-toast";

// // interface Job {
// //   id: number;
// //   title: string;
// //   company_name: string;
// //   candidate_required_location: string;
// //   job_type: string;
// //   publication_date: string;
// //   description: string;
// //   salary?: string;
// //   category: string;
// //   url: string;
// // }

// // interface JobCardProps {
// //   job: Job;
// // }

// // const JobCard = ({ job }: JobCardProps) => {
// //   const { user, savedJobs, saveJob, unsaveJob } = useAuth();
// //   const { toast } = useToast();
// //   const [showFullDescription, setShowFullDescription] = useState(false);
  
// //   const isSaved = savedJobs.includes(job.id.toString());
// //   const isNewPost = new Date(job.publication_date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

// //   const handleSaveJob = () => {
// //     if (!user) {
// //       toast({
// //         title: "Login Required",
// //         description: "Please login to save jobs.",
// //         variant: "destructive",
// //       });
// //       return;
// //     }

// //     if (isSaved) {
// //       unsaveJob(job.id.toString());
// //       toast({
// //         title: "Job Removed",
// //         description: "Job removed from saved jobs.",
// //       });
// //     } else {
// //       saveJob(job.id.toString());
// //       toast({
// //         title: "Job Saved",
// //         description: "Job added to your saved jobs!",
// //       });
// //     }
// //   };

// //   const formatDate = (dateString: string) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', { 
// //       month: 'short', 
// //       day: 'numeric', 
// //       year: 'numeric' 
// //     });
// //   };

// //   const truncateDescription = (text: string, maxLength: number) => {
// //     if (text.length <= maxLength) return text;
// //     return text.substring(0, maxLength) + '...';
// //   };

// //   return (
// //     <Card className="hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-blue-300">
// //       <CardContent className="p-6">
// //         <div className="flex justify-between items-start mb-4">
// //           <div className="flex-1">
// //             <div className="flex items-center gap-2 mb-2">
// //               <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
// //                 {job.title}
// //               </h3>
// //               {isNewPost && (
// //                 <Badge variant="secondary" className="bg-green-100 text-green-800">
// //                   New Post
// //                 </Badge>
// //               )}
// //             </div>
// //             <p className="text-lg text-gray-700 font-medium mb-3">{job.company_name}</p>
            
// //             <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
// //               <div className="flex items-center gap-1">
// //                 <MapPin className="h-4 w-4" />
// //                 <span>{job.candidate_required_location || 'Remote'}</span>
// //               </div>
// //               <div className="flex items-center gap-1">
// //                 <Briefcase className="h-4 w-4" />
// //                 <span>{job.job_type || 'Full-time'}</span>
// //               </div>
// //               <div className="flex items-center gap-1">
// //                 <Calendar className="h-4 w-4" />
// //                 <span>{formatDate(job.publication_date)}</span>
// //               </div>
// //             </div>

// //             <div className="mb-4">
// //               <Badge variant="outline" className="mr-2 mb-2">
// //                 {job.category}
// //               </Badge>
// //               {job.salary && (
// //                 <Badge variant="outline" className="mr-2 mb-2 bg-blue-50 text-blue-700">
// //                   {job.salary}
// //                 </Badge>
// //               )}
// //             </div>
// //           </div>

// //           <Button
// //             variant="outline"
// //             size="sm"
// //             onClick={handleSaveJob}
// //             className={`ml-4 ${isSaved ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' : 'hover:bg-gray-50'}`}
// //           >
// //             <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
// //           </Button>
// //         </div>

// //         <div className="mb-4">
// //           <p className="text-gray-700 leading-relaxed">
// //             {showFullDescription 
// //               ? job.description.replace(/<[^>]*>/g, '') 
// //               : truncateDescription(job.description.replace(/<[^>]*>/g, ''), 200)
// //             }
// //           </p>
// //           {job.description.length > 200 && (
// //             <button
// //               onClick={() => setShowFullDescription(!showFullDescription)}
// //               className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
// //             >
// //               {showFullDescription ? 'Show Less' : 'Read More'}
// //             </button>
// //           )}
// //         </div>

// //         <div className="flex justify-between items-center">
// //           <div className="flex gap-2">
// //             <Button asChild className="bg-blue-600 hover:bg-blue-700">
// //               <a href={job.url} target="_blank" rel="noopener noreferrer">
// //                 <ExternalLink className="h-4 w-4 mr-2" />
// //                 Apply Now
// //               </a>
// //             </Button>
// //           </div>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default JobCard;
