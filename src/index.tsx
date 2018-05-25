// inferno module
import { Component, render } from 'inferno';

// css
import '../src/main.css';

// component
import Faceting from './component/faceting';
import Hits from './component/hits';
import Pagination from './component/Pagination';
import Sort from './component/Sort';
import SearchBox from './component/searchBox';

// service
import algoliaService from './service/algoliaService';

interface appState {
	search: string;
	hits: any[];
	nbHits: number;
	facets: any[];
	sort: string,
	pagination: {
		previous: number,
		list: number[],
		next: number,
		current: number,
		total: number
	}
}

class App extends Component<any, appState> {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			hits: [],
			nbHits: null,
			facets: [],
			sort: 'desc',
			pagination: {
				previous: 0,
				list: [0],
				next: 0,
				current: 0,
				total: 1
			}
		};
	}

	componentDidMount() {
		// Initialize with an empty search
		// this way the user has some data to start from
		this.search();
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
		this.hitsStateUpdate(algoliaSearch);
		this.facetsStateUpdate(algoliaSearch);
		this.paginationStateUpdate(algoliaSearch);
	}

	hitsStateUpdate(algoliaSearch) {
		this.setState((prevState, props) => {
			return {					
				...prevState,
				hits: algoliaSearch['hits'],
				nbHits: algoliaSearch['nbHits'],
			};
		});
	}

	facetsStateUpdate(algoliaSearch) {
		this.setState((prevState, props) => {
			return {					
				...prevState,
				facets: this.facetsData(algoliaSearch)
			};
		});
	}

	sortStateUpdate() {
		this.setState((prevState, props) => {
			let sort = '';
			if(prevState.sort === 'asc') {
				sort = 'desc';
			} else if(prevState.sort === 'desc') {
				sort = 'asc';
			} else {
				sort = 'desc';
			}

			return {					
				...prevState,
				sort: sort,
			};
		});
	}

	paginationStateUpdate(algoliaSearch) {
		this.setState((prevState, props) => {

			const pagePrevious = (algoliaSearch.page - 1) >= 0 ? algoliaSearch.page - 1 : null;
			const pageNext = (algoliaSearch.page + 1) < algoliaSearch.nbPages ? algoliaSearch.page + 1 : null;
			
			let pageList = [];
			if(algoliaSearch.page - 2 < 0) {
				for(let i = 0; i < Math.min(5, algoliaSearch.nbPages); i++) {
					pageList.push(i);
				}
			} else if (algoliaSearch.page + 2 >= algoliaSearch.nbPages) {
				for(let i = Math.max(0, algoliaSearch.nbPages - 5); i < algoliaSearch.nbPages; i++) {
					pageList.push(i);
				}
			} else {
				for(let i = algoliaSearch.page - 2; i <= algoliaSearch.page + 2; i++) {
					pageList.push(i);
				}
			}

			return {
				...prevState,
				pagination: {
					previous: pagePrevious,
					list: pageList,
					next: pageNext,
					current: algoliaSearch.page,
					total: algoliaSearch.nbPages
				},
			}
		});
	}

	search(searchValue?: string) {
		this.setState((prevState, props) => {
			return {
				...prevState,
				search: searchValue
			}
		});

		algoliaService.search(searchValue).then((algoliaSearch: any) => {
			this.update(algoliaSearch);
		});
	}

	pageChange(pageNumber: number) {
		algoliaService.search(this.state.search, pageNumber).then((algoliaSearch: any) => {
			this.update(algoliaSearch);
		});
	}

	sortChange(getOrderName: Function) {
		algoliaService.sortChange(this.state.search, getOrderName()).then((algoliaSearch: any) => {
			this.sortStateUpdate();
			this.update(algoliaSearch);
		});
	}

	facetToggle(facetName: string) {
		return algoliaService.facetToggle('category', facetName).then((algoliaSearch) => {
			this.update(algoliaSearch);
		})
	}
	
	render() {
		const resultLayout = this.state.hits.length > 0 ? (
				<div className="row">
					<div className="col s12 m3 l4">
						<Faceting facets={this.state.facets} toggle={this.facetToggle.bind(this)}/>
					</div>
					<div className="col s12 m9 l8">
						<Pagination {...this.state.pagination} change={this.pageChange.bind(this)}/>
						<Sort sort={this.state.sort} change={this.sortChange.bind(this)}/>
						<Hits hits={this.state.hits} />
					</div>
				</div>
		) : (
			<div className="row consistent-padding">
				<div className="card horizontal hoverable">
					<div className="card-stacked">
					<div className="card-content center-align">
						<span className="card-title">No result</span>
					</div>
					</div>
				</div>
			</div>
		)

		return (
			<div className="container">
				<div className="row consistent-padding">
					<h3>AppStore Search</h3>
					<SearchBox nbHits={this.state.nbHits} search={this.search.bind(this)} />
				</div>
				{resultLayout}
			</div>
		)
	}
}

render(<App />, document.getElementById('app'));
