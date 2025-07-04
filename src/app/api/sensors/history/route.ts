import { NextRequest, NextResponse } from 'next/server';

import mockData from '../../../../../db.json';
import { type SensorHistory } from '@/types/api';

type SensorHistoryType = { [key: string]: SensorHistory[] };

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sensorId = searchParams.get('sensorId');
  const timeRange = searchParams.get('timeRange');

  if (!sensorId) {
    return NextResponse.json(
      { error: 'sensorId is required' },
      { status: 400 }
    );
  }

  const history = generateRecentHistory(
    (mockData.sensorHistory as SensorHistoryType)[sensorId] || []
  );

  // timeRange 필터링
  if (!timeRange) {
    return NextResponse.json(history);
  }

  const now = new Date();
  let startTime: Date;

  switch (timeRange) {
    case '1h':
      startTime = new Date(now.getTime() - 60 * 60 * 1000);
      break;
    case '24h':
      startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case '7d':
      startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    default:
      startTime = new Date(0);
  }

  const filteredHistory = history.filter(
    (item) => new Date(item.timestamp) >= startTime
  );

  return NextResponse.json(filteredHistory);
}

function generateRecentHistory(
  originalHistory: SensorHistory[]
): SensorHistory[] {
  const now = new Date();

  return originalHistory.map((item, index) => ({
    ...item,
    timestamp: new Date(
      now.getTime() - (originalHistory.length - 1 - index) * 60 * 60 * 1000
    ).toISOString(),
  }));
}
