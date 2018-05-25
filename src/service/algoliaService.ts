import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';

import environment from '../environment/config';

// initialize connection to algolia
const algoliaClient = algoliasearch(environment.applicationID, environment.apiKey);
var algoliaHelper = algoliasearchHelper(algoliaClient, environment.indexNameDesc, {
        disjunctiveFacets: ['category']
    });

export default {

    search(searchValue?: string, pageNumber?: number) {
        let asyncSearch = new Promise((resolve, resject) => {
            algoliaHelper
                .setQuery(searchValue)
                .setPage(pageNumber)
                .search();
            algoliaHelper.on('result', (algoliaSearch) => {
                resolve(algoliaSearch);
            });
        });
        return asyncSearch;
    },

    sortChange(searchValue?: string, orderName?: string) {
        let indexName = '';
        if(orderName === 'asc') {
            indexName = environment.indexNameAsc;
        } else if(orderName === 'desc') {
            indexName = environment.indexNameDesc;
        } else {
            // fallback to default
            indexName = environment.indexName;
        }

        let asyncSearch = new Promise((resolve, resject) => {
            algoliaHelper
                .setQuery(searchValue)
                .setIndex(indexName)
                .search();
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