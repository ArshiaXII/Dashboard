import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'properties';
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }
    
    // Generate a unique filename
    const fileName = `${uuidv4()}.webp`;
    
    // Convert the file to a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Ensure the upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    const fs = require('fs');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Process and optimize the image
    const optimizedImage = await sharp(buffer)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();
    
    // Save the optimized image
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, optimizedImage);
    
    // Create a thumbnail
    const thumbnailName = `${uuidv4()}-thumb.webp`;
    const thumbnailImage = await sharp(buffer)
      .resize(300, 300, { fit: 'cover' })
      .webp({ quality: 80 })
      .toBuffer();
    
    const thumbnailPath = path.join(uploadDir, thumbnailName);
    await writeFile(thumbnailPath, thumbnailImage);
    
    // Return the paths to the saved files
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    return NextResponse.json({ 
      url: `${baseUrl}/uploads/${folder}/${fileName}`,
      thumbnail: `${baseUrl}/uploads/${folder}/${thumbnailName}`
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
} 