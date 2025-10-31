import { CommonTable, ProjectPriorityCommon, ProjectStatusCommon, type PriorityType, type StatusType, } from "@/components";
import { CommonDialog } from "@/components/common/commonDialog";
import { CommonDialogFooter } from "@/components/common/commonDialogFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Edit, PackagePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface Project {
    id: number;
    name: string;
    status: StatusType;
    priority: PriorityType;
    progress: number;
    dueDate: string;
    members: number;
    [key: string]: string | number;
}

export const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            name: "Website Redesign",
            status: 'In progress',
            priority: "High",
            progress: 65,
            dueDate: "2025-11-15",
            members: 5,
        },
        {
            id: 2,
            name: "Mobile App Development",
            status: 'In review',
            priority: "Medium",
            progress: 20,
            dueDate: "2025-12-30",
            members: 8,
        },
        {
            id: 3,
            name: "API Documentation Setup",
            status: 'Pending',
            priority: "High",
            progress: 85,
            dueDate: "2025-11-25",
            members: 3,
        },
        {
            id: 4,
            name: "UI Component Library",
            status: 'Submitted',
            priority: 'Low',
            progress: 50,
            dueDate: "2025-12-10",
            members: 6,
        },
        {
            id: 5,
            name: "Marketing Campaign Launch",
            status: 'Success',
            priority: 'Critical',
            progress: 10,
            dueDate: "2026-01-15",
            members: 4,
        },



    ]);

    // Dialog states
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const navigate = useNavigate();


    // Form state
    const [formData, setFormData] = useState({
        name: "",
        status: "Planning",
        priority: "Medium",
        progress: 0,
        dueDate: "",
        members: 1,
    });

    // Reset form
    const resetForm = () => {
        setFormData({
            name: "",
            status: "Planning",
            priority: "Medium",
            progress: 0,
            dueDate: "",
            members: 1,
        });
    };

    // Handle Add Project
    const handleAddProject = () => {
        const newProject: Project = {
            id: Math.max(...projects.map((p) => p.id), 0) + 1,
            ...formData,
            status: formData.status as StatusType,
            priority: formData.priority as PriorityType,
        };
        setProjects([...projects, newProject]);
        setIsAddDialogOpen(false);
        resetForm();
    };

    // Handle Edit Project
    const handleEditClick = (project: Project) => {
        setSelectedProject(project);
        setFormData({
            name: project.name,
            status: project.status,
            priority: project.priority,
            progress: project.progress,
            dueDate: project.dueDate,
            members: project.members,
        });
        setIsEditDialogOpen(true);
    };

    const handleRowClick = (project: Project) => {
        // Navigate to the project's task page
        navigate(`/projects/${project.id}/`);
    }
    const handleUpdateProject = () => {
        if (selectedProject) {
            setProjects(
                projects.map((p) =>
                    p.id === selectedProject.id
                        ? {
                            ...selectedProject,
                            ...formData,
                            status: formData.status as StatusType,
                            priority: formData.priority as PriorityType,
                        }
                        : p
                )
            );
            setIsEditDialogOpen(false);
            setSelectedProject(null);
            resetForm();
        }
    };

    // Handle Delete Project
    const handleDeleteClick = (project: Project) => {
        setSelectedProject(project);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteProject = () => {
        if (selectedProject) {
            setProjects(projects.filter((p) => p.id !== selectedProject.id));
            setIsDeleteDialogOpen(false);
            setSelectedProject(null);
        }
    };

    // Form component for Add/Edit
    const ProjectForm = () => (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter project name"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select

                        value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Planning">Planning</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                        value={formData.priority}
                        onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>



            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="progress">Progress (%)</Label>
                    <Input
                        id="progress"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.progress}
                        onChange={(e) =>
                            setFormData({ ...formData, progress: Number(e.target.value) })
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="members">Team Members</Label>
                    <Input
                        id="members"
                        type="number"
                        min="1"
                        value={formData.members}
                        onChange={(e) =>
                            setFormData({ ...formData, members: Number(e.target.value) })
                        }
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
            </div>
        </div>
    );

    return (
        <>
            {projects.length == 0 ? (
                <div className="flex items-center justify-center min-h-[700px] bg-background">
                    <div className="flex flex-col items-center max-w-md text-center space-y-4 px-6">
                        <div className="flex items-center justify-center p-3 rounded-lg bg-primary/10">
                            <PackagePlus className="h-10 w-10 text-primary" />
                        </div>

                        <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Projects are larger units of work with a clear outcome, such as a new
                            feature you want to ship. They can be shared across multiple teams and
                            are comprised of issues and optional documents.
                        </p>

                        <div className="flex gap-3 pt-2">
                            <Button
                                className="gap-2  text-white"
                                size="sm"
                                onClick={() => setIsAddDialogOpen(true)}
                            >
                                Create new project
                            </Button>
                            <Button variant="outline" size="sm">
                                Documentation
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className=" space-y-4  ">

                    <div className="w-full flex items-center justify-between  ">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                                <PackagePlus className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold tracking-tight">Projects</h1>
                                <p className="text-sm text-muted-foreground">Manage and organize your projects</p>
                            </div>
                        </div>
                        <Button size="sm" className="gap-2  ">
                            <PackagePlus className="h-4 w-4" />
                            Project
                        </Button>
                    </div>
                    <CommonTable
                        selectable
                        rowKey="id"
                        onRowClick={(row) => {
                            handleRowClick(row as Project)
                        }}
                        data={projects}
                        columns={[
                            {
                                key: "name",
                                header: "Project Name",
                                accessor: (row) => row.name,
                                sortable: true,
                            },
                            {
                                key: "status",
                                header: "Status",
                                accessor: (row) => <ProjectStatusCommon status={row.status} />,
                            },
                            {
                                key: "priority",
                                header: "Priority",
                                accessor: (row) => <ProjectPriorityCommon priority={row.priority} />,
                            },
                            {
                                key: "progress",
                                header: "Progress",
                                accessor: (row) => `${row.progress}%`,
                            }, {
                                key: "dueDate",
                                header: "Due Date",
                                accessor: (row) => row.dueDate,
                            }, {
                                key: "members",
                                header: "Members",
                                accessor: (row) => row.members,
                            },
                        ]}
                        actions={[
                            {
                                label: "Edit",
                                onClick: (row) => handleEditClick(row as Project),
                                icon: <Edit className="h-4 w-4" />,
                            },
                            {
                                label: "Delete",
                                onClick: (row) => handleDeleteClick(row as Project),
                                icon: <Trash2 className="h-4 w-4" />,
                            },
                        ]}
                    />
                </div>
            )}

            <CommonDialog
                icon={PackagePlus}
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                title="Create New Project"
                description="Fill in the details to create a new project"
                size="lg"
                footer={
                    <CommonDialogFooter
                        onCancel={() => {
                            setIsAddDialogOpen(false);
                            resetForm();
                        }}
                        onConfirm={handleAddProject}
                        cancelText="Cancel"
                        confirmText="Create Project"
                    />
                }
            >
                <ProjectForm />
            </CommonDialog>

            {/* Edit Project Dialog */}
            <CommonDialog
                icon={PackagePlus}
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                title="Update Project"
                description="Update the project details"
                size="lg"
                footer={
                    <CommonDialogFooter
                        onCancel={() => {
                            setIsEditDialogOpen(false);
                            setSelectedProject(null);
                            resetForm();
                        }}
                        onConfirm={handleUpdateProject}
                        cancelText="Cancel"
                        confirmText="Save"
                    />
                }
            >
                <ProjectForm />
            </CommonDialog>

            {/* Delete Confirmation Dialog */}
            <CommonDialog
                icon={Trash2}
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                title="Delete Project"
                description="Are you sure you want to delete this project?"
                size="sm"
                footer={
                    <CommonDialogFooter
                        onCancel={() => {
                            setIsDeleteDialogOpen(false);
                            setSelectedProject(null);
                        }}
                        onConfirm={handleDeleteProject}
                        cancelText="Cancel"
                        confirmText="Delete"
                        confirmVariant="destructive"
                    />
                }
            >
                <p className="text-sm text-muted-foreground">
                    This action cannot be undone. The project{" "}
                    <strong>{selectedProject?.name}</strong> and all associated data will be
                    permanently deleted.
                </p>
            </CommonDialog>
        </>
    );
};