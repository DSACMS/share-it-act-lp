---
title: Frequently Asked Questions (FAQs)
description: Frequently Asked Questions
permalink: /schema/faq
layout: layouts/page
tags: shareit
eleventyNavigation:
  parent: shareit-schema
  key: shareit-schema-faq
  order: 5
  title: FAQs
sidenav: true
sticky_sidenav: true
---

## Policies

### What is the Federal Source Code Policy / M-16-21?

The Federal Source Code Policy (M-16-21) is a policy issued by the U.S. government that aims to improve software reuse and collaboration across federal agencies. It requires agencies to:

- Create an inventory of their custom developed code.
- Share code within and across agencies to reduce duplication and costs.
- Maintain metadata records of their software assets for transparency and tracking.

### What is the SHARE IT Act of 2024?

The SHARE IT Act of 2024 is legislation designed to enhance transparency, collaboration, and efficiency in government software development. It mandates:

- Greater adoption of open source software in federal agencies.
- Improved sharing of government software projects with the public.
- Standardized reporting on software development and licensing practices.
- Establishment of metadata guidelines to ensure clear documentation and discoverability of software assets.

### Does the SHARE IT Act also apply retroactively to previous custom-developed code?

No. The SHARE IT Act applies only to custom-developed code created on or after July 21, 2025. Code developed prior to this date is not subject to its requirements, however, code created after August 8, 2016 is subject to the Federal Source Code Policy.

### Are there any source code exemptions under the SHARE IT Act?

There are [4 exemptions](https://www.congress.gov/bill/118th-congress/house-bill/9566/text/ih#HB45699B7E8734166BE2F6DA2A80F7909):

1. Source code developed primarily for use in a national security system
2. Source code developed by an agency, or part of an agency, that is an element of the intelligence community
3. Source code that falls under the Freedom of Information Act
4. Source code identified by the agency’s CIO

### Does SHARE IT Act apply to data analysis code?

Yes. All custom-developed code—whether it involves software applications, data analysis, infrastructure/devops, interoperability, or internal tools/scripts—must reside in a repository, unless it qualifies for one of the [four exemptions](https://www.congress.gov/bill/118th-congress/house-bill/9566/text/ih#HB45699B7E8734166BE2F6DA2A80F7909).

### When do agencies have to comply?
The SHARE IT Act applies to custom-developed code created on or after July 21, 2025 where agencies must:
- store custom-developed code in a repository
- ensure code is accessible to federal employees and is owned by the agency
- publish metadata on all custom-developed code

## code.json Metadata Standard

### What is code.json?

`code.json` is a metadata file used by U.S. federal agencies to document and share their software projects. It provides:

- A standardized format for describing open source and custom developed software.
- Key details such as the project's name, description, license, repository URL, and labor hours.
- Integration with government wide platforms to facilitate code sharing and reuse.

### Why is code.json important?

By collecting metadata on every software project, this allows the agency to build a comprehensive inventory of agency software, enabling strategic decisions about cost reduction and efficiencies through reuse of code.

### Is code.json mandatory for all repositories?

Yes. As per M-16-21, agencies are required to publish metadata on all custom-developed code after August 8th 2016, which is not subject to exemptions (see: Sec 6 of [M-16-21](https://obamawhitehouse.archives.gov/sites/default/files/omb/memoranda/2016/m_16_21.pdf)).

As per the SHARE IT Act, agencies are required to publish metadata on all custom-developed code after July 22, 2025, which is not subject to exemptions (see: [SHARE IT ACT exemptions](https://www.congress.gov/118/plaws/publ187/PLAW-118publ187.pdf)).

### I have feedback on additions and improvements to the code.json metadata standard. Where can I share this?

We are open to adding more fields to CMS code.json for any metadata the agency sees value in collecting. Request new metadata fields by filing a metadata field addition issue [here](https://github.com/DSACMS/gov-codejson/issues/new?template=metadata-field-addition.md).

### My agency extended the code.json schema to add more metadata fields. Where can I share this?

We encourage agencies to contribute by [submitting an agency schema addition issue](https://github.com/DSACMS/gov-codejson/issues) to [include their extended schema in the repository](https://github.com/DSACMS/gov-codejson/tree/main/schemas). This helps foster collaboration and ensures shared improvements benefit the wider community.

### Does `laborHours` need to be down-to-the-minute accurate?

The goal is to be as accurate as we can, and with as little burden as possible. We strive to automate labor hour calculations for public repositories whenever possible (using the [scc](https://github.com/boyter/scc) tool), but manual ballpark estimates are acceptable when precise calculation isn't feasible.