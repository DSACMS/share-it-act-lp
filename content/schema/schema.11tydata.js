const PAGE_META = {
  schema: {
    title: 'code.json',
    description: 'Metadata standard for federal software projects',
    permalink: '/schema/',
    eleventyNavigation: {
      parent: 'shareit-schema',
      key: 'shareit-schema-main',
      order: 1,
      title: 'code.json',
    },
  },
  faq: {
    title: 'Frequently Asked Questions (FAQs)',
    description: 'Frequently Asked Questions on the federal software metadata schemas',
    permalink: '/schema/faq/',
    eleventyNavigation: {
      parent: 'shareit-schema',
      key: 'shareit-schema-faq',
      order: 6,
      title: 'Schema FAQs',
    },
  },
  exemptions: {
    title: 'Exemptions',
    description: 'List of exemptions for the SHARE IT Act',
    permalink: '/schema/exemptions/',
    eleventyNavigation: {
      parent: 'shareit-schema',
      key: 'shareit-schema-exemptions',
      order: 5,
      title: 'Exemptions',
    },
  },
  procedures: {
    title: 'Procedures',
    description: 'Tools to create and update metadata in repositories',
    permalink: '/schema/procedures/',
    eleventyNavigation: {
      parent: 'shareit-schema',
      key: 'shareit-schema-procedures',
      order: 4,
      title: 'Procedures',
    },
  },
  agency: {
    title: 'agency-index.json',
    description: 'Tools and resources to create an agency index / software inventory',
    permalink: '/schema/agency-index/',
    eleventyNavigation: {
      parent: 'shareit-schema',
      key: 'shareit-schema-agencyindex',
      order: 2,
      title: 'agency-index.json',
    },
  },
};

module.exports = {
  tags: ['shareit'],
  sidenav: true,
  sticky_sidenav: true,

  eleventyComputed: {
    title: (data) => PAGE_META[data.page.fileSlug]?.title ?? data.title,
    description: (data) => PAGE_META[data.page.fileSlug]?.description ?? data.description,
    layout: 'layouts/page',
    permalink: (data) =>
      PAGE_META[data.page.fileSlug]?.permalink ?? `/schema/${data.page.fileSlug}/`,
    eleventyNavigation: (data) =>
      PAGE_META[data.page.fileSlug]?.eleventyNavigation ?? data.eleventyNavigation,
  },
};
