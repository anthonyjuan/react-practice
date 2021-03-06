import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './Landing';
import Search from './Search';
import Details from './Details';
import preload from '../data';

const NotFound = () => <h1>Not Found 404</h1>;

const App = () => (
    <BrowserRouter>
        <Provider store={store}>
            <div className="app">
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/search" component={props => <Search data={preload} {...props} />} />
                    <Route
                        path="/details/:id"
                        component={props => {
                            const oneData = preload.shows.find(el => el.imdbID == props.match.params.id);
                            return <Details data={oneData} {...props} />;
                        }}
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Provider>
    </BrowserRouter>
);

export default App;
