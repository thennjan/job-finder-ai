
import React, { useState, useCallback } from 'react';
import { JobListing } from './types';
import { fetchJobLisings } from './services/geminiService';
import { SearchBar } from './components/SearchBar';
import { JobCard } from './components/JobCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { BriefcaseIcon, SearchIcon } from './components/Icons';

const App: React.FC = () => {
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      return;
    }
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const results = await fetchJobLisings(query);
      setJobListings(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setJobListings([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center p-10">
          <LoadingSpinner />
          <p className="mt-4 text-lg text-slate-500">Finding the best opportunities for you...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-10 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">Oops! Something went wrong.</h3>
          <p className="mt-2 text-red-500 dark:text-red-300">{error}</p>
        </div>
      );
    }

    if (!hasSearched) {
        return (
            <div className="text-center p-10 flex flex-col items-center">
                <div className="bg-primary-light p-6 rounded-full">
                    <SearchIcon className="w-16 h-16 text-primary"/>
                </div>
                <h2 className="mt-6 text-2xl font-bold text-slate-700 dark:text-slate-200">Find Your Dream Job</h2>
                <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-md">
                    Enter a job title, skill, or company to start searching. Our AI will aggregate the best listings for you from across the web.
                </p>
            </div>
        );
    }
    
    if (jobListings.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobListings.map((job, index) => (
            <JobCard key={`${job.companyName}-${job.jobTitle}-${index}`} job={job} />
          ))}
        </div>
      );
    }

    if (hasSearched && jobListings.length === 0) {
      return (
         <div className="text-center p-10 flex flex-col items-center">
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full">
                <BriefcaseIcon className="w-16 h-16 text-slate-500"/>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-700 dark:text-slate-200">No Jobs Found</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-md">
                We couldn't find any jobs matching your search. Try using different or more general keywords.
            </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen font-sans">
      <header className="bg-white dark:bg-slate-800/50 backdrop-blur-sm shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BriefcaseIcon className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Job Finder AI</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        <div className="max-w-7xl mx-auto">
            {renderContent()}
        </div>
      </main>

      <footer className="text-center py-6 text-sm text-slate-500 dark:text-slate-400">
        <p>Powered by AI. Your next career move is just a search away.</p>
      </footer>
    </div>
  );
};

export default App;
