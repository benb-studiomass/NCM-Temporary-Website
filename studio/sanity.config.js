import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

// Define the actions for singleton documents
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

// Define the singleton document types
const singletonTypes = new Set(['post'])

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID
export const dataset = process.env.SANITY_STUDIO_DATASET

export default defineConfig({
  name: 'ncm-interim-site',
  title: 'NCM Website',
  projectId,
  dataset,
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton 'post' type
            S.listItem()
              .title('Content')
              .id('post')
              .child(S.document().schemaType('post').documentId('singleton-post')),
            // Other document types
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId())
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
