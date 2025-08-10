import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get('file') as File | null;

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  // TODO: Upload to S3 or Firebase Storage
  // This is a stub success response
  return NextResponse.json({ ok: true, name: file.name, size: file.size });
}
