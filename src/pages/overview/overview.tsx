import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, CheckCircle2, Clock } from "lucide-react";

export const Overview = () => {
    const stats = [
        {
            title: "Total Tasks",
            value: "24",
            change: "+12%",
            icon: CheckCircle2,
            color: "text-blue-500",
        },
        {
            title: "In Progress",
            value: "8",
            change: "+5%",
            icon: Clock,
            color: "text-yellow-500",
        },
        {
            title: "Completed",
            value: "16",
            change: "+8%",
            icon: CheckCircle2,
            color: "text-green-500",
        },
    ];

    const recentActivities = [
        {
            title: "Hero section completed",
            time: "2 hours ago",
            user: "John Doe",
        },
        {
            title: "Legal Notice moved to review",
            time: "4 hours ago",
            user: "Jane Smith",
        },
        {
            title: "New task: Provider section",
            time: "6 hours ago",
            user: "Mike Johnson",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Project Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Mercedes Project</h1>
                    <p className="text-muted-foreground mt-1">
                        Landing page development and design
                    </p>
                </div>
                <Button>
                    <Calendar className="mr-2 h-4 w-4" />
                    View Calendar
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <Icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-baseline gap-2">
                                    <div className="text-3xl font-bold">{stat.value}</div>
                                    <span className="text-sm text-green-600">{stat.change}</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-start justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium">{activity.title}</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {activity.user} • {activity.time}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button className="w-full justify-start" variant="outline">
                            Create New Task
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            Add Team Member
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            Generate Report
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            View Timeline
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Project Description */}
            <Card>
                <CardHeader>
                    <CardTitle>About This Project</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                        This project focuses on creating a modern, responsive landing page for Mercedes.
                        The design emphasizes elegance and brand consistency while maintaining excellent
                        user experience across all devices. Our team is working collaboratively to deliver
                        high-quality sections including hero, about us, careers, and more.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};