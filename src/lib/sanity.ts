import { createClient } from '@sanity/client';

export const client = createClient({
    projectId: 'zux3kocp',  // Replace with your Sanity project ID
    dataset: 'portfolioproject',         // Replace with your dataset name
    useCdn: true,                  // `false` if you want to ensure fresh data
});
