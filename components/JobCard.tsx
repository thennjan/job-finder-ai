
import React from 'react';
import { JobListing } from '../types';
import { BriefcaseIcon, ExternalLinkIcon, LocationIcon } from './Icons';

interface JobCardProps {
  job: JobListing;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 pr-4">{job.jobTitle}</h3>
        </div>
        
        <div className="mt-2 flex items-center space-x-2 text-slate-600 dark:text-slate-300">
          <BriefcaseIcon className="w-5 h-5 text-primary" />
          <span className="font-semibold">{job.companyName}</span>
        </div>

        <div className="mt-2 flex items-center space-x-2 text-slate-500 dark:text-slate-400">
          <LocationIcon className="w-5 h-5 text-secondary" />
          <span>{job.location}</span>
        </div>
        
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 h-20 overflow-hidden text-ellipsis">
            {job.description}
        </p>
      </div>

      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-b-xl border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3">
        <a
          href={job.applyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors flex items-center justify-center gap-2"
        >
          Apply Now
          <ExternalLinkIcon className="w-4 h-4"/>
        </a>
        {job.companyWebsite && (
             <a
             href={job.companyWebsite}
             target="_blank"
             rel="noopener noreferrer"
             className="flex-1 text-center rounded-lg bg-slate-200 dark:bg-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm hover:bg-slate-300 dark:hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 transition-colors"
           >
             Company Website
           </a>
        )}
      </div>
    </div>
  );
};
