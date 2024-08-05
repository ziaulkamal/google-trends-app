// src/app/api/trends/route.ts
import { NextResponse } from 'next/server';
const GoogleTrendsAPI: any = require('google-trends-api');

export async function GET() {
    try {
        const trendDate = new Date().toISOString().split('T')[0]; // Tanggal hari ini dalam format YYYY-MM-DD

        // Menggunakan dailyTrends untuk mendapatkan tren harian
        const result = await GoogleTrendsAPI.dailyTrends({
            trendDate,
            geo: 'US',
        });

        // Parse JSON result dari Google Trends API
        const data = JSON.parse(result);

        // Extract queries from the data
        const queries = data.default.trendingSearchesDays.flatMap((day: any) =>
            day.trendingSearches.map((search: any) => search.title.query)
        );

        console.log('Fetched queries:', queries); // Log queries untuk debugging

        return NextResponse.json(queries);
    } catch (error) {
        console.error('Error fetching trends:', error);
        return NextResponse.json({ error: 'Failed to fetch trends' }, { status: 500 });
    }
}
