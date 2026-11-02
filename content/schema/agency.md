The SHARE IT Act requires federal agencies to publish metadata for their software projects. This metadata is compiled into an **agency-index.json** file, which serves as a centralized inventory of the agency's software portfolio.

## Generate an agency-index.json file for submission

To create an agency-index.json:

1. Identify GitHub organizations and other platforms where source code is hosted
2. Generate the agency-index.json using the tools below. Learn more about usage in [procedures.md](https://github.com/DSACMS/gov-codejson/blob/main/docs/procedures.md#generate-an-agency-indexjson-file-for-agencies)
   - [index-generator-website](https://dsacms.github.io/index-generator-website/)
   - [index-generator python tool](https://github.com/DSACMS/codejson-index-generator)
3. Provide the index at:
   - Agency's top level domain (TLD)
   - A GitHub repository

## agency-index.json Fields

<table>
  <thead>
    <tr>
      <th>Field</th>
      <th>Presence</th>
      <th>Type</th>
      <th>Description</th>
      <th>Options/Examples</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>agency <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>str</td>
      <td>The agency acronym for Clinger Cohen Act agency, as defined by the United States Government Manual.</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>measurementType/method <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>str</td>
      <td>An enumerated list of methods for measuring the open source requirement.</td>
      <td>
        - linesOfCode<br>
        - modules<br>
        - cost<br>
        - projects<br>
        - systems<br>
        - other<br>
      </td>
    </tr>
    <tr>
      <td>measurementType/ifOther <small class="schema-optional">(optional)</small></td>
      <td>optional</td>
      <td>str</td>
      <td>A one- or two- sentence description of the measurement type used, if 'other' is selected as the value of 'method' field.</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>releases <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>array</td>
      <td>An array of code.json objects containing each versioned source code release made available. </td>
      <td></td>
    </tr>
    <tr>
      <td><strong>version <span class="schema-required" aria-hidden="true">*</span></strong></td>
      <td>required</td>
      <td>str</td>
      <td>The version of the metadata schema in use. Implements semantic versioning 2.0.0 rules as defined at http://semver.org.</td>
      <td></td>
    </tr>
  </tbody>
</table>

View the agency-index.json schema here: [https://github.com/DSACMS/gov-codejson/tree/main/schemas/agency-index/schema-2.0.0.json](https://github.com/DSACMS/gov-codejson/tree/main/schemas/agency-index/schema-2.0.0.json)
