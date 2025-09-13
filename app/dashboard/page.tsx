"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogOut, User, Mail, Calendar } from "lucide-react";

export default function DashboardPage() {
  const { data: session, isPending, error } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>
            Failed to load session. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertDescription>
            You need to be signed in to access this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back, {session.user.name}!
              </h1>
              <p className="text-muted-foreground">
                Manage your account and view your activity
              </p>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>
                Your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4" />
                    Full Name
                  </div>
                  <p className="text-muted-foreground">
                    {session.user.name || "Not provided"}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </div>
                  <p className="text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="h-4 w-4" />
                    Member Since
                  </div>
                  <p className="text-muted-foreground">
                    {new Date(session.user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4" />
                    Email Verified
                  </div>
                  <p className={`text-sm font-medium ${
                    session.user.emailVerified ? "text-green-600" : "text-yellow-600"
                  }`}>
                    {session.user.emailVerified ? "✓ Verified" : "⚠ Not Verified"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <User className="h-6 w-6" />
                  <span>Edit Profile</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <Mail className="h-6 w-6" />
                  <span>Change Email</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex-col gap-2">
                  <LogOut className="h-6 w-6" />
                  <span>Security</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Session Info (for debugging) */}
          <Card>
            <CardHeader>
              <CardTitle>Session Information</CardTitle>
              <CardDescription>
                Technical details about your current session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Session ID:</span>{" "}
                  <span className="text-muted-foreground font-mono">
                    {session.session.id}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  <span className="text-muted-foreground">
                    {new Date(session.session.createdAt).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Expires:</span>{" "}
                  <span className="text-muted-foreground">
                    {new Date(session.session.expiresAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}