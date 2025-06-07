import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    const [filters, setFilters] = useState({
        end_year: '',
        topic: '',
        sector: '',
        region: '',
        pestle: '',
        source: '',
        country: ''
    });
    const [filterOptions, setFilterOptions] = useState({});
    const [chartData, setChartData] = useState({});
    const [intensityByYearChartData, setIntensityByYearChartData] = useState({ labels: [], datasets: [] });
    const [topicsDistributionChartData, setTopicsDistributionChartData] = useState({ labels: [], datasets: [] });
    const [likelihoodByRegionChartData, setLikelihoodByRegionChartData] = useState({ labels: [], datasets: [] });
    const [relevanceBySectorChartData, setRelevanceBySectorChartData] = useState({ labels: [], datasets: [] });
    const [countryDistributionChartData, setCountryDistributionChartData] = useState({ labels: [], datasets: [] });

    const fetchFilterOptions = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5332/api/data/filters');
            console.log('Filter options:', response.data);
            setFilterOptions(response.data);
        } catch (error) {
            console.error('Error fetching filter options:', error);
        }
    }, []);

    const fetchChartData = useCallback(async () => {
        try {
            const params = {};
            Object.keys(filters).forEach(key => {
                if (filters[key]) {
                    params[key] = filters[key];
                }
            });
            const response = await axios.get('http://localhost:5332/api/data/stats', { params });
            setChartData(response.data);
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    }, [filters]);

    const fetchIntensityByYearData = useCallback(async () => {
        try {
            const params = {};
            Object.keys(filters).forEach(key => {
                if (filters[key]) {
                    params[key] = filters[key];
                }
            });
            const response = await axios.get('http://localhost:5332/api/data/intensity-by-year', { params });
            const sortedData = response.data.sort((a, b) => a._id - b._id);
            setIntensityByYearChartData({
                labels: sortedData.map(item => item._id),
                datasets: [
                    {
                        label: 'Average Intensity',
                        data: sortedData.map(item => item.avgIntensity),
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        tension: 0.1,
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching intensity by year data:', error);
        }
    }, [filters]);

    const fetchTopicsDistributionData = useCallback(async () => {
        try {
            const params = {};
            Object.keys(filters).forEach(key => {
                if (filters[key]) {
                    params[key] = filters[key];
                }
            });
            const response = await axios.get('http://localhost:5332/api/data/topics-distribution', { params });
            const colors = [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                '#FF9F40', '#FFCD56', '#C9CBCF', '#7B68EE', '#FFD700',
            ]; // More colors can be added
            setTopicsDistributionChartData({
                labels: response.data.map(item => item._id),
                datasets: [
                    {
                        data: response.data.map(item => item.count),
                        backgroundColor: colors.slice(0, response.data.length),
                        hoverBackgroundColor: colors.slice(0, response.data.length),
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching topics distribution data:', error);
        }
    }, [filters]);

    const fetchLikelihoodByRegionData = useCallback(async () => {
        try {
            const params = {};
            Object.keys(filters).forEach(key => {
                if (filters[key]) {
                    params[key] = filters[key];
                }
            });
            const response = await axios.get('http://localhost:5332/api/data/likelihood-by-region', { params });
            const sortedData = response.data.sort((a, b) => b.avgLikelihood - a.avgLikelihood);
            setLikelihoodByRegionChartData({
                labels: sortedData.map(item => item._id),
                datasets: [
                    {
                        label: 'Average Likelihood',
                        data: sortedData.map(item => item.avgLikelihood),
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching likelihood by region data:', error);
        }
    }, [filters]);

    const fetchRelevanceBySectorData = useCallback(async () => {
        try {
            const params = {};
            Object.keys(filters).forEach(key => {
                if (filters[key]) {
                    params[key] = filters[key];
                }
            });
            const response = await axios.get('http://localhost:5332/api/data/relevance-by-sector', { params });
            const sortedData = response.data.sort((a, b) => b.avgRelevance - a.avgRelevance);
            setRelevanceBySectorChartData({
                labels: sortedData.map(item => item._id),
                datasets: [
                    {
                        label: 'Average Relevance',
                        data: sortedData.map(item => item.avgRelevance),
                        backgroundColor: 'rgba(255, 159, 64, 0.6)',
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching relevance by sector data:', error);
        }
    }, [filters]);

    const fetchCountryDistributionData = useCallback(async () => {
        try {
            const params = {};
            Object.keys(filters).forEach(key => {
                if (filters[key]) {
                    params[key] = filters[key];
                }
            });
            const response = await axios.get('http://localhost:5332/api/data/country-distribution', { params });
            const colors = [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                '#FF9F40', '#FFCD56', '#C9CBCF', '#7B68EE', '#FFD700',
            ];
            setCountryDistributionChartData({
                labels: response.data.map(item => item._id),
                datasets: [
                    {
                        data: response.data.map(item => item.count),
                        backgroundColor: colors.slice(0, response.data.length),
                        hoverBackgroundColor: colors.slice(0, response.data.length),
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching country distribution data:', error);
        }
    }, [filters]);

    useEffect(() => {
        fetchFilterOptions();
        fetchChartData();
        fetchIntensityByYearData();
        fetchTopicsDistributionData();
        fetchLikelihoodByRegionData();
        fetchRelevanceBySectorData();
        fetchCountryDistributionData();
    }, [fetchFilterOptions, fetchChartData, fetchIntensityByYearData, fetchTopicsDistributionData, fetchLikelihoodByRegionData, fetchRelevanceBySectorData, fetchCountryDistributionData]);

    const handleFilterChange = async (e) => {
        const { name, value } = e.target;
        let newFilters = { ...filters, [name]: value };

        setFilters(newFilters);
    };

    const renderFilters = () => (
        <div className="filters-container">
            <select name="end_year" value={filters.end_year} onChange={handleFilterChange}>
                <option value="">Select Year</option>
                {filterOptions.end_years?.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
            <select name="topic" value={filters.topic} onChange={handleFilterChange}>
                <option value="">Select Topic</option>
                {filterOptions.topics?.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                ))}
            </select>
            <select name="sector" value={filters.sector} onChange={handleFilterChange}>
                <option value="">Select Sector</option>
                {filterOptions.sectors?.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                ))}
            </select>
            <select name="region" value={filters.region} onChange={handleFilterChange}>
                <option value="">Select Region</option>
                {filterOptions.regions?.map(region => (
                    <option key={region} value={region}>{region}</option>
                ))}
            </select>
            <select name="pestle" value={filters.pestle} onChange={handleFilterChange}>
                <option value="">Select PESTLE</option>
                {filterOptions.pestles?.map(pestle => (
                    <option key={pestle} value={pestle}>{pestle}</option>
                ))}
            </select>
            <select name="source" value={filters.source} onChange={handleFilterChange}>
                <option value="">Select Source</option>
                {filterOptions.sources?.map(source => (
                    <option key={source} value={source}>{source}</option>
                ))}
            </select>
            <select name="country" value={filters.country} onChange={handleFilterChange}>
                <option value="">Select Country</option>
                {filterOptions.countries?.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>
        </div>
    );

    const renderCharts = () => (
        <div className="charts-container">
            <div className="chart">
                <h3>Average Intensity</h3>
                <p style={{ fontSize: '2rem', textAlign: 'center' }}>
                    {chartData.avgIntensity !== undefined ? chartData.avgIntensity.toFixed(2) : 'N/A'}
                </p>
            </div>
            <div className="chart">
                <h3>Average Likelihood</h3>
                <p style={{ fontSize: '2rem', textAlign: 'center' }}>
                    {chartData.avgLikelihood !== undefined ? chartData.avgLikelihood.toFixed(2) : 'N/A'}
                </p>
            </div>
            <div className="chart">
                <h3>Average Relevance</h3>
                <p style={{ fontSize: '2rem', textAlign: 'center' }}>
                    {chartData.avgRelevance !== undefined ? chartData.avgRelevance.toFixed(2) : 'N/A'}
                </p>
            </div>
            <div className="chart">
                <h3>Total Records</h3>
                <p style={{ fontSize: '2rem', textAlign: 'center' }}>
                    {chartData.totalRecords !== undefined ? chartData.totalRecords : 'N/A'}
                </p>
            </div>

            {/* Line Chart for Average Intensity by Year */}
            <div className="chart-full-width">
                <h3>Average Intensity by Year</h3>
                <Line
                    data={intensityByYearChartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Average Intensity by Year' },
                        },
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }}
                />
            </div>

            {/* Pie Chart for Topics Distribution */}
            <div className="chart-half-width">
                <h3>Topics Distribution (Top 10)</h3>
                <Pie
                    data={topicsDistributionChartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'right' },
                            title: { display: true, text: 'Topics Distribution' },
                        },
                    }}
                />
            </div>

            {/* Bar Chart for Average Likelihood by Region */}
            <div className="chart-half-width">
                <h3>Average Likelihood by Region (Top 10)</h3>
                <Bar
                    data={likelihoodByRegionChartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Average Likelihood by Region' },
                        },
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }}
                />
            </div>

            {/* Bar Chart for Average Relevance by Sector */}
            <div className="chart-half-width">
                <h3>Average Relevance by Sector (Top 10)</h3>
                <Bar
                    data={relevanceBySectorChartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Average Relevance by Sector' },
                        },
                        scales: {
                            y: { beginAtZero: true }
                        }
                    }}
                />
            </div>

            {/* Doughnut Chart for Country Distribution */}
            <div className="chart-half-width">
                <h3>Country Distribution (Top 10)</h3>
                <Doughnut
                    data={countryDistributionChartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'right' },
                            title: { display: true, text: 'Country Distribution' },
                        },
                    }}
                />
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Data Visualization Dashboard</h1>
            </header>
            <div className="dashboard-content">
                <aside className="filters-sidebar">
                    {renderFilters()}
                </aside>
                <main className="charts-container">
                    {renderCharts()}
                </main>
            </div>
        </div>
    );
};

export default Dashboard; 