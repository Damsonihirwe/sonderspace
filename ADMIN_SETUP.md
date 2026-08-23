# SONDERspace Admin System Setup

## What's Implemented

### 1. Authentication (NextAuth.js + Credentials)
- **Credentials Provider**: Username + password-based authentication
- **Session Storage**: JWT-based sessions, 24-hour expiration
- **Login Page**: Custom login form at `/admin` (shown when not authenticated)
- **Credentials**:
  - Username: `sonderspaceadmin`
  - Password: `Buyyourartiststhirts@here` (hashed in .env.local)

### 2. Admin Dashboard (`/admin`)
Features:
- **Requests View**: Display all customer tee requests with details
- **Add Product Form**: Create new products with:
  - Artist name (slug auto-generated)
  - Product title, description, genre
  - Pricing and signature color
  - Available sizes and colors
  - Spotify link
  - Product category (tee, long-sleeve, hoodie)
  - Bestseller toggle
  - Image uploads (front, back, closeup)
- **Logout**: Sign out via button in header

### 3. API Routes (Protected by Middleware)
- **`/api/auth/[...nextauth]`**: NextAuth handler
- **`/api/admin/products`**: Create and retrieve products (POST/GET, session-protected)

### 4. Middleware
- **`middleware.ts`**: Protects all `/api/admin/*` routes with JWT token verification

## Files Created/Modified

### New Files
- `app/admin/page.tsx` - Admin dashboard server component
- `app/api/auth/[...nextauth]/route.ts` - NextAuth handler
- `app/api/auth/types.ts` - NextAuth type extensions
- `app/api/admin/products/route.ts` - Product management API
- `middleware.ts` - Route protection middleware
- `lib/auth.ts` - Centralized auth configuration
- `components/login-form.tsx` - Login UI component
- `components/admin-dashboard.tsx` - Dashboard layout
- `components/requests-list.tsx` - Requests display
- `components/add-product-form.tsx` - Product creation form
- `.env.local` - Environment variables (with bcrypt hash & secrets)
- `.env.example` - Example environment file

### Modified Files
- `lib/types.ts` - Added TeeRequest type and Product fields
- `package.json` - Added next-auth and bcryptjs dependencies

## How to Test

### Local Development
```bash
npm install
npm run dev
# Open http://localhost:3000/admin
```

### Login
- **Username**: `sonderspaceadmin`
- **Password**: `Buyyourartiststhirts@here`

### Workflow
1. Navigate to `/admin` → shows login form (no session)
2. Submit credentials → redirects to dashboard on success
3. View **Requests** tab to see customer orders
4. Click **Add Product** tab to create a new tee
5. Click **Log out** to return to login form

## Security Notes

✅ **Environment Variables**:
- `.env.local` is in `.gitignore` — never committed
- `ADMIN_PASSWORD_HASH` contains bcrypt hash only, not plaintext
- `NEXTAUTH_SECRET` is a random 32-byte base64 string

✅ **Session Protection**:
- `/admin` page checks `getServerSession()` server-side
- `/api/admin/*` routes protected by middleware JWT verification
- Invalid credentials show generic error (no username/password hints)

✅ **No Public Links**:
- No `/admin` link in navbar or footer
- No env vars or secrets logged to console

## Production Deployment

### For Vercel
1. Set environment variables in **Project Settings → Environment Variables**:
   ```
   NEXTAUTH_URL = https://your-domain.com
   NEXTAUTH_SECRET = (generate new: openssl rand -base64 32)
   ADMIN_USERNAME = sonderspaceadmin
   ADMIN_PASSWORD_HASH = (your bcrypt hash)
   ```
2. Deploy — middleware and auth routes work automatically
3. Session persists across requests via JWT

### Generate New Bcrypt Hash
```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

## Future Enhancements

- [ ] Database integration (Supabase, MongoDB, etc.) for persistent products & requests
- [ ] File storage (AWS S3, Vercel Blob) for image uploads instead of data URLs
- [ ] Product editing & deletion
- [ ] Pagination for large request lists
- [ ] Request filtering and search
- [ ] Analytics dashboard (orders, revenue, etc.)
