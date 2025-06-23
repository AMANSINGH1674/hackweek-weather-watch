# Weather Watch 🌤️

A beautiful, responsive weather dashboard built with Next.js, TypeScript, and Tailwind CSS. Features dynamic backgrounds that change based on weather conditions and stunning glassmorphic design elements.

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/amans-projects-171aec8b/v0-weather-dashboard)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/ZDzX8eEXIa6)

## 🌐 Live Demo

Your project is live at: https://v0-weather-dashboard-amans-projects-171aec8b.vercel.app/

## ✨ Features

- **Real-time Weather Data**: Fetches current weather using WeatherAPI
- **Dynamic Backgrounds**: Beautiful gradients that change based on weather conditions
- **Glassmorphic Design**: Modern frosted glass UI elements
- **Space Theme**: Stunning black space background with animated stars for initial state
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Weather Metrics**: Temperature, humidity, wind speed, pressure, visibility, UV index
- **Error Handling**: Graceful error handling for invalid cities or network issues
- **Loading States**: Smooth loading indicators during API calls

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download here](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **WeatherAPI key** (free at [weatherapi.com](https://weatherapi.com))

### 📦 Installation & Setup

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/AMANSINGH1674/hackweek-weather-watch.git
   cd hackweek-weather-watch
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or if you prefer yarn
   yarn install
   \`\`\`

3. **Get your WeatherAPI key**
   - Visit [weatherapi.com](https://weatherapi.com)
   - Sign up for a free account
   - Copy your API key from the dashboard

4. **Set up environment variables**
   \`\`\`bash
   # Create environment file
   touch .env.local
   \`\`\`
   
   Add your WeatherAPI key to `.env.local`:
   \`\`\`env
   NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
   \`\`\`
   
   **⚠️ Important**: Replace `your_api_key_here` with your actual WeatherAPI key

5. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
\`\`\`

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and sign up
3. Click "New Project" and import your GitHub repository
4. Add environment variable: `NEXT_PUBLIC_WEATHER_API_KEY`
5. Click "Deploy"

### Option 2: Netlify
1. Build the project: `npm run build`
2. Visit [netlify.com](https://netlify.com) and sign up
3. Drag and drop the `.next` folder or connect your GitHub repo
4. Add environment variable in Site Settings > Environment Variables
5. Deploy

### Option 3: Railway
1. Visit [railway.app](https://railway.app) and sign up
2. Click "New Project" > "Deploy from GitHub repo"
3. Select your repository
4. Add environment variable: `NEXT_PUBLIC_WEATHER_API_KEY`
5. Deploy

### Option 4: DigitalOcean App Platform
1. Visit [DigitalOcean](https://www.digitalocean.com/products/app-platform)
2. Create new app from GitHub repository
3. Configure build settings (Next.js preset)
4. Add environment variable
5. Deploy

### Option 5: Self-Hosting (VPS/Server)
1. **Build the project**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Install PM2 (Process Manager)**
   \`\`\`bash
   npm install -g pm2
   \`\`\`

3. **Start the application**
   \`\`\`bash
   pm2 start npm --name "weather-watch" -- start
   \`\`\`

4. **Set up reverse proxy (Nginx example)**
   \`\`\`nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`

## 🎨 Design Features

### Dynamic Backgrounds
- **☀️ Sunny**: Warm orange and yellow gradients
- **☁️ Cloudy**: Cool grey gradients  
- **🌧️ Rainy**: Deep blue and slate gradients
- **💨 Windy**: Light brown and amber gradients
- **❄️ Snow**: Clean white and light blue gradients
- **⛈️ Thunderstorm**: Dramatic purple and dark grey gradients
- **🌌 Space Theme**: Black space background with animated stars (initial state)

### Glassmorphic Elements
- Frosted glass effect with `backdrop-blur`
- Semi-transparent backgrounds
- Subtle borders with low opacity
- Smooth hover transitions
- Layered transparency for depth

## 📱 Usage

1. **Search for a City**: Enter any city name in the search box
2. **View Weather Data**: See current temperature, condition, and detailed metrics
3. **Dynamic Experience**: Watch the background change based on weather conditions
4. **Responsive Design**: Use on any device - desktop, tablet, or mobile

## 🔧 Configuration

### API Setup
The app uses WeatherAPI for weather data:
1. Visit [weatherapi.com](https://weatherapi.com)
2. Sign up for a free account (10,000 calls/month free)
3. Copy your API key from the dashboard
4. Add it to your `.env.local` file

### Customization
- **Colors**: Modify weather condition colors in `getWeatherBackground()` function
- **Animations**: Adjust transition durations in Tailwind classes
- **Layout**: Customize card layouts and spacing in `weather-dashboard.tsx`
- **Additional Metrics**: Add more weather data from the API response

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **API**: WeatherAPI

## 🔍 Troubleshooting

### Common Issues

**1. API Key Not Working**
- Ensure your API key is correctly added to `.env.local`
- Restart the development server after adding environment variables
- Check that your API key is active on WeatherAPI dashboard

**2. Build Errors**
\`\`\`bash
# Clear Next.js cache
rm -rf .next
npm run build
\`\`\`

**3. Port Already in Use**
\`\`\`bash
# Kill process on port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- -p 3001
\`\`\`

**4. Environment Variables Not Loading**
- Ensure `.env.local` is in the root directory
- Restart your development server
- Check that variable names start with `NEXT_PUBLIC_`

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or issues:
- Open an issue on GitHub
- Check the troubleshooting section above
- Visit the [WeatherAPI documentation](https://weatherapi.com/docs/)

---

Built with ❤️ using Next.js, TypeScript, and WeatherAPI

**Continue building on [v0.dev](https://v0.dev/chat/projects/ZDzX8eEXIa6)**
