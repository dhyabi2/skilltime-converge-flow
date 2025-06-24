
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import flowchart from 'flowchart.js';

const Flowchart = () => {
  const navigate = useNavigate();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const flowchartCode = `
st=>start: User Opens App
auth=>condition: Authenticated?
login=>operation: Login/Register
browse=>operation: Browse Skills
search=>operation: Search & Filter
skillDetail=>operation: View Skill Details
book=>operation: Book Session
payment=>operation: Payment Process
confirmed=>operation: Booking Confirmed
notification=>operation: Send Notification
profile=>operation: Manage Profile
mySkills=>operation: My Skills
addSkill=>operation: Add New Skill
bookings=>operation: View Bookings
complete=>operation: Complete Session
review=>operation: Leave Review
provider=>condition: Is Provider?
manageBookings=>operation: Manage Bookings
acceptBooking=>operation: Accept/Decline
completed=>operation: Session Completed
badges=>operation: Update Badges
end=>end: Process Complete

st->auth
auth(yes)->browse
auth(no)->login
login->browse
browse->search
search->skillDetail
skillDetail->book
book->payment
payment->confirmed
confirmed->notification
notification->end

browse->profile
profile->mySkills
mySkills->addSkill
addSkill->end

browse->bookings
bookings->complete
complete->review
review->badges
badges->end

confirmed->provider
provider(yes)->manageBookings
provider(no)->end
manageBookings->acceptBooking
acceptBooking->completed
completed->end
      `;

      const chart = flowchart.parse(flowchartCode);
      chart.drawSVG(chartRef.current, {
        'line-width': 2,
        'line-length': 50,
        'text-margin': 10,
        'font-size': 12,
        'font-color': '#374151',
        'line-color': '#6B7280',
        'element-color': '#3B82F6',
        'fill': '#EFF6FF',
        'yes-text': 'Yes',
        'no-text': 'No',
        'arrow-end': 'block',
        'scale': 1,
        'symbols': {
          'start': {
            'font-color': '#ffffff',
            'element-color': '#10B981',
            'fill': '#10B981'
          },
          'end': {
            'font-color': '#ffffff',
            'element-color': '#EF4444',
            'fill': '#EF4444'
          },
          'operation': {
            'font-color': '#374151',
            'element-color': '#3B82F6',
            'fill': '#DBEAFE'
          },
          'condition': {
            'font-color': '#374151',
            'element-color': '#F59E0B',
            'fill': '#FEF3C7'
          }
        }
      });
    }
  }, []);

  const handleDownload = () => {
    if (chartRef.current) {
      const svg = chartRef.current.querySelector('svg');
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          
          const link = document.createElement('a');
          link.download = 'app-flowchart.png';
          link.href = canvas.toDataURL();
          link.click();
        };
        
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue-50 via-mint-50 to-soft-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-slate-800">App Functionality Flowchart</h1>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download PNG
          </Button>
        </div>

        {/* App Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-soft-blue-600">Core Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Authentication System</li>
                <li>• Skills Marketplace</li>
                <li>• Booking Management</li>
                <li>• Profile Management</li>
                <li>• Notifications</li>
                <li>• Reviews & Ratings</li>
                <li>• Search & Filtering</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-mint-600">User Types</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• <strong>Clients:</strong> Browse and book skills</li>
                <li>• <strong>Providers:</strong> Offer skills and manage bookings</li>
                <li>• <strong>Dual Role:</strong> Can be both client and provider</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-soft-blue-600">Key Database Tables</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• profiles</li>
                <li>• skills</li>
                <li>• categories</li>
                <li>• bookings</li>
                <li>• reviews</li>
                <li>• notifications</li>
                <li>• user_skills</li>
                <li>• user_badges</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Flowchart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Complete App Flow</CardTitle>
            <p className="text-sm text-slate-600">
              This flowchart shows the main user journeys and system processes in the application
            </p>
          </CardHeader>
          <CardContent>
            <div 
              ref={chartRef} 
              className="w-full overflow-auto bg-white rounded-lg border p-4"
              style={{ minHeight: '600px' }}
            />
          </CardContent>
        </Card>

        {/* Process Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-soft-blue-600">Client Journey</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <p><strong>1. Authentication:</strong> User registers or logs in</p>
              <p><strong>2. Discovery:</strong> Browse skills by categories or search</p>
              <p><strong>3. Selection:</strong> View skill details and provider info</p>
              <p><strong>4. Booking:</strong> Select date/time and make payment</p>
              <p><strong>5. Session:</strong> Attend the booked session</p>
              <p><strong>6. Review:</strong> Leave feedback and rating</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-mint-600">Provider Journey</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <p><strong>1. Setup:</strong> Complete profile and add skills</p>
              <p><strong>2. Availability:</strong> Set schedule and pricing</p>
              <p><strong>3. Booking Management:</strong> Accept/decline requests</p>
              <p><strong>4. Session Delivery:</strong> Conduct the service</p>
              <p><strong>5. Completion:</strong> Mark session as completed</p>
              <p><strong>6. Growth:</strong> Earn badges and improve ratings</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Flowchart;
