// inferno module
import { Component, render } from 'inferno';

// css
import '../src/main.css';

// component
import Faceting from './component/faceting';
import Hits from './component/hits';
import SearchBox from './component/searchBox';

// service
import algoliaService from './service/algoliaService';

interface appState {
	search: string;
	hits: any[];
	facets: any[];
}

class App extends Component<any, appState> {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			hits: [],
			facets: []
		};
	}

	// This is an easy way to get the isRefined param
	// This param is not available in facet.data by default
	facetsData(algoliaSearch) {
		return algoliaSearch['disjunctiveFacets'].map((facet) => {
			const refinedData = algoliaSearch.getFacetValues(facet.name).reduce((accumulator, data) => {
				accumulator[data.name] = data.isRefined;
				return accumulator;
			}, {});

			return {
				...facet,
				refined: refinedData
			}
		})
	}

	update(algoliaSearch) {
		console.log('facetsData', this.facetsData(algoliaSearch));
		this.setState((prevState, props) => {
			return {					
				...prevState,
				hits: algoliaSearch['hits'],
				facets: this.facetsData(algoliaSearch)
			};
		});
	}

	search(searchValue: string) {
		algoliaService.search(searchValue).then((algoliaSearch) => {
			console.log(algoliaSearch);

			this.update(algoliaSearch);
		});
	}

	facetToggle(facetName: string) {
		return algoliaService.facetToggle('category', facetName).then((algoliaSearch) => {
			console.log(algoliaSearch);

			this.update(algoliaSearch);
		})
	}
	
	render() {
		return (
			<div>
				<h1>Algolia technical test - Inferno - Frontend</h1>
				<SearchBox search={this.search.bind(this)} />
				<Faceting facets={this.state.facets} toggle={this.facetToggle.bind(this)}/>
				<Hits hits={this.state.hits} />
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));
