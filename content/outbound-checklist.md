# **DRAFT SHARE IT Act Outbound Review Checklist**

_2026-09-01 Version 0.1_

_A source code repository release readiness checklist for federal agencies, aligned with OMB M-16-21, M-25-21, and the SHARE IT Act of 2024\._

## **Part 1: Pre-Development Reuse Analysis**

- [ ] Searched the government-wide repository for existing similar solutions
- [ ] Reviewed the agency's internal inventory for reusable components
- [ ] Evaluated open source and commercial-off-the-shelf (COTS) alternatives
- [ ] Documented the alternatives analysis findings
- [ ] Obtained CIO (or designee) review of the reuse analysis before custom development began

## **Part 2: Source Code Hosting Setup**

- [ ] Code has been maintained in a version-controlled repository from project start
- [ ] Repository includes a README, setup instructions, and architecture diagrams
- [ ] Releases are tagged with semantic versioning
- [ ] Machine-readable metadata is included (e.g., DCAT-US-aligned, code.json)
- [ ] Licensing terms are clearly documented
- [ ] Project is published to the agency-designated repository for cross-component/agency sharing

## **Part 3: Benefits and Risk Assessment**

**Benefits assessed:**

- [ ] Cost efficiencies (reduced licensing fees)
- [ ] Reuse and customization potential
- [ ] Reduced vendor lock-in
- [ ] Transparency and public accountability
- [ ] Improved interoperability and extensibility
- [ ] Faster innovation through community engagement
- [ ] Security verification through code transparency

**Risks assessed:**

- [ ] Security risks reviewed and mitigated
- [ ] Financial risks (maintenance, community engagement, infrastructure) reviewed
- [ ] Privacy risks (PII/PHI exposure) reviewed

## **Part 4: Sensitivity Screening**

Answer the following before proceeding. A "yes" to any question means the project may be sensitive and needs a deeper review before public release.

- [ ] Does the code contain hardcoded or sample data that could be sensitive (could synthetic data be substituted instead)?
- [ ] Does the code interface with any internal-only agency systems (mainframes, ticketing systems, databases, etc.)?
- [ ] Does the repository contain any keys or credentials used to access agency systems?

_If any answer is "yes," escalate to your agency's open source/legal/security point of contact before continuing._

## **Part 5: Code Review**

- [ ] Codebase reviewed top-to-bottom by two or more engineers who have written production code in the relevant languages within the past two years
- [ ] Reviewers assessed credential management practices (no keys/passwords in source or git history)
- [ ] Reviewers were independent of the software's development, where feasible
- [ ] Reviewers referenced a current vulnerability framework (e.g., OWASP Top 10\)
- [ ] Reviewer names, organizations, comments, and approval/disapproval are documented

## **Part 6: Code Analysis and Security Scanning**

- [ ] Static/dynamic code analysis performed
- [ ] Secret and key scanning performed
- [ ] No severe vulnerabilities remain (e.g., SQL injection, critical CVEs)
- [ ] No sensitive configuration values (tokens, passwords, certificates) remain in the repository
- [ ] Automated scanning is integrated into the CI/CD pipeline
- [ ] Scanning cadence and the responsible owner are documented

_Suggested (non-exhaustive) tool categories: repository linters, secret/key scanners, git history-cleaning tools, and vulnerability/CVE scanners. Agencies may substitute tools that meet the same function._

## **Part 7: Licensing Review**

- [ ] All components have licenses permitting reuse
- [ ] Third-party components and their licenses are documented
- [ ] Licensing constraints are flagged in the agency inventory
- [ ] A project license has been selected (public-domain dedication or an OSI-approved open source license) and included in a LICENSE file

## **Part 8: Repository Hygiene — Required Files**

- [ ] LICENSE
- [ ] README.md (project description, setup instructions, core team, applicable policy links)
- [ ] CONTRIBUTING.md (getting started, build/dependency instructions, issue-filing guidance)
- [ ] COMMUNITY.md (project points of contact, roles, responsibilities)
- [ ] SECURITY.md (security policies and vulnerability-reporting procedures)
- [ ] code.json (machine-readable project metadata)

## **Part 9: Repository Metadata**

- [ ] code.json created and kept up to date

## **Part 10: Source Code Inventory Management**

- [ ] Entry created/updated in the agency's machine-readable software inventory (system name, repository location, licensing terms, reuse status, security classification, last-updated date)
- [ ] Inventory updated on a regular schedule (quarterly recommended)
- [ ] Inventory linked to enterprise architecture and modernization roadmap documentation

## **Part 11: Acquisition Integration (for contractor-developed code)**

- [ ] Contract required delivery of source code, documentation, and metadata
- [ ] Contract secured at minimum government-wide reuse rights
- [ ] Contract prohibits vendor-imposed restrictions on reuse
- [ ] Contract required security scanning and licensing verification
- [ ] Vendor compliance with these requirements was evaluated during performance reviews

