const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Proxy configuration - matches vite.config.js proxy route
app.use('/api/extsys', createProxyMiddleware({
    target: 'https://ambikaexch.in/extsys',
    changeOrigin: true,
    pathRewrite: {
        '^/api/extsys': '',
    },
}));

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA routing (Client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`JSK1 Server is running on port ${PORT}`);
});
