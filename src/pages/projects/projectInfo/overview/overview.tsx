import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Check, Plus, Upload, Users } from "lucide-react";

export const Overview = () => {
    // Mock data - replace with actual data from your API/state
    const projectData = {
        name: "E-Commerce Platform Redesign",
        description: "Provides a clear overview of a project's purpose, scope, objectives, and key details. It serves as a guide for all stakeholders involved, ensuring alignment and clarity throughout the project lifecycle.",
        status: "On track!",
        summary: "This project focuses on delivering a streamlined and efficient solution to meet business needs.\n\nCarefully planned to achieve success. 🚀",
        owner: {
            name: "Savannah Dune",
            avatar: "",
            role: "Project Owner",
            initials: "SD"
        },
        assignee: {
            name: "Jane Doe",
            avatar: "",
            role: "Lead Dev",
            initials: "JD"
        },
        recentTasks: [
            {
                name: "Solutions Pages",
                assignees: [
                    { name: "John", avatar: "", initials: "JD" },
                    { name: "Sarah", avatar: "", initials: "SM" }
                ],
                dueDate: "March 17 - 09:00AM"
            },
            {
                name: "Company pages",
                assignees: [],
                dueDate: "March 17 - 09:00AM"
            },
            {
                name: "Help Center Pages",
                assignees: [],
                dueDate: null
            }
        ],
        recentActivity: [
            { action: "Main Project completed", time: "Today, 2:24pm" },
            { action: "Task added removed", time: "Today, 2:24pm" },
            { action: "Main Project completed", time: "Today, 2:24pm" }
        ]
    };

    return (
        <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-5">
                <Button variant="outline" className="h-auto py-4 flex-col items-start gap-2 hover:bg-accent rounded-sm">
                    <div className="flex items-center gap-2 text-primary">
                        <Plus className="h-5 w-5" />
                        <span className="font-semibold">Create Task</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Organize task to your project</span>
                </Button>

                <Button variant="outline" className="h-auto py-4 flex-col items-start gap-2 hover:bg-accent">
                    <div className="flex items-center gap-2 text-primary">
                        <Users className="h-5 w-5" />
                        <span className="font-semibold">Invite Team</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Organize task to your project</span>
                </Button>

                <Button variant="outline" className="h-auto py-4 flex-col items-start gap-2 hover:bg-accent">
                    <div className="flex items-center gap-2 text-primary">
                        <Upload className="h-5 w-5" />
                        <span className="font-semibold">Upload a File</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Upload file to your projects</span>
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column - Project Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Project Descriptions */}
                    <Card className="shadow-none rounded-sm py-2">
                        <CardHeader className="pb-0">
                            <CardTitle className="text-base font-semibold">Project Descriptions</CardTitle>
                        </CardHeader>
                        <CardContent >
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {projectData.description}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Assignee */}
                    <Card className="shadow-none rounded-sm">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Assignee</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={projectData.owner.avatar} />
                                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                            {projectData.owner.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">{projectData.owner.name}</p>
                                        <p className="text-xs text-muted-foreground">{projectData.owner.role}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={projectData.assignee.avatar} />
                                        <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">
                                            {projectData.assignee.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">{projectData.assignee.name}</p>
                                        <p className="text-xs text-muted-foreground">{projectData.assignee.role}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>


                </div>

                {/* Right Column - Summary & Activity */}
                <div className="space-y-6">
                    {/* Summary */}
                    <Card className="shadow-none">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold">Summary</CardTitle>
                            </div>
                            <div className="pt-2">
                                <Progress value={100} className="h-1" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm mb-2">{projectData.status}</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {projectData.summary}
                                </p>
                            </div>

                            <Separator />

                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={projectData.owner.avatar} />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                        {projectData.owner.initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">{projectData.owner.name}</p>
                                    <p className="text-xs text-muted-foreground">{projectData.owner.role}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="shadow-none">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {projectData.recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                                                <Check className="h-3 w-3 text-green-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm">{activity.action}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="link" className="text-primary p-0 h-auto text-sm">
                                    View All
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};