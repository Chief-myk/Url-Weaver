import { useState, useEffect } from 'react';
import axios from "axios"

function App() {
  const [inputUrl, setInputUrl] = useState('');
  const [transformedUrl, setTransformedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3001/api").then((result) => {
      console.log(result.data);
      setTransformedUrl(result.data)
    })
  }, [])

  const handlePress = async () => {
    try {
      setIsLoading(true);

      if (!inputUrl.trim()) {
        alert("Please enter a URL");
        return;
      }
      const resp = await axios.post("http://localhost:3001/api", { url: inputUrl })
      const shortUrl = `http://localhost:3001/api/r/${resp.data.shortId}`
      setTransformedUrl(shortUrl)
      
      // Fetch click count for the new URL
      const shortId = resp.data.shortId;
      const analytics = await axios.get(`http://localhost:3001/api/analytics/${shortId}`);
      setClickCount(analytics.data['Total Clicks']);
    } catch (err) {
      console.log(err);
      throw new Error
    }
    finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transformedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Failed to copy");
    }
  };

  const resetForm = () => {
    setInputUrl('');
    setTransformedUrl('');
    setClickCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 py-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            URL Weaver
          </h1>
          <p className="text-gray-600">
            Transform your long URLs into short, memorable links
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="p-6">
            {/* Input Section */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Enter your URL</label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  onKeyPress={(e) => e.key === 'Enter' && handlePress()}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handlePress}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-70 flex items-center justify-center shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Transforming...
                  </span>
                ) : (
                  <span>Transform URL</span>
                )}
              </button>

              {transformedUrl && (
                <button
                  onClick={resetForm}
                  className="px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition shadow-sm"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Result Section */}
            {transformedUrl && (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-300">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 font-medium">Your transformed URL</label>
                  {clickCount > 0 && (
                    <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      {clickCount} {clickCount === 1 ? 'click' : 'clicks'}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    value={transformedUrl}
                    readOnly
                    className="flex-1 p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center shadow-sm hover:shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4"></path>
                  <path d="m16 16 3 3"></path>
                  <path d="M4 12H2"></path>
                  <path d="m8 16-3 3"></path>
                  <path d="M22 12h-2"></path>
                  <path d="m16 8 3-3"></path>
                  <path d="M12 22v-2"></path>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
              ),
              title: "Magic Transform",
              description: "Advanced algorithms transform your URLs"
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              ),
              title: "Easy Copy",
              description: "One-click copying for quick sharing"
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              ),
              title: "Secure",
              description: "Your URLs are processed safely"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white/80 p-4 rounded-lg text-center hover:bg-white transition-all duration-300 hover:shadow-md">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                {feature.icon}
              </div>
              <h3 className="font-medium text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>URL Weaver - Simplify your links with style</p>
        </div>
      </div>
    </div>
  );
}

export default App;