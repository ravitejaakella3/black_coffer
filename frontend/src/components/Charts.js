import React from 'react';
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
import { Line, Bar, Pie } from 'react-chartjs-2';
import './Charts.css';
import axios from 'axios';
import { useState } from 'react';

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

const Charts = ({ data }) => {
    // Process data for charts
    const processData = () => {
        const intensityByYear = {};
        const likelihoodByYear = {};
        const relevanceByYear = {};
        const sectorCount = {};
        const regionCount = {};

        data.forEach(item => {
            if (item.end_year) {
                intensityByYear[item.end_year] = (intensityByYear[item.end_year] || 0) + item.intensity;
                likelihoodByYear[item.end_year] = (likelihoodByYear[item.end_year] || 0) + item.likelihood;
                relevanceByYear[item.end_year] = (relevanceByYear[item.end_year] || 0) + item.relevance;
            }
            if (item.sector) {
                sectorCount[item.sector] = (sectorCount[item.sector] || 0) + 1;
            }
            if (item.region) {
                regionCount[item.region] = (regionCount[item.region] || 0) + 1;
            }
        });

        return {
            intensityByYear,
            likelihoodByYear,
            relevanceByYear,
            sectorCount,
            regionCount
        };
    };

    const processedData = processData();

    // Line Chart Data
    const lineChartData = {
        labels: Object.keys(processedData.intensityByYear),
        datasets: [
            {
                label: 'Intensity',
                data: Object.values(processedData.intensityByYear),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Likelihood',
                data: Object.values(processedData.likelihoodByYear),
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            },
            {
                label: 'Relevance',
                data: Object.values(processedData.relevanceByYear),
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1
            }
        ]
    };

    // Bar Chart Data
    const barChartData = {
        labels: Object.keys(processedData.sectorCount),
        datasets: [
            {
                label: 'Sector Distribution',
                data: Object.values(processedData.sectorCount),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            }
        ]
    };

    // Pie Chart Data
    const pieChartData = {
        labels: Object.keys(processedData.regionCount),
        datasets: [
            {
                data: Object.values(processedData.regionCount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                ],
            }
        ]
    };

    const [filters, setFilters] = useState({
        end_year: '',
        topic: '',
        sector: '',
        region: '',
        pestle: '',
        source: '',
        country: '',
        city: ''
    });

    const fetchChartData = async () => {
        try {
            const response = await axios.get('http://localhost:5332/api/data/stats', {
                params: filters
            });
            setChartData(response.data);
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    return (
        <div className="charts">
            <div className="chart-container">
                <h3>Trends Over Years</h3>
                <Line data={lineChartData} />
            </div>
            <div className="chart-container">
                <h3>Sector Distribution</h3>
                <Bar data={barChartData} />
            </div>
            <div className="chart-container">
                <h3>Regional Distribution</h3>
                <Pie data={pieChartData} />
            </div>
        </div>
    );
};

export default Charts; 