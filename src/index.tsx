// inferno module
import {render} from 'inferno';

// routing modules
import { Router, Link, Route, IndexRoute } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

// css
import '../src/main.css';

const browserHistory = createBrowserHistory();
function App({ children }) {
    return (
		<div>
			<h1>Algolia Inferno Test</h1>
			<Link to="/">Home</Link>
			<br/>
			<Link to="/test">Test</Link>
            {children}
		</div>
    )
}

function NoMatch({ children, params }) {
    return (
		<div>no match</div>
    )
}

function Home({ children }) {
    return (
		<div>home</div>
    )
}

function Test({ children, params }) {

    return (
		<div>
			<h2>test</h2>
		</div>
    )
}

const routes = (
	<Router history={browserHistory}>
		<Route component={App}>
			<IndexRoute component={Home} />
			<Route path="/test" component={Test} />
			<Route path="*" component={NoMatch} />
		</Route>
	</Router>
);

render(routes, document.getElementById('app'));
