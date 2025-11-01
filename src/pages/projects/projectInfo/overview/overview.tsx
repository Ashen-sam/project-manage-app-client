import { UserAvatar } from "@/components/common/avatar";
import { AvatarGroup } from "@/components/common/avatarCommon";
import { CircularProgress } from "@/components/common/cicularProgress";
import { ProjectPriorityCommon, type PriorityType, } from "@/components/common/projectPriorityCommon";
import { ProjectStatusCommon, type StatusType } from "@/components/common/projectStatusCommon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookCheck, Calendar, Check, Package, Plus, Upload, Users } from "lucide-react";

export const Overview = () => {
    // Mock data - replace with actual data from your API/state
    const projectData = {
        name: "E-Commerce Platform Redesign",
        description: "Provides a clear overview of a project's purpose, scope, objectives, and key details. It serves as a guide for all stakeholders involved, ensuring alignment and clarity throughout the project lifecycle.",
        status: "In progress" as StatusType,
        priority: "High" as PriorityType,
        dueDate: "2025-11-15",
        summary: "This project focuses on delivering a streamlined and efficient solution to meet business needs.\n\nCarefully planned to achieve success.",
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
        // All project members including owner and assignee
        projectMembers: [
            { id: 1, name: "Savannah Dune", image: "/public/WhatsApp Image 2025-11-01 at 09.00.47_4ae373f6.jpg" },
            { id: 2, name: "Jane Doe", image: "/public/WhatsApp Image 2025-11-01 at 09.11.19_2688ec0c.jpg" },
            { id: 3, name: "John Doe", image: "" },
            { id: 4, name: "Sarah Miller", image: "/public/WhatsApp Image 2025-11-01 at 09.10.42_df685104.jpg" },
            { id: 5, name: "Mike Wilson", image: "" },
            { id: 6, name: "Emily Chen", image: "/public/WhatsApp Image 2025-11-01 at 09.03.26_a38ca278.jpg" },
            { id: 7, name: "David Brown", image: "" },
            { id: 8, name: "Lisa Anderson", image: "/public/WhatsApp Image 2025-11-01 at 08.59.01_457f64bf.jpg" },
        ],
        recentTasks: [
            {
                name: "Solutions Pages",
                assignees: [
                    { id: 1, name: "John Doe", image: "" },
                    { id: 2, name: "Sarah Miller", image: "" },
                    { id: 3, name: "Sarah Miller", image: "" },
                    { id: 4, name: "Sarah Miller", image: "" },
                    { id: 5, name: "Sarah Miller", image: "" },
                    { id: 6, name: "Sarah Miller", image: "" },
                    { id: 7, name: "Sarah Miller", image: "" },
                    { id: 8, name: "Sarah Miller", image: "" },
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
            <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" className="h-auto py-4 flex-col items-start gap-2 hover:bg-accent rounded-sm">
                    <div className="flex items-center gap-2 ">
                        <Plus className="h-5 w-5" />
                        <span className="font-semibold">Create Task</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Organize task to your project</span>
                </Button>

                <Button variant="outline" className="h-auto py-4 flex-col items-start gap-2 hover:bg-accent">
                    <div className="flex items-center gap-2     ">
                        <Users className="h-5 w-5" />
                        <span className="font-semibold">Invite Team</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Organize task to your project</span>
                </Button>

                <Button variant="outline" className="h-auto py-4 flex-col items-start gap-2 hover:bg-accent">
                    <div className="flex items-center gap-2     ">
                        <Upload className="h-5 w-5" />
                        <span className="font-semibold">Upload a File</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Upload file to your projects</span>
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column - Project Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Project Details */}
                    {/* Project Details */}
                    <Card className="shadow-none rounded-sm">

                        <CardContent className="space-y-5">
                            {/* Project Name */}
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                                    Project Name
                                </label>
                                <div className='flex items-center gap-2'>
                                    <h3 className="text-lg font-bold text-gray-700 dark:text-foreground">{projectData.name}</h3>
                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                                        <Package className="h-5 w-5 text-primary" />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Status, Priority, Due Date Grid */}
                            <div className="flex items-center gap-6">
                                <div>
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5 block">
                                        Status
                                    </label>
                                    <ProjectStatusCommon status={projectData.status} />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5 block">
                                        Priority
                                    </label>
                                    <ProjectPriorityCommon priority={projectData.priority} />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5 block">
                                        Due Date
                                    </label>
                                    <div className="flex items-center gap-2 text-xs font-medium bg-muted/50 px-3 py-1 rounded-sm border shadow-xs">
                                        <Calendar className="h-3 w-3 text-muted-foreground" />
                                        <span>{projectData.dueDate}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2.5 block">
                                        tasks
                                    </label>
                                    <div className="flex items-center gap-2 text-xs font-medium  px-3 py-1 rounded-sm border shadow-xs">
                                        <span>42</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Description */}
                            <div>
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                                    Description
                                </label>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    {projectData.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Project Members */}
                    <Card className="shadow-none rounded-sm">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Project Members</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AvatarGroup members={projectData.projectMembers} />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Summary & Activity */}
                <div className="space-y-6">
                    {/* Summary */}
                    <Card className="shadow-none rounded-sm">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold">Summary</CardTitle>
                            </div>
                            <div className="pt-2">
                                <CircularProgress value={65} size="sm" showLabel={false} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm mb-2">On track!</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {projectData.summary}
                                </p>
                            </div>

                            <Separator />

                            <div className="flex items-center gap-3">
                                <UserAvatar
                                    name={projectData.owner.name}
                                    image={projectData.owner.avatar}
                                    size="md"
                                />
                                <div>
                                    <p className="text-sm font-medium">{projectData.owner.name}</p>
                                    <p className="text-xs text-muted-foreground">{projectData.owner.role}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="shadow-none rounded-sm">
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