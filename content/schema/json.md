---
title: JSON Schemas
description: 'Federal metadata schemas'
permalink: /schema/json/
layout: layouts/page
tags: shareit
eleventyNavigation:
  parent: shareit-schema
  key: shareit-schema-json
  order: 3
  title: JSON Schemas
sidenav: true
sticky_sidenav: true
---

Below are the latest versions of the federal software metadata JSON schemas. For complete documentation, including historical versions, visit the [codejson-schemas repository](https://github.com/GSA-SHARE-IT/codejson-schemas).

## code.json

- [Government-wide schema v0.1.0](https://gsa-share-it.github.io/codejson-schemas/schemas/schema-0.1.0.json)
- [CMS schema v2.2.0](https://gsa-share-it.github.io/codejson-schemas/schemas/cms/schema-2.2.0.json)

## agency-index.json

- [v2.0.0](https://gsa-share-it.github.io/codejson-schemas/schemas/agency-index/schema-2.0.0.json)

### Extending the code.json schema for agency use

The generic government-wide schema is designed to be extensible where `additionalProperties` is set as `true`, allowing agencies to add metadata fields that are relevant to their specific software inventorying needs.

For example, CMS has their [own schema](https://github.com/GSA-SHARE-IT/codejson-schemas/tree/main/schemas/cms) that includes new fields such as FISMA level, subset in healthcare, systems, and maturity model tier.

code.json can also be used to support additional agency needs, such as identifying AI use cases. The fields below are optional, but when populated can help streamline data collection and reduce redundant requests:

- `AIUseCaseID` is the software's ID in the AI Use Case Inventory as part of M-25-21 compliance.
- `SBOM` is a link to the software's SBOM as part of EO14028.

#### Submit your agency code.json schema

We encourage agencies to contribute by [submitting an agency schema addition issue](https://github.com/GSA-SHARE-IT/codejson-schemas/issues) to [include their extended schema in the repository](https://github.com/GSA-SHARE-IT/codejson-schemas/tree/main/schemas). This helps foster collaboration and ensures shared improvements benefit the wider community.
