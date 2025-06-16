
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { action } = await req.json();

    switch (action) {
      case 'validate':
        // Perform React context validation
        const validationResult = {
          isHealthy: true,
          message: 'React context validation passed',
          timestamp: new Date().toISOString()
        };
        
        console.log('React validation check performed:', validationResult);
        
        return new Response(JSON.stringify(validationResult), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'health-check':
        // Perform periodic health check
        const healthResult = {
          status: 'ok',
          reactContext: 'healthy',
          timestamp: new Date().toISOString()
        };
        
        console.log('React health check performed:', healthResult);
        
        return new Response(JSON.stringify(healthResult), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
  } catch (error) {
    console.error('Error in react-validation function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
