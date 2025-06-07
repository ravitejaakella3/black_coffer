import React from 'react';
import './Filters.css';

const Filters = ({ filterOptions, currentFilters, onFilterChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...currentFilters, [name]: value };
        onFilterChange(newFilters);
    };

    return (
        <div className="filters">
            <h2>Filters</h2>
            <div className="filter-group">
                <label>End Year</label>
                <select name="end_year" value={currentFilters.end_year || ''} onChange={handleChange}>
                    <option value="">All Years</option>
                    {filterOptions.end_years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Topic</label>
                <select name="topic" value={currentFilters.topic || ''} onChange={handleChange}>
                    <option value="">All Topics</option>
                    {filterOptions.topics.map(topic => (
                        <option key={topic} value={topic}>{topic}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Sector</label>
                <select name="sector" value={currentFilters.sector || ''} onChange={handleChange}>
                    <option value="">All Sectors</option>
                    {filterOptions.sectors.map(sector => (
                        <option key={sector} value={sector}>{sector}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Region</label>
                <select name="region" value={currentFilters.region || ''} onChange={handleChange}>
                    <option value="">All Regions</option>
                    {filterOptions.regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>PESTLE</label>
                <select name="pestle" value={currentFilters.pestle || ''} onChange={handleChange}>
                    <option value="">All PESTLE</option>
                    {filterOptions.pestles.map(pestle => (
                        <option key={pestle} value={pestle}>{pestle}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Source</label>
                <select name="source" value={currentFilters.source || ''} onChange={handleChange}>
                    <option value="">All Sources</option>
                    {filterOptions.sources.map(source => (
                        <option key={source} value={source}>{source}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Country</label>
                <select name="country" value={currentFilters.country || ''} onChange={handleChange}>
                    <option value="">All Countries</option>
                    {filterOptions.countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>City</label>
                <select name="city" value={currentFilters.city || ''} onChange={handleChange}>
                    <option value="">All Cities</option>
                    {filterOptions.cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Filters; 