import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Attributions } from './components/Atributions';
import { Favorites } from './components/Favorites';
import { LandingPage } from './components/Landing';
import { PairingPage } from './components/PairingPage';
import { RootPage } from './components/RootPage';
import { Suggestions } from './components/Suggestions';
import { TopBar } from './components/TopBar';
import { urlAttributions, urlFavorites, urlPairing, urlSearch, urlSuggestions } from './components/urls';


export function AppRoutes() {
    return <Routes>
        <Route path={urlSearch()} element={<>
            <TopBar />
            <LandingPage />
        </>
        } />
        <Route path={urlPairing()} element={<>
            <TopBar goBack={true} />
            <PairingPage />
        </>} />
        <Route path={urlFavorites()} element={<>
            <TopBar goBack={true} />
            <Favorites />
        </>
        } />
        <Route path={urlSuggestions()} element={<>
            <TopBar goBack={true} />
            <Suggestions />
        </>
        } />
        <Route path={urlAttributions()} element={<>
            <TopBar goBack={true} />
            <Attributions />
        </>
        } />
        <Route path="/*" element={<RootPage />} />
    </Routes>

}