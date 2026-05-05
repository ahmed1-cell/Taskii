
"use client";

import { useTaskiiStore } from "@/app/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Trash2, Shield, BellRing, Palette } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SettingsPage() {
  const { currentUser, clearAllData } = useTaskiiStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your workspace preferences and account details.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" /> Profile Information
            </CardTitle>
            <CardDescription>Your details are stored locally in your browser.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" defaultValue={currentUser?.name || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" defaultValue={currentUser?.email || ""} type="email" />
              </div>
            </div>
            <Button className="rounded-full px-8">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" /> Appearance
            </CardTitle>
            <CardDescription>Customize how Taskii looks for you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Compact View</Label>
                <p className="text-sm text-muted-foreground">Show more tasks on screen at once.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BellRing className="h-5 w-5 text-primary" /> Notifications
            </CardTitle>
            <CardDescription>Configure how you want to be alerted.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Browser Notifications</Label>
                <p className="text-sm text-muted-foreground">Get desktop alerts for task deadlines.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sound Effects</Label>
                <p className="text-sm text-muted-foreground">Play a sound when Pomodoro sessions end.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertCircle className="h-5 w-5" /> Danger Zone
            </CardTitle>
            <CardDescription className="text-destructive/80">Permanent actions that cannot be undone.</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="bg-white/50 border-destructive/20 mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Clearing your workspace data will delete all tasks, collaborators, and history stored in this browser.
              </AlertDescription>
            </Alert>
            <Button 
              variant="destructive" 
              className="gap-2"
              onClick={() => {
                if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
                  clearAllData();
                }
              }}
            >
              <Trash2 className="h-4 w-4" /> Clear Local Storage
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
