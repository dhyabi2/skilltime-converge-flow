
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="bg-red-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <AlertCircle className="h-12 w-12 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Access Denied
        </h1>
        
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page. Please sign in or contact support.
        </p>
        
        <div className="space-x-4">
          <Button asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
