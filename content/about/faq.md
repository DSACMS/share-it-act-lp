---
title: Frequently Asked Questions (FAQs)
description: Frequently Asked Questions
permalink: /about/faq/
layout: layouts/page
tags: shareit
eleventyNavigation:
  parent: shareit-about
  key: shareit-about-faq
  order: 3
  title: Frequently Asked Questions
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
3. Source code that is exempted from the Freedom of Information Act
4. Source code exempted by the agency’s CIO

Additionally, the SHARE IT Act does not include source code that is solely exploratory or disposable in nature, including source code written by a developer experimenting with a new language or library as well as commercial computer software, commercial off-the-shelf software, or configuration scripts for such software.

### Does SHARE IT Act apply to data analysis code?

Yes. All custom-developed code—whether it involves software applications, data analysis, infrastructure/devops, interoperability, or internal tools/scripts—must reside in a repository, unless it qualifies for one of the [four exemptions](https://www.congress.gov/bill/118th-congress/house-bill/9566/text/ih#HB45699B7E8734166BE2F6DA2A80F7909).

### When do agencies have to comply?

The SHARE IT Act applies to custom-developed code created on or after July 21, 2025 where agencies must:

- store custom-developed code in a repository
- ensure code is accessible to federal employees and is owned by the agency
- publish metadata on all custom-developed code

## SHARE IT Act Compliance & Implementation

### Where should an agency begin if it does not yet have a complete inventory of its repositories?

We recommend an agency use the Repository Discovery form as a starting point to collect source code repository information across the organization. It is an intake form that serves as a simple registry for gathering basic information about a source code repository. Responses can be used by the agency to coordinate with repository managers and owners to comply with the SHARE IT Act.

### Can an agency build a shared software inventory across GitHub, GitLab, Azure DevOps, and other version control systems?

Yes, the Repository Discovery form is a way for the agency to collect and compile various source code hosting platforms used throughout the organization.

### Can the software inventory support additional agency needs, such as identifying AI use cases?

Yes! [code.json](https://gsa-share-it.github.io/site/schema/) is designed to be extensible where additionalProperties can be added to the schema. Fields to support additional needs include:

- `AIUseCaseID` is the software's ID in the AI Use Case Inventory as part of M-25-21 compliance.
- `SBOM` is a link to the software's SBOM as part of EO14028.

## code.json and agency-index.json Metadata Standards

Visit the [Schema FAQs Page](https://gsa-share-it.github.io/site/schema/faq/) to learn more about the code.json and agency-index.json metadata standards.
