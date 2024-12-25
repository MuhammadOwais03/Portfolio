// In your Sanity schema (e.g., in a "cv" schema or a general "assets" schema)

import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'cv',
    title: 'CV',
    type: 'document',
    fields: [
      {
        name: 'cvFile',
        title: 'CV File',
        type: 'file',  // File type allows uploading PDFs
      }
    ]
  });
  