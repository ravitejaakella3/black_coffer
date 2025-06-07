const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

// Get all data
router.get('/', async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get filtered data
router.get('/filter', async (req, res) => {
    try {
        const { end_year, topic, sector, region, pestle, source, country } = req.query;
        const filter = {};

        if (end_year) filter.end_year = end_year;
        if (topic) filter.topic = topic;
        if (sector) filter.sector = sector;
        if (region) filter.region = region;
        if (pestle) filter.pestle = pestle;
        if (source) filter.source = source;
        if (country) filter.country = country;

        const data = await Data.find(filter);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get unique values for filters
router.get('/filters', async (req, res) => {
    try {
        const [end_years, topics, sectors, regions, pestles, sources, countries] = await Promise.all([
            Data.distinct('end_year'),
            Data.distinct('topic'),
            Data.distinct('sector'),
            Data.distinct('region'),
            Data.distinct('pestle'),
            Data.distinct('source'),
            Data.distinct('country'),
        ]);

        res.json({
            end_years: end_years.filter(Boolean),
            topics: topics.filter(Boolean),
            sectors: sectors.filter(Boolean),
            regions: regions.filter(Boolean),
            pestles: pestles.filter(Boolean),
            sources: sources.filter(Boolean),
            countries: countries.filter(Boolean),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get statistics
router.get('/stats', async (req, res) => {
    try {
        const filter = {};
        if (req.query.end_year) filter.end_year = req.query.end_year;
        if (req.query.topic) filter.topic = req.query.topic;
        if (req.query.sector) filter.sector = req.query.sector;
        if (req.query.region) filter.region = req.query.region;
        if (req.query.pestle) filter.pestle = req.query.pestle;
        if (req.query.source) filter.source = req.query.source;
        if (req.query.country) filter.country = req.query.country;

        const stats = await Data.aggregate([
            { $match: filter },
            { $group: {
                    _id: null,
                    avgIntensity: { $avg: '$intensity' },
                    avgLikelihood: { $avg: '$likelihood' },
                    avgRelevance: { $avg: '$relevance' },
                    totalRecords: { $sum: 1 }
                }
            }
        ]);
        res.json(stats[0] || {});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Average Intensity by Year for Line Chart
router.get('/intensity-by-year', async (req, res) => {
    try {
        const filter = {};
        if (req.query.end_year) filter.end_year = req.query.end_year;
        if (req.query.topic) filter.topic = req.query.topic;
        if (req.query.sector) filter.sector = req.query.sector;
        if (req.query.region) filter.region = req.query.region;
        if (req.query.pestle) filter.pestle = req.query.pestle;
        if (req.query.source) filter.source = req.query.source;
        if (req.query.country) filter.country = req.query.country;

        const data = await Data.aggregate([
            { $match: { ...filter, end_year: { $ne: null, $ne: "" }, intensity: { $ne: null, $ne: "" } } },
            { $group: { _id: "$end_year", avgIntensity: { $avg: "$intensity" } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Topics Distribution for Pie Chart
router.get('/topics-distribution', async (req, res) => {
    try {
        const filter = {};
        if (req.query.end_year) filter.end_year = req.query.end_year;
        if (req.query.topic) filter.topic = req.query.topic;
        if (req.query.sector) filter.sector = req.query.sector;
        if (req.query.region) filter.region = req.query.region;
        if (req.query.pestle) filter.pestle = req.query.pestle;
        if (req.query.source) filter.source = req.query.source;
        if (req.query.country) filter.country = req.query.country;

        const data = await Data.aggregate([
            { $match: { ...filter, topic: { $ne: null, $ne: "" } } },
            { $group: { _id: "$topic", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 } // Limit to top 10 topics for readability
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Average Likelihood by Region for Bar Chart
router.get('/likelihood-by-region', async (req, res) => {
    try {
        const filter = {};
        if (req.query.end_year) filter.end_year = req.query.end_year;
        if (req.query.topic) filter.topic = req.query.topic;
        if (req.query.sector) filter.sector = req.query.sector;
        if (req.query.region) filter.region = req.query.region;
        if (req.query.pestle) filter.pestle = req.query.pestle;
        if (req.query.source) filter.source = req.query.source;
        if (req.query.country) filter.country = req.query.country;

        const data = await Data.aggregate([
            { $match: { ...filter, region: { $ne: null, $ne: "" }, likelihood: { $ne: null, $ne: "" } } },
            { $group: { _id: "$region", avgLikelihood: { $avg: "$likelihood" } } },
            { $sort: { avgLikelihood: -1 } },
            { $limit: 10 } // Limit to top 10 regions
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Average Relevance by Sector for Bar Chart
router.get('/relevance-by-sector', async (req, res) => {
    try {
        const filter = {};
        if (req.query.end_year) filter.end_year = req.query.end_year;
        if (req.query.topic) filter.topic = req.query.topic;
        if (req.query.sector) filter.sector = req.query.sector;
        if (req.query.region) filter.region = req.query.region;
        if (req.query.pestle) filter.pestle = req.query.pestle;
        if (req.query.source) filter.source = req.query.source;
        if (req.query.country) filter.country = req.query.country;

        const data = await Data.aggregate([
            { $match: { ...filter, sector: { $ne: null, $ne: "" }, relevance: { $ne: null, $ne: "" } } },
            { $group: { _id: "$sector", avgRelevance: { $avg: "$relevance" } } },
            { $sort: { avgRelevance: -1 } },
            { $limit: 10 } // Limit to top 10 sectors
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Country Distribution for Doughnut Chart
router.get('/country-distribution', async (req, res) => {
    try {
        const filter = {};
        if (req.query.end_year) filter.end_year = req.query.end_year;
        if (req.query.topic) filter.topic = req.query.topic;
        if (req.query.sector) filter.sector = req.query.sector;
        if (req.query.region) filter.region = req.query.region;
        if (req.query.pestle) filter.pestle = req.query.pestle;
        if (req.query.source) filter.source = req.query.source;
        if (req.query.country) filter.country = req.query.country;

        const data = await Data.aggregate([
            { $match: { ...filter, country: { $ne: null, $ne: "" } } },
            { $group: { _id: "$country", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 } // Limit to top 10 countries
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 