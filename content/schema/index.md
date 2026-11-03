`code.json` is a metadata standard created to collect information on the agency's software projects. This is composed of:

- federal code.json standard, created as part of [M-16-21](https://obamawhitehouse.archives.gov/sites/default/files/omb/memoranda/2016/m_16_21.pdf)
- required metadata outlined in the [SHARE IT ACT](https://www.congress.gov/bill/118th-congress/house-bill/9566/text/ih) (e.g. repository visibility, contract number)
- [publiccode.yml](https://yml.publiccode.tools/) metadata, an international metadata standard

By harmonizing various standards, this opens up the opportunity to share our work not just on an agency level but also on a national and international level.

The generic code.json schema can be found in the [`schemas` directory](https://github.com/GSA-SHARE-IT/codejson-schemas/blob/main/schemas/schema-0.1.0.json).

## Extending the schema for agency use

The generic schema is designed to be extensible, allowing agencies to add metadata fields that are relevant to their specific software inventorying needs.

For example, CMS has their [own schema](https://github.com/GSA-SHARE-IT/codejson-schemas/tree/main/schemas/cms) that includes new fields such as FISMA level, subset in healthcare, and systems.

We encourage agencies to contribute by [submitting an agency schema addition issue](https://github.com/GSA-SHARE-IT/codejson-schemas/issues) to [include their extended schema in the repository](https://github.com/GSA-SHARE-IT/codejson-schemas/tree/main/schemas). This helps foster collaboration and ensures shared improvements benefit the wider community.

## code.json Fields

**Legend**

<table>
  <thead>
    <tr>
      <th>Source Policy</th>
      <th>Metadata</th>
      <th>Origin</th>
      <th>Icon</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/GSA/code-gov-data/blob/master/schemas/schema-2.0.0.json">M-16-21</a></td>
      <td>code.json</td>
      <td>Federal</td>
      <td>🇺🇸</td>
    </tr>
    <tr>
      <td><a href="https://yml.publiccode.tools/">publiccode.yml</a></td>
      <td>publiccode.yml</td>
      <td>International</td>
      <td>🌎</td>
    </tr>
    <tr>
    <td><a href="https://www.congress.gov/bill/118th-congress/house-bill/9566/text/ih">SHARE IT Act</a></td>
      <td>code.json</td>
      <td>Federal</td>
      <td>📜</td>
    </tr>
    <tr>
      <td><a href="https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf">M-25-21</a></td>
      <td>code.json</td>
      <td>Federal</td>
      <td>🌐</td>
    </tr>
  </tbody>
</table>

A checkmark (✅) in the _Automated_ column indicates a field populated through the GitHub API by [automated-codejson-generator](https://github.com/DSACMS/automated-codejson-generator).

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Presence</th>
      <th>Source</th>
      <th>Type</th>
      <th>Automated</th>
      <th>Description</th>
      <th>Options/Examples</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>name <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸🌎</td>
      <td>str</td>
      <td>✅</td>
      <td>Name of the project or software</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>identifier <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>📜</td>
      <td>str</td>
      <td></td>
      <td>Persistent unique ID; tracks assets across renames/migrations</td>
      <td></td>
    </tr>
    <tr>
      <td>version <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td>✅</td>
      <td>The version for this release</td>
      <td></td>
    </tr>
    <tr>
      <td>description <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td>✅</td>
      <td>A one or two sentence description of the software.</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>organization <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td>✅</td>
      <td>The organization or component within the agency to which the releases listed belong.</td>
      <td>Centers for Medicare & Medicaid Services, 18F, Navy</td>
    </tr>
    <tr>
      <td><strong>status <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸📜</td>
      <td>str</td>
      <td>✅</td>
      <td>Development status of the project</td>
      <td>
        - Ideation<br>
        - Development<br>
        - Alpha<br>
        - Beta<br>
        - Release Candidate<br>
        - Production<br>
        - Archival
      </td>
    </tr>
    <tr>
      <td>permissions/license/url <small class="schema-optional">(optional)</small> <br> permissions/license/name <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸🌎</td>
      <td>obj</td>
      <td>✅</td>
      <td>
        An object containing description of the usage/restrictions regarding the release.<br><br>
        An abbreviation for the name of the license. The URL of the release license.
      </td>
      <td></td>
    </tr>
    <tr>
      <td><strong>permissions/usageType <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸📜</td>
      <td>str</td>
      <td></td>
      <td>A list of enumerated values which describes the usage permissions for the release: (1) openSource: Open source; (2) governmentWideReuse: Government-wide reuse; (3) exemptByNationalSecurity: The source code is primarily for use in national security system as defined in section 11103 of title 40, USC; (4) exemptByNationalIntelligence: The source code is developed by an agency or part of an agency that is an element of the intelligence community, as defined in section 3(4) of the National Security Act of 1947; (5) exemptByFOIA: The source code is exempt under the Freedom of Information Act; (6) exemptByEAR: The source code is exempt under the Export Administration Regulations; (7) exemptByITAR: The source code is exempt under the the International Traffic in Arms Regulations; (8) exemptByTSA: The source code is exempt under the regulations of the Transportation Security Administration relating to the protection of Sensitive Security Information; (9) exemptByClassifiedInformation: The source code is exempt under the Federal laws and regulations governing the sharing of classified information not covered by exemptByNationalSecurity, exemptByNationalIntelligence, exemptbyFOIA, exemptByEAR, exemptByITAR, and exemptByTSA; (10) exemptByPrivacyRisk: The sharing or public accessibility of the source code would create an identifiable risk to the privacy of an individual; (11) exemptByDisposableCode: The source code is disposable in nature, meaning it was written for a one-time or short-term purpose and is not intended to be reused or maintained; (12) exemptByExperimentalCode: The source code is solely exploratory in nature, including source code written by a developer experimenting with a new language or library, and is not intended for production or public reuse; (13) exemptByCommercialSoftware: The source code is commercial computer software, commercial off-the-shelf (COTS) software, or configuration scripts for such software
      </td>
      <td>
        - openSource<br>
        - governmentWideReuse<br>
        - exemptByNationalSecurity<br>
        - exemptByNationalIntelligence<br>
        - exemptByFOIA<br>
        - exemptByEAR<br>
        - exemptByITAR<br>
        - exemptByTSA<br>
        - exemptByClassifiedInformation<br>
        - exemptByPrivacyRisk<br>
        - exemptByDisposableCode<br>
        - exemptByExperimentalCode<br>
        - exemptByCommercialSoftware<br>
      </td>
    </tr>
    <tr>
      <td>permissions/exemptionText</td>
      <td>conditional (only if exempted)</td>
      <td>🇺🇸📜</td>
      <td>str</td>
      <td></td>
      <td>If an exemption is listed in the 'usageType' field, this field should include a one- or two- sentence justification for the exemption used.</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>reuseFrequency/forks <span class="schema-required" aria-hidden="true">*</span></strong> <br> <strong>reuseFrequency/clones <span class="schema-required" aria-hidden="true">*</span></strong> <br> <strong>reuseFrequency/downloads <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>📜</td>
      <td>obj</td>
      <td>✅</td>
      <td>Measures frequency of code reuse in various forms such as forks and clones for repositories, and downloads for packaged and distributed software</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>repositoryURL <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸📜</td>
      <td>str</td>
      <td>✅</td>
      <td>The URL of the public release repository for open source repositories. This field is not required for repositories that are only available as government-wide reuse or are closed (pursuant to one of the exemptions). It can be listed as 'private' for repositories that are closed.</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>repositoryVisibility <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>📜</td>
      <td>str</td>
      <td>✅</td>
      <td>Visibility of repository</td>
      <td>
        - public<br>
        - private
      </td>
    </tr>
    <tr>
      <td>homepageURL <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td>✅</td>
      <td>The URL of the public release homepage</td>
      <td></td>
    </tr>
    <tr>
      <td>downloadURL <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td></td>
      <td>The URL where a distribution of the release can be found</td>
      <td></td>
    </tr>
    <tr>
      <td>disclaimerURL <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td></td>
      <td>The URL where disclaimer language regarding the release can be found</td>
      <td></td>
    </tr>
    <tr>
      <td>disclaimerText <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td></td>
      <td>Short paragraph that includes disclaimer language to accompany the release</td>
      <td></td>
    </tr>
    <tr>
      <td>vcs <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td>✅</td>
      <td>Version control system used</td>
      <td>
        - git<br>
        - hg<br>
        - svn<br>
        - rcs<br>
        - bzr
      </td>
    </tr>
    <tr>
      <td>laborHours <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>int</td>
      <td></td>
      <td>Labor hours invested in the project. Calculated through <a href="https://github.com/boyter/scc">COCOMO & SCC tool</a></td>
      <td></td>
    </tr>
    <tr>
      <td>languages <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>arr</td>
      <td>✅</td>
      <td>Programming languages that make up the codebase</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>maintenance <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🌎📜</td>
      <td>str</td>
      <td></td>
      <td>The dedicated staff that keeps the software up-to-date, if any</td>
      <td>
        - internal<br>
        - contract<br>
        - community<br>
        - none
      </td>
    </tr>
    <tr>
      <td><strong>contractNumber <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>📜</td>
      <td>array</td>
      <td></td>
      <td>Contract number</td>
      <td></td>
    </tr>
    <tr>
      <td>SBOM <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td>✅</td>
      <td>Link of the upstream repositories and dependencies used, in the form of a Software Bill of Materials/SBOM. If the software does not have a SBOM, enter 'None'. (i.e. Github provides an SBOM: https://github.com/$ORG_NAME/$REPO_NAME/network/dependencies)</td>
      <td></td>
    </tr>
     <tr>
      <td>relatedCode/name <small class="schema-optional">(optional)</small> <br> relatedCode/URL <small class="schema-optional">(optional)</small> <br> relatedCode/isGovernmentRepo <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>obj</td>
      <td></td>
      <td>An array of affiliated government repositories that may be a part of the same project</td>
      <td>relatedCode for 'code-gov-front-end' would include 'code-gov-api' and 'code-gov-api-client'</td>
    </tr>
    <tr>
      <td>reusedCode/name <small class="schema-optional">(optional)</small> <br> reusedCode/URL <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>obj</td>
      <td></td>
      <td>An array of government source code, libraries, frameworks, APIs, platforms or other software used in this release</td>
      <td>
        - US Web Design Standards<br>
        - cloud.gov<br>
        - Federalist<br>
        - Digital Services Playbook<br>
        - Analytics Reporter<br>
      </td>
    </tr>
    <tr>
      <td>partners/name <small class="schema-optional">(optional)</small> <br> partners/email <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>obj</td>
      <td></td>
      <td>An array of objects including an acronym for each agency partnering on the release and the contact email at such agency</td>
      <td></td>
    </tr>
    <tr>
      <td>date/created <small class="schema-optional">(optional)</small> <br> date/lastModified date/metadataLastUpdated <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>obj</td>
      <td>✅</td>
      <td>A date object describing the release</td>
      <td></td>
    </tr>
    <tr>
      <td>tags <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>arr</td>
      <td>✅</td>
      <td>Topics and keywords associated with the project to improve search and discoverability</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>contact/email <span class="schema-required" aria-hidden="true">*</span></strong> <br> <strong>contact/name <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸🌎</td>
      <td>obj</td>
      <td>✅ (email only)</td>
      <td>Point of contact for the release<br>Email of point of contact<br>Name of point of contact</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>feedbackMechanism <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>📜</td>
      <td>str</td>
      <td>✅</td>
      <td>Method a repository receives feedback from the community (i.e. URL to GitHub repository issues page)</td>
      <td>
        - Submitting issues to repo<br>
      </td>
    </tr>
    <tr>
      <td>AIUseCaseID <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🌐</td>
      <td>str</td>
      <td></td>
      <td>The software's ID in the AI Use Case Inventory. If the software is not currently listed in the inventory, enter '0'</td>
      <td>
      </td>
    </tr>
  </tbody>
</table>

Full schema can be found in [schema-0.1.0.json](https://github.com/GSA-SHARE-IT/codejson-schemas/blob/main/schemas/schema-0.1.0.json).

## CMS code.json Fields

**Legend**

<table>
  <thead>
    <tr>
      <th>Metadata Standard</th>
      <th>Origin</th>
      <th>Icon</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://github.com/GSA/code-gov-data/blob/master/schemas/schema-2.0.0.json">code.json</a></td>
      <td>Federal</td>
      <td>🇺🇸</td>
    </tr>
    <tr>
      <td><a href="https://yml.publiccode.tools/">publiccode.yml</a></td>
      <td>International</td>
      <td>🌎</td>
    </tr>
    <tr>
      <td>CMS fields</td>
      <td>Agency</td>
      <td><img src="/../assets/schema/img/cms-logo.jpg" class="cms-logo" alt="CMS Logo" loading="lazy" decoding="async"></td>
    </tr>
    <tr>
    <td><a href="https://www.congress.gov/bill/118th-congress/house-bill/9566/text/ih">SHARE IT Act</a></td>
      <td>Federal</td>
      <td>📜</td>
    </tr>
  </tbody>
</table>

A checkmark (✅) in the Automated column indicates a field populated through the GitHub API by [automated-codejson-generator](https://github.com/DSACMS/automated-codejson-generator). Blank cells indicate fields outside that automation.

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Presence</th>
      <th>Source</th>
      <th>Type</th>
      <th>Automated</th>
      <th>Description</th>
      <th>Options/Examples</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>name <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸🌎</td>
      <td>str</td>
      <td>✅</td>
      <td>Name of the project or software</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>identifier <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>📜</td>
      <td>str</td>
      <td></td>
      <td>Persistent unique ID; tracks assets across renames/migrations</td>
      <td></td>
    </tr>
    <tr>
      <td>version <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td>✅</td>
      <td>The version for this release</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>description <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td>✅</td>
      <td>A short description of the project. It should be a single line containing a single sentence. Maximum 150 characters are allowed.</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>longDescription <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🌎</td>
      <td>str</td>
      <td></td>
      <td>Provide longer description of the software, between 150 and 10000 chars. It is meant to provide an overview of the capabilities of the software for a potential user.</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>organization <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td>✅</td>
      <td>The organization or component within the agency to which the releases listed belong.</td>
      <td>Centers for Medicare & Medicaid Services</td>
    </tr>
    <tr>
      <td><strong>status <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸📜</td>
      <td>str</td>
      <td>✅</td>
      <td>Development status of the project</td>
      <td>
        - Ideation<br>
        - Development<br>
        - Alpha<br>
        - Beta<br>
        - Release Candidate<br>
        - Production<br>
        - Archival
      </td>
    </tr>
    <tr>
      <td><strong>permissions/license/url <span class="schema-required" aria-hidden="true">*</span></strong> <br> <strong>permissions/license/name <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸🌎</td>
      <td>obj</td>
      <td>✅</td>
      <td>
        An object containing description of the usage/restrictions regarding the release.<br><br>
        An abbreviation for the name of the license. The URL of the release license.
      </td>
      <td></td>
    </tr>
    <tr>
      <td><strong>permissions/usageType <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸📜</td>
      <td>str</td>
      <td></td>
      <td>A list of enumerated values which describes the usage permissions for the release: (1) openSource: Open source; (2) governmentWideReuse: Government-wide reuse; (3) exemptByNationalSecurity: The source code is primarily for use in national security system as defined in section 11103 of title 40, USC; (4) exemptByNationalIntelligence: The source code is developed by an agency or part of an agency that is an element of the intelligence community, as defined in section 3(4) of the National Security Act of 1947; (5) exemptByFOIA: The source code is exempt under the Freedom of Information Act; (6) exemptByEAR: The source code is exempt under the Export Administration Regulations; (7) exemptByITAR: The source code is exempt under the the International Traffic in Arms Regulations; (8) exemptByTSA: The source code is exempt under the regulations of the Transportation Security Administration relating to the protection of Sensitive Security Information; (9) exemptByClassifiedInformation: The source code is exempt under the Federal laws and regulations governing the sharing of classified information not covered by exemptByNationalSecurity, exemptByNationalIntelligence, exemptbyFOIA, exemptByEAR, exemptByITAR, and exemptByTSA; (10) exemptByPrivacyRisk: The sharing or public accessibility of the source code would create an identifiable risk to the privacy of an individual; (11) exemptByDisposableCode: The source code is disposable in nature, meaning it was written for a one-time or short-term purpose and is not intended to be reused or maintained (e.g., a throwaway script or one-off utility); (12) exemptByExperimentalCode: The source code is solely exploratory in nature, including source code written by a developer experimenting with a new language or library, and is not intended for production or public reuse; (13) exemptByCommercialSoftware: The source code is commercial computer software, commercial off-the-shelf (COTS) software, or configuration scripts for such software</td>
      <td>
        - openSource<br>
        - governmentWideReuse<br>
        - exemptByNationalSecurity<br>
        - exemptByNationalIntelligence<br>
        - exemptByFOIA<br>
        - exemptByEAR<br>
        - exemptByITAR<br>
        - exemptByTSA<br>
        - exemptByClassifiedInformation<br>
        - exemptByPrivacyRisk<br>
        - exemptByDisposableCode<br>
        - exemptByExperimentalCode<br>
        - exemptByCommercialSoftware<br>
      </td>
    </tr>
    <tr>
      <td>permissions/exemptionText</td>
      <td>conditional (only if exempted)</td>
      <td>🇺🇸📜</td>
      <td>str</td>
      <td></td>
      <td>If an exemption is listed in the 'usageType' field, this field should include a one- or two- sentence justification for the exemption used.</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>reuseFrequency/forks <span class="schema-required" aria-hidden="true">*</span></strong> <br> <strong>reuseFrequency/clones <span class="schema-required" aria-hidden="true">*</span></strong> <br> <strong>reuseFrequency/downloads <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>📜</td>
      <td>obj</td>
      <td>✅</td>
      <td>Measures frequency of code reuse in various forms such as forks and clones for repositories, and downloads for packaged and distributed software</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>repositoryURL <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸📜</td>
      <td>str</td>
      <td>✅</td>
      <td>The URL of the public release repository for open source repositories. This field is not required for repositories that are only available as government-wide reuse or are closed (pursuant to one of the exemptions). It can be listed as 'private' for repositories that are closed.</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>repositoryHost <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>{% image_with_class "assets/schema/img/cms-logo.jpg" "cms-logo" "CMS Logo" %}</td>
      <td>str</td>
      <td></td>
      <td>Location where source code is hosted</td>
      <td>
        - github.com/CMSgov<br>
        - github.com/CMS-Enterprise<br>
        - github.com/Enterprise-CMCS<br>
        - github.com/DSACMS<br>
        - github.cms.gov<br>
        - CCSQ GitHub
      </td>
    </tr>
    <tr>
      <td><strong>repositoryVisibility <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>📜</td>
      <td>str</td>
      <td>✅</td>
      <td>Visibility of repository</td>
      <td>
        - public<br>
        - private
      </td>
    </tr>
        <tr>
      <td>homepageURL <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td>✅</td>
      <td>The URL of the public release homepage</td>
      <td></td>
    </tr>
    <tr>
      <td>downloadURL <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td></td>
      <td>The URL where a distribution of the release can be found</td>
      <td></td>
    </tr>
    <tr>
      <td>disclaimerURL <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td></td>
      <td>The URL where disclaimer language regarding the release can be found</td>
      <td></td>
    </tr>
    <tr>
      <td>disclaimerText <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td></td>
      <td>Short paragraph that includes disclaimer language to accompany the release</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>vcs <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td>✅</td>
      <td>Version control system used</td>
      <td>
        - git<br>
        - hg<br>
        - svn<br>
        - rcs<br>
        - bzr
      </td>
    </tr>
    <tr>
      <td><strong>laborHours <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸</td>
      <td>int</td>
      <td></td>
      <td>Labor hours invested in the project. Calculated through <a href="https://github.com/boyter/scc">COCOMO & SCC tool</a></td>
      <td></td>
    </tr>
    <tr>
      <td><strong>platforms <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🌎</td>
      <td>arr</td>
      <td></td>
      <td>Platforms supported by the project</td>
      <td>
        - web<br>
        - windows<br>
        - mac<br>
        - linux<br>
        - ios<br>
        - android<br>
        - other
      </td>
    </tr>
    <tr>
      <td><strong>categories <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🌎</td>
      <td>arr</td>
      <td></td>
      <td>Categories the project belongs to.</td>
      <td>Select from: <a href="https://yml.publiccode.tools/categories-list.html">categories list</a></td>
    </tr>
    <tr>
      <td><strong>softwareType <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🌎</td>
      <td>str</td>
      <td></td>
      <td>Type of software</td>
      <td>
        - standalone/mobile<br>
        - standalone/iot<br>
        - standalone/desktop<br>
        - standalone/web<br>
        - standalone/backend<br>
        - standalone/other<br>
        - addon<br>
        - library<br>
        - configurationFiles
      </td>
    </tr>
    <tr>
      <td><strong>languages <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td>✅</td>
      <td>Programming languages that make up the codebase</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>maintenance <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🌎📜</td>
      <td>str</td>
      <td></td>
      <td>The dedicated staff that keeps the software up-to-date, if any</td>
      <td>
        - internal<br>
        - contract<br>
        - community<br>
        - none
      </td>
    </tr>
    <tr>
      <td><strong>contractNumber <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>📜</td>
      <td>array</td>
      <td></td>
      <td>Contract number</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>SBOM <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸</td>
      <td>str</td>
      <td>✅</td>
      <td>Link of the upstream repositories and dependencies used, in the form of a Software Bill of Materials/SBOM. If the software does not have a SBOM, enter 'None'. (i.e. Github provides an SBOM: https://github.com/$ORG_NAME/$REPO_NAME/network/dependencies)</td>
      <td></td>
    </tr>
     <tr>
      <td>relatedCode/name <small class="schema-optional">(optional)</small> <br> relatedCode/URL <small class="schema-optional">(optional)</small> <br> relatedCode/isGovernmentRepo <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>obj</td>
      <td></td>
      <td>An array of affiliated government repositories that may be a part of the same project</td>
      <td>relatedCode for 'code-gov-front-end' would include 'code-gov-api' and 'code-gov-api-client'</td>
    </tr>
    <tr>
      <td>reusedCode/name <small class="schema-optional">(optional)</small> <br> reusedCode/URL <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>obj</td>
      <td></td>
      <td>An array of government source code, libraries, frameworks, APIs, platforms or other software used in this release</td>
      <td>
        - US Web Design Standards<br>
        - cloud.gov<br>
        - Federalist<br>
        - Digital Services Playbook<br>
        - Analytics Reporter<br>
      </td>
    </tr>
    <tr>
      <td>partners/name <small class="schema-optional">(optional)</small> <br> partners/email <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>🇺🇸</td>
      <td>obj</td>
      <td></td>
      <td>An array of objects including an acronym for each agency partnering on the release and the contact email at such agency</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>date/created <span class="schema-required" aria-hidden="true">*</span></strong> <br> <strong>date/lastModified date/metadataLastUpdated <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸</td>
      <td>obj</td>
      <td>✅</td>
      <td>A date object describing the release</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>tags <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸</td>
      <td>arr</td>
      <td>✅</td>
      <td>Topics and keywords associated with the project to improve search and discoverability</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>contact/email <span class="schema-required" aria-hidden="true">*</span></strong> <br> <strong>contact/name <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🇺🇸🌎</td>
      <td>obj</td>
      <td>✅ (email only)</td>
      <td>Point of contact for the release<br>Email of point of contact<br>Name of point of contact</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>feedbackMechanism <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>📜</td>
      <td>str</td>
      <td>✅</td>
      <td>Method a repository receives feedback from the community (i.e. URL to GitHub repository issues)</td>
      <td>
        - Submitting issues to repo<br>
      </td>
    </tr>
    <tr>
      <td><strong>AIUseCaseID <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🌐</td>
      <td>str</td>
      <td></td>
      <td>The software's ID in the AI Use Case Inventory. If the software is not currently listed in the inventory, enter '0'</td>
      <td>
      </td>
    </tr>
    <tr>
      <td><strong>localisation <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>🌎</td>
      <td>bool</td>
      <td></td>
      <td>Indicates if the project supports multiple languages</td>
      <td>
        - true<br>
        - false
      </td>
    </tr>
    <tr>
      <td><strong>repositoryType <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>{% image_with_class "assets/schema/img/cms-logo.jpg" "cms-logo" "CMS Logo" %}</td>
      <td>str</td>
      <td></td>
      <td>Purpose and functionality of the repository</td>
      <td>
        - package<br>
        - website<br>
        - standards<br>
        - libraries<br>
        - data<br>
        - application<br>
        - tools<br>
        - APIs
      </td>
    </tr>
    <tr>
      <td><strong>userInput <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>{% image_with_class "assets/schema/img/cms-logo.jpg" "cms-logo" "CMS Logo" %}</td>
      <td>bool</td>
      <td></td>
      <td>Does the software accept user input?</td>
      <td>
        - true<br>
        - false
      </td>
    </tr>
    <tr>
      <td><strong>fismaLevel <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>{% image_with_class "assets/schema/img/cms-logo.jpg" "cms-logo" "CMS Logo" %}</td>
      <td>str</td>
      <td></td>
      <td>Level of security categorization assigned to an information system under the Federal Information Security Modernization Act (FISMA): <a href="https://security.cms.gov/learn/federal-information-security-modernization-act-fisma">link</a></td>
      <td>
        - low<br>
        - moderate<br>
        - high
      </td>
    </tr>
    <tr>
      <td><strong>group <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>{% image_with_class "assets/schema/img/cms-logo.jpg" "cms-logo" "CMS Logo" %}</td>
      <td>str</td>
      <td></td>
      <td>Home Department / Org / Group associated with the project</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>projects <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>{% image_with_class "assets/schema/img/cms-logo.jpg" "cms-logo" "CMS Logo" %}</td>
      <td>arr</td>
      <td></td>
      <td>Project(s) that is associated or related to the repository, if any.</td>
      <td>Bluebutton, MPSM, codejson</td>
    </tr>
    <tr>
      <td>systems <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>{% image_with_class "assets/schema/img/cms-logo.jpg" "cms-logo" "CMS Logo" %}</td>
      <td>arr</td>
      <td></td>
      <td>CMS systems that the repository interfaces with or depends on, if any.</td>
      <td>IDR, PECOS</td>
    </tr>
    <tr>
      <td><strong>subsetInHealthcare <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>{% image_with_class "assets/schema/img/cms-logo.jpg" "cms-logo" "CMS Logo" %}</td>
      <td>arr</td>
      <td></td>
      <td>Healthcare-related subset</td>
      <td>
        - policy<br>
        - operational<br>
        - medicare<br>
        - medicaid
      </td>
    </tr>
    <tr>
      <td><strong>userType <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>{% image_with_class "assets/schema/img/cms-logo.jpg" "cms-logo" "CMS Logo" %}</td>
      <td>arr</td>
      <td></td>
      <td>Types of users who interact with the software</td>
      <td>
        - providers<br>
        - patients<br>
        - government
      </td>
    </tr>
    <tr>
      <td><strong>maturityModelTier <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>{% image_with_class "assets/schema/img/cms-logo.jpg" "cms-logo" "CMS Logo" %}</td>
      <td>int</td>
      <td></td>
      <td>Maturity model tier</td>
      <td>0, 1, 2, 3, 4</td>
    </tr>
  </tbody>
</table>

Full schema can be found in [schema-2.2.0.json](https://github.com/GSA-SHARE-IT/codejson-schemas/blob/main/schemas/cms/schema-2.2.0.json).

## Adding new metadata fields

For CMS, we are open to adding more fields to CMS code.json for any metadata the agency sees value in collecting. Request new metadata fields by filing a metadata field addition issue [here](https://github.com/GSA-SHARE-IT/codejson-schemas/issues/new?template=metadata-field-addition.md).