## **Part 12: Exemption Review**

### **SHARE IT Act Exemptions**

**Security and Privacy**

- [ ] Project does **NOT** contain PII/PHI or create an identifiable privacy risk

**National Security and Intelligence**

- [ ] Project is **NOT** primarily for use in national security systems (40 U.S.C. § 11103\)
- [ ] Project was **NOT** created by an agency/element of the intelligence community (Sec. 3(4), National Security Act of 1947\)
- [ ] Project is **NOT** exempt under FOIA (5 U.S.C. § 552(b))

**Export and Regulatory Compliance**

- [ ] Project is **NOT** restricted under Export Administration Regulations
- [ ] Project is **NOT** restricted under International Traffic in Arms Regulations (ITAR)
- [ ] Project is **NOT** restricted under TSA sensitive-information regulations
- [ ] Project is **NOT** restricted under laws governing classified information

**Disposable, Experimental and Commercial Software**

- [ ] The source code is NOT disposable in nature, meaning it was written for a one-time or short-term purpose and is not intended to be reused or maintained

- [ ] The source code is NOT solely exploratory in nature, including source code written by a developer experimenting with a new language or library

- [ ] The source code is NOT commercial computer software, commercial off-the-shelf (COTS) software, or configuration scripts for such software

### **M-16-21 Exemptions**

**Legal Restrictions**

- [ ] Sharing is **NOT** limited by patent or intellectual property restrictions

**Agency Verification**

- [ ] Sharing would **NOT** create risk to agency system/personnel stability, security, or integrity
- [ ] Sharing would **NOT** create risk to agency mission, programs, or operations
- [ ] Release is **NOT** deemed by the agency CIO to require a national-interest exemption

**M-25-21 Exemptions (for AI Code and Models)**

Agencies must also prioritize sharing AI code, models, and data government-wide, consistent with the [Open, Public, Electronic and Necessary (OPEN) Government Data Act](https://www.congress.gov/bill/115th-congress/house-bill/4174/text/eas#toc-HD4E1EFAE6EE64575A09DA8B3E2DAF936). Agencies, where practicable, must also release and maintain AI code [as open source software in public repository](https://obamawhitehouse.archives.gov/sites/default/files/omb/memoranda/2016/m_16_21.pdf), unless the:

- [ ] sharing of the code is restricted by law or regulation, including patent or intellectual property law, the Export Asset Regulations, the International Traffic in Arms Regulations, or Federal laws and regulations governing classified information;
- [ ] sharing of the code would create an identifiable risk to national security, confidentiality of Government information, individual privacy, or the rights or safety of the public;
- [ ] agency is prevented from doing so by a contractual obligation; or
- [ ] sharing of the code would create an identifiable risk to agency mission, programs, or operations, or to the stability, security, or integrity of an agency's systems or personnel.

_If all boxes above are checked, proceed to Part 13\. If not, this section must be completed and approved by the appropriate stakeholders before public release._

## **Part 13: Sign-Off and Governance Approval**

- [ ] Code reviewer(s) recommendation recorded
- [ ] Information System Security Officer (or equivalent) approval obtained
- [ ] Technical/governance board approval obtained
- [ ] Business owner(s) sign-off obtained
- [ ] Risk-acceptance decision documented with date and repository name

| Reviewer Role                         | Reviewer Name | Recommendation            |
| :------------------------------------ | :------------ | :------------------------ |
| Code Reviewer(s)                      |               | Approved / Needs Approval |
| Security Officer (ISSO or equivalent) |               | Approved / Needs Approval |
| Governance/Technical Approval         |               | Approved / Needs Approval |
| Business Owner(s)                     |               | Approved / Needs Approval |

## **Part 14: Post-release Actions ("Flip the Switch")**

- [ ] Repository "About" section includes a description, website link, and discoverability tags/topics
- [ ] Releases, packages, and deployments sections enabled where applicable
- [ ] Dependabot (or equivalent dependency-vulnerability) alerts enabled
- [ ] Secret-scanning alerts enabled
- [ ] Branch protections applied to main/development branches
- [ ] Git branching strategy documented
- [ ] (Optional) Developer Certificate of Origin (DCO) enforced

## **Part 15: Governance and Continuous Oversight**

- [ ] Agency SHARE IT working group established (CIO staff, acquisition officials, security teams, Chief Data Officer, development leads, repository administrators)
- [ ] Periodic reviews scheduled (repository submissions, inventory completeness, reuse certifications, exemption decisions, vendor compliance)
- [ ] Performance metrics tracked (percent of code shared, reuse events, cost savings, time to reuse, exemption frequency)
- [ ] Training provided to developers and acquisition staff on repository workflows and SHARE IT requirements
