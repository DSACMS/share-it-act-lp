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

### How does a code.json file look like?

Examples can be found in the codejson-schemas repository: [github.com/GSA-SHARE-IT/codejson-schemas/blob/main/docs/examples.md](https://www.github.com/GSA-SHARE-IT/codejson-schemas/blob/main/docs/examples.md)

### Is there a way to automate filling out the code.json file or do I have to manually do the work?

Our tools offer various ways to automate code.json data population:

1. [codejson-action](https://github.com/GSA-SHARE-IT/codejson-action)

This GitHub Action populates 21 code.json fields using the GitHub API:

- `name`
- `version`
- `description`
- `status`
- `license.name`, `license.URL`
- `organization`
- `repositoryURL`
- `repositoryVisibility`
- `homepageURL`
- `vcs`
- `reuseFrequency.forks`
- `reuseFrequency.clones`
- `languages`
- `SBOM`
- `date.created`, `date.lastModified`, `date.metadataLastUpdated`
- `tags`
- `contact.email`
- `feedbackMechanism`

2. [codejson-form](https://gsa-share-it.github.io/codejson-form/)

In step 2 of the form, click the `Enhance with AI` button to use a LLM to populate the rest of the code.json fields based on scanning the contents of the repository. Be sure to review each value for correctness and accuracy before generating your code.json file.

Visit the [Procedures page](https://gsa-share-it.github.io/site/schema/procedures/#using-codejson-form) and [Metadata page](https://gsa-share-it.github.io/site/schema) for more information on the automation options above.

### Which metadata fields require human judgment, and who should be responsible for completing them?

- `contractNumber` is a required field that links the software with its corresponding contract. The Contracting Officer Representative (COR) of the project should have this information
- Fields describing repository contents such as `description`, `status`, `languages`, and `tags` should be handled by the development team.

### I have feedback on additions and improvements to the code.json metadata standard. Where can I share this?

We are open to adding more fields to CMS code.json for any metadata the agency sees value in collecting. Request new metadata fields by filing a metadata field addition issue [here](https://github.com/GSA-SHARE-IT/codejson-schemas/issues/new?template=metadata-field-addition.md).

### My agency extended the code.json schema to add more metadata fields. Where can I share this?

We encourage agencies to contribute by [submitting an agency schema addition issue](https://github.com/GSA-SHARE-IT/codejson-schemas/issues) to [include their extended schema in the repository](https://github.com/GSA-SHARE-IT/codejson-schemas/tree/main/schemas). This helps foster collaboration and ensures shared improvements benefit the wider community.

### Can the code.json support additional agency needs, such as identifying AI use cases?

Yes! code.json is designed to be extensible where additionalProperties can be added to the schema. Fields to support additional needs include:

- `AIUseCaseID` is the software's ID in the AI Use Case Inventory as part of M-25-21 compliance.
- `SBOM` is a link to the software's SBOM as part of EO14028.

### Does `laborHours` need to be down-to-the-minute accurate?

The goal is to be as accurate as we can, and with as little burden as possible. We strive to automate labor hour calculations for public repositories whenever possible (using the [scc](https://github.com/boyter/scc) tool), but manual ballpark estimates are acceptable when precise calculation isn't feasible.

## agency-index.json Metadata Standard

### What is an agency-index.json file?

An `agency-index.json` file is a centralized inventory of an agency’s software portfolio. It combines code.json metadata from individual repositories into a single file that helps others discover the agency’s software as well as comply with the SHARE IT Act.

### How does agency-index.json differ from code.json?

A code.json file describes an individual software repository. An agency-index.json file brings those records together in its releases array and adds agency-level information, such as the agency acronym and metadata schema version.

### How do I generate an agency-index.json file?

1. Identify the GitHub organizations that host your agency’s software, then use the [codejson-index website](https://gsa-share-it.github.io/codejson-index/) or [Python tool](https://github.com/GSA-SHARE-IT/codejson-index). The tool scans the specified organizations for repositories containing code.json files and combines those records into an index. See the [procedures page](https://gsa-share-it.github.io/site/schema/procedures/#generate-an-agency-index-json-file-for-agencies) for instructions.

### Where should my agency publish its agency-index.json file?

The agency guidance lists two locations: the agency’s top-level domain or a GitHub repository. Publish the consolidated index in one of these locations so it can be accessed as the agency’s software inventory.

### How does an agency-index.json file look like?

Here are examples of the file:

- GSA Index hosted in a repository: [github.com/GSA-SHARE-IT/GSA-index.json]
- HHS Index in the agency's top-level domain: [hhs.gov/code.json](https://www.hhs.gov/code.json)
