/**
 * GET /api/admin/students
 * Admin API to list all students with enrollment and billing data.
 * Protected by a simple ADMIN_SECRET header for MVP.
 */

import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

function validateAdmin(request: NextRequest): boolean {
  const secret = request.headers.get('x-admin-secret') ||
    request.nextUrl.searchParams.get('secret');
  return secret === process.env.ADMIN_SECRET;
}

export async function GET(request: NextRequest) {
  if (!validateAdmin(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const students = await prisma.student.findMany({
      include: {
        enrollments: {
          orderBy: { createdAt: 'desc' },
        },
        billingProfile: true,
        paymentRecords: {
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return Response.json({ students });
  } catch (error) {
    console.error('Error fetching students:', error);
    return Response.json({ error: 'Failed to fetch students.' }, { status: 500 });
  }
}
