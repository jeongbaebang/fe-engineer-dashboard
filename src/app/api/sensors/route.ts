import { NextResponse } from 'next/server';

import mockData from '../../../../db.json';

export async function GET() {
  return NextResponse.json(mockData.sensors);
}
