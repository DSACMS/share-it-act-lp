The CMS Open Source Program Office developed various tools that can automate detecting, adding, and updating metadata to repositories.

**Procedures for Project Teams**:

[Creating a code.json file in your repository](#creating-a-code-json-file-in-your-repository)

- [codejson-form](#using-codejson-form)
- [codejson-action](#using-codejson-action)
- [repo-scaffolder](#using-repo-scaffolder)

**Procedures for Agencies**:

[Generate an agency-index.json file for submission](#generate-an-agency-index-json-file-for-agencies)

- [codejson-index](#using-codejson-index)

[Tools created by other teams and agencies](#tools-created-by-other-teams-and-agencies)

- [CMS CMCS](#cms-cmcs-code-json-aggregator)
- [CDC](#cdc-share-it-act-repository-scanner-tool)

## Creating a code.json file in your repository

### Using codejson-form

_This method works best for all repositories on all platforms._

Users can fill out a web form that creates a code.json file to be uploaded to a project's source code repository: https://gsa-share-it.github.io/codejson-form.

### Using codejson-action

_This method works best for repositories hosted on GitHub with GitHub Actions enabled._

The [codejson-action](https://github.com/GSA-SHARE-IT/codejson-action) is a GitHub Action that automatically generates and maintains code.json files for federal open source repositories. It ensures schema consistency and automates metadata calculations, including:

- Repository information
- Programming languages used
- Timestamps

#### Setting up the GitHub Action

To use the codejson-action in your repository, create a workflow file with the following configuration:

```yaml
name: Update Code.json
on:
  schedule:
    - cron: 0 0 1 * * # First day of every month
  workflow_dispatch:
  pull_request:
    types: [opened, synchronize]
    paths:
      - "code.json"

permissions:
  contents: write
  pull-requests: write
  issues: write

jobs:
  update-code-json:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v7
        with:
          fetch-depth: 0

      - name: Update code.json
        id: update
        uses: DSACMS/automated-codejson-generator@v2
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          ADMIN_TOKEN: ${{ secrets.ADMIN_PAT }} # PAT with admin/push permissions
          BRANCH: "main"
          SKIP_PR: "true"

      - name: Report update method
        run: |
          echo "Update successful: ${{ steps.update.outputs.updated }}"
          if [ "${{ steps.update.outputs.method_used }}" = "direct_push" ]; then
            echo "Direct push successful! Commit SHA: ${{ steps.update.outputs.commit_sha }}"
          elif [ "${{ steps.update.outputs.method_used }}" = "pull_request" ]; then
            echo "Created pull request: ${{ steps.update.outputs.pr_url }}"
          fi
```

This action will create a pull request to add or update a compliant code.json file in your repository.

### Using repo-scaffolder

_This method is most effective when GitHub Actions are unavailable, allowing cookiecutter to be installed locally with Python._

[repo-scaffolder](https://github.com/DSACMS/repo-scaffolder) is a tool for creating repositories that adhere to repository hygiene standards. It provides file templates detailing project information, contributing guidance, maintainer roles, community involvement, and **project metadata**.

For repositories created using repo-scaffolder, the tool can assist with adding code.json to the repository. Navigate to your project's `.github` directory and run the following cookiecutter command. You will be asked questions about the project in order to collect and store this metadata in code.json.

```
cookiecutter . --directory=codejson
```

For more information on repo-scaffolder, check out the [documentation](https://github.com/DSACMS/repo-scaffolder?tab=readme-ov-file#metadata-collection-using-codejson).

## Generate an agency-index.json file for agencies

### Using codejson-index

The [codejson-index](https://github.com/GSA-SHARE-IT/codejson-index) is a Python-based tool that helps federal agencies compile and maintain their code.json files for code.gov compliance. It scans specified GitHub organizations, finds repositories containing code.json files, and combines them into a single indexed file.

The tool can be run using the [codejson-index website](https://gsa-share-it.github.io/codejson-index/).

Alternatively, follow the instructions below to run locally.

#### Prerequisites

- Python 3.x
- GitHub Personal Access Token (recommended for higher rate limits)

#### Installation

1. Clone the repository:

```bash
git clone https://github.com/GSA-SHARE-IT/codejson-index.git
cd codejson-index
```

2. Install required dependencies:

```bash
pip install PyGithub
```

3. Set up your GitHub Personal Access Token:

```bash
export GITHUB_KEY="your-token-here"
```

#### Usage

Run the script from the command line with the following options:

```bash
python main.py --agency AGENCY_NAME --orgs "org1,org2" --output code.json --version VERSION_NUMBER
```

##### Required arguments:

- `--agency`: The name of your agency
- `--orgs`: Comma-separated list of GitHub organizations to scan (no spaces)

##### Optional arguments:

- `--output`: Output filename (default: code.json)
- `--version`: Code.json file version (default: 1.0.0)

##### Example:

```bash
python3 main.py --agency CMS --orgs "DSACMS,CMSgov,CMS-Enterprise" --output code.json --version 1.0.0
```

## Tools created by other teams and agencies

Below are tools other teams and agencies developed to create a consolidated software inventory for the SHARE IT Act. They include methods to retrieve necessary metadata from private and internal repositories.

### CMS CMCS code.json aggregator

mac-fc-aggregate-codejson aggregates code.json files from all private and internal repositories in a GitHub organization.

Repository: [https://github.com/Enterprise-CMCS/mac-fc-aggregate-code-json](https://github.com/Enterprise-CMCS/mac-fc-aggregate-code-json)

## CDC SHARE IT Act Repository Scanner Tool

The CDC SHARE IT Act Repository Scanner Tool gathers and consolidates repository metadata from various code environments by generating code.json files in all repositories, having project teams review and correct information for accuracy, then creating an index file containing all aggregated code.json metadata.

- CDC SHARE IT Act Index Repository: [https://github.com/CDCgov/ShareIT-Act](https://github.com/CDCgov/ShareIT-Act)
- Repository Scanner Tool: [https://github.com/OCIO-ricky/ShareITAct_RepoScanning](https://github.com/OCIO-ricky/ShareITAct_RepoScanning)
