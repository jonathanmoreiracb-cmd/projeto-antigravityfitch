-- 1. Create the bucket 'site-assets'
-- Note: Requires permissions. If this fails, create manually in Storage > New Bucket > 'site-assets' (Public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Security Policies (RLS)

-- Enable RLS on objects if not already enabled (usually is by default)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all files in 'site-assets'
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'site-assets' );

-- Allow authenticated users (admin) to upload files
CREATE POLICY "Auth Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'site-assets' );

-- Allow authenticated users to update files
CREATE POLICY "Auth Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'site-assets' );

-- Allow authenticated users to delete files
CREATE POLICY "Auth Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'site-assets' );
