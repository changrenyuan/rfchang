import { NextRequest, NextResponse } from 'next/server';
import { consultationManager } from '../../../storage/database/consultationManager';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, topic, description, preferredTime } = body;

    if (!name || !email || !phone || !topic || !description) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }

    const consultation = await consultationManager.createConsultation({
      name,
      email,
      phone,
      topic,
      description,
      preferredTime
    });

    return NextResponse.json({
      success: true,
      data: consultation
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating consultation:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create consultation'
    }, { status: 500 });
  }
}
