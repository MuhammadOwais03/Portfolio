import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'technologies',
            title: 'Technologies',
            type: 'array',
            of: [{ type: 'text' }],

        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true, // Allows cropping and focal points
            },
        }),
        defineField({
            name: 'additionalImages',
            title: 'Additional Images',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                layout: 'grid', // Displays images in a grid layout in the Sanity Studio
            },
        }),
        defineField({
            name: 'url',
            title: 'Project URL',
            type: 'url',
        }),
        defineField({
            name: 'Gurl',
            title: 'Github URL',
            type: 'url',
        }),
    ],
});
