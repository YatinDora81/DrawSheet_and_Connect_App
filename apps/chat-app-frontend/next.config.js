/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     experimental: {
//       appDir: true, // If you're using Next.js 13+ with the app router
//     },
//     async headers() {
//       return [
//         {
//           source: "/api/:path*", // Apply these headers to all API routes
//           headers: [
//             {
//               key: "Access-Control-Allow-Origin",
//               value: "http://localhost:3000", // Adjust for production
//             },
//             {
//               key: "Access-Control-Allow-Credentials",
//               value: "true",
//             },
//             {
//               key: "Access-Control-Allow-Methods",
//               value: "GET,POST,PUT,DELETE,OPTIONS",
//             },
//             {
//               key: "Access-Control-Allow-Headers",
//               value: "X-Requested-With, Content-Type, Authorization",
//             },
//           ],
//         },
//       ];
//     },
//   };
  
//   export default nextConfig;
  