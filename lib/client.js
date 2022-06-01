import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: '62kr1882', // find this at manage.sanity.io or in your sanity.json
  dataset: 'production', // this is from those question during 'sanity init'
  useCdn: true,
  apiVersion: '2022-06-01',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
