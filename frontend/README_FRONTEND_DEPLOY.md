# Easy Travel Frontend (Vercel)

Ye folder sirf frontend ke liye hai. Isko GitHub par alag repo me upload karke Vercel par deploy karo.

## Vercel Settings
- Framework Preset: Other
- Build Command: empty
- Output Directory: public
- Install Command: npm install

## Backend URL set karna
`public/config.js` me apna Render backend URL paste karo:

```js
window.EASYTRAVEL_API_BASE = "https://your-backend-url.onrender.com";
```

Agar backend URL set nahi karoge to login, package enquiry, payment APIs live website par kaam nahi karenge.
