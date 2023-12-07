import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'FAQs',
  type: 'document',
  fields: [
    defineField({
      title: 'Introduction',
      name: 'intro',
      type: 'text',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'listpara',
      title: 'Reading List Introduction',
      type: 'text',
    }),
    defineField({
      name: 'item',
      title: 'List Item',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'contentType',
              title: 'Content Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Podcast', value: 'podcast'},
                  {title: 'Video', value: 'video'},
                  {title: 'Article', value: 'article'},
                ],
              },
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'author',
              title: 'Author',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'url',
            },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
})
