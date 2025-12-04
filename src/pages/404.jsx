import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // GitHub Pages SPA redirect handling
    const redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    
    if (redirect && redirect !== location.href) {
      // Parse the redirect path
      const path = redirect.replace(location.origin, '').replace('/soul-alliance', '');
      navigate(path || '/', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-8xl md:text-9xl font-extrabold tracking-wider mb-4 text-red-700">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wider">
          PAGE NOT FOUND
        </h2>
        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-md mx-auto">
          The page you're looking for has been lost to the wasteland.
        </p>
        <a
          href="/soul-alliance/"
          className="inline-block bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-8 tracking-wider transition-colors"
        >
          RETURN TO BASE
        </a>
      </div>
    </div>
  );
}
