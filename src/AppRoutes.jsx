import React from 'react'
import { Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import PageNotFound from './utilities/Not Found/PageNotFound.jsx';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/story/:storyId/:slideId" element={<App />} />
        <Route path="/" element={<App />} />
        <Route path="/bookmarks/*" element={<App />} />
        <Route path="/userstories/*" element={<App />} />
        <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRoutes;