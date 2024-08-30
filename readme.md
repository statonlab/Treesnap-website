[![DOI](https://zenodo.org/badge/85752471.svg)](https://zenodo.org/badge/latestdoi/85752471) [![Build Status](https://travis-ci.org/statonlab/Treesnap-website.svg?branch=master)](https://travis-ci.org/statonlab/Treesnap-website)

This repository hosts the TreeSnap website code.
If you're looking for TreeSnap, please visit https://treesnap.org

### API Documentation
If you're looking to use the TreeSnap API please, visit our [web services API documentation](https://github.com/statonlab/Treesnap-website/wiki/Public-API-Documentation).

### Developer Notes
When adding a new field to a survey in the mobile app, or changing the name of any field, you must add the field to MetaLabels.php, in both $this->labels and also the array of the respective tree below. (Note that if you change any answers or the names of any fields, you will need to go back and update old answers to ensure queries continue to function correctly. See UpdateOldHemlockAnswers for a reference. Adding a new answer is fine.)
Additionally, when adding a 'multiCheck' field, you must add the name of this field to $multiCheckFields in Filter.php to ensure the Advanced Filters search appropriately.

Don't forget to update the appropriate Advanced Filter.

### License
TreeSnap is licensed under GPL 3. Read our [license](LICENSE).
