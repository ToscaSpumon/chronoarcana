# Adding Deck Images to ChronoArcana

## Overview
To display deck images in the DeckSelector component, you need to add an `image_url` column to the `tarot_decks` table in your Supabase database.

## Step 1: Add the Database Column

### Option A: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase project dashboard**
   - Navigate to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your ChronoArcana project

2. **Open the SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the migration SQL**
   ```sql
   -- Add image_url column to tarot_decks table
   ALTER TABLE tarot_decks 
   ADD COLUMN image_url VARCHAR(255);
   
   -- Add comment for documentation
   COMMENT ON COLUMN tarot_decks.image_url IS 'URL or path to the deck cover image';
   ```

4. **Click "Run" to execute the SQL**

### Option B: Using Supabase CLI (Advanced)

If you have Supabase CLI installed:
```bash
supabase db push
```

## Step 2: Update Existing Decks with Image URLs

After adding the column, run this SQL to update existing decks:

```sql
-- Update Rider Waite deck
UPDATE tarot_decks 
SET image_url = '/assets/tarot_decks/rider_waite/deck_cover.jpg'
WHERE id = 1;

-- Update Thoth deck
UPDATE tarot_decks 
SET image_url = '/assets/tarot_decks/thoth/deck_cover.jpg'
WHERE id = 2;
```

## Step 3: Prepare Your Deck Images

1. **Create the directory structure** in your `public` folder:
   ```
   public/
   └── assets/
       └── tarot_decks/
           ├── rider_waite/
           │   └── deck_cover.jpg
           └── thoth/
               └── deck_cover.jpg
   ```

2. **Add your deck cover images**:
   - **Rider Waite**: Place your Rider Waite deck cover image at `public/assets/tarot_decks/rider_waite/deck_cover.jpg`
   - **Thoth**: Place your Thoth deck cover image at `public/assets/tarot_decks/thoth/deck_cover.jpg`

3. **Image specifications**:
   - **Format**: JPG or PNG recommended
   - **Size**: 200x280 pixels (2:2.8 aspect ratio)
   - **File size**: Keep under 500KB for fast loading

## Step 4: Verify the Setup

1. **Check the database**:
   ```sql
   SELECT id, name, image_url FROM tarot_decks;
   ```

2. **Test the component**:
   - Refresh your application
   - Go to the deck selection screen
   - You should now see deck images alongside the names

## Troubleshooting

### Images Not Showing
- Check that the `image_url` column was added successfully
- Verify the image paths are correct
- Ensure images are placed in the correct `public` folder
- Check browser console for any 404 errors

### Database Errors
- Make sure you have the correct permissions in Supabase
- Verify the table name is exactly `tarot_decks`
- Check that the column name is exactly `image_url`

### Component Issues
- Clear browser cache and refresh
- Check that the TypeScript types are updated
- Verify the component is receiving the `image_url` data

## Next Steps

Once deck images are working:

1. **Add more decks** with their respective images
2. **Optimize images** for web (compress, resize if needed)
3. **Consider lazy loading** for better performance
4. **Add image fallbacks** for missing images

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify the database schema changes
3. Test the API endpoints directly
4. Check the Supabase logs for any backend errors
