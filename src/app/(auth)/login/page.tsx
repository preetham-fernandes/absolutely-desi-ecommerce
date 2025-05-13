import React from 'react';

const LoginPagePreview = () => {
  return (
    <div className="bg-black min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-6">
          <h1 style={{ color: '#D2B48C' }} className="text-3xl font-bold mb-1">ABSOLUTELY DESI</h1>
          <p className="text-gray-400">Welcome back to your affiliate account</p>
        </div>
        
        {/* Login Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
         <div className="mb-6 text-center">
  <h2 style={{ color: '#D2B48C' }} className="text-2xl font-bold">Sign In</h2>
  <p className="text-gray-400 text-sm">Enter your credentials to continue</p>
</div>
          
          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <div className="flex justify-between">
                <label className="block text-gray-200 text-sm mb-2">Email</label>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'rgba(193, 226, 223, 0.7)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-gray-500"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-200 text-sm">Password</label>
                <a href="/forgot-password" style={{ color: '#C1E2DF' }} className="text-xs hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'rgba(193, 226, 223, 0.7)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-gray-500"
                  placeholder="Enter your password"
                  type="password"
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 mt-6"
              style={{ backgroundColor: '#D2B48C', color: 'black' }}
            >
              Sign In
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
          
          {/* Divider */}
          <div className="border-t border-zinc-800 my-6"></div>
          
          {/* Register Link */}
          <p className="text-center text-gray-400">
            Don't have an account?{" "}
            <a href="#" style={{ color: '#D2B48C' }} className="font-medium hover:underline">Register now</a>
          </p>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>© 2025 Absolutely Desi. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPagePreview;