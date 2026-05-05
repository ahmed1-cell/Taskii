
"use client";

import { useTaskiiStore } from "@/app/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Mail, Trash2, Search, Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function MembersPage() {
  const { members, addMember, removeMember, currentUser } = useTaskiiStore();
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newName) return;
    
    addMember({
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      email: newEmail,
      avatar: `https://picsum.photos/seed/${newName}/100/100`
    });
    
    setNewEmail("");
    setNewName("");
    toast({
      title: "Member added",
      description: `${newName} has been added to your collaborators list.`,
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Team Collaborators</h1>
          <p className="text-muted-foreground">Manage people you work with. Changes are saved locally.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Add Collaborator</CardTitle>
              <CardDescription>Send a simulated invite to a new member.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddMember} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input 
                    placeholder="Enter name" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="Enter email" 
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                </div>
                <Button className="w-full gap-2 rounded-full" type="submit">
                  <UserPlus className="h-4 w-4" /> Add Collaborator
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search members..." className="pl-10" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {members.map((member) => (
              <Card key={member.id} className="group overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={member.avatar || `https://picsum.photos/seed/${member.id}/100/100`} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {member.id === currentUser?.id ? (
                      <Badge variant="secondary">You</Badge>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="opacity-0 group-hover:opacity-100 text-destructive transition-all"
                        onClick={() => removeMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
