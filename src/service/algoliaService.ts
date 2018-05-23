import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';

import environment from '../environment/config';

// initialize connection to algolia
const algoliaClient = algoliasearch(environment.applicationID, environment.apiKey);
var algoliaHelper = algoliasearchHelper(algoliaClient, environment.indexName, {disjunctiveFacets: ['category']});

export default {
    search(searchValue?: string) {
        let asyncSearch = new Promise((resolve, resject) => {
            algoliaHelper.setQuery(searchValue).search();
            algoliaHelper.on('result', (algoliaSearch) => {
                resolve(algoliaSearch);
            });
        });
        return asyncSearch;
    },

    facetToggle(facetCategory, facetName) {
        let asyncSearch = new Promise((resolve, resject) => {
            algoliaHelper.toggleRefinement(facetCategory, facetName).search();
            algoliaHelper.on('result', (algoliaSearch) => {
                resolve(algoliaSearch);
            });
        });
        return asyncSearch;
    }
}