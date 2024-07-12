// App.tsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

const Home = lazy(() => import("./pages/Home"));
const ProductDetail = lazy(() => import("./pages/DetailsProducts/DetailsProducts"));

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/items/:id" element={<ProductDetail />} />
                    </Routes>
                </Suspense>
            </Router>
        </Provider>
    );
};

export default App;
