import { CommonTable, ProjectPriorityCommon, ProjectStatusCommon, type PriorityType, type StatusType } from "@/components";
import { AvatarGroup } from "@/components/common/avatarCommon";
import { CircularProgress } from "@/components/common/cicularProgress";
import { CommonDialog } from "@/components/common/commonDialog";
import { CommonDialogFooter } from "@/components/common/commonDialogFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon, Edit, PackagePlus, Plus, Trash2 } from "lucide-react";
import { useProjects, type Project } from "./hooks";


export const Projects = () => {
    const {
        projects,
        isAddDialogOpen,
        isEditDialogOpen,
        isDeleteDialogOpen,
        selectedProject,
        formData,
        setIsAddDialogOpen,
        setIsEditDialogOpen,
        setIsDeleteDialogOpen,
        setFormData,
        handleAddProject,
        handleEditClick,
        handleRowClick,
        handleUpdateProject,
        handleDeleteClick,
        handleDeleteProject,
        resetForm,
    } = useProjects();

    const ProjectForm = () => (
        <div className=" ">
            <div className="space-y-3.5">
                <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-medium text-gray-700">
                        Project Name
                    </Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter project name"
                        className="h-8 text-sm"
                    />
                </div>

                <div className="grid grid-cols-3 gap-3.5">
                    <div className="space-y-1.5">
                        <Label htmlFor="status" className="text-xs font-medium text-gray-700">
                            Status
                        </Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) =>
                                setFormData({ ...formData, status: value as StatusType })
                            }
                        >
                            <SelectTrigger className="w-full h-8 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="text-sm">
                                <SelectItem value="Planning">
                                    <ProjectStatusCommon width="" status='Pending' />
                                </SelectItem>
                                <SelectItem value="In progress">
                                    <ProjectStatusCommon status="In progress" />
                                </SelectItem>
                                <SelectItem value="In review">
                                    <ProjectStatusCommon status="In review" />
                                </SelectItem>
                                <SelectItem value="Pending">
                                    <ProjectStatusCommon status="Pending" />
                                </SelectItem>
                                <SelectItem value="Submitted">
                                    <ProjectStatusCommon status="Submitted" />
                                </SelectItem>
                                <SelectItem value="Success">
                                    <ProjectStatusCommon status="Success" />
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="priority" className="text-xs font-medium text-gray-700">
                            Priority
                        </Label>
                        <Select
                            value={formData.priority}
                            onValueChange={(value) =>
                                setFormData({ ...formData, priority: value as PriorityType })
                            }
                        >
                            <SelectTrigger className="w-full h-8 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="text-sm">
                                <SelectItem value="Planning">
                                    <ProjectPriorityCommon priority='High' />
                                </SelectItem>
                                <SelectItem value="In progress">
                                    <ProjectPriorityCommon priority='Low' />
                                </SelectItem>
                                <SelectItem value="In review">
                                    <ProjectPriorityCommon priority='Medium' />
                                </SelectItem>
                                <SelectItem value="Pending">
                                    <ProjectPriorityCommon priority='Critical' />
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="members" className="text-xs font-medium text-gray-700">
                            Team Members
                        </Label>
                        <Input
                            id="members"
                            type="text"
                            value={formData.members.map((m) => m.name).join(', ')}
                            onChange={(e) => {
                                const names = e.target.value
                                    .split(',')
                                    .map((n) => n.trim())
                                    .filter((n) => n);
                                setFormData({
                                    ...formData,
                                    members: names.map((name, idx) => ({ id: idx + 1, name })),
                                });
                            }}
                            placeholder="Enter names separated by commas"
                            className="h-8 text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="description" className="text-xs font-medium text-gray-700">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Enter project description"
                        className="min-h-20 text-sm resize-none"
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="dateRange" className="text-xs font-medium text-gray-700">
                        Project Duration
                    </Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full h-8 justify-start text-left text-sm font-normal"
                            >
                                <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                                {formData.dateRange.from ? (
                                    formData.dateRange.to ? (
                                        <>
                                            {format(formData.dateRange.from, 'LLL dd, y')} -{' '}
                                            {format(formData.dateRange.to, 'LLL dd, y')}
                                        </>
                                    ) : (
                                        format(formData.dateRange.from, 'LLL dd, y')
                                    )
                                ) : (
                                    <span className="text-gray-500">Pick a date range</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="range"
                                selected={formData.dateRange}
                                onSelect={(range) => setFormData({
                                    ...formData,
                                    dateRange: range || { from: undefined, to: undefined }
                                })}
                                initialFocus
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {projects.length === 0 ? (
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
                                className="gap-2 text-white"
                                size="sm"
                                onClick={() => setIsAddDialogOpen(true)}
                            >
                                Create new project
                            </Button>
                            <Button size="sm">
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
                        <Button className="gap-2 text-xs  " onClick={() => setIsAddDialogOpen(true)}>
                            <Plus />
                            Create Project
                        </Button>
                    </div>
                    <CommonTable<Project>
                        selectable
                        rowKey="id"
                        onRowClick={(row) => handleRowClick(row as Project)}
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
                                accessor: (row) => <CircularProgress value={row.progress} size="xs" />,
                            },
                            {
                                key: "dueDate",
                                header: "Due Date",
                                accessor: (row) => row.dueDate,
                            },
                            {
                                key: "members",
                                header: "Members",
                                accessor: (row) => <AvatarGroup members={row.members} max={3} size="sm" />
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
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                title="Create New Project"
                size="lg"
                footer={
                    <CommonDialogFooter
                        info="Fill in the details to create a new project"
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

            <CommonDialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                title="Update Project"
                size="lg"
                footer={
                    <CommonDialogFooter
                        onCancel={() => {
                            setIsEditDialogOpen(false);
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

            <CommonDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                title="Delete Project"
                size="sm"
                footer={
                    <CommonDialogFooter
                        onCancel={() => {
                            setIsDeleteDialogOpen(false);
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

